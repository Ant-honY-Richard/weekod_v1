export type PageType = 
  | 'home' 
  | 'about' 
  | 'services' 
  | 'process' 
  | 'portfolio' 
  | 'pricing' 
  | 'contact';

export interface Service {
  title: string;
  description: string;
  details: string;
  icon: string;
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

export interface PricingTier {
  id: string;
  label: string;
  price: number;
  originalPrice?: number;
  priceSuffix?: string;
  deliveryDaysMin: number;
  deliveryDaysMax: number;
  cta: string;
  features: string[];
  paymentOptions: string[];
  badge?: string;
}

export interface PricingCategory {
  id: string;
  title: string;
  subtitle: string;
  tiers: PricingTier[];
}

export interface ComparisonTable {
  enabled: boolean;
  tableCaption: string;
  columns: string[];
  rows: [string, string, string, string][];
  disclaimer: string;
}

export interface PricingPackage {
  name: string;
  price: string;
  originalPrice?: string;
  features: string[];
  popular: boolean;
  bestFor?: string;
  deliveryTime?: string;
  paymentOptions?: string[];
  cta?: string;
  disclaimer?: string;
  internationalPrice?: string;
  internationalOriginalPrice?: string;
}

export interface AddOn {
  name: string;
  price: string;
  internationalPrice: string;
  features: string[];
}

export interface NavigationProps {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  scrolled?: boolean;
  isMenuOpen?: boolean;
  setIsMenuOpen?: (open: boolean) => void;
}

export interface PageProps {
  setCurrentPage: (page: PageType) => void;
}