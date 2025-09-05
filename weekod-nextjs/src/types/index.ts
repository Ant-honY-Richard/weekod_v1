export interface Service {
  icon: string;
  title: string;
  description: string;
  details: string;
}

export interface ProcessStep {
  title: string;
  description: string;
  image: string;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  image: string;
}

export interface PortfolioItem {
  title: string;
  type: string;
  image: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface PricingPackage {
  name: string;
  price: string;
  originalPrice?: string;
  internationalPrice?: string;
  internationalOriginalPrice?: string;
  features: string[];
  popular: boolean;
  bestFor?: string;
  paymentOptions?: string[];
  deliveryTime?: string;
  cta?: string;
}

// Blog-related types
export interface BlogPost {
  _id?: string;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    image?: string;
    bio?: string;
  };
  publishedAt: Date;
  updatedAt?: Date;
  tags: string[];
  categories: string[];
  featuredImage?: {
    url: string;
    alt: string;
    caption?: string;
  };
  readTime: number; // in minutes
  featured: boolean;
  published: boolean;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  views?: number;
  likes?: number;
}

export interface BlogCategory {
  _id?: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  postCount?: number;
}

export interface BlogTag {
  _id?: string;
  name: string;
  slug: string;
  postCount?: number;
}

export interface BlogSearchFilters {
  query?: string;
  categories?: string[];
  tags?: string[];
  author?: string;
  dateRange?: {
    from?: Date;
    to?: Date;
  };
}

export interface BlogPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export type PageType = 'home' | 'about' | 'services' | 'process' | 'portfolio' | 'pricing' | 'contact';