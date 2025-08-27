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
  features: string[];
  popular: boolean;
}

export type PageType = 'home' | 'about' | 'services' | 'process' | 'portfolio' | 'pricing' | 'contact';