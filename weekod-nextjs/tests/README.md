# E2E Testing Setup for Weekod Next.js Website

This directory contains comprehensive End-to-End (E2E) tests for the enhanced HomePage components using **Playwright** as the testing framework.

## Test Structure

### Core Test Files
- `homepage.spec.ts` - Main homepage functionality tests
- `hero-section-enhanced.spec.ts` - Enhanced Hero Section with 3D elements and animations  
- `services-section-enhanced.spec.ts` - Interactive Services Section with 3D card effects
- `testimonials-carousel.spec.ts` - Enhanced Testimonials Section with 3D carousel
- `faq-section.spec.ts` - Interactive FAQ Section with animations

## Features Tested

### Enhanced Hero Section
- ✅ 3D orb elements and particle effects
- ✅ Typing animation effects
- ✅ Magnetic cursor effects on CTA buttons (desktop only)
- ✅ Text reveal animations with staggered entrance
- ✅ Pulsing badge animations
- ✅ Parallax scrolling effects
- ✅ Enhanced background effects and gradients
- ✅ Responsive design across devices
- ✅ Reduced motion accessibility

### Enhanced Services Section
- ✅ Interactive service cards with 3D tilt effects
- ✅ Service icons and content display
- ✅ Hover state animations
- ✅ Scroll-triggered animations
- ✅ Responsive grid layouts
- ✅ Service features and benefits display

### Enhanced Testimonials Section
- ✅ 3D carousel functionality
- ✅ Navigation controls (next/prev buttons, dots)
- ✅ Testimonial content validation
- ✅ Touch/swipe gestures on mobile
- ✅ Auto-rotation (if implemented)
- ✅ Star ratings display
- ✅ Loading states handling

### FAQ Section
- ✅ Expandable/collapsible FAQ items
- ✅ Accordion-style interactions
- ✅ Smooth animations
- ✅ Keyboard accessibility
- ✅ SEO structured data (Schema.org)
- ✅ Responsive design

### General Features
- ✅ Performance optimizations (service worker, preloading)
- ✅ SEO meta tags and structured data
- ✅ Accessibility features (ARIA labels, keyboard navigation)
- ✅ Responsive design across devices
- ✅ Reduced motion preferences support

## Running Tests

### Prerequisites
```bash
npm install
npx playwright install
```

### Test Commands
```bash
# Run all tests
npm test

# Run with UI mode (interactive)
npm run test:ui

# Run in headed mode (visible browser)
npm run test:headed

# Run in debug mode
npm run test:debug

# Run specific test file
npx playwright test tests/e2e/homepage.spec.ts

# Run on specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Test Configuration
- **Base URL**: http://localhost:3001
- **Browsers**: Chromium, Firefox, Safari, Mobile Chrome, Mobile Safari
- **Reporters**: HTML reporter with traces and screenshots
- **Retry**: 2 retries on CI, 0 locally
- **Timeout**: 30 seconds per test

## Test Strategy

### Scenario Verification
Each test follows this pattern:
1. **Setup** - Navigate to homepage and wait for initial load
2. **Element Detection** - Use multiple selectors to find components
3. **Interaction Testing** - Test user interactions (clicks, hovers, scrolls)
4. **Visual Verification** - Verify expected elements are visible
5. **Functionality Testing** - Test specific feature behaviors
6. **Responsive Testing** - Test across different viewport sizes

### Robust Selectors
Tests use multiple fallback selectors to handle different implementations:
```typescript
const serviceCards = page.locator(
  '.service-card, [data-testid="service-card"], .group:has(.service-icon)'
);
```

### Animation Handling
- Proper wait times for animations to complete
- Reduced motion testing for accessibility
- Animation state verification

### Mobile-Specific Testing
- Touch gesture testing
- Responsive layout verification
- Mobile-specific feature testing

## Development Notes

### Adding New Tests
1. Create test file in `tests/e2e/` directory
2. Follow naming convention: `feature-name.spec.ts`
3. Use descriptive test names and proper grouping
4. Include both positive and negative test cases
5. Test across different devices/browsers

### Best Practices
- Use data-testid attributes for stable selectors when possible
- Include proper wait conditions for dynamic content
- Test both desktop and mobile experiences
- Verify accessibility features
- Include performance and SEO checks
- Handle reduced motion preferences

### Debugging
- Use `--debug` flag for step-by-step execution
- Check screenshots and videos on test failure
- Use `page.pause()` for debugging specific points
- Review trace files for detailed execution logs

## CI/CD Integration

Tests are configured to run in CI environments with:
- Retry on failure (2 retries)
- Parallel execution disabled for consistency
- HTML reports generated
- Screenshots and videos on failure
- Trace collection on retry

## Performance Considerations

Tests include performance-related checks:
- Service worker registration
- Image loading attributes
- Preload hints
- Core Web Vitals impact
- Animation performance

## Accessibility Testing

Each test suite includes accessibility checks:
- Keyboard navigation
- ARIA labels and roles
- Color contrast (basic checks)
- Screen reader compatibility
- Focus management

## Future Enhancements

Potential additions to the test suite:
- Visual regression testing
- Performance benchmarking
- API integration testing
- Cross-browser compatibility matrix
- Automated accessibility audits with axe-core
- Lighthouse performance testing