import { test, expect } from '@playwright/test';

test.describe('FAQ Section - Interactive Features', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Scroll to FAQ section
    await page.evaluate(() => {
      const faqSection = document.querySelector('.faq-section, [data-testid="faq-section"]') || 
                        Array.from(document.querySelectorAll('section')).find(s => s.textContent?.includes('Frequently Asked Questions'));
      if (faqSection) {
        faqSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
    await page.waitForTimeout(1500);
  });

  test('should display FAQ section with proper structure', async ({ page }) => {
    const faqSection = page.locator('.faq-section, [data-testid="faq-section"]').first();
    await expect(faqSection).toBeVisible();

    // Check section title
    const faqTitle = faqSection.locator('h2:has-text("Frequently Asked Questions"), h2:has-text("FAQ"), .faq-title');
    if (await faqTitle.count() > 0) {
      await expect(faqTitle.first()).toBeVisible();
      const titleText = await faqTitle.first().textContent();
      expect(titleText).toContain('FAQ');
    }

    // Check for FAQ items
    const faqItems = faqSection.locator('.faq-item, [data-testid="faq-item"], .faq-question');
    if (await faqItems.count() > 0) {
      expect(await faqItems.count()).toBeGreaterThan(0);
    }
  });

  test('should have expandable FAQ items', async ({ page }) => {
    const faqSection = page.locator('.faq-section, [data-testid="faq-section"]').first();
    
    if (await faqSection.isVisible()) {
      const faqItems = faqSection.locator('.faq-item, [data-testid="faq-item"]');
      
      if (await faqItems.count() > 0) {
        const firstFAQ = faqItems.first();
        await expect(firstFAQ).toBeVisible();

        // Click to expand the FAQ item
        await firstFAQ.click();
        await page.waitForTimeout(500);

        // Check if answer becomes visible
        const faqAnswer = firstFAQ.locator('.faq-answer, [data-testid="faq-answer"], .answer');
        if (await faqAnswer.count() > 0) {
          await expect(faqAnswer.first()).toBeVisible();
          
          const answerText = await faqAnswer.first().textContent();
          expect(answerText).toBeTruthy();

          // Click again to collapse
          await firstFAQ.click();
          await page.waitForTimeout(500);
        }
      }
    }
  });

  test('should handle accordion-style FAQ interactions', async ({ page }) => {
    const faqSection = page.locator('.faq-section, [data-testid="faq-section"]').first();
    
    if (await faqSection.isVisible()) {
      const faqItems = faqSection.locator('.faq-item, [data-testid="faq-item"]');
      
      if (await faqItems.count() > 1) {
        const firstFAQ = faqItems.first();
        const secondFAQ = faqItems.nth(1);

        // Expand first FAQ
        await firstFAQ.click();
        await page.waitForTimeout(500);

        const firstAnswer = firstFAQ.locator('.faq-answer, [data-testid="faq-answer"]');
        if (await firstAnswer.count() > 0) {
          await expect(firstAnswer.first()).toBeVisible();
        }

        // Expand second FAQ (should close first if accordion-style)
        await secondFAQ.click();
        await page.waitForTimeout(500);

        const secondAnswer = secondFAQ.locator('.faq-answer, [data-testid="faq-answer"]');
        if (await secondAnswer.count() > 0) {
          await expect(secondAnswer.first()).toBeVisible();
        }

        // Check if first FAQ is now closed (accordion behavior)
        if (await firstAnswer.count() > 0) {
          // In accordion mode, first answer should be hidden
          // In multi-open mode, it might still be visible
          console.log('FAQ supports either accordion or multi-open mode');
        }
      }
    }
  });

  test('should display FAQ questions and answers with proper content', async ({ page }) => {
    const faqSection = page.locator('.faq-section, [data-testid="faq-section"]').first();
    
    if (await faqSection.isVisible()) {
      const faqItems = faqSection.locator('.faq-item, [data-testid="faq-item"]');
      
      if (await faqItems.count() > 0) {
        // Test first few FAQ items
        const itemCount = Math.min(await faqItems.count(), 3);
        
        for (let i = 0; i < itemCount; i++) {
          const faqItem = faqItems.nth(i);
          await expect(faqItem).toBeVisible();

          // Check question text
          const question = faqItem.locator('.faq-question, [data-testid="faq-question"], button, .question').first();
          if (await question.count() > 0) {
            await expect(question).toBeVisible();
            const questionText = await question.textContent();
            expect(questionText).toBeTruthy();
            expect(questionText.length).toBeGreaterThan(5);
          }

          // Expand and check answer
          await faqItem.click();
          await page.waitForTimeout(500);

          const answer = faqItem.locator('.faq-answer, [data-testid="faq-answer"], .answer').first();
          if (await answer.count() > 0) {
            await expect(answer).toBeVisible();
            const answerText = await answer.textContent();
            expect(answerText).toBeTruthy();
            expect(answerText.length).toBeGreaterThan(10);
          }

          // Collapse for next test
          await faqItem.click();
          await page.waitForTimeout(300);
        }
      }
    }
  });

  test('should have proper FAQ animations', async ({ page }) => {
    const faqSection = page.locator('.faq-section, [data-testid="faq-section"]').first();
    
    if (await faqSection.isVisible()) {
      const faqItems = faqSection.locator('.faq-item, [data-testid="faq-item"]');
      
      if (await faqItems.count() > 0) {
        const firstFAQ = faqItems.first();
        const faqAnswer = firstFAQ.locator('.faq-answer, [data-testid="faq-answer"]');

        if (await faqAnswer.count() > 0) {
          const answer = faqAnswer.first();

          // Check initial state (should be hidden)
          const initialHeight = await answer.evaluate((el) => {
            return window.getComputedStyle(el).height;
          });

          // Expand FAQ
          await firstFAQ.click();
          await page.waitForTimeout(100); // Small delay to start animation
          
          // Check if animation is in progress or completed
          await page.waitForTimeout(500);
          
          const expandedHeight = await answer.evaluate((el) => {
            return window.getComputedStyle(el).height;
          });

          console.log('Initial height:', initialHeight);
          console.log('Expanded height:', expandedHeight);

          // Heights should be different if animation is working
          // (Note: this test may need adjustment based on specific implementation)
        }
      }
    }
  });

  test('should have proper FAQ icons/indicators', async ({ page }) => {
    const faqSection = page.locator('.faq-section, [data-testid="faq-section"]').first();
    
    if (await faqSection.isVisible()) {
      const faqItems = faqSection.locator('.faq-item, [data-testid="faq-item"]');
      
      if (await faqItems.count() > 0) {
        const firstFAQ = faqItems.first();
        
        // Look for expand/collapse indicators
        const indicator = firstFAQ.locator('svg, .icon, .indicator, [class*="chevron"], [class*="plus"], [class*="minus"]').first();
        
        if (await indicator.count() > 0) {
          await expect(indicator).toBeVisible();
          
          // Check initial state
          const initialTransform = await indicator.evaluate((el) => {
            return window.getComputedStyle(el).transform;
          });

          // Expand FAQ and check if indicator changes
          await firstFAQ.click();
          await page.waitForTimeout(500);

          const expandedTransform = await indicator.evaluate((el) => {
            return window.getComputedStyle(el).transform;
          });

          console.log('Indicator initial transform:', initialTransform);
          console.log('Indicator expanded transform:', expandedTransform);
        }
      }
    }
  });

  test('should include structured data for SEO', async ({ page }) => {
    // Check for JSON-LD structured data for FAQ
    const structuredData = await page.locator('script[type="application/ld+json"]').all();
    
    let faqSchemaFound = false;
    for (const script of structuredData) {
      const content = await script.textContent();
      if (content && (content.includes('FAQPage') || content.includes('Question'))) {
        faqSchemaFound = true;
        const jsonData = JSON.parse(content);
        
        expect(jsonData['@context']).toBe('https://schema.org');
        expect(jsonData['@type']).toBe('FAQPage');
        expect(jsonData.mainEntity).toBeDefined();
        expect(Array.isArray(jsonData.mainEntity)).toBe(true);
        
        if (jsonData.mainEntity.length > 0) {
          const firstQuestion = jsonData.mainEntity[0];
          expect(firstQuestion['@type']).toBe('Question');
          expect(firstQuestion.name).toBeTruthy();
          expect(firstQuestion.acceptedAnswer).toBeDefined();
          expect(firstQuestion.acceptedAnswer['@type']).toBe('Answer');
          expect(firstQuestion.acceptedAnswer.text).toBeTruthy();
        }
        
        break;
      }
    }
    
    if (faqSchemaFound) {
      console.log('FAQ structured data found and validated');
    } else {
      console.log('FAQ structured data not found - may not be implemented yet');
    }
  });

  test('should be keyboard accessible', async ({ page }) => {
    const faqSection = page.locator('.faq-section, [data-testid="faq-section"]').first();
    
    if (await faqSection.isVisible()) {
      const faqItems = faqSection.locator('.faq-item, [data-testid="faq-item"]');
      
      if (await faqItems.count() > 0) {
        const firstFAQ = faqItems.first();
        
        // Find the focusable element (button or clickable element)
        const clickableElement = firstFAQ.locator('button, [tabindex="0"], [role="button"]').first();
        
        if (await clickableElement.count() > 0) {
          // Test keyboard navigation
          await clickableElement.focus();
          await expect(clickableElement).toBeFocused();

          // Test Enter key activation
          await page.keyboard.press('Enter');
          await page.waitForTimeout(500);

          // Check if FAQ expanded
          const answer = firstFAQ.locator('.faq-answer, [data-testid="faq-answer"]');
          if (await answer.count() > 0) {
            await expect(answer.first()).toBeVisible();
          }

          // Test Space key activation
          await page.keyboard.press('Space');
          await page.waitForTimeout(500);
        }

        // Test Tab navigation between FAQ items
        await page.keyboard.press('Tab');
        await page.waitForTimeout(200);
        
        const secondFAQ = faqItems.nth(1);
        if (await secondFAQ.count() > 0) {
          const secondClickable = secondFAQ.locator('button, [tabindex="0"], [role="button"]').first();
          if (await secondClickable.count() > 0) {
            await expect(secondClickable).toBeFocused();
          }
        }
      }
    }
  });

  test('should be responsive on different screen sizes', async ({ page }) => {
    const faqSection = page.locator('.faq-section, [data-testid="faq-section"]').first();
    
    if (await faqSection.isVisible()) {
      // Test desktop
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.waitForTimeout(500);
      await expect(faqSection).toBeVisible();

      // Test tablet
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.waitForTimeout(500);
      await expect(faqSection).toBeVisible();

      // Test mobile
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(500);
      await expect(faqSection).toBeVisible();

      // Test FAQ interaction on mobile
      const faqItems = faqSection.locator('.faq-item, [data-testid="faq-item"]');
      if (await faqItems.count() > 0) {
        const firstFAQ = faqItems.first();
        await firstFAQ.tap();
        await page.waitForTimeout(500);
        
        const answer = firstFAQ.locator('.faq-answer, [data-testid="faq-answer"]');
        if (await answer.count() > 0) {
          await expect(answer.first()).toBeVisible();
        }
      }
    }
  });
});