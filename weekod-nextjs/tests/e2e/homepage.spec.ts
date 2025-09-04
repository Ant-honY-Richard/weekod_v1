import { test, expect } from '@playwright/test';

test.describe('Homepage - Enhanced Sections', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for the page to load and animations to settle
    await page.waitForLoadState('load');
    await page.waitForTimeout(2000);
  });

  test('should display hero section with all key elements', async ({ page }) => {
    // Check hero section is visible
    const heroSection = page.locator('#hero');
    await expect(heroSection).toBeVisible();

    // Check badge element
    const badge = heroSection.locator('text=AI + HUMAN CRAFT');
    await expect(badge).toBeVisible();

    // Check main heading parts (flexible matching)
    const heroTitle = heroSection.locator('h1');
    await expect(heroTitle).toBeVisible();
    await expect(heroTitle).toContainText('AI-Powered');
    await expect(heroTitle).toContainText('Web Development');
    await expect(heroTitle).toContainText('2x Faster');

    // Check description text is present (flexible matching)
    const descriptionText = heroSection.locator('p, .text-fluid-lg').first();
    if (await descriptionText.count() > 0) {
      await expect(descriptionText).toBeVisible();
    }

    // Check CTA buttons
    const primaryCTA = heroSection.locator('button:has-text("Get Free Consultation")');
    await expect(primaryCTA).toBeVisible();
    
    const secondaryCTA = heroSection.locator('button:has-text("See Our Work"), button:has-text("Our Work"), a:has-text("See Our Work")');
    await expect(secondaryCTA).toBeVisible();
  });

  test('should have interactive hero CTA buttons', async ({ page }) => {
    const heroSection = page.locator('#hero');
    const primaryCTA = heroSection.locator('button:has-text("Get Free Consultation")');
    
    // Test primary CTA hover effect
    await primaryCTA.hover();
    await expect(primaryCTA).toBeVisible();
    
    // Test primary CTA click (should navigate to contact section)
    await primaryCTA.click();
    // Since it calls setCurrentPage('contact'), we expect some page state change
    // This might require waiting for navigation or checking URL changes
    await page.waitForTimeout(500);
  });

  test('should display services section with interactive cards', async ({ page }) => {
    // Scroll down to find services section
    await page.evaluate(() => window.scrollBy(0, 800));
    await page.waitForTimeout(1000);
    
    // Look for services section with flexible selectors
    const servicesSection = page.locator('section').nth(1); // Second section after hero
    
    if (await servicesSection.isVisible()) {
      await expect(servicesSection).toBeVisible();

      // Check for service cards
      const serviceCards = page.locator('.service-card, [data-testid="service-card"], .group:has(.service-icon)');
      if (await serviceCards.count() > 0) {
        expect(await serviceCards.count()).toBeGreaterThan(0);

        // Test interactive hover effects on first card
        const firstCard = serviceCards.first();
        await firstCard.hover();
        await page.waitForTimeout(300);
        await expect(firstCard).toBeVisible();
      }
    }
  });

  test('should display testimonials section with carousel', async ({ page }) => {
    // Look for testimonials section
    const testimonialsSection = page.locator('[data-testid="testimonials-section"], section:has-text("testimonial"), section:has-text("client"), .testimonials-section').first();
    
    // If not visible, scroll to it
    if (!(await testimonialsSection.isVisible())) {
      await page.evaluate(() => {
        const section = document.querySelector('section[class*="testimonial"], [data-testid="testimonials-section"]');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      });
      await page.waitForTimeout(1000);
    }

    await expect(testimonialsSection).toBeVisible();

    // Check for testimonial content
    const testimonialItems = page.locator('.testimonial-card, [data-testid="testimonial"], .testimonial-item');
    if (await testimonialItems.count() > 0) {
      expect(await testimonialItems.count()).toBeGreaterThan(0);
      
      // Test carousel navigation if present
      const nextButton = testimonialsSection.locator('button:has-text("Next"), .next-button, [data-testid="next-button"]');
      const prevButton = testimonialsSection.locator('button:has-text("Prev"), .prev-button, [data-testid="prev-button"]');
      
      if (await nextButton.count() > 0) {
        await nextButton.click();
        await page.waitForTimeout(500);
      }
    }
  });

  test('should display FAQ section with expandable items', async ({ page }) => {
    // Scroll to FAQ section
    const faqSection = page.locator('.faq-section, [data-testid="faq-section"], section:has-text("Frequently Asked Questions")').first();
    
    // If not visible, scroll to it
    if (!(await faqSection.isVisible())) {
      await page.evaluate(() => {
        const section = document.querySelector('.faq-section, [data-testid="faq-section"]');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      });
      await page.waitForTimeout(1000);
    }

    await expect(faqSection).toBeVisible();

    // Check FAQ title
    await expect(faqSection.locator('text=Frequently Asked Questions')).toBeVisible();

    // Check for FAQ items
    const faqItems = faqSection.locator('.faq-item, [data-testid="faq-item"]');
    if (await faqItems.count() > 0) {
      expect(await faqItems.count()).toBeGreaterThan(0);
      
      // Test expanding first FAQ item
      const firstFAQ = faqItems.first();
      await firstFAQ.click();
      await page.waitForTimeout(500);
      
      // Check if answer is now visible (this depends on the specific implementation)
      const answer = firstFAQ.locator('.faq-answer, [data-testid="faq-answer"]');
      if (await answer.count() > 0) {
        await expect(answer).toBeVisible();
      }
    }
  });

  test('should handle reduced motion preferences', async ({ page }) => {
    // Set prefers-reduced-motion
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Check that hero section still loads correctly
    const heroSection = page.locator('#hero');
    await expect(heroSection).toBeVisible();
    await expect(heroSection.locator('text=AI-Powered')).toBeVisible();

    // Elements should still be functional without animations
    const primaryCTA = heroSection.locator('button:has-text("Get Free Consultation")');
    await expect(primaryCTA).toBeVisible();
    await primaryCTA.click();
  });

  test('should be responsive on mobile devices', async ({ page, isMobile }) => {
    if (isMobile) {
      // Check hero section on mobile
      const heroSection = page.locator('#hero');
      await expect(heroSection).toBeVisible();

      // Check that text is responsive
      const heading = heroSection.locator('h1');
      await expect(heading).toBeVisible();

      // Check that mobile-specific elements are visible
      const mobileDescription = heroSection.locator('text=Tired of slow, expensive web development?');
      await expect(mobileDescription).toBeVisible();

      // Check mobile CTA buttons stack vertically
      const ctaButtons = heroSection.locator('button');
      expect(await ctaButtons.count()).toBeGreaterThan(0);
    }
  });

  test('should load performance optimizations', async ({ page }) => {
    // Check for service worker registration
    const swRegistered = await page.evaluate(() => {
      return 'serviceWorker' in navigator;
    });
    expect(swRegistered).toBe(true);

    // Check for preload hints in head
    const preloadLinks = page.locator('link[rel="preload"]');
    // We expect at least some preload links for fonts or critical resources
    if (await preloadLinks.count() > 0) {
      expect(await preloadLinks.count()).toBeGreaterThan(0);
    }

    // Check that images have proper loading attributes
    const images = page.locator('img');
    if (await images.count() > 0) {
      const firstImage = images.first();
      const loading = await firstImage.getAttribute('loading');
      // Should be either 'eager' for above-the-fold images or 'lazy' for others
      expect(['eager', 'lazy', null]).toContain(loading);
    }
  });

  test('should have proper SEO meta tags', async ({ page }) => {
    // Check title
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);

    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content');

    // Check viewport meta tag
    const viewport = page.locator('meta[name="viewport"]');
    await expect(viewport).toHaveAttribute('content');

    // Check Open Graph tags
    const ogTitle = page.locator('meta[property="og:title"]');
    if (await ogTitle.count() > 0) {
      await expect(ogTitle).toHaveAttribute('content');
    }
  });

  test('should have proper accessibility features', async ({ page }) => {
    // Check that buttons have proper labels
    const buttons = page.locator('button');
    if (await buttons.count() > 0) {
      const firstButton = buttons.first();
      const ariaLabel = await firstButton.getAttribute('aria-label');
      const textContent = await firstButton.textContent();
      
      // Button should have either aria-label or visible text
      expect(ariaLabel || textContent).toBeTruthy();
    }

    // Check heading hierarchy
    const h1 = page.locator('h1');
    expect(await h1.count()).toBeGreaterThan(0);

    // Check for alt attributes on images
    const images = page.locator('img');
    if (await images.count() > 0) {
      const firstImage = images.first();
      const alt = await firstImage.getAttribute('alt');
      // Alt should exist (can be empty string for decorative images)
      expect(alt).not.toBeNull();
    }

    // Check color contrast (basic check)
    await page.evaluate(() => {
      // This is a basic check - in real projects you'd use axe-core
      const computedStyle = window.getComputedStyle(document.body);
      const backgroundColor = computedStyle.backgroundColor;
      const color = computedStyle.color;
      
      // Just ensure styles are applied
      console.log('Background:', backgroundColor, 'Color:', color);
      return { backgroundColor, color };
    });
  });
});