# Weekod - AI-Powered Web Development Agency

A modern, responsive Next.js TypeScript application for Weekod, an AI-powered web development agency that combines cutting-edge AI technology with human creativity.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 15, TypeScript, and Tailwind CSS
- **Smooth Animations**: Powered by Framer Motion for engaging user interactions
- **Responsive Design**: Fully responsive across all devices
- **Component-Based Architecture**: Well-organized, reusable components
- **Type Safety**: Full TypeScript implementation for better development experience
- **AI-Themed Design**: Cyberpunk-inspired design with neon colors and futuristic elements

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Package Manager**: npm

## 📁 Project Structure

```
weekod-nextjs/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Main page component
│   ├── components/             # Reusable components
│   │   ├── pages/              # Page components
│   │   │   ├── HomePage.tsx
│   │   │   ├── AboutPage.tsx
│   │   │   ├── ServicesPage.tsx
│   │   │   ├── ProcessPage.tsx
│   │   │   ├── PortfolioPage.tsx
│   │   │   ├── PricingPage.tsx
│   │   │   └── ContactPage.tsx
│   │   ├── ui/                 # UI components (future use)
│   │   ├── Navigation.tsx      # Navigation component
│   │   └── Footer.tsx          # Footer component
│   ├── data/                   # Static data
│   │   └── index.ts            # All application data
│   └── types/                  # TypeScript type definitions
│       └── index.ts            # Type definitions
├── public/                     # Static assets
├── tailwind.config.js          # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
├── next.config.js             # Next.js configuration
└── package.json               # Dependencies and scripts
```

## 🎨 Design Features

- **Color Scheme**: 
  - Primary Cyan: `#00F3FF`
  - Magenta: `#FF00FF`
  - Green: `#39FF14`
  - Dark Background: `#0A0A12`
- **Typography**: Inter font family for modern readability
- **Animations**: Smooth page transitions and hover effects
- **Responsive**: Mobile-first design approach

## 🚀 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Open in Browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📄 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 Pages

1. **Home**: Hero section with company introduction and key statistics
2. **About**: Team information and company values
3. **Services**: Interactive service showcase with detailed descriptions
4. **Process**: Step-by-step AI-powered development process
5. **Portfolio**: Project showcase with client testimonials
6. **Pricing**: Transparent pricing packages with FAQ
7. **Contact**: Contact form and company information

## 🔧 Customization

### Adding New Components
1. Create component in appropriate directory under `src/components/`
2. Export from the component file
3. Import and use in parent components

### Modifying Data
- Update content in `src/data/index.ts`
- Add new types in `src/types/index.ts` if needed

### Styling
- Global styles: `src/app/globals.css`
- Component styles: Use Tailwind CSS classes
- Custom animations: Extend Framer Motion configurations

## 🌟 Key Features Implemented

- **Single Page Application**: Smooth navigation without page reloads
- **Interactive Elements**: Hover effects, animations, and transitions
- **Form Handling**: Contact form with validation
- **Responsive Navigation**: Mobile-friendly hamburger menu
- **Type Safety**: Full TypeScript implementation
- **Performance Optimized**: Next.js optimizations and lazy loading

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎨 Animation Details

- **Page Transitions**: Smooth slide animations between pages
- **Hover Effects**: Scale and glow effects on interactive elements
- **Loading States**: Staggered animations for content loading
- **Scroll Animations**: Elements animate in as they come into view

## 🔮 Future Enhancements

- Add blog functionality
- Implement CMS integration
- Add more interactive demos
- Enhance SEO optimization
- Add analytics integration
- Implement contact form backend

## 📞 Support

For questions or support, contact the Weekod team at hello@weekod.in

---

Built with ❤️ and AI by the Weekod team.