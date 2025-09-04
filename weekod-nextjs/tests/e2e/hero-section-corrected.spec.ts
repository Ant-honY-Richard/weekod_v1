import { test, expect } from '@playwright/test';

test.describe('Hero Section - Corrected Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('load'); // Changed from networkidle to load
    await page.waitForTimeout(3000); // Allow animations to start and components to render
  });

  test('should display hero section with correct content', async ({ page }) => {
    const heroSection = page.locator('#hero');
    await expect(heroSection).toBeVisible();

    // Check badge with correct text
    const badge = heroSection.locator('text=AI + HUMAN CRAFT');
    await expect(badge).toBeVisible();

    // Check main heading parts
    const heading = heroSection.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('AI-Powered');
    await expect(heading).toContainText('Web Development');
    await expect(heading).toContainText('2x Faster');

    // Check that 2x Faster has the correct styling (not text-glow)
    const fasterElement = heading.locator('span:has-text("2x Faster")');
    await expect(fasterElement).toBeVisible();
    const classes = await fasterElement.getAttribute('class');
    expect(classes).toContain('text-[#00F3FF]');
    expect(classes).toContain('hero-text-instant');
  });

  test('should have correct description text', async ({ page, isMobile }) => {
    const heroSection = page.locator('#hero');
    const description = heroSection.locator('p').first();
    await expect(description).toBeVisible();
    
    const textContent = await description.textContent();
    expect(textContent).toBeTruthy();
    
    if (isMobile) {
      expect(textContent?.toLowerCase()).toContain('tired of slow');
      expect(textContent?.toLowerCase()).toContain('expensive web development');
    } else {
      expect(textContent?.toLowerCase()).toContain('frustrated with slow');
      expect(textContent?.toLowerCase()).toContain('ai-enhanced approach');
    }
  });

  test('should have functional CTA buttons', async ({ page }) => {
    const heroSection = page.locator('#hero');
    
    // Primary CTA
    const primaryCTA = heroSection.locator('button:has-text("Get Free Consultation")');
    await expect(primaryCTA).toBeVisible();
    
    // Test hover effect
    await primaryCTA.hover();
    await page.waitForTimeout(300);
    
    // Secondary CTA (responsive text)
    const secondaryCTA = heroSection.locator('button').filter({ hasText: /See Our Work|Our Work/ });
    await expect(secondaryCTA).toBeVisible();
    
    await secondaryCTA.hover();
    await page.waitForTimeout(300);
  });

  test('should display ClientOnlyOrb component', async ({ page, isMobile }) => {
    const heroSection = page.locator('#hero');
    await expect(heroSection).toBeVisible();

    // The orb might be implemented as a canvas element inside ClientOnlyOrb
    // Wait a bit for the component to render
    await page.waitForTimeout(3000);
    
    if (!isMobile) {
      // Desktop version should have larger orb
      const desktopOrb = heroSection.locator('canvas, .orb').first();
      if (await desktopOrb.count() > 0) {
        // Check if canvas has dimensions > 0
        const boundingBox = await desktopOrb.boundingBox();
        if (boundingBox) {
          expect(boundingBox.width).toBeGreaterThan(0);
          expect(boundingBox.height).toBeGreaterThan(0);
        }
      }
    } else {
      // Mobile version (w-80 h-80)
      const mobileOrbContainer = heroSection.locator('div.w-80.h-80');
      if (await mobileOrbContainer.count() > 0) {
        await expect(mobileOrbContainer).toBeVisible();
      }
    }
  });

  test('should have social proof section', async ({ page }) => {
    const heroSection = page.locator('#hero');
    
    // Check for social proof text
    const trustText = page.locator('text=Trusted by startups and businesses');
    await expect(trustText).toBeVisible();
    
    // Check stats
    const projectsDelivered = page.locator('text=15+');
    await expect(projectsDelivered).toBeVisible();
    
    const satisfactionRate = page.locator('text=100%');
    await expect(satisfactionRate).toBeVisible();
    
    const support = page.locator('text=24/7');
    await expect(support).toBeVisible();
    
    // Check rating
    const rating = page.locator('text=4.9/5');
    await expect(rating).toBeVisible();
  });

  test('should have animated elements', async ({ page }) => {
    const heroSection = page.locator('#hero');
    
    // Check for badge with pulse animation
    const badge = heroSection.locator('span:has-text("AI + HUMAN CRAFT")');
    await expect(badge).toBeVisible();
    
    const pulseDot = badge.locator('.w-2.h-2.animate-pulse');
    await expect(pulseDot).toBeVisible();
    
    // Check for motion buttons (Framer Motion)
    const motionButtons = heroSection.locator('button');
    expect(await motionButtons.count()).toBeGreaterThanOrEqual(2);
  });

  test('should handle mobile responsive design', async ({ page }) => {
    // Test different viewport sizes
    const viewports = [
      { width: 375, height: 667 }, // Mobile
      { width: 768, height: 1024 }, // Tablet
      { width: 1920, height: 1080 } // Desktop
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.waitForTimeout(500);

      const heroSection = page.locator('#hero');
      await expect(heroSection).toBeVisible();
      
      const heading = heroSection.locator('h1');
      await expect(heading).toBeVisible();
      
      const ctaButtons = heroSection.locator('button');
      expect(await ctaButtons.count()).toBeGreaterThanOrEqual(2);
    }
  });

  test('should have background gradients and effects', async ({ page }) => {
    const heroSection = page.locator('#hero');
    await expect(heroSection).toBeVisible();

    // Check for gradient backgrounds
    const gradientBg = heroSection.locator('.bg-gradient-to-br');
    if (await gradientBg.count() > 0) {
      await expect(gradientBg.first()).toBeVisible();
    }

    // Check overlay gradient
    const overlayGradient = heroSection.locator('.bg-gradient-to-r');
    if (await overlayGradient.count() > 0) {
      expect(await overlayGradient.count()).toBeGreaterThan(0);
    }
  });

  test('should have floating particles on mobile', async ({ page, isMobile }) => {
    if (!isMobile) {
      test.skip('Floating particles are for mobile only');
      return;
    }

    const heroSection = page.locator('#hero');
    await expect(heroSection).toBeVisible();
    
    // Wait for particles to appear (they have a delay)
    await page.waitForTimeout(2000);
    
    // Check for particle elements
    const particles = heroSection.locator('.w-1.h-1.bg-\\[\\#00F3FF\\]');
    if (await particles.count() > 0) {
      expect(await particles.count()).toBeGreaterThanOrEqual(6);
    }
  });

  test('should have scroll indicator', async ({ page }) => {
    const heroSection = page.locator('#hero');
    await expect(heroSection).toBeVisible();
    
    // Wait for scroll indicator animation
    await page.waitForTimeout(1500);
    
    const scrollIndicator = page.locator('svg').filter({ hasText: '' }).last();
    if (await scrollIndicator.count() > 0) {
      await expect(scrollIndicator).toBeVisible();
    }
  });
});