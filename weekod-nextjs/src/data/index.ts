import { Service, ProcessStep, Testimonial, PortfolioItem, TeamMember, PricingPackage } from '@/types';

export const services: Service[] = [
  {
    icon: "website-design",
    title: "Custom Website Design",
    description: "Unique, responsive websites tailored to your brand and business goals.",
    details: "We create pixel-perfect websites that represent your brand identity while ensuring optimal user experience across all devices. Our process combines AI-powered wireframing with meticulous human craftsmanship."
  },
  {
    icon: "ai-solutions",
    title: "AI-Powered Solutions",
    description: "Smarter design and automation through cutting-edge AI technologies.",
    details: "Leverage our proprietary AI tools to accelerate development, generate content, and create intelligent user experiences that adapt to your customers' needs."
  },
  {
    icon: "app-development",
    title: "App Development",
    description: "Basic MVP and prototyping to launch your mobile ideas quickly.",
    details: "From concept to deployment, we build cross-platform applications with React Native that deliver exceptional performance and user engagement."
  },
  {
    icon: "maintenance-support",
    title: "Maintenance & Support",
    description: "Reliable ongoing updates, backups, and improvements to keep you ahead.",
    details: "Our comprehensive maintenance packages ensure your digital presence remains secure, up-to-date, and continuously optimized for performance and conversions."
  }
];

export const processSteps: ProcessStep[] = [
  {
    title: "Discovery & Dreaming",
    description: "Deep-dive into understanding your vision, goals, and target audience through collaborative workshops.",
    image: "https://res.cloudinary.com/djxoeyk1a/image/upload/v1756257137/ce0dac5a-b469-4314-b827-422000733169_eqzrku.jpg"
  },
  {
    title: "AI-Powered Rapid Prototyping",
    description: "Generate rough drafts quickly using AI to visualize direction and gather your feedback.",
    image: "https://res.cloudinary.com/djxoeyk1a/image/upload/v1756259404/1b05a042-63b3-4e16-b4e1-c2dc32c0e3ae_rpwkho.jpg"
  },
  {
    title: "Crafting & Customization",
    description: "Human expertise refines and tailors the design to match your brand and goals perfectly.",
    image: "https://res.cloudinary.com/djxoeyk1a/image/upload/v1756259422/040c7c07-d9cc-4479-8225-aa954a026d54_p1e6zr.jpg"
  },
  {
    title: "Testing & Iterations",
    description: "Thorough testing across devices combined with your input to polish the final product.",
    image: "https://res.cloudinary.com/djxoeyk1a/image/upload/v1756259438/57936de5-6e45-404a-ad1c-3d2f80c86c59_ad1k0o.jpg"
  },
  {
    title: "Launch & Celebrate",
    description: "Deploy your site live with support to ensure seamless user experience.",
    image: "https://res.cloudinary.com/djxoeyk1a/image/upload/v1756259456/c27c0741-d519-43f7-ae28-1e6ca6cf4366_fkuwmj.jpg"
  },
  {
    title: "Support & Growth",
    description: "Ongoing maintenance and updates to help you stay competitive and scalable.",
    image: "https://res.cloudinary.com/djxoeyk1a/image/upload/v1756259533/2d9b7870-b9ca-44a5-b866-8bb108041036_ymt5v4.jpg"
  }
];

export const testimonials: Testimonial[] = [
  {
    name: "Prathap M.",
    role: "Startup Founder",
    quote: "Weekod translated my vision into a sleek website faster than I imagined. Friendly and always responsive.",
    image: "https://placehold.co/100x100/00F3FF/0A0A12?text=PM"
  },
  {
    name: "Anubhav R.",
    role: "Small Business Owner",
    quote: "Their use of AI helps deliver results quickly without losing the human touch. Highly recommended!",
    image: "https://placehold.co/100x100/FF00FF/0A0A12?text=AR"
  },
  {
    name: "Devanshu M.",
    role: "E-commerce Entrepreneur",
    quote: "The AI-powered suggestions transformed our user experience and increased conversions by 40% in just two months.",
    image: "https://placehold.co/100x100/39FF14/0A0A12?text=DM"
  }
];

export const portfolioItems: PortfolioItem[] = [
  {
    title: "Local Startup Website",
    type: "Website",
    image: "https://res.cloudinary.com/djxoeyk1a/image/upload/v1756225947/bae4afa5-b1eb-4f32-8b20-1eb2cbf949ca_guznte.png",
    description: "A minimal, modern design for a local entrepreneur powered by AI assisted customization."
  },
  {
    title: "AI Website Generator Demo",
    type: "Interactive Demo",
    image: "https://placehold.co/600x400/FF00FF/0A0A12?text=AI+Builder",
    description: "Explore a live demo of our AI rapid prototyping tool in action."
  },
  {
    title: "App Prototype for Education",
    type: "Mobile App",
    image: "https://res.cloudinary.com/djxoeyk1a/image/upload/v1756226286/ed0a4eaa-ae67-4619-bb9a-9147c0b8ba6e_vdghpq.png",
    description: "Basic app developed with quick AI prototyping skills."
  },
  {
    title: "Restaurant Ordering System",
    type: "Web Application",
    image: "https://placehold.co/600x400/00F3FF/0A0A12?text=Food+App",
    description: "Streamlined online ordering system with real-time inventory management."
  }
];

export const teamMembers: TeamMember[] = [
  {
    name: "Anthony Richard",
    role: "Lead Web Developer",
    image: "https://placehold.co/300x300/00F3FF/0A0A12?text=AR",
    bio: "3+ years experience building responsive websites with a focus on performance and accessibility. Expertise in Next.js and TypeScript."
  },
  {
    name: "Sabirabanu Sudarji.",
    role: "UX/UI Designer",
    image: "https://placehold.co/300x300/FF00FF/0A0A12?text=SS",
    bio: "Artistically driven UI/UX designer specializing in creating intuitive user experiences. Passionate about design systems and component libraries."
  },
  {
    name: "Dhanush J.",
    role: "AI Developer",
    image: "https://placehold.co/300x300/39FF14/0A0A12?text=DJ",
    bio: "AI specialist with expertise in machine learning integration and intelligent automation. Focused on AI-driven solutions and smart integrations."
  },
  {
    name: "Surya S.",
    role: "App Developer",
    image: "https://placehold.co/300x300/FFD700/0A0A12?text=SS",
    bio: "Mobile app developer specializing in cross-platform development with React Native and Flutter. Expert in creating seamless user experiences."
  }
];

export const pricingPackages: PricingPackage[] = [
  {
    name: "Basic",
    price: "₹24,999",
    originalPrice: "₹39,999",
    features: [
      "Professional website (up to 5 pages)",
      "Mobile-first responsive design",
      "Brand-aligned UI/UX",
      "Basic SEO setup",
      "Contact form & WhatsApp integration",
      "Google Analytics & Search Console setup",
      "Domain + premium hosting (1st year included)",
      "Rapid turnaround (1-2 weeks)",
      "1 month post-launch maintenance"
    ],
    popular: false,
    bestFor: "Small businesses & startups",
    paymentOptions: ["Full payment", "50% advance, 50% on completion"],
    deliveryTime: "7-14 days"
  },
  {
    name: "Growth",
    price: "₹54,999",
    originalPrice: "₹74,999",
    features: [
      "Custom website (up to 12 pages; blog/news ready)",
      "AI-enhanced prototyping & smart content",
      "Advanced SEO & local business optimization",
      "Lead generation forms & CTAs",
      "Integrated CMS (WordPress/Headless)",
      "Performance optimization & Core Web Vitals",
      "SSL & privacy/security setup",
      "Premium analytics dashboard",
      "3 months continued support + content updates"
    ],
    popular: true,
    bestFor: "Growing businesses & established brands",
    paymentOptions: ["Full payment (5% discount)", "3 monthly installments", "50% advance, 50% on completion"],
    deliveryTime: "14-21 days"
  },
  {
    name: "Enterprise",
    price: "₹99,999",
    originalPrice: "₹1,49,999",
    features: [
      "Tailored solutions for complex/e-commerce/app needs",
      "Bespoke UI/UX design with strategy consulting",
      "App & advanced AI integrations (chatbots, automation)",
      "Custom API/third-party integrations",
      "Dedicated project manager",
      "Enterprise-level security & compliance",
      "Scalable infrastructure & hosting",
      "Ongoing strategic support & growth audits",
      "Full lifecycle maintenance"
    ],
    popular: false,
    bestFor: "Enterprises & e-commerce businesses",
    paymentOptions: ["Full payment (10% discount)", "Custom payment schedule", "Milestone-based payments"],
    deliveryTime: "30-45 days"
  }
];

export const faqData = [
  {
    question: "How long does it take to build a website?",
    answer: "Our typical timeline is 7-14 days for basic websites and 14-21 days for more complex projects. This includes design, development, testing, and launch. We provide regular updates throughout the process."
  },
  {
    question: "Do you provide ongoing support after launch?",
    answer: "Yes! All our packages include post-launch support. Basic packages include 1 month of support, Growth packages include 3 months, and Enterprise packages include full lifecycle maintenance."
  },
  {
    question: "Can you work with existing branding and design guidelines?",
    answer: "Absolutely! We can work with your existing brand assets, style guides, and design requirements. Our AI-assisted design process can adapt to any brand identity while maintaining consistency."
  },
  {
    question: "What makes your AI-powered approach different?",
    answer: "We combine AI tools for rapid prototyping and iteration with human expertise for refinement and customization. This allows us to deliver high-quality results faster while maintaining the personal touch and creativity that only humans can provide."
  },
  {
    question: "Do you handle e-commerce and complex web applications?",
    answer: "Yes, our Enterprise package specifically covers e-commerce solutions, custom web applications, and complex integrations. We work with modern technologies and can handle everything from simple stores to advanced business applications."
  }
];

export const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1 },
  out: { opacity: 0 }
};

export const pageTransition = {
  type: "tween" as const,
  ease: "easeOut" as const,
  duration: 0.3
};