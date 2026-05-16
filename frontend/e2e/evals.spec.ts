import { test, expect } from '@playwright/test';

const evals = [
  "What tools and software are in your current tech stack?",
  "I'd like to get a copy of your CV.",
  "Walk me through your professional experience.",
  "What were the main user complaints or feedback received during the ET ePaper launch before the hotfix?",
  "Can you highlight some of the key quantitative metrics and business impact you achieved?",
  "Show me a gallery of images related to the ET ePaper redesign.",
  "Show me a few of your top projects."
];

test.describe('Visual LLM Evals', () => {
  test('Run conversational evals', async ({ page }) => {
    test.setTimeout(evals.length * 20000 + 10000); // Allow enough time for all evals
    
    // Navigate to the local dev server
    await page.goto('/');
    
    for (let i = 0; i < evals.length; i++) {
      const prompt = evals[i];
      
      console.log(`Sending Eval ${i + 1}: ${prompt}`);

      // Locate the input box (either an input or a textarea)
      const inputLocator = page.locator('input[type="text"], textarea').first();
      await inputLocator.waitFor({ state: 'visible' });
      await inputLocator.fill(prompt);

      // Submit the chat form (pressing Enter or clicking the submit button)
      await inputLocator.press('Enter');

      // Wait for the UI to finish rendering (we wait up to 15 seconds to ensure stream is complete)
      // We look for the typing indicator to disappear, or just wait for a fixed amount of time for safety.
      // 10 seconds per eval should be plenty to visualize the response.
      await page.waitForTimeout(10000);
    }
    
    // Final wait to observe the entire chat stream history
    await page.waitForTimeout(5000);
  });
});
