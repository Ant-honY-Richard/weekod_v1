'use client';

import { useState, useEffect, useMemo } from 'react';
import { LazyMotion, domAnimation, m, AnimatePresence, useReducedMotion } from 'framer-motion';
import { pricingPackages } from '@/data';
import { PageType } from '@/types';

interface PricingPageProps {
  setCurrentPage?: (page: PageType) => void;
}

type Currency = 'INR' | 'USD' | 'EUR';

const PricingPage: React.FC<PricingPageProps> = ({ setCurrentPage }) => {
  const [currency, setCurrency] = useState<Currency>('INR');
  const [showCalculator, setShowCalculator] = useState(false);
  const [calculatorValues, setCalculatorValues] = useState({
    pages: 5,
    features: [] as string[],
    timeline: 'standard'
  });
  const [showFAQ, setShowFAQ] = useState<number | null>(null);
  const [isAnnual, setIsAnnual] = useState(false);
  const [userRegion, setUserRegion] = useState<string>('');

  const prefersReducedMotion = useReducedMotion();

  // Currency symbols and conversion rates
  const currencyData = {
    INR: { symbol: '₹', rate: 1, label: 'INR (India)', region: 'IN' },
    USD: { symbol: '$', rate: 0.012, label: 'USD (International)', region: 'US' },
    EUR: { symbol: '€', rate: 0.011, label: 'EUR (Europe)', region: 'EU' }
  };

  // Auto-detect user region and set appropriate currency
  useEffect(() => {
    const detectUserRegion = async () => {
      try {
        // Try to get user's location via IP geolocation
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const countryCode = data.country_code;
        setUserRegion(countryCode);

        // Set currency based on region
        if (countryCode === 'IN') {
          setCurrency('INR');
        } else if (['AT', 'BE', 'CY', 'EE', 'FI', 'FR', 'DE', 'GR', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PT', 'SK', 'SI', 'ES'].includes(countryCode)) {
          setCurrency('EUR');
        } else {
          setCurrency('USD');
        }
      } catch (error) {
        console.log('Could not detect region, defaulting to INR');
        setUserRegion('IN');
        setCurrency('INR');
      }
    };

    detectUserRegion();
  }, []);

  // Convert price from USD to EUR
  const convertToEUR = (usdPrice: string) => {
    if (!usdPrice || !usdPrice.includes('$')) return usdPrice;
    
    // Extract numeric value from price string like "$1,499" or "$499"
    const numericMatch = usdPrice.match(/\$([0-9,]+)/);
    if (!numericMatch) return usdPrice;
    
    const numericValue = parseInt(numericMatch[1].replace(/,/g, ''));
    const eurValue = Math.round(numericValue * 0.92); // USD to EUR conversion
    
    // Format with commas for thousands
    return `€${eurValue.toLocaleString()}`;
  };

  // FAQ data
  const faqData = [
    {
      question: 'Why are your prices lower than international agencies?',
      answer: 'We leverage AI tools and efficient processes, combined with competitive Indian market rates, to deliver international-quality work at 50-70% lower costs without compromising on quality.'
    },
    {
      question: 'What\'s included in the base price?',
      answer: 'All packages include design, development, basic SEO setup, mobile optimization, SSL certificate, and specified support period. Domain and hosting are separate.'
    },
    {
      question: 'Do you offer payment plans?',
      answer: 'Yes! We offer flexible payment options including EMI plans, milestone-based payments, and custom payment terms for enterprise clients.'
    },
    {
      question: 'What happens after the project delivery?',
      answer: 'You get the specified support period included, plus optional maintenance packages. We also offer performance partnerships for ongoing optimization.'
    },
    {
      question: 'How do you ensure quality with AI assistance?',
      answer: 'AI accelerates our workflow, but every project has human oversight. Our team reviews, refines, and customizes all AI-generated elements to meet your specific needs.'
    },
    {
      question: 'Can I upgrade my package later?',
      answer: 'Absolutely! You can upgrade during development or add features post-launch. We\'ll adjust pricing fairly based on additional scope.'
    }
  ];

  // Value comparison data
  const comparisonData = [
    {
      aspect: 'Cost',
      agency: '₹3L-10L+',
      freelancer: '₹50K-2L',
      weekod: '₹25K-2L+'
    },
    {
      aspect: 'Timeline',
      agency: '3-6 months',
      freelancer: '1-4 months',
      weekod: '1-10 weeks'
    },
    {
      aspect: 'AI Integration',
      agency: 'Limited',
      freelancer: 'Rarely',
      weekod: 'Standard'
    },
    {
      aspect: 'Support',
      agency: 'Premium rates',
      freelancer: 'Limited',
      weekod: 'Included + affordable'
    },
    {
      aspect: 'Scalability',
      agency: 'High cost',
      freelancer: 'Limited',
      weekod: 'Built-in'
    }
  ];

  // Animation variants
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <div className="bg-[#0A0A12] relative overflow-hidden">
        {/* Background Effects */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full"
               style={{ background: 'radial-gradient(closest-side, rgba(0,243,255,0.08), transparent)' }} />
          <div className="absolute -bottom-32 -right-24 w-96 h-96 rounded-full"
               style={{ background: 'radial-gradient(closest-side, rgba(255,0,255,0.06), transparent)' }} />
        </div>

        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-[#0F0F1A] to-transparent">
          <div className="container mx-auto px-4 md:px-6">
            <m.div
              variants={containerVariants}
              initial="initial"
              animate="animate"
              className="text-center max-w-4xl mx-auto"
            >
              <m.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00F3FF]/30 bg-[#0A0A12]/40 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#00F3FF] animate-pulse" />
                <span className="text-sm font-semibold tracking-wider text-[#00F3FF]">Transparent Pricing</span>
              </m.div>
              
              <m.h1 variants={itemVariants} className="text-4xl md:text-6xl font-bold mb-6 text-white">
                Premium Quality at{' '}
                <span className="text-[#00F3FF]">Fair Prices</span>
              </m.h1>
              
              <m.p variants={itemVariants} className="text-xl md:text-2xl text-gray-300 mb-8">
                International-level delivery at Indian market-friendly rates — with AI + human craft
              </m.p>

              <m.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="px-4 py-2 bg-[#39FF14]/10 border border-[#39FF14]/30 rounded-full flex items-center">
                  <span className="w-2 h-2 bg-[#39FF14] rounded-full mr-2 animate-pulse" />
                  <span className="text-[#39FF14] text-sm font-medium">50–70% lower than agencies</span>
                </div>
                <div className="px-4 py-2 bg-[#00F3FF]/10 border border-[#00F3FF]/30 rounded-full flex items-center">
                  <span className="w-2 h-2 bg-[#00F3FF] rounded-full mr-2 animate-pulse" />
                  <span className="text-[#00F3FF] text-sm font-medium">No hidden fees</span>
                </div>
                <div className="px-4 py-2 bg-[#FF00FF]/10 border border-[#FF00FF]/30 rounded-full flex items-center">
                  <span className="w-2 h-2 bg-[#FF00FF] rounded-full mr-2 animate-pulse" />
                  <span className="text-[#FF00FF] text-sm font-medium">Flexible payment plans</span>
                </div>
              </m.div>
            </m.div>
          </div>
        </section>

        {/* Currency/Region Selector */}
        <section className="py-8 border-b border-[#00F3FF]/10">
          <div className="container mx-auto px-4 md:px-6">
            <m.div 
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <span className="text-white font-medium">Select your region:</span>
              <div className="flex gap-2">
                {Object.entries(currencyData).map(([key, data]) => (
                  <button
                    key={key}
                    onClick={() => setCurrency(key as Currency)}
                    className={`px-4 py-2 rounded-full border transition-all ${
                      currency === key
                        ? 'border-[#00F3FF] bg-[#00F3FF]/10 text-[#00F3FF]'
                        : 'border-[#00F3FF]/30 text-gray-300 hover:border-[#00F3FF]/60 hover:text-white'
                    }`}
                  >
                    {data.symbol} {data.label}
                  </button>
                ))}
              </div>
            </m.div>
          </div>
        </section>

        {/* Main Pricing Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <m.div
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Choose Your Perfect Package
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                All-inclusive packages designed to scale with your business needs
              </p>
            </m.div>

            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricingPackages.map((pkg, index) => {
                let displayPrice, displayOriginalPrice;
                
                if (currency === 'INR') {
                  displayPrice = pkg.price;
                  displayOriginalPrice = pkg.originalPrice;
                } else if (currency === 'EUR') {
                  displayPrice = convertToEUR(pkg.internationalPrice || pkg.price);
                  displayOriginalPrice = convertToEUR(pkg.internationalOriginalPrice || pkg.originalPrice || '');
                } else {
                  displayPrice = pkg.internationalPrice || pkg.price;
                  displayOriginalPrice = pkg.internationalOriginalPrice || pkg.originalPrice;
                }
                
                return (
                  <m.div
                    key={pkg.name}
                    initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
                    whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`relative bg-[#0F0F1A] rounded-2xl border transition-all hover:transform hover:scale-105 ${
                      pkg.popular
                        ? 'border-[#00F3FF] shadow-[0_0_30px_rgba(0,243,255,0.2)] lg:scale-105 pt-12 pb-8 px-8'
                        : 'border-[#00F3FF]/30 hover:border-[#00F3FF]/60 p-8'
                    }`}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                        <span className="bg-gradient-to-r from-[#00F3FF] to-[#39FF14] text-[#0A0A12] px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap">
                          Most Popular
                        </span>
                      </div>
                    )}

                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                      <div className="mb-4">
                        <span className="text-4xl font-bold text-[#00F3FF]">{displayPrice}</span>
                        {displayOriginalPrice !== 'Custom Quote' && displayOriginalPrice !== displayPrice && (
                          <span className="text-lg text-gray-400 line-through ml-2">{displayOriginalPrice}</span>
                        )}
                      </div>
                      <p className="text-gray-300 text-sm mb-2">{pkg.bestFor}</p>
                      <p className="text-[#39FF14] text-sm font-medium">Delivery: {pkg.deliveryTime}</p>
                      {pkg.disclaimer && (
                        <p className="text-xs text-gray-400 mt-2 italic">*{pkg.disclaimer}</p>
                      )}
                    </div>

                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <svg className="w-5 h-5 text-[#00F3FF] mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="space-y-4">
                      <m.button
                        onClick={() => setCurrentPage?.('contact')}
                        whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full py-3 px-6 rounded-lg font-bold text-center transition-all ${
                          pkg.popular
                            ? 'bg-gradient-to-r from-[#00F3FF] to-[#39FF14] text-[#0A0A12] hover:shadow-[0_0_20px_rgba(0,243,255,0.5)]'
                            : 'bg-[#00F3FF] text-[#0A0A12] hover:bg-[#00D1E0]'
                        }`}
                      >
                        {pkg.cta || 'Get Started'}
                      </m.button>

                      <m.button
                        onClick={() => {
                          const message = `Hi! I'm interested in the ${pkg.name} package (${displayPrice}). Can you provide more details?`;
                          window.open(`https://wa.me/918151018502?text=${encodeURIComponent(message)}`, '_blank');
                        }}
                        whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-2 px-4 rounded-lg border border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 transition-all flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                        </svg>
                        Quick WhatsApp Chat
                      </m.button>

                      {pkg.paymentOptions && (
                        <div className="text-center">
                          <p className="text-xs text-gray-400 mb-2">Payment Options:</p>
                          <div className="flex flex-wrap gap-1 justify-center">
                            {pkg.paymentOptions.slice(0, 2).map((option, optionIndex) => (
                              <span key={optionIndex} className="text-xs bg-[#00F3FF]/10 text-[#00F3FF] px-2 py-1 rounded">
                                {option}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </m.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Feature Comparison Table */}
        <section className="py-16 bg-[#0F0F1A]/30">
          <div className="container mx-auto px-4 md:px-6">
            <m.div
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Compare All Features
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Detailed feature breakdown to help you choose the right package
              </p>
            </m.div>

            <div className="overflow-x-auto">
              <table className="w-full bg-[#0A0A12] rounded-2xl border border-[#00F3FF]/20 overflow-hidden">
                <thead>
                  <tr className="border-b border-[#00F3FF]/20 bg-[#0F0F1A]">
                    <th className="text-left p-6 text-white font-bold">Features</th>
                    <th className="text-center p-6 text-[#00F3FF] font-bold">Starter</th>
                    <th className="text-center p-6 text-[#00F3FF] font-bold bg-[#00F3FF]/5">
                      Growth
                    </th>
                    <th className="text-center p-6 text-[#00F3FF] font-bold">Pro/Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: 'Pages Included', starter: '1-3 pages', growth: '5-10 pages', pro: 'Unlimited' },
                    { feature: 'Design Approach', starter: 'Template-based', growth: 'Semi-custom', pro: 'Fully custom' },
                    { feature: 'CMS Integration', starter: '×', growth: 'WordPress/Headless', pro: 'Custom CMS' },
                    { feature: 'AI Features', starter: 'Copy suggestions', growth: 'Content optimization', pro: 'Full automation' },
                    { feature: 'SEO Level', starter: 'Basic setup', growth: 'Advanced optimization', pro: 'Enterprise SEO' },
                    { feature: 'E-commerce', starter: '×', growth: 'Payment gateway', pro: 'Full platform' },
                    { feature: 'Support Period', starter: 'Project completion', growth: '3 months', pro: 'Ongoing SLA' },
                    { feature: 'Delivery Time', starter: '1-2 weeks', growth: '3-5 weeks', pro: '6-10 weeks' }
                  ].map((row, index) => (
                    <tr key={row.feature} className="border-b border-[#00F3FF]/10 hover:bg-[#0F0F1A]/30 transition-colors">
                      <td className="p-4 text-white font-medium">{row.feature}</td>
                      <td className="p-4 text-center text-gray-300">{row.starter}</td>
                      <td className="p-4 text-center text-gray-300 bg-[#00F3FF]/5">{row.growth}</td>
                      <td className="p-4 text-center text-gray-300">{row.pro}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>



        {/* Value Comparison */}
        <section className="py-16 bg-[#0F0F1A]/30">
          <div className="container mx-auto px-4 md:px-6">
            <m.div
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Why Choose Weekod?
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                See how we compare to traditional agencies and freelancers
              </p>
            </m.div>

            <div className="overflow-x-auto">
              <table className="w-full max-w-4xl mx-auto bg-[#0A0A12] rounded-2xl border border-[#00F3FF]/20 overflow-hidden">
                <thead>
                  <tr className="border-b border-[#00F3FF]/20 bg-[#0F0F1A]">
                    <th className="text-left p-6 text-white font-bold">Aspect</th>
                    <th className="text-center p-6 text-gray-400 font-bold">Traditional Agency</th>
                    <th className="text-center p-6 text-gray-400 font-bold">Freelancer</th>
                    <th className="text-center p-6 text-[#00F3FF] font-bold bg-[#00F3FF]/5">
                      Weekod
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={row.aspect} className="border-b border-[#00F3FF]/10 hover:bg-[#0F0F1A]/30 transition-colors">
                      <td className="p-4 text-white font-medium">{row.aspect}</td>
                      <td className="p-4 text-center text-gray-400">{row.agency}</td>
                      <td className="p-4 text-center text-gray-400">{row.freelancer}</td>
                      <td className="p-4 text-center text-[#00F3FF] bg-[#00F3FF]/5 font-medium">{row.weekod}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Price Calculator */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <m.div
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Price Calculator
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
                Get a custom estimate based on your specific requirements
              </p>
              
              <m.button
                onClick={() => setShowCalculator(!showCalculator)}
                whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#00F3FF] text-[#0A0A12] px-8 py-4 rounded-lg font-bold hover:bg-[#00D1E0] transition-all"
              >
                {showCalculator ? 'Hide' : 'Open'} Price Calculator
              </m.button>
            </m.div>

            <AnimatePresence>
              {showCalculator && (
                <m.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-[#0F0F1A] rounded-2xl p-8 border border-[#00F3FF]/30 max-w-4xl mx-auto"
                >
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-white font-medium mb-2">Number of Pages</label>
                        <input
                          type="range"
                          min="1"
                          max="20"
                          value={calculatorValues.pages}
                          onChange={(e) => setCalculatorValues({...calculatorValues, pages: parseInt(e.target.value)})}
                          className="w-full h-2 bg-[#00F3FF]/20 rounded-lg appearance-none cursor-pointer accent-[#00F3FF]"
                        />
                        <span className="text-[#00F3FF] text-sm">{calculatorValues.pages} pages</span>
                      </div>

                      <div>
                        <label className="block text-white font-medium mb-2">Features Needed</label>
                        <div className="space-y-2">
                          {['E-commerce', 'CMS', 'API Integration', 'AI Features', 'Custom Design'].map((feature) => (
                            <label key={feature} className="flex items-center">
                              <input
                                type="checkbox"
                                className="mr-2 accent-[#00F3FF]"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setCalculatorValues({
                                      ...calculatorValues,
                                      features: [...calculatorValues.features, feature]
                                    });
                                  } else {
                                    setCalculatorValues({
                                      ...calculatorValues,
                                      features: calculatorValues.features.filter(f => f !== feature)
                                    });
                                  }
                                }}
                              />
                              <span className="text-gray-300">{feature}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-white font-medium mb-2">Timeline</label>
                        <select
                          value={calculatorValues.timeline}
                          onChange={(e) => setCalculatorValues({...calculatorValues, timeline: e.target.value})}
                          className="w-full bg-[#0A0A12] border border-[#00F3FF]/30 rounded-lg px-4 py-2 text-white"
                        >
                          <option value="rush">Rush (1-2 weeks) - +30%</option>
                          <option value="standard">Standard (3-5 weeks)</option>
                          <option value="flexible">Flexible (6+ weeks) - 10% discount</option>
                        </select>
                      </div>
                    </div>

                    <div className="bg-[#0A0A12] rounded-lg p-6 border border-[#00F3FF]/20">
                      <h3 className="text-xl font-bold text-white mb-4">Estimated Cost</h3>
                      <div className="text-3xl font-bold text-[#00F3FF] mb-2">
                        {(() => {
                          const basePrice = 25000 + (calculatorValues.pages * 2000) + (calculatorValues.features.length * 15000);
                          const finalPrice = basePrice * (calculatorValues.timeline === 'rush' ? 1.3 : calculatorValues.timeline === 'flexible' ? 0.9 : 1);
                          
                          if (currency === 'INR') {
                            return `₹${Math.round(finalPrice).toLocaleString()}`;
                          } else if (currency === 'USD') {
                            return `$${Math.round(finalPrice * 0.012).toLocaleString()}`;
                          } else {
                            return `€${Math.round(finalPrice * 0.011).toLocaleString()}`;
                          }
                        })()}
                      </div>
                      <p className="text-gray-300 text-sm mb-4">
                        Based on {calculatorValues.pages} pages, {calculatorValues.features.length} features, {calculatorValues.timeline} timeline
                      </p>
                      
                      <m.button
                        onClick={() => setCurrentPage?.('contact')}
                        whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-[#39FF14] text-[#0A0A12] py-3 px-6 rounded-lg font-bold hover:bg-[#2ecc0f] transition-all"
                      >
                        Get Detailed Quote
                      </m.button>
                    </div>
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-[#0F0F1A]/30">
          <div className="container mx-auto px-4 md:px-6">
            <m.div
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Pricing FAQ
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Common questions about our pricing and packages
              </p>
            </m.div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqData.map((faq, index) => (
                <m.div
                  key={index}
                  initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
                  whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-[#0A0A12] rounded-lg border border-[#00F3FF]/20 overflow-hidden"
                >
                  <button
                    onClick={() => setShowFAQ(showFAQ === index ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-[#0F0F1A]/30 transition-colors"
                  >
                    <span className="text-white font-medium pr-4">{faq.question}</span>
                    <svg
                      className={`w-5 h-5 text-[#00F3FF] transition-transform ${
                        showFAQ === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  <AnimatePresence>
                    {showFAQ === index && (
                      <m.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-[#00F3FF]/10"
                      >
                        <div className="p-6 pt-4">
                          <p className="text-gray-300">{faq.answer}</p>
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Consultation CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <m.div
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-[#00F3FF]/10 to-[#39FF14]/10 rounded-2xl p-8 md:p-12 border border-[#00F3FF]/30 text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Book a free consultation to discuss your project and get a personalized quote
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <m.button
                  onClick={() => setCurrentPage?.('contact')}
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[#00F3FF] text-[#0A0A12] px-8 py-4 rounded-lg font-bold hover:bg-[#00D1E0] transition-all"
                >
                  Schedule Free Consultation
                </m.button>
                
                <m.a
                  href="https://wa.me/918088310013"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[#39FF14] text-[#0A0A12] px-8 py-4 rounded-lg font-bold hover:bg-[#2ecc0f] transition-all inline-flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.700"/>
                  </svg>
                  WhatsApp Chat
                </m.a>
              </div>
            </m.div>
          </div>
        </section>
      </div>
    </LazyMotion>
  );
};

export default PricingPage;