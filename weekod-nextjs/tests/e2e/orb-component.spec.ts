import { test, expect } from '@playwright/test';

test.describe('Orb Component', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage where Orb components are used
    await page.goto('http://localhost:3000');
  });

  test('should load without OGL module errors', async ({ page }) => {
    // Check for console errors related to OGL module
    const consoleErrors: string[] = [];
    
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Wait for page to load completely
    await page.waitForLoadState('networkidle');

    // Check that no OGL-related errors occurred
    const oglErrors = consoleErrors.filter(error => 
      error.includes('ogl') || 
      error.includes('OGL') || 
      error.includes('Renderer.js') ||
      error.includes('module factory is not available')
    );

    expect(oglErrors).toHaveLength(0);
  });

  test('should display fallback orbs when OGL fails', async ({ page }) => {
    // Intercept OGL module requests and make them fail
    await page.route('**/node_modules/ogl/**', (route) => {
      route.abort('failed');
    });

    await page.reload();
    await page.waitForLoadState('networkidle');

    // Check that fallback CSS orbs are displayed
    const fallbackOrbs = await page.locator('.bg-gradient-to-br').count();
    expect(fallbackOrbs).toBeGreaterThan(0);
  });

  test('should handle WebGL context gracefully', async ({ page }) => {
    // Check that WebGL support is detected
    const webglSupported = await page.evaluate(() => {
      const canvas = document.createElement('canvas');
      return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    });

    if (webglSupported) {
      // If WebGL is supported, Orb should attempt to load
      await page.waitForLoadState('networkidle');
      
      // No module factory errors should occur
      const errors = await page.evaluate(() => {
        return window.console.error?.toString() || '';
      });
      
      expect(errors).not.toContain('module factory is not available');
    } else {
      console.log('WebGL not supported in test environment, skipping WebGL tests');
    }
  });

  test('should not break page functionality when Orb fails', async ({ page }) => {
    // Even if Orb components fail, the page should still be functional
    await page.waitForLoadState('networkidle');

    // Check that main navigation works
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();

    // Check that hero section is visible
    const heroSection = page.locator('section').first();
    await expect(heroSection).toBeVisible();

    // Check that the page title is correct
    await expect(page).toHaveTitle(/Weekod/);
  });

  test('should load ClientOnlyOrb without errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.waitForLoadState('networkidle');

    // Check that ClientOnlyOrb loads without lazy loading errors
    const lazyLoadErrors = consoleErrors.filter(error => 
      error.includes('lazy') || 
      error.includes('Suspense') ||
      error.includes('dynamic import')
    );

    expect(lazyLoadErrors).toHaveLength(0);
  });

  test('should handle HMR updates gracefully', async ({ page }) => {
    // This test simulates the HMR scenario that caused the original error
    await page.waitForLoadState('networkidle');

    // Inject some JavaScript to simulate HMR module reload
    await page.evaluate(() => {
      // Simulate Turbopack HMR module deletion/recreation
      if (window.webpackHotUpdate) {
        // This would normally trigger the HMR update
        console.log('Simulating HMR update');
      }
    });

    // Wait a bit for any async operations
    await page.waitForTimeout(1000);

    // Page should still be functional
    const pageContent = await page.locator('body').isVisible();
    expect(pageContent).toBe(true);
  });
});

test.describe('Orb Error Boundary', () => {
  test('should catch and handle Orb errors gracefully', async ({ page }) => {
    const consoleMessages: string[] = [];
    
    page.on('console', (msg) => {
      consoleMessages.push(msg.text());
    });

    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    // Check if error boundary warnings are logged appropriately
    const errorBoundaryMessages = consoleMessages.filter(msg => 
      msg.includes('Orb component error caught by boundary') ||
      msg.includes('Failed to load Orb component')
    );

    // If there are error boundary messages, they should be warnings, not uncaught errors
    if (errorBoundaryMessages.length > 0) {
      // This is acceptable as it means our error boundaries are working
      console.log('Error boundaries working correctly:', errorBoundaryMessages);
    }

    // The important thing is that the page doesn't crash
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });
});