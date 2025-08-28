'use client';

import { motion } from 'framer-motion';
import { pricingPackages } from '@/data';
import { PageType } from '@/types';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

interface PricingPageProps {
  setCurrentPage?: (page: PageType) => void;
}

const PricingPage: React.FC<PricingPageProps> = ({ setCurrentPage }) => {
  const { scrollToTop } = useSmoothScroll();

  const handlePageChange = (page: PageType) => {
    setCurrentPage?.(page);
    scrollToTop();
  };
  return (
    <div className="bg-[#0A0A12]">
      <section className="py-20 bg-gradient-to-b from-[#0F0F1A] to-[#0A0A12]">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white" style={{ textShadow: "0 0 15px rgba(0, 243, 255, 0.5)" }}>Transparent Pricing</h1>
            <p className="text-xl text-gray-300 mb-8">
              Choose the perfect package for your project needs
            </p>
            <p className="text-gray-400 max-w-3xl mx-auto">
              No hidden fees, no surprises. Our pricing is designed to be transparent and fair, with packages that scale with your business needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto pt-6">
            {pricingPackages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className={`relative rounded-2xl p-8 border-2 transition-all ${
                  pkg.popular
                    ? 'border-[#00F3FF] bg-gradient-to-b from-[#00F3FF]/10 to-[#0A0A12] shadow-[0_0_30px_rgba(0,243,255,0.3)]'
                    : 'border-[#00F3FF]/20 bg-[#0F0F1A] hover:border-[#00F3FF]/40'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[#00F3FF] text-[#0A0A12] px-4 py-2 rounded-full text-sm font-bold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-4">{pkg.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-[#00F3FF]">{pkg.price}</span>
                    {pkg.price !== "Contact for Quote" && (
                      <span className="text-gray-400 ml-2">one-time</span>
                    )}
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <svg className="w-5 h-5 text-[#39FF14] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  onClick={() => handlePageChange('contact')}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: pkg.popular 
                      ? "0 0 25px rgba(0, 243, 255, 0.7)" 
                      : "0 0 20px rgba(57, 255, 20, 0.5)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-4 px-6 rounded-full font-bold text-lg transition-all ${
                    pkg.popular
                      ? 'bg-[#00F3FF] text-[#0A0A12] hover:bg-[#00D1E0]'
                      : 'bg-[#39FF14] text-[#0A0A12] hover:bg-[#2ecc0f]'
                  }`}
                >
                  {pkg.price === "Contact for Quote" ? "Get Quote" : "Get Started"}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-[#0F0F1A]">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-white">Frequently Asked Questions</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Got questions? We&apos;ve got answers.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                question: "What's included in the AI-powered design process?",
                answer: "Our AI tools help with rapid wireframing, content generation, and design variations. However, every project receives human oversight and customization to ensure it perfectly matches your brand and goals."
              },
              {
                question: "How long does a typical project take?",
                answer: "Starter projects typically take 1-2 weeks, Growth projects 2-4 weeks, and Custom projects vary based on complexity. Our AI-powered process significantly reduces development time compared to traditional methods."
              },
              {
                question: "Do you provide ongoing support after launch?",
                answer: "Yes! All packages include post-launch support. Starter includes 1 month, Growth includes 3 months, and Custom packages include ongoing strategic support as needed."
              },
              {
                question: "Can I upgrade my package later?",
                answer: "Absolutely! You can upgrade your package at any time during the project. We'll adjust the scope and timeline accordingly, and you'll only pay the difference."
              },
              {
                question: "What if I'm not satisfied with the result?",
                answer: "We offer unlimited revisions during the development process and a satisfaction guarantee. Our goal is to exceed your expectations, and we'll work with you until you're completely happy with the result."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#0A0A12] rounded-xl p-6 border border-[#00F3FF]/20"
              >
                <h3 className="text-lg font-bold text-white mb-3">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6 text-white">Ready to Get Started?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Choose your package and let&apos;s bring your vision to life with our AI-powered approach.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button 
                onClick={() => handlePageChange('contact')}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 25px rgba(57, 255, 20, 0.7)"
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#39FF14] hover:bg-[#2ecc0f] text-[#0A0A12] text-lg font-bold px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-xl"
              >
                Start Your Project
              </motion.button>
              <motion.button 
                onClick={() => handlePageChange('process')}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(0, 243, 255, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-[#00F3FF] hover:bg-[#00F3FF]/10 text-white text-lg font-bold px-8 py-4 rounded-full backdrop-blur-sm transition-all"
              >
                Learn About Our Process
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;