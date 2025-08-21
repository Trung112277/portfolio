import { test, expect } from '@playwright/test';

test.describe('Dashboard Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
  });

  test('should display dashboard page', async ({ page }) => {
    // Check if dashboard page loads
    await expect(page.locator('main')).toBeVisible();
    
    // Check if dashboard title is present
    await expect(page.locator('h1')).toContainText('Dashboard');
  });

  test('should have proper navigation', async ({ page }) => {
    // Check if navigation elements are present
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    
    // Check if home link is present (use more specific selector)
    const homeLink = page.locator('nav a[href="/"]').first();
    await expect(homeLink).toBeVisible();
  });

  test('should be responsive', async ({ page }) => {
    // Test desktop view
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('main')).toBeVisible();
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('main')).toBeVisible();
  });

  test('should have proper meta tags', async ({ page }) => {
    // Check title
    await expect(page).toHaveTitle(/Dashboard.*Nhat Trung Portfolio/);
  });
});
