// Analytics tracking utility
// This is a simple implementation - you can integrate with Google Analytics 4, Fathom, or other services

interface AnalyticsEvent {
  event: string;
  category?: string;
  label?: string;
  value?: number;
  [key: string]: any;
}

class Analytics {
  private isEnabled: boolean;

  constructor() {
    this.isEnabled = typeof window !== 'undefined' && process.env.NODE_ENV === 'production';
  }

  // Track custom events
  track(eventName: string, properties?: Record<string, any>) {
    if (!this.isEnabled) {
      console.log('Analytics (dev):', eventName, properties);
      return;
    }

    try {
      // Google Analytics 4 (gtag)
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', eventName, {
          custom_parameter: properties,
          ...properties
        });
      }

      // Fathom Analytics
      if (typeof window !== 'undefined' && (window as any).fathom) {
        (window as any).fathom.trackGoal(eventName, properties?.value || 0);
      }

      // Console log for debugging
      console.log('Analytics:', eventName, properties);
    } catch (error) {
      console.error('Analytics error:', error);
    }
  }

  // Contact form specific events
  trackFormStart() {
    this.track('form_start', {
      form_type: 'contact',
      timestamp: new Date().toISOString()
    });
  }

  trackFieldFocus(fieldName: string) {
    this.track('field_focus', {
      field_name: fieldName,
      form_type: 'contact'
    });
  }

  trackFormSubmitSuccess(formData: any) {
    this.track('submit_success', {
      form_type: 'contact',
      project_type: formData.project,
      budget_range: formData.budget,
      has_company: !!formData.company,
      timestamp: new Date().toISOString()
    });
  }

  trackFormSubmitError(error: string) {
    this.track('submit_error', {
      form_type: 'contact',
      error_message: error,
      timestamp: new Date().toISOString()
    });
  }

  trackWhatsAppClick() {
    this.track('whatsapp_click', {
      source: 'contact_form',
      timestamp: new Date().toISOString()
    });
  }

  // Page view tracking
  trackPageView(pageName: string) {
    this.track('page_view', {
      page_name: pageName,
      timestamp: new Date().toISOString()
    });
  }

  // Blog specific events
  trackBlogPostView(postSlug: string, postTitle: string, category?: string) {
    this.track('blog_post_view', {
      post_slug: postSlug,
      post_title: postTitle,
      category: category,
      timestamp: new Date().toISOString()
    });
  }

  trackBlogSearch(query: string, resultsCount: number) {
    this.track('blog_search', {
      search_query: query,
      results_count: resultsCount,
      timestamp: new Date().toISOString()
    });
  }

  trackBlogCategoryFilter(categories: string[]) {
    this.track('blog_category_filter', {
      selected_categories: categories,
      timestamp: new Date().toISOString()
    });
  }

  trackBlogShare(postSlug: string, platform: string) {
    this.track('blog_share', {
      post_slug: postSlug,
      platform: platform,
      timestamp: new Date().toISOString()
    });
  }

  trackNewsletterSignup(source: string = 'blog') {
    this.track('newsletter_signup', {
      source: source,
      timestamp: new Date().toISOString()
    });
  }
}

// Export singleton instance
export const analytics = new Analytics();

// Helper function for React components
export const useAnalytics = () => {
  return analytics;
};