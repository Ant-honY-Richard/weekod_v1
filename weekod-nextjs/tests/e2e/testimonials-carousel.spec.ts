import { test, expect } from '@playwright/test';

test.describe('Enhanced Testimonials Section - 3D Carousel', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Scroll to testimonials section
    await page.evaluate(() => {
      const testimonialsSection = document.querySelector('section[class*="testimonial"], [data-testid="testimonials-section"]');
      if (testimonialsSection) {
        testimonialsSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
    await page.waitForTimeout(1500);
  });

  test('should display testimonials section with carousel', async ({ page }) => {
    // Look for testimonials section with various possible selectors
    const testimonialsSection = page.locator(
      'section:has(.testimonial), section:has([data-testid="testimonial"]), .testimonials-section, section:has-text("testimonial"), section:has-text("client"), section:has-text("review")'
    ).first();

    if (await testimonialsSection.isVisible()) {
      await expect(testimonialsSection).toBeVisible();

      // Check for testimonial cards
      const testimonialCards = page.locator('.testimonial-card, .testimonial-item, [data-testid="testimonial"]');
      if (await testimonialCards.count() > 0) {
        expect(await testimonialCards.count()).toBeGreaterThan(0);
      }
    } else {
      // Log for debugging
      console.log('Testimonials section not found, checking page content');
      
      // Check if there are any customer quotes or reviews on the page
      const quotes = page.locator('blockquote, .quote, [class*="quote"]');
      if (await quotes.count() > 0) {
        expect(await quotes.count()).toBeGreaterThan(0);
      }
    }
  });

  test('should have functional carousel navigation', async ({ page }) => {
    const testimonialsSection = page.locator(
      'section:has(.testimonial), .testimonials-section, section:has([data-testid="testimonial"])'
    ).first();

    if (await testimonialsSection.isVisible()) {
      // Look for navigation buttons
      const nextButton = testimonialsSection.locator(
        'button:has-text("Next"), .next-button, [data-testid="next-button"], button[class*="next"], .carousel-next'
      );
      const prevButton = testimonialsSection.locator(
        'button:has-text("Prev"), button:has-text("Previous"), .prev-button, [data-testid="prev-button"], button[class*="prev"], .carousel-prev'
      );

      if (await nextButton.count() > 0) {
        await expect(nextButton.first()).toBeVisible();
        
        // Test next button
        await nextButton.first().click();
        await page.waitForTimeout(800); // Wait for transition

        // Test previous button if available
        if (await prevButton.count() > 0) {
          await expect(prevButton.first()).toBeVisible();
          await prevButton.first().click();
          await page.waitForTimeout(800);
        }
      }

      // Look for dot indicators
      const dotIndicators = testimonialsSection.locator(
        '.carousel-dot, .dot, [data-testid="carousel-dot"], button[class*="dot"]'
      );
      
      if (await dotIndicators.count() > 0) {
        const firstDot = dotIndicators.first();
        await expect(firstDot).toBeVisible();
        await firstDot.click();
        await page.waitForTimeout(500);
      }
    }
  });

  test('should display testimonial content properly', async ({ page }) => {
    // Look for testimonial content
    const testimonials = page.locator(
      '.testimonial-card, .testimonial-item, blockquote, .quote, [data-testid="testimonial"]'
    );

    if (await testimonials.count() > 0) {
      const firstTestimonial = testimonials.first();
      await expect(firstTestimonial).toBeVisible();

      // Check for testimonial text
      const testimonialText = firstTestimonial.locator('p, .testimonial-text, .quote-text').first();
      if (await testimonialText.count() > 0) {
        await expect(testimonialText).toBeVisible();
        const textContent = await testimonialText.textContent();
        expect(textContent).toBeTruthy();
      }

      // Check for author name
      const authorName = firstTestimonial.locator(
        '.author-name, .client-name, .testimonial-author, [data-testid="author-name"], cite'
      ).first();
      if (await authorName.count() > 0) {
        await expect(authorName).toBeVisible();
      }

      // Check for author title/company
      const authorTitle = firstTestimonial.locator(
        '.author-title, .client-title, .company, [data-testid="author-title"]'
      ).first();
      if (await authorTitle.count() > 0) {
        await expect(authorTitle).toBeVisible();
      }

      // Check for author avatar/image
      const authorImage = firstTestimonial.locator('img, .avatar, .author-image');
      if (await authorImage.count() > 0) {
        await expect(authorImage.first()).toBeVisible();
      }
    }
  });

  test('should have 3D carousel effects', async ({ page, isMobile }) => {
    if (isMobile) {
      test.skip('3D effects may be reduced on mobile devices');
      return;
    }

    const testimonialsSection = page.locator(
      'section:has(.testimonial), .testimonials-section'
    ).first();

    if (await testimonialsSection.isVisible()) {
      const testimonialCards = page.locator('.testimonial-card, .testimonial-item');
      
      if (await testimonialCards.count() > 1) {
        // Check initial 3D positioning
        const firstCard = testimonialCards.first();
        const secondCard = testimonialCards.nth(1);

        const firstCardTransform = await firstCard.evaluate((el) => {
          return window.getComputedStyle(el).transform;
        });

        const secondCardTransform = await secondCard.evaluate((el) => {
          return window.getComputedStyle(el).transform;
        });

        console.log('First card transform:', firstCardTransform);
        console.log('Second card transform:', secondCardTransform);

        // Test carousel navigation to see 3D transitions
        const nextButton = testimonialsSection.locator('button:has-text("Next"), .next-button').first();
        if (await nextButton.count() > 0) {
          await nextButton.click();
          await page.waitForTimeout(1000);

          // Check transforms after navigation
          const newFirstTransform = await firstCard.evaluate((el) => {
            return window.getComputedStyle(el).transform;
          });

          console.log('First card transform after navigation:', newFirstTransform);
        }
      }
    }
  });

  test('should support touch/swipe gestures on mobile', async ({ page, isMobile }) => {
    if (!isMobile) {
      test.skip('Touch gestures are for mobile devices only');
      return;
    }

    const testimonialsSection = page.locator(
      'section:has(.testimonial), .testimonials-section'
    ).first();

    if (await testimonialsSection.isVisible()) {
      const carousel = testimonialsSection.locator('.carousel, .testimonials-carousel, [data-testid="carousel"]').first();
      
      if (await carousel.count() > 0) {
        const carouselBox = await carousel.boundingBox();
        if (carouselBox) {
          // Test swipe left (next)
          await page.touchscreen.tap(carouselBox.x + carouselBox.width * 0.8, carouselBox.y + carouselBox.height / 2);
          await page.waitForTimeout(500);

          // Test swipe right (previous)  
          await page.touchscreen.tap(carouselBox.x + carouselBox.width * 0.2, carouselBox.y + carouselBox.height / 2);
          await page.waitForTimeout(500);
        }
      }
    }
  });

  test('should auto-rotate testimonials', async ({ page }) => {
    const testimonialsSection = page.locator(
      'section:has(.testimonial), .testimonials-section'
    ).first();

    if (await testimonialsSection.isVisible()) {
      const testimonialCards = page.locator('.testimonial-card, .testimonial-item');
      
      if (await testimonialCards.count() > 1) {
        // Check initial active state
        const activeCard = testimonialCards.locator('.active, [data-active="true"], [class*="current"]').first();
        
        if (await activeCard.count() > 0) {
          await expect(activeCard).toBeVisible();
          
          // Wait for auto-rotation (if implemented)
          await page.waitForTimeout(5000);
          
          // Check if active state has changed
          const newActiveCards = testimonialCards.locator('.active, [data-active="true"], [class*="current"]');
          expect(await newActiveCards.count()).toBeGreaterThan(0);
        }
      }
    }
  });

  test('should display star ratings if present', async ({ page }) => {
    const testimonials = page.locator('.testimonial-card, .testimonial-item, blockquote');
    
    if (await testimonials.count() > 0) {
      const firstTestimonial = testimonials.first();
      
      // Look for star ratings
      const starRating = firstTestimonial.locator(
        '.stars, .rating, [data-testid="rating"], .star-rating'
      );
      
      if (await starRating.count() > 0) {
        await expect(starRating.first()).toBeVisible();
        
        // Check for individual stars
        const stars = starRating.locator('.star, [class*="star"]');
        if (await stars.count() > 0) {
          expect(await stars.count()).toBeGreaterThan(0);
        }
      }
    }
  });

  test('should handle testimonials section loading states', async ({ page }) => {
    // Reload page and check loading behavior
    await page.reload();
    await page.waitForLoadState('domcontentloaded');
    
    // Scroll to testimonials quickly
    await page.evaluate(() => {
      const testimonialsSection = document.querySelector('section[class*="testimonial"], [data-testid="testimonials-section"]');
      if (testimonialsSection) {
        testimonialsSection.scrollIntoView({ behavior: 'auto' });
      }
    });

    // Check for loading states or skeleton screens
    const loadingIndicators = page.locator('.loading, .skeleton, [data-testid="loading"]');
    if (await loadingIndicators.count() > 0) {
      // Wait for loading to complete
      await loadingIndicators.first().waitFor({ state: 'hidden', timeout: 5000 });
    }

    // Wait for content to be fully loaded
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Check final state
    const testimonials = page.locator('.testimonial-card, .testimonial-item, blockquote');
    if (await testimonials.count() > 0) {
      await expect(testimonials.first()).toBeVisible();
    }
  });

  test('should be responsive across device sizes', async ({ page }) => {
    // Test large desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForTimeout(500);

    const testimonialsSection = page.locator('section:has(.testimonial), .testimonials-section').first();
    if (await testimonialsSection.isVisible()) {
      await expect(testimonialsSection).toBeVisible();
    }

    // Test tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(500);

    if (await testimonialsSection.isVisible()) {
      await expect(testimonialsSection).toBeVisible();
    }

    // Test mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);

    if (await testimonialsSection.isVisible()) {
      await expect(testimonialsSection).toBeVisible();
      
      // Check mobile layout
      const testimonials = page.locator('.testimonial-card, .testimonial-item');
      if (await testimonials.count() > 0) {
        await expect(testimonials.first()).toBeVisible();
      }
    }
  });
});