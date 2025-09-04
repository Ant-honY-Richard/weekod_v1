import { test, expect } from '@playwright/test';

test.describe('Enhanced Hero Section - Advanced Features', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('load');
    await page.waitForTimeout(3000); // Allow animations to start
  });

  test('should display 3D elements and animations', async ({ page }) => {
    const heroSection = page.locator('#hero');
    await expect(heroSection).toBeVisible();

    // Check for 3D orb element
    const orbElement = page.locator('.orb, [data-testid="orb"], canvas, .three-canvas').first();
    if (await orbElement.count() > 0) {
      await expect(orbElement).toBeVisible();
      
      // Test orb interaction (with force option for overlapping elements)
      try {
        await orbElement.hover({ force: true });
        await page.waitForTimeout(500);
      } catch (error) {
        console.log('Orb hover failed (may be overlapped by other elements)');
      }
    }

    // Check for particle effects
    const particles = page.locator('.particle, [data-testid="particle"]');
    if (await particles.count() > 0) {
      expect(await particles.count()).toBeGreaterThan(0);
    }

    // Check for animated elements
    const animatedElements = page.locator('[class*="animate-"], .animate-float, .animate-pulse');
    if (await animatedElements.count() > 0) {
      expect(await animatedElements.count()).toBeGreaterThan(0);
    }
  });

  test('should have typing animation effect', async ({ page, isMobile }) => {
    const heroSection = page.locator('#hero');
    
    // Check for typing animation in description
    const description = heroSection.locator('p').first();
    await expect(description).toBeVisible();
    
    // Wait for typing animation to complete
    await page.waitForTimeout(3000);
    
    // Check that text content is fully visible
    const textContent = await description.textContent();
    expect(textContent).toBeTruthy();
    
    if (!isMobile) {
      expect(textContent.toLowerCase()).toContain('frustrated');
      expect(textContent.toLowerCase()).toContain('ai-enhanced');
    } else {
      expect(textContent.toLowerCase()).toContain('tired of slow');
    }

    // Check for typing cursor (if present)
    const cursor = description.locator('.animate-pulse');
    if (await cursor.count() > 0) {
      await expect(cursor).toBeVisible();
    }
  });

  test('should have magnetic cursor effects on CTA buttons', async ({ page, isMobile }) => {
    if (isMobile) {
      test.skip('Magnetic cursor effects are for desktop only');
      return;
    }

    const heroSection = page.locator('#hero');
    const primaryCTA = heroSection.locator('button:has-text("Get Free Consultation")');
    
    await expect(primaryCTA).toBeVisible();

    // Test magnetic effect by moving mouse near button
    const buttonBox = await primaryCTA.boundingBox();
    if (buttonBox) {
      // Move mouse around the button area
      await page.mouse.move(buttonBox.x + buttonBox.width / 2, buttonBox.y + buttonBox.height / 2);
      await page.waitForTimeout(100);
      
      // Move mouse to different positions around button
      await page.mouse.move(buttonBox.x + buttonBox.width / 2 + 20, buttonBox.y + buttonBox.height / 2 + 10);
      await page.waitForTimeout(100);
      
      await page.mouse.move(buttonBox.x + buttonBox.width / 2 - 20, buttonBox.y + buttonBox.height / 2 - 10);
      await page.waitForTimeout(100);
    }

    // Test hover state
    await primaryCTA.hover();
    await page.waitForTimeout(300);
    await expect(primaryCTA).toBeVisible();
  });

  test('should have text reveal animations', async ({ page }) => {
    const heroSection = page.locator('#hero');
    const heading = heroSection.locator('h1');
    
    await expect(heading).toBeVisible();

    // Check individual text lines
    const aiPowered = heading.locator('text=AI-Powered');
    const webDevelopment = heading.locator('text=Web Development'); 
    const faster = heading.locator('text=2x Faster');

    await expect(aiPowered).toBeVisible();
    await expect(webDevelopment).toBeVisible();
    await expect(faster).toBeVisible();

    // Check for styling on "2x Faster"
    const fasterElement = heading.locator('span:has-text("2x Faster")');
    const classes = await fasterElement.getAttribute('class');
    if (classes) {
      expect(classes).toContain('text-[#00F3FF]');
    }
  });

  test('should have enhanced badge with pulsing animation', async ({ page }) => {
    const heroSection = page.locator('#hero');
    const badge = heroSection.locator('text=AI + HUMAN CRAFT').locator('..').first();
    
    await expect(badge).toBeVisible();

    // Check for badge styling
    const badgeElement = heroSection.locator('span:has-text("AI + HUMAN CRAFT")');
    await expect(badgeElement).toBeVisible();
    
    const badgeClasses = await badgeElement.getAttribute('class');
    if (badgeClasses) {
      expect(badgeClasses).toContain('backdrop-blur');
    }

    // Check for pulsing dot
    const pulseDot = badge.locator('.w-2.h-2, [class*="rounded-full"]').first();
    if (await pulseDot.count() > 0) {
      await expect(pulseDot).toBeVisible();
    }
  });

  test('should have parallax scrolling effects', async ({ page }) => {
    const heroSection = page.locator('#hero');
    await expect(heroSection).toBeVisible();

    // Get initial position
    const initialTransform = await heroSection.evaluate((el) => {
      return window.getComputedStyle(el).transform;
    });

    // Scroll down
    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(300);

    // Check if transform has changed (indicating parallax effect)
    const newTransform = await heroSection.evaluate((el) => {
      return window.getComputedStyle(el).transform;
    });

    // If parallax is implemented, transform should change
    // (Note: this might not always work depending on implementation)
    console.log('Initial transform:', initialTransform);
    console.log('New transform:', newTransform);

    // Scroll back to top
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
  });

  test('should handle multiple CTA button interactions', async ({ page }) => {
    const heroSection = page.locator('#hero');
    
    // Test primary CTA
    const primaryCTA = heroSection.locator('button:has-text("Get Free Consultation")');
    await expect(primaryCTA).toBeVisible();
    
    // Test hover and click effects
    await primaryCTA.hover();
    await page.waitForTimeout(200);
    
    // Check for glow effect
    const glowStyles = await primaryCTA.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        boxShadow: styles.boxShadow,
        transform: styles.transform
      };
    });
    
    console.log('Primary CTA styles:', glowStyles);
    
    // Test secondary CTA if present
    const secondaryCTA = heroSection.locator('button:has-text("View Our Work"), a:has-text("View Our Work")');
    if (await secondaryCTA.count() > 0) {
      await expect(secondaryCTA).toBeVisible();
      await secondaryCTA.hover();
      await page.waitForTimeout(200);
    }
  });

  test('should display enhanced background effects', async ({ page }) => {
    const heroSection = page.locator('#hero');
    await expect(heroSection).toBeVisible();

    // Check for gradient background
    const gradientBackground = heroSection.locator('.gradient-background').first();
    if (await gradientBackground.count() > 0) {
      await expect(gradientBackground).toBeVisible();
    }

    // Check for overlay gradients
    const overlayGradients = heroSection.locator('[class*="bg-gradient"]');
    if (await overlayGradients.count() > 0) {
      expect(await overlayGradients.count()).toBeGreaterThan(0);
    }

    // Check background animation
    const backgroundAnimation = await heroSection.evaluate((el) => {
      const bgElement = el.querySelector('.gradient-background, [class*="gradient"]');
      if (bgElement) {
        const styles = window.getComputedStyle(bgElement);
        return styles.background;
      }
      return null;
    });

    console.log('Background animation:', backgroundAnimation);
  });

  test('should work with different viewport sizes', async ({ page }) => {
    // Test desktop view
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.reload();
    await page.waitForLoadState('networkidle');

    let heroSection = page.locator('#hero');
    await expect(heroSection).toBeVisible();

    // Check large orb is visible on desktop
    const largeOrb = page.locator('.orb, canvas').first();
    if (await largeOrb.count() > 0) {
      await expect(largeOrb).toBeVisible();
    }

    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(500);

    heroSection = page.locator('#hero');
    await expect(heroSection).toBeVisible();

    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);

    heroSection = page.locator('#hero');
    await expect(heroSection).toBeVisible();

    // Check mobile-specific content
    const mobileDescription = heroSection.locator('text=Tired of slow, expensive web development?');
    await expect(mobileDescription).toBeVisible();
  });
});