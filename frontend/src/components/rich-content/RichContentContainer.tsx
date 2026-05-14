import { useState } from 'react';
import { PROJECT_REGISTRY, ProjectEntry } from '../../data/projects';
import { useNavigate } from 'react-router-dom';
import { EmailIcon,ProjectsIcon, LinkedinIcon, ResumeIcon, InstagramIcon, CaretdownIcon } from '../../assets/custom-icons';

import { Carousel } from './Carousel';
import { ProjectGallery } from './ProjectGallery';
import { ProjectHero } from './ProjectHero';
import { ProjectMetrics } from './ProjectMetrics';
import { ProjectFeedbackList } from './ProjectFeedbackList';
import { ProjectDisclaimer } from './ProjectDisclaimer';

export type RichContentType = 'tools' | 'skills' | 'stats' | 'resume' | 'experience' | 'education' | 'leadership' | 'contact' | 'projects' | 'carousel' | 'gallery' | 'hero' | 'metrics' | 'affiliations' | 'certifications' | 'feedback' | 'disclaimer';

interface RichContentContainerProps {
  type: RichContentType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

/**
 * ChatBubbleWrapper - Wraps rich content in the system chat bubble style
 * (Figma node 190:6223)
 */
function ChatBubbleWrapper({ children, className = '', noPadding = false }: { children: React.ReactNode; className?: string; noPadding?: boolean }) {
  return (
    <div
      className={`flex flex-col ${className}`}
      style={{
        backgroundColor: 'var(--background-tooltip)',
        border: '1px solid var(--border)',
        borderRadius: '0 var(--radius-lg) var(--radius-lg) var(--radius-lg)',
        padding: noPadding ? '0' : 'var(--space-4)',
        width: 'fit-content',
        overflow: 'hidden',
        maxWidth: '100%'
      }}
    >
      {children}
    </div>
  );
}

/**
 * RichContentContainer — dynamically renders rich content templates
 * within chat bubbles based on the `type` field returned from the LLM.
 */
export function RichContentContainer({ type, data }: RichContentContainerProps) {
  switch (type) {
    case 'tools':
      return <ToolsCarousel />;
    case 'affiliations':
      return <AffiliationsCarousel />;
    case 'skills':
      return <SkillsCarousel />;
    case 'stats':
      return <StatsContainer />;
    case 'resume':
      return <ResumeDownload />;
    case 'experience':
      return <ExperienceTimeline />;
    case 'education':
      return <EducationTimeline />;
    case 'certifications':
      return <CertificationsTimeline />;
    case 'leadership':
      return <LeadershipTimeline />;
    case 'contact':
      return <ContactCards />;
    case 'projects':
      return <ProjectsGallery initialCount={data?.initialCount} />;
    case 'carousel':
      return <Carousel slides={Array.isArray(data) ? data : []} />;
    case 'gallery':
      return <ProjectGallery items={data} />;
    case 'hero':
      return <ChatBubbleWrapper className="!w-full"><ProjectHero {...data} /></ChatBubbleWrapper>;
    case 'metrics':
      return <ChatBubbleWrapper className="!w-full" noPadding><ProjectMetrics metrics={data} /></ChatBubbleWrapper>;
    case 'feedback':
      return <ChatBubbleWrapper className="!w-full"><ProjectFeedbackList items={data} /></ChatBubbleWrapper>;
    case 'disclaimer':
      return <ChatBubbleWrapper className="!w-full"><ProjectDisclaimer text={data} /></ChatBubbleWrapper>;
    default:
      return null;
  }
}

/**
 * ToolsCarousel — Figma node 275:4364 (Tools Carousel state=1)
 *
 * Each tool icon is a 40×40 circle:
 *   bg = semantic/background-input (#262626)
 *   border = 1px solid semantic/border-input (#404040)
 *   border-radius = radius/lg (16px)
 *   24×24 icon centered inside
 *
 * Container: horizontal flex, gap = space/2 (8px), py = space/1 (4px)
 * Overflow hidden with fade gradients on left/right edges (32px wide)
 */
const TOOL_ICONS = [
  { name: 'figma', label: 'Figma', icon: '/assets/tools/figma.svg' },
  { name: 'notion', label: 'Notion', icon: '/assets/tools/notion.svg' },
  { name: 'miro', label: 'Miro', icon: '/assets/tools/miro.svg'}, 
  { name: 'jira', label: 'Jira', icon: '/assets/tools/jira.svg' },
  { name: 'github', label: 'GitHub', icon: '/assets/tools/github.svg' },
  { name: 'python', label: 'Python', icon: '/assets/tools/python.svg' },
  { name: 'fastapi', label: 'FastAPI', icon: '/assets/tools/fastapi.svg' },
  { name: 'react', label: 'React', icon: '/assets/tools/reactjs.svg' },
  { name: 'css', label: 'CSS', icon: '/assets/tools/css.svg' },
  { name: 'vscode', label: 'VS Code', icon: '/assets/tools/vscode.svg' },
  { name: 'antigravity', label: 'Antigravity', icon: '/assets/tools/antigravity.svg' },
  { name: 'claude', label: 'Claude', icon: '/assets/tools/claude.svg' },
  { name: 'openai', label: 'OpenAI', icon: '/assets/tools/openai.svg' },
  { name: 'terminal', label: 'Terminal', icon: '/assets/tools/terminal.svg' },
  { name: 'docker', label: 'Docker', icon: '/assets/tools/docker.svg' },
  { name: 'obsidian', label: 'Obsidian', icon: '/assets/tools/obsidian.svg' },
  { name: 'n8n', label: 'n8n', icon: '/assets/tools/n8n.svg' },
  { name: 'supabase', label: 'Supabase', icon: '/assets/tools/supabase.svg' },
  { name: 'postgres', label: 'Postgres', icon: '/assets/tools/postgres.svg' },
  { name: 'pinecone', label: 'Pinecone', icon: '/assets/tools/pinecone.svg' },
  { name: 'langchain', label: 'Langchain', icon: '/assets/tools/langchain.svg' },
  { name: 'illustrator', label: 'Illustrator', icon: '/assets/tools/illustrator.svg' },
  { name: 'photoshop', label: 'Photoshop', icon: '/assets/tools/photoshop.svg' },
  { name: 'aftereffects', label: 'After Effects', icon: '/assets/tools/ae.svg' },
  { name: 'framer', label: 'Framer', icon: '/assets/tools/framer.svg' },
];

function ToolIcon({ label, icon }: { label: string; icon?: string }) {
  return (
    <div
      className="flex items-center justify-center shrink-0 relative"
      style={{
        width: '40px',
        height: '40px',
        backgroundColor: 'var(--background-input)',
        border: '1px solid var(--border-input)',
        borderRadius: 'var(--radius-lg)',
        padding: '1px',
      }}
    >
      {icon ? (
        <div className="relative shrink-0" style={{ width: '24px', height: '24px' }}>
           <img src={icon} alt={label} className="w-full h-full object-contain" />
        </div>
      ) : (
        <span
          style={{
            fontSize: '10px',
            fontWeight: 500,
            color: 'var(--foreground)',
            textAlign: 'center',
            lineHeight: '12px',
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}

function ToolsCarousel() {
  const tools = [...TOOL_ICONS, ...TOOL_ICONS];
  return (
    <ChatBubbleWrapper className='!w-full'>
      <div className="relative overflow-hidden w-full" style={{ height: '48px' }}>
        <div
          className="flex items-start animate-scroll-left"
          style={{
            gap: 'var(--space-2)',
            padding: 'var(--space-1) 0',
            width: 'max-content',
          }}
        >
          {tools.map((tool, idx) => (
            <ToolIcon key={`${tool.name}-${idx}`} label={tool.label} icon={tool.icon} />
          ))}
        </div>

        {/* Left fade gradient */}
        <div
          style={{
            position: 'absolute',
            left: -1,
            top: 0,
            bottom: 0,
            width: '32px',
            background: 'linear-gradient(to right, var(--background-tooltip), rgba(64,64,64,0))',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
        {/* Right fade gradient */}
        <div
          style={{
            position: 'absolute',
            right: -1,
            top: 0,
            bottom: 0,
            width: '32px',
            background: 'linear-gradient(to left, var(--background-tooltip), rgba(64,64,64,0))',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      </div>
    </ChatBubbleWrapper>
  );
}


/**
 * affiliationsCarousel
 */
const AFFILIATION_ICONS = [
  { name: 'ET', label: 'The Economic Times', icon: '/assets/affiliations/et.png' },
    { name: 'IIITD', label: 'IIIT Delhi', icon: '/assets/affiliations/iiitd.png' },
  { name: 'EY', label: 'Ernst & Young', icon: '/assets/affiliations/ey.png'}, 
  { name: 'GSK', label: 'GlaxoSmithKline', icon: '/assets/affiliations/gsk.png' },
    { name: 'TOI', label: 'The Times of India', icon: '/assets/affiliations/toi.png' },
  { name: 'LetsDoIt', label: 'Lets Do It', icon: '/assets/affiliations/ldii.png' },
];

function AffiliationsCarousel() {
  const affiliations = [...AFFILIATION_ICONS, ...AFFILIATION_ICONS];
  return (
    <ChatBubbleWrapper className='!w-full'>
      <div className="relative overflow-hidden w-full">
        <div
          className="flex items-start animate-scroll-left"
          style={{
            gap: 'var(--space-2)',
            width: 'max-content',
          }}
        >
          {affiliations.map((affiliation, idx) => (
             <div
              key={idx}
              className="flex items-center justify-center shrink-0 relative"
              style={{
                width: 'auto',
              }}
            >
              <div
                className="flex items-center justify-center shrink-0 relative"
                style={{
                  backgroundColor: 'var(--background-input)',
                  border: '1px solid var(--border-input)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '8px',
                }}
              >
              {affiliation.icon ? (
                <div className="relative shrink-0" style={{ width: 'auto', height: '48px' }}>
                  <img src={affiliation.icon} alt={affiliation.label} className="w-full h-full object-contain" style={{ borderRadius: 'var(--radius-sm)' }}/>
                </div>
              ) : (
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 500,
                    color: 'var(--foreground)',
                    textAlign: 'center',
                    lineHeight: '12px',
                  }}
                >
                  {affiliation.label}
                </span>
              )}
              </div>
            </div>
          ))}
        </div>

        {/* Left fade gradient */}
        <div
          style={{
            position: 'absolute',
            left: -1,
            top: 0,
            bottom: 0,
            width: '32px',
            background: 'linear-gradient(to right, var(--background-tooltip), rgba(64,64,64,0))',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
        {/* Right fade gradient */}
        <div
          style={{
            position: 'absolute',
            right: -1,
            top: 0,
            bottom: 0,
            width: '32px',
            background: 'linear-gradient(to left, var(--background-tooltip), rgba(64,64,64,0))',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      </div>
    </ChatBubbleWrapper>
  );
}

/**
 * SkillsCarousel — skill pills with similar styling to suggestion pills
 */
function SkillsCarousel() {
  const allSkills = [
    'Wireframing', 'Rapid Prototyping', 'User Research', 'Journey Mapping',
    'A/B Testing', 'Usability Testing', 'Information Architecture', 'Feature Prioritisation',
    'Data-Driven UX', 'Metrics Analysis', 'Market Analysis', 'Product Management',
    'Design Systems', 'Design Thinking', 'Product Roadmap', 'Product Development',
    'PRDs', '0→1', 'LLM Workflows', 'AI Feature Development', 'Agentic RAG Systems',
    'Prompt Engineering', 'Personalization Systems', 'Product-Led Growth (PLG)',
    'Agile Development', 'Cross-Functional Alignment', 'Stakeholder Management'
  ];
  
  const midPoint = Math.ceil(allSkills.length / 2);
  const row1 = [...allSkills.slice(0, midPoint), ...allSkills.slice(0, midPoint)];
  const row2 = [...allSkills.slice(midPoint), ...allSkills.slice(midPoint)];

  return (
    <ChatBubbleWrapper className='!w-full'>
      <div className="relative overflow-hidden w-full flex flex-col" style={{ gap: '8px'}}>
        <div className="flex animate-scroll-left" style={{ gap: '8px', width: 'max-content' }}>
          {row1.map((skill, idx) => (
            <div
              key={`r1-${idx}`}
              className="flex items-center justify-center shrink-0"
              style={{
                backgroundColor: 'var(--background-input)',
                border: '1px solid var(--border-input)',
                borderRadius: 'var(--radius-lg)',
                padding: '5px 13px',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '20px',
                color: 'var(--foreground)',
                whiteSpace: 'nowrap',
              }}
            >
              {skill}
            </div>
          ))}
        </div>
        <div className="flex animate-scroll-right" style={{ gap: '8px', width: 'max-content' }}>
          {row2.map((skill, idx) => (
            <div
              key={`r2-${idx}`}
              className="flex items-center justify-center shrink-0"
              style={{
                backgroundColor: 'var(--background-input)',
                border: '1px solid var(--border-input)',
                borderRadius: 'var(--radius-lg)',
                padding: '5px 13px',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '20px',
                color: 'var(--foreground)',
                whiteSpace: 'nowrap',
              }}
            >
              {skill}
            </div>
          ))}
        </div>
        
        {/* Left fade gradient */}
        <div
          style={{
            position: 'absolute',
            left: -1,
            top: 0,
            bottom: 0,
            width: '32px',
            background: 'linear-gradient(to right, var(--background-tooltip), rgba(64,64,64,0))',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
        {/* Right fade gradient */}
        <div
          style={{
            position: 'absolute',
            right: -1,
            top: 0,
            bottom: 0,
            width: '32px',
            background: 'linear-gradient(to left, var(--background-tooltip), rgba(64,64,64,0))',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      </div>
    </ChatBubbleWrapper>
  );
}

/**
 * StatsContainer — highlights stats with accent colors
 * Figma uses Newsreader Italic for stat values, brand-accent-1 for negative, #b4d455 for positive
 */
function StatsContainer() {
  const stats = [
    { value: '€20 Cr+', label: 'ARR\nGenerated', color: 'var(--stat-positive)' },
    { value: '4.7/5', label: 'NPS\nAchieved', color: 'var(--foreground)' },
    { value: '+37% ↑', label: 'Retention\nImproved', color: 'var(--stat-positive)' },
    { value: '+3.2% ↑', label: 'Conversion\nOptimised', color: 'var(--stat-positive)' },
  ];

  return (
    <ChatBubbleWrapper>
      <div className="flex items-center" style={{ gap: 'var(--space-6)', width: '100%' }}>
        {stats.map((stat, idx) => (
          <div key={idx} className="flex flex-col items-start flex-1 min-w-0">
            <span
              style={{
                fontFamily: "'Newsreader', serif",
                fontStyle: 'italic',
                fontSize: '20px',
                lineHeight: '1.1',
                color: stat.color,
                fontWeight: 400,
              }}
            >
              {stat.value}
            </span>
            <span
              style={{
                fontSize: '12px',
                lineHeight: '16px',
                color: 'var(--foreground)',
                fontWeight: 400,
                whiteSpace: 'pre-wrap',
              }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </ChatBubbleWrapper>
  );
}

/**
 * ResumeDownload — simple download link
 */
function ResumeDownload() {
  return (
    <ChatBubbleWrapper>
    <a
      href="/assets/resume/__Gurek Singh - CV.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between transition-colors"
      style={{
        backgroundColor: 'var(--background-input)',
        border: '1px solid var(--border-input)',
        borderRadius: 'var(--radius-sm)',
        padding: 'var(--space-4)',
        width: '100%',
        maxWidth: '328px',
        minWidth: '264px',
        color: 'var(--foreground)',
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: '20px',
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLAnchorElement).style.background = 'var(--background)';
        (e.currentTarget as HTMLAnchorElement).style.color = 'var(--foreground)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLAnchorElement).style.background = 'var(--background-input)';
        (e.currentTarget as HTMLAnchorElement).style.color = 'var(--foreground-muted)';
      }}
    >
      <span style={{ fontSize: '14px', fontWeight: 500, lineHeight: '20px', color: 'var(--foreground)' }}>
        Download Resume
      </span>
      <ResumeIcon />
    </a>
    </ChatBubbleWrapper>
  );
}

interface TimelineItem {
  title: string;
  date: string;
  company: string;
  desc?: string;
}

function AccordionItem({ item, isLast }: { item: TimelineItem; isLast: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasDesc = !!item.desc;
  
  return (
    <div className="flex flex-col w-full">
      <button 
        className="flex items-center justify-between w-full cursor-pointer text-left"
        style={{ padding: '12px 4px', background: 'transparent', border: 'none' }}
        onClick={() => hasDesc && setIsOpen(!isOpen)}
        disabled={!hasDesc}
      >
        <div className="flex flex-col items-start min-w-0" style={{ paddingRight: '16px', flex: '1 1 0%' }}>
          <div className="flex justify-between items-baseline w-full">
            <span style={{ fontWeight: 700, fontSize: '14px', lineHeight: '20px', color: 'var(--foreground)' }}>{item.title}</span>
            <span style={{ fontSize: '14px', lineHeight: '20px', color: 'var(--foreground)' }}>{item.date}</span>
          </div>
          <div className="flex flex-col items-start w-full pt-[2px]">
            <span style={{ fontSize: '14px', lineHeight: '20px', color: 'var(--foreground-muted)' }}>{item.company}</span>
          </div>
        </div>
        {hasDesc && (
          <div className="shrink-0 flex items-center justify-center transition-transform duration-200" style={{ width: '16px', height: '16px', color: 'var(--foreground)', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
             <CaretdownIcon size={16} />
          </div>
        )}
      </button>
      {hasDesc && isOpen && (
        <div className="flex flex-col pb-[12px] px-[8px]">
          <p style={{ fontSize: '14px', lineHeight: '20px', color: 'var(--foreground-muted)', whiteSpace: 'pre-wrap', margin: 0 }}>
            {item.desc}
          </p>
        </div>
      )}
      {!isLast && (
        <div style={{ height: '1px', backgroundColor: 'var(--background-input)', width: '100%', margin: '0' }} />
      )}
    </div>
  );
}

function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ChatBubbleWrapper className="gap-2 !w-full">
      <div className="flex flex-col w-full">
        {items.map((item, idx) => (
           <AccordionItem key={idx} item={item} isLast={idx === items.length - 1} />
        ))}
      </div>
    </ChatBubbleWrapper>
  );
}

/**
 * ExperienceTimeline — professional experience with timeline dots
 */
function ExperienceTimeline() {
  const experiences: TimelineItem[] = [
    {
      title: 'Manager II',
      date: 'Apr’24 - Nov’25',
      company: 'Times Internet Limited',
      desc: "- Scaled ET Masterclasses to INR 20Cr+ ARR through rapid discovery-to-ship cycles; achieved a 30% conversion uplift and scaled learners per batch from 350 to 2,000+; maintained an NPS of 4.7/5 and drove high referral-driven growth \n - Designed and deployed an AI avatar product using LLM-driven workflows to automate video production, reducing production time by 80% and cost by 60%; autonomous agent pipeline handled anchor-led explainers, summaries, product reviews, and social content \n - Architected product development for the 'Times Intelligence Layer' - transformed 15 years of editorial data into a scalable GenAI engine; leveraged hybrid RAG and multi-LLM routing; indexed 2.43M+ articles, optimized <5s P95 latency and 88% query accuracy"
    },
    {
      title: 'Manager I',
      date: 'Apr’24 - Apr’25',
      company: 'Times Internet Limited',
      // desc: "- Won the TIL AI Innovation Challenge (2024)  solo by prototyping an AI feature; currently being integrated into core video tooling \n - Established a unified design system for ET Markets(Web & App), increasing developer velocity and cross-functional collaboration efficiency"
    },
    {
      title: 'Associate - UX Design',
      date: 'Feb’23 - Apr’24',
      company: 'Times Internet Limited',
      desc: ""
    },
    {
      title: 'Design Lead & Founding Partner',
      date: 'Aug’20 - Aug’22',
      company: 'Diseno Media',
      desc: "Soft-launched and bootstrapped a multi-disciplinary design agency based in Delhi; specialising in Web, UI/UX, and Motion Design \n - Led and Delivered projects for well-known clientele like Ernst & Young, GlaxoSmithKline, Bare Anatomy, and more"
    },
    {
      title: 'Digital Lead',
      date: 'Dec’19 - May’20',
      company: "Let's Do It, India",
    }
  ];

  return <Timeline items={experiences} />;
}

function EducationTimeline() {
  const education: TimelineItem[] = [
    {
      title: 'B.Tech (CSE)',
      date: 'Aug’15 - Dec’19',
      company: 'IIIT Delhi',
    },
    {
      title: 'AISSCE - CBSE',
      date: 'Mar’15',
      company: 'The Air Force School, Subroto Park',
    }
  ];

  return <Timeline items={education} />;
}

function CertificationsTimeline() {
  const certifications: TimelineItem[] = [
    {
      title: 'Agents, MCP, and Claude Code',
      date: '2026',
      company: 'Anthropic',
    },
    {
      title: 'Prompt to Prototype',
      date: '2025',
      company: 'Google for Startups',
    },
    {
      title: 'Product Manager Fellowship',
      date: '2022',
      company: 'NextLeap',
    },
    {
      title: 'Product-led Certification',
      date: '2022',
      company: 'Pendo.io',
    },
  ];

  return <Timeline items={certifications} />;
}

function LeadershipTimeline() {
  const leadership: TimelineItem[] = [
    {
      title: 'Winner, TIL AI Innovation Challenge',
      date: 'Mar’25',
      company: 'Times Internet Limited',
    },
    {
      title: 'Cultural Co-ordinator, Student Council',
      date: 'Oct’18 - Apr’19',
      company: 'IIIT Delhi',
      desc: '- Led and Curated a team of 40 students organising fortnightly events and festivals'
    },
    {
      title: 'Convener & Overall Coordinator, Esya’18',
      date: 'Feb’18 - Sept’18',
      company: 'IIIT Delhi',
      desc: '- Led a core team of 14 guiding 220+ students across 8 different verticals\n- Witnessed a footfall of 10,000+ students and created online presence of 30L+'
    },
    {
      title: 'Operations Co-ordinator, Odyssey’18',
      date: 'Oct’18 - Jan’18',
      company: 'IIIT Delhi',
      desc: '- Led a team of 40 for cultural fest attended by 12,000+ participants.\n- Organised the star night, got featured in Times of India'
    },
    {
      title: 'Runners-Up, Code-Off Hackathon',
      date: '2017',
      company: 'Women Who Code Delhi',
    },
    {
      title: 'Top 10 Finalist, HackDTU',
      date: '2017',
      company: 'Delhi Technical University',
    },
    {
      title: 'CBSE School Topper in Mathematics and Computer Science',
      date: '2015',
      company: 'The Air Force School',
    },
    {
      title: 'Nationals Qualifier',
      date: '2015',
      company: 'Indian National Olympiad in Informatics ',
    },
  ];

  return <Timeline items={leadership} />;
}

function ContactCards() {
  const contacts = [
    { label: 'Drop a Mail', icon: <EmailIcon size={20} className="text-[color:var(--foreground)]" />, link: 'mailto:gurek15033@iiitd.ac.in' },
    { label: 'Connect on Linkedin', icon: <LinkedinIcon size={20} className="text-[color:var(--foreground)]" />, link: 'https://linkedin.com/in/gureks' },
    { label: 'Follow on Instagram', icon: <InstagramIcon size={20} className="text-[color:var(--foreground)]" />, link: 'https://instagram.com/gureksingh' },
  ];

  return (
    <ChatBubbleWrapper>
    <div className="flex flex-col gap-2 w-full max-w-[328px]">
      {contacts.map((contact, idx) => (
        <a
          key={idx}
          href={contact.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between transition-colors"
          style={{
            backgroundColor: 'var(--background-input)',
            border: '1px solid var(--border-input)',
            borderRadius: 'var(--radius-sm)',
            padding: 'var(--space-4)',
            width: '100%',
            maxWidth: '328px',
            minWidth: '264px',
            color: 'var(--foreground)',
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: '20px',
            cursor: 'pointer',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = 'var(--background)';
            (e.currentTarget as HTMLAnchorElement).style.color = 'var(--foreground)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = 'var(--background-input)';
            (e.currentTarget as HTMLAnchorElement).style.color = 'var(--foreground-muted)';
          }}
        >
          <span style={{ fontSize: '14px', fontWeight: 500, lineHeight: '16px', color: 'var(--foreground)', textAlign: 'center' }}>
            {contact.label}
          </span>
          {contact.icon}
        </a>
      ))}
    </div>
    </ChatBubbleWrapper>
  );
}

/**
 * ProjectsGallery — renders project cards in chat
 */
function ProjectCard({ project, navigate }: { project: ProjectEntry, navigate: (path: string) => void }) {
  if (!project.coverImage || !project.stats) return null;

  return (
    <div
      className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full shrink-0 transition-opacity hover:opacity-90 active:opacity-80 items-start"
      style={{
        backgroundColor: 'var(--background-tooltip)',
        border: '1px solid var(--border)',
        borderRadius: '0 var(--radius-lg) var(--radius-lg) var(--radius-lg)',
        padding: 'var(--space-4)',
        cursor: 'pointer',
      }}
      onClick={() => navigate(`/project/${project.slug}`)}
      role="button"
      tabIndex={0}
      aria-label={`View ${project.title} case study`}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/project/${project.slug}`)}
    >
      <div 
        className="relative overflow-hidden shrink-0 w-full sm:w-auto" 
        style={{ 
          aspectRatio: '30/20', 
          borderRadius: 'var(--radius-sm)',
          flex: '1 1 0%',
          minWidth: 0
        }}
      >
        <img 
          src={project.coverImage} 
          alt={project.title} 
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover" 
        />
      </div>
      <div className="flex flex-col justify-between shrink-0 w-full sm:w-auto" style={{ flex: '1 1 0%', minWidth: 0, alignSelf: 'stretch' }}>
        <div className="flex flex-col gap-1 w-full shrink-0 mb-4 sm:mb-6 justify-center">
          <p 
            className="w-full shrink-0 m-0 whitespace-pre-wrap" 
            style={{ 
              fontFamily: "'Inter', sans-serif", 
              fontWeight: 700, 
              fontSize: '14px', 
              lineHeight: '20px', 
              color: 'var(--foreground)' 
            }}
          >
            {project.title}
          </p>
          <p 
            className="w-full shrink-0 m-0 whitespace-pre-wrap" 
            style={{ 
              fontFamily: "'Inter', sans-serif", 
              fontWeight: 400, 
              fontSize: '14px', 
              lineHeight: '20px', 
              color: 'var(--foreground-muted)' 
            }}
          >
            {project.shortDescription}
          </p>
        </div>
        <div className="flex items-center gap-4 sm:gap-6 w-full shrink-0 overflow-x-auto scrollbar-hide mt-auto">
          {project.stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col flex-1 items-start min-w-0 relative">
              <span 
                style={{ 
                  fontFamily: "'Newsreader', serif", 
                  fontStyle: 'italic', 
                  fontSize: '18px', 
                  lineHeight: '1.1', 
                  color: stat.isNegative ? '#ff6b6b' : 'var(--stat-positive)', 
                  fontWeight: 400 
                }}
              >
                {stat.value}
              </span>
              <span 
                style={{ 
                  fontFamily: "'Inter', sans-serif", 
                  fontWeight: 400, 
                  fontSize: '12px', 
                  lineHeight: '16px', 
                  color: 'var(--foreground)',
                  whiteSpace: 'pre-wrap'
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectsGallery({ initialCount }: { initialCount?: number }) {
  const navigate = useNavigate();
  const allProjects = PROJECT_REGISTRY.filter(p => p.coverImage && p.stats);
  const [showAll, setShowAll] = useState(false);

  const projects =
    initialCount && !showAll ? allProjects.slice(0, initialCount) : allProjects;
  const hasMore = initialCount !== undefined && !showAll && allProjects.length > initialCount;

  return (
    <div className="flex flex-col w-full relative" style={{ gap: 'var(--space-2)' }}>
      {projects.map(p => (
        <ProjectCard key={p.id} project={p} navigate={navigate} />
      ))}
      {hasMore && (
        <ChatBubbleWrapper>
        <button
          onClick={() => setShowAll(true)}
          className="flex items-center justify-between transition-colors"
          style={{
            backgroundColor: 'var(--background-input)',
            border: '1px solid var(--border-input)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-4)',
            maxWidth: '328px',
            minWidth: '264px',
            width: '100%',
            color: 'var(--foreground)',
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'background 0.15s, color 0.15s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'var(--background)';
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--foreground)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'var(--background-input)';
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--foreground-muted)';
          }}
        >
          <span style={{ fontSize: '14px', fontWeight: 500, lineHeight: '20px', color: 'var(--foreground)' }}>
            Show More Project{allProjects.length - initialCount !== 1 ? 's' : ''}
            {/* {allProjects.length - initialCount}  */}
            </span>
          <ProjectsIcon size={20} />
        </button>
        </ChatBubbleWrapper>
      )}
    </div>
  );
}
