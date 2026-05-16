import { Client } from '@notionhq/client';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const DATABASE_ID = process.env.NOTION_DATABASE_ID;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ detail: 'Method not allowed' });
  }

  if (!process.env.NOTION_API_KEY || !DATABASE_ID) {
    return res.status(500).json({ detail: 'Notion integration not configured' });
  }

  const { sessionId, userName, userRole, messages } = req.body;
  if (!sessionId || !messages || !Array.isArray(messages)) {
    return res.status(400).json({ detail: 'Invalid payload' });
  }

  // Extract Vercel IP & Location headers
  const city = req.headers['x-vercel-ip-city'] || 'Unknown City';
  const country = req.headers['x-vercel-ip-country'] || 'Unknown Country';
  const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'Unknown IP';

  try {
    // 1. Query if a page with this sessionId already exists using raw fetch to bypass SDK missing method
    const queryRes = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        filter: {
          property: 'Session ID',
          title: {
            equals: sessionId
          }
        }
      })
    });
    const queryResponse = await queryRes.json();
    if (!queryRes.ok) throw queryResponse;

    let sessionPageId = null;
    let messagesDbId = null;

    if (queryResponse.results.length === 0) {
      // 2. Create a new Session Page
      const newPage = await notion.pages.create({
        parent: { database_id: DATABASE_ID },
        properties: {
          'Session ID': {
            title: [{ text: { content: sessionId } }],
          },
          'IP Address': {
            rich_text: [{ text: { content: Array.isArray(ip) ? ip[0] : ip } }],
          },
          'City': {
            rich_text: [{ text: { content: Array.isArray(city) ? city[0] : city } }],
          },
          'Country': {
            rich_text: [{ text: { content: Array.isArray(country) ? country[0] : country } }],
          },
        },
      });
      sessionPageId = newPage.id;

      // 3. Create Messages Database inside the Session Page using raw fetch to bypass SDK bug
      const dbRes = await fetch('https://api.notion.com/v1/databases', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          parent: { type: 'page_id', page_id: sessionPageId },
          title: [{ type: 'text', text: { content: 'Messages' } }],
          properties: {
            'Message ID': { title: {} },
            'Session ID': { rich_text: {} },
            'Role': { select: { options: [{ name: 'user', color: 'blue' }, { name: 'assistant', color: 'green' }] } },
            'Content': { rich_text: {} },
            'Timestamp': { date: {} }
          }
        })
      });
      const dbData = await dbRes.json();
      if (!dbRes.ok) throw dbData;
      messagesDbId = dbData.id;

      // 4. Save the Messages DB ID into the Session Page property for future reference
      await notion.pages.update({
        page_id: sessionPageId,
        properties: {
          'Messages DB ID': { rich_text: [{ text: { content: messagesDbId } }] }
        }
      });
    } else {
      const sessionPage = queryResponse.results[0];
      sessionPageId = sessionPage.id;
      
      // Extract Messages DB ID from the Session Page
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dbIdProp: any = sessionPage.properties['Messages DB ID'];
      if (dbIdProp && dbIdProp.type === 'rich_text' && dbIdProp.rich_text.length > 0) {
        messagesDbId = dbIdProp.rich_text[0].plain_text;
      } else {
        // Fallback: search for child database block if property is missing
        const children = await notion.blocks.children.list({ block_id: sessionPageId });
        const dbBlock = children.results.find(b => b.type === 'child_database');
        if (dbBlock) {
          messagesDbId = dbBlock.id;
        } else {
           throw new Error("Could not find Messages DB inside Session page.");
        }
      }
    }

    // 5. Update User Name and Role on Session Page if they were extracted
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const propertiesToUpdate: any = {};
    if (userName) {
      propertiesToUpdate['User Name'] = { rich_text: [{ text: { content: userName } }] };
    }
    if (userRole) {
      propertiesToUpdate['User Role'] = { rich_text: [{ text: { content: userRole } }] };
    }
    if (Object.keys(propertiesToUpdate).length > 0) {
      await notion.pages.update({
        page_id: sessionPageId,
        properties: propertiesToUpdate,
      });
    }

    // 6. Insert Messages into Messages DB
    if (messagesDbId) {
      // Execute inserts sequentially to preserve chat order in Notion
      for (const msg of messages) {
        await notion.pages.create({
          parent: { database_id: messagesDbId },
          properties: {
            'Message ID': { title: [{ text: { content: msg.id || crypto.randomUUID() } }] },
            'Session ID': { rich_text: [{ text: { content: sessionId } }] },
            'Role': { select: { name: msg.role } },
            'Content': { rich_text: [{ text: { content: msg.content.slice(0, 2000) } }] }, // Notion text limit
            'Timestamp': { date: { start: new Date(msg.timestamp || Date.now()).toISOString() } },
          }
        });
      }
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Notion API Error:', error);
    return res.status(500).json({ detail: 'Failed to sync with Notion' });
  }
}
