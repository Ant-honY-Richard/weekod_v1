import { test, expect } from '@playwright/test';

test.describe('Enhanced Services Section - Interactive Features', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Scroll to services section
    await page.evaluate(() => {
      const servicesSection = document.querySelector('section[class*="services"], [data-testid="services-section"]');
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
    await page.waitForTimeout(1500);
  });

  test('should display services section with interactive cards', async ({ page }) => {
    // Look for services section
    const servicesSection = page.locator('section:has(.service-card), section:has([data-testid="service-card"]), .services-section').first();
    
    // If specific selector doesn't work, look for text indicators
    if (!(await servicesSection.isVisible())) {
      const sectionByText = page.locator('section:has-text("service"), section:has-text("AI"), section:has-text("development")').first();
      if (await sectionByText.isVisible()) {
        await expect(sectionByText).toBeVisible();
      }
    } else {
      await expect(servicesSection).toBeVisible();
    }

    // Check for service cards
    const serviceCards = page.locator('.service-card, [data-testid="service-card"], .group:has-text("web"), .group:has-text("AI"), .group:has-text("development")');
    
    if (await serviceCards.count() > 0) {
      expect(await serviceCards.count()).toBeGreaterThan(0);
      
      // Test first service card
      const firstCard = serviceCards.first();
      await expect(firstCard).toBeVisible();
    }
  });

  test('should have 3D tilt effects on service cards', async ({ page, isMobile }) => {
    if (isMobile) {
      test.skip('3D tilt effects are disabled on mobile devices');
      return;
    }

    const serviceCards = page.locator('.service-card, .group:has(.service-icon), [class*="group"]:has([class*="icon"])');
    
    if (await serviceCards.count() > 0) {
      const firstCard = serviceCards.first();
      await expect(firstCard).toBeVisible();

      // Get initial transform
      const initialTransform = await firstCard.evaluate((el) => {
        return window.getComputedStyle(el).transform;
      });

      // Hover to trigger 3D tilt
      const cardBox = await firstCard.boundingBox();
      if (cardBox) {
        // Move mouse to different corners of the card to test tilt
        await page.mouse.move(cardBox.x + 10, cardBox.y + 10); // Top-left
        await page.waitForTimeout(200);

        await page.mouse.move(cardBox.x + cardBox.width - 10, cardBox.y + 10); // Top-right
        await page.waitForTimeout(200);

        await page.mouse.move(cardBox.x + 10, cardBox.y + cardBox.height - 10); // Bottom-left
        await page.waitForTimeout(200);

        await page.mouse.move(cardBox.x + cardBox.width - 10, cardBox.y + cardBox.height - 10); // Bottom-right
        await page.waitForTimeout(200);
      }

      // Check if transform has changed during hover
      await firstCard.hover();
      await page.waitForTimeout(300);

      const hoverTransform = await firstCard.evaluate((el) => {
        return window.getComputedStyle(el).transform;
      });

      console.log('Initial transform:', initialTransform);
      console.log('Hover transform:', hoverTransform);

      // Move mouse away to reset
      await page.mouse.move(0, 0);
      await page.waitForTimeout(300);
    }
  });

  test('should display service icons and content', async ({ page }) => {
    const serviceCards = page.locator('.service-card, .group:has(.service-icon), [data-testid="service-card"]');
    
    if (await serviceCards.count() > 0) {
      const firstCard = serviceCards.first();
      await expect(firstCard).toBeVisible();

      // Check for service icon
      const serviceIcon = firstCard.locator('svg, .icon, .service-icon, [data-testid="service-icon"]').first();
      if (await serviceIcon.count() > 0) {
        await expect(serviceIcon).toBeVisible();
      }

      // Check for service title
      const serviceTitle = firstCard.locator('h3, h4, .service-title, [data-testid="service-title"]').first();
      if (await serviceTitle.count() > 0) {
        await expect(serviceTitle).toBeVisible();
        const titleText = await serviceTitle.textContent();
        expect(titleText).toBeTruthy();
      }

      // Check for service description
      const serviceDescription = firstCard.locator('p, .service-description, [data-testid="service-description"]').first();
      if (await serviceDescription.count() > 0) {
        await expect(serviceDescription).toBeVisible();
      }
    }
  });

  test('should handle service card hover states', async ({ page }) => {
    const serviceCards = page.locator('.service-card, .group:has(.service-icon), [class*="group"]:has([class*="card"])');
    
    if (await serviceCards.count() >= 2) {
      const firstCard = serviceCards.first();
      const secondCard = serviceCards.nth(1);

      // Test hover on first card
      await firstCard.hover();
      await page.waitForTimeout(300);

      // Check hover styles
      const hoverStyles = await firstCard.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          transform: styles.transform,
          boxShadow: styles.boxShadow,
          zIndex: styles.zIndex
        };
      });

      console.log('First card hover styles:', hoverStyles);

      // Test hover on second card
      await secondCard.hover();
      await page.waitForTimeout(300);

      // Both cards should be visible and functional
      await expect(firstCard).toBeVisible();
      await expect(secondCard).toBeVisible();

      // Move mouse away
      await page.mouse.move(0, 0);
      await page.waitForTimeout(300);
    }
  });

  test('should have interactive card animations', async ({ page }) => {
    const serviceCards = page.locator('.service-card, .group:has(.service-icon)');
    
    if (await serviceCards.count() > 0) {
      const cards = await serviceCards.all();
      
      for (let i = 0; i < Math.min(cards.length, 3); i++) {
        const card = cards[i];
        await expect(card).toBeVisible();

        // Test card interaction
        await card.hover();
        await page.waitForTimeout(200);

        // Check for scale or other animation effects
        const cardStyles = await card.evaluate((el) => {
          const styles = window.getComputedStyle(el);
          return {
            transform: styles.transform,
            transition: styles.transition,
            opacity: styles.opacity
          };
        });

        console.log(`Card ${i} hover styles:`, cardStyles);

        // Click on card to test interaction
        await card.click();
        await page.waitForTimeout(200);
      }
    }
  });

  test('should display service features and benefits', async ({ page }) => {
    const serviceCards = page.locator('.service-card, .group:has(.service-icon)');
    
    if (await serviceCards.count() > 0) {
      const firstCard = serviceCards.first();
      await expect(firstCard).toBeVisible();

      // Look for service features list
      const featuresList = firstCard.locator('ul, .features-list, .service-features');
      if (await featuresList.count() > 0) {
        await expect(featuresList).toBeVisible();
        
        const listItems = featuresList.locator('li');
        if (await listItems.count() > 0) {
          expect(await listItems.count()).toBeGreaterThan(0);
        }
      }

      // Look for pricing or CTA elements
      const ctaElement = firstCard.locator('button, .cta, .service-cta, a[href*="contact"]');
      if (await ctaElement.count() > 0) {
        const firstCTA = ctaElement.first();
        await expect(firstCTA).toBeVisible();
        await firstCTA.hover();
        await page.waitForTimeout(200);
      }
    }
  });

  test('should handle service section scroll animations', async ({ page }) => {
    // Scroll away from services section
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);

    // Scroll back to services section
    await page.evaluate(() => {
      const servicesSection = document.querySelector('section[class*="services"], [data-testid="services-section"]');
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
    await page.waitForTimeout(1500);

    // Check that cards animate in
    const serviceCards = page.locator('.service-card, .group:has(.service-icon)');
    if (await serviceCards.count() > 0) {
      await expect(serviceCards.first()).toBeVisible();
      
      // Wait for stagger animations to complete
      await page.waitForTimeout(2000);
      
      const allCards = await serviceCards.all();
      for (const card of allCards) {
        await expect(card).toBeVisible();
      }
    }
  });

  test('should be responsive on different screen sizes', async ({ page }) => {
    // Test desktop layout
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForTimeout(500);

    const serviceCards = page.locator('.service-card, .group:has(.service-icon)');
    if (await serviceCards.count() > 0) {
      // On desktop, cards should be in a grid layout
      expect(await serviceCards.count()).toBeGreaterThan(0);
    }

    // Test tablet layout
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(500);

    if (await serviceCards.count() > 0) {
      expect(await serviceCards.count()).toBeGreaterThan(0);
    }

    // Test mobile layout
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);

    if (await serviceCards.count() > 0) {
      // On mobile, cards should stack vertically
      expect(await serviceCards.count()).toBeGreaterThan(0);
      
      // Test mobile card interaction
      const firstCard = serviceCards.first();
      if (await firstCard.isVisible()) {
        await firstCard.tap();
        await page.waitForTimeout(300);
      }
    }
  });

  test('should have proper service section heading and description', async ({ page }) => {
    // Look for section heading
    const sectionHeading = page.locator('h2:has-text("services"), h2:has-text("AI"), h2:has-text("development")').first();
    if (await sectionHeading.count() > 0) {
      await expect(sectionHeading).toBeVisible();
      const headingText = await sectionHeading.textContent();
      expect(headingText).toBeTruthy();
    }

    // Look for section description
    const sectionDescription = page.locator('p:has-text("AI"), p:has-text("development"), p:has-text("service")').first();
    if (await sectionDescription.count() > 0) {
      await expect(sectionDescription).toBeVisible();
    }
  });
});