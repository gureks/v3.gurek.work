import { test, expect } from '@playwright/test';

test.describe('Chat Page', () => {
  test('should load chat page and initialize assistant message', async ({ page }) => {
    // We assume the app runs on localhost:3000
    await page.goto('/');

    // Check if the chat input is visible
    const input = page.getByPlaceholder(/message gurek/i);
    await expect(input).toBeVisible();

    // The initial assistant welcome message should be present
    const assistantMessage = page.getByText(/what brings you here/i);
    await expect(assistantMessage).toBeVisible();
  });

  test('should handle user sending a message', async ({ page }) => {
    await page.goto('/');
    
    // Type and send a message
    const input = page.getByPlaceholder(/message gurek/i);
    await input.fill('Tell me about your projects');
    await input.press('Enter');

    // User message should appear
    const userMessage = page.getByText('Tell me about your projects');
    await expect(userMessage).toBeVisible();

    // Since API might not be running in test, we can just check if loading indicator appears
    const loadingDots = page.locator('.animate-pulse').first();
    // In E2E, we'd normally mock the API endpoint using page.route
    // For now, we just test the UI interaction.
  });

  test('should inject fallback card on network error', async ({ page }) => {
    // Intercept the API call and force a failure
    await page.route('**/query', route => route.abort('failed'));
    
    await page.goto('/');
    const input = page.getByPlaceholder(/message gurek/i);
    await input.fill('This will fail');
    await input.press('Enter');

    // Fallback message
    const fallback = page.getByText(/I can't respond to this/i);
    await expect(fallback).toBeVisible();

    // Contact card should be visible
    const contactCard = page.getByText(/Let's Chat/i);
    await expect(contactCard).toBeVisible();
  });
});
