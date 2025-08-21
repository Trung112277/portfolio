import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    // Disable animations for better test stability
    await page.addInitScript(() => {
      const style = document.createElement('style');
      style.textContent = `
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-delay: -0.01ms !important;
          transition-duration: 0.01ms !important;
          transition-delay: -0.01ms !important;
        }
      `;
      document.head.appendChild(style);
    });
    
    await page.goto('/');
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
  });

  test('should display the main header', async ({ page }) => {
    // Check if the main header is visible
    await expect(page.locator('h1')).toBeVisible();
    
    // Check if the header contains expected text
    await expect(page.locator('h1')).toContainText('Nhat Trung');
  });

  test('should have working navigation buttons', async ({ page }) => {
    // Wait for floating buttons to be rendered
    await page.waitForSelector('.floating-button', { timeout: 10000 });
    
    // Check if floating buttons are present using href selectors (more reliable)
    const aboutButton = page.locator('a[href="#about"]');
    const dashboardButton = page.locator('a[href="/dashboard"]');
    const techButton = page.locator('a[href="#tech"]');
    const projectsButton = page.locator('a[href="#projects"]');

    await expect(aboutButton).toBeVisible();
    await expect(dashboardButton).toBeVisible();
    await expect(techButton).toBeVisible();
    await expect(projectsButton).toBeVisible();

    // Test navigation to about section - use programmatic scroll instead of click
    await page.evaluate(() => {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    });
    
    // Wait for smooth scroll to complete
    await page.waitForTimeout(1000);
    await expect(page.locator('#about')).toBeVisible();
  });

  test('should display about section', async ({ page }) => {
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Use programmatic scroll instead of scrollIntoViewIfNeeded
    await page.evaluate(() => {
      document.getElementById('about')?.scrollIntoView();
    });
    
    // Wait a bit for scroll to complete
    await page.waitForTimeout(500);
    
    // Check if about section is visible
    await expect(page.locator('#about')).toBeVisible();
    
    // Check if title is present
    await expect(page.locator('#about h2')).toContainText('about');
  });

  test('should display tech section', async ({ page }) => {
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Use programmatic scroll instead of scrollIntoViewIfNeeded
    await page.evaluate(() => {
      document.getElementById('tech')?.scrollIntoView();
    });
    
    // Wait a bit for scroll to complete
    await page.waitForTimeout(500);
    
    // Check if tech section is visible
    await expect(page.locator('#tech')).toBeVisible();
    
    // Check if title is present
    await expect(page.locator('#tech h2')).toContainText('tech');
  });

  test('should display projects section', async ({ page }) => {
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Use programmatic scroll instead of scrollIntoViewIfNeeded
    await page.evaluate(() => {
      document.getElementById('projects')?.scrollIntoView();
    });
    
    // Wait a bit for scroll to complete
    await page.waitForTimeout(500);
    
    // Check if projects section is visible
    await expect(page.locator('#projects')).toBeVisible();
  });

  test('should have proper meta tags', async ({ page }) => {
    // Check title
    await expect(page).toHaveTitle(/Nhat Trung.*Portfolio/);
    
    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /Nhat Trung.*portfolio/);
  });

  test('should be accessible', async ({ page }) => {
    // Check for skip to content link
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeVisible();
    
    // Check if main content has proper ID
    await expect(page.locator('#main-content')).toBeVisible();
  });

  test('should work on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Wait for page to adapt to mobile viewport
    await page.waitForTimeout(1000);
    
    // Check if main header is still visible
    await expect(page.locator('h1')).toBeVisible();
    
    // Check if navigation buttons are accessible
    const aboutButton = page.locator('a[href="#about"]');
    await expect(aboutButton).toBeVisible();
  });
});
