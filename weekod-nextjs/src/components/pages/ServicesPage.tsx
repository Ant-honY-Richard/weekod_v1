'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { services } from '@/data';
import { PageType } from '@/types';
import ServiceIcon from '@/components/ui/ServiceIcons';

interface ServicesPageProps {
  setCurrentPage?: (page: PageType) => void;
}

const ServicesPage: React.FC<ServicesPageProps> = ({ setCurrentPage }) => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="bg-[#0A0A12]">
      <section className="py-20 bg-gradient-to-b from-[#0F0F1A] to-[#0A0A12]">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white" style={{ textShadow: "0 0 15px rgba(0, 243, 255, 0.5)" }}>Our Services</h1>
            <p className="text-xl text-gray-300">
              Cutting-edge solutions powered by AI and human expertise
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {services.map((service, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                onClick={() => setActiveStep(index)}
                className={`p-6 rounded-xl transition-all ${
                  activeStep === index 
                    ? 'bg-[#00F3FF] text-[#0A0A12] shadow-[0_0_20px_rgba(0,243,255,0.5)]' 
                    : 'bg-[#0F0F1A] hover:bg-[#141420]'
                }`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 border border-[#00F3FF]/20 ${
                  activeStep === index 
                    ? 'bg-[#0A0A12] text-[#00F3FF]' 
                    : 'bg-[#0A0A12] text-[#00F3FF] opacity-70'
                }`}>
                  <ServiceIcon 
                    type={service.icon} 
                    className="w-6 h-6" 
                    color="currentColor"
                  />
                </div>
                <h3 className="font-bold text-lg mb-2 text-white">{service.title}</h3>
                <p className={`${activeStep === index ? 'text-[#0A0A12] opacity-90' : 'text-gray-300'}`}>
                  {service.description}
                </p>
              </motion.button>
            ))}
          </div>

          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-[#0A0A12] rounded-2xl shadow-xl p-8 md:p-12 border border-[#00F3FF]/20"
          >
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <motion.h2 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl font-bold mb-4 text-white"
                >
                  {services[activeStep].title}
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl text-gray-300 mb-6"
                >
                  {services[activeStep].description}
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-300 mb-8"
                >
                  {services[activeStep].details}
                </motion.p>
                <motion.button 
                  onClick={() => setCurrentPage?.('contact')}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(0, 243, 255, 0.5)"
                  }}
                  className="inline-flex items-center bg-[#00F3FF] hover:bg-[#00D1E0] text-[#0A0A12] font-bold px-6 py-3 rounded-full transition-all"
                >
                  Get Started
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </motion.button>
              </div>
              <div className="hidden md:block">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="relative"
                >
                  <div className="w-full h-64 bg-gradient-to-br from-[#00F3FF]/20 to-[#FF00FF]/20 rounded-xl flex items-center justify-center border border-[#00F3FF]/30">
                    <img 
                      src={services[activeStep].icon} 
                      alt={services[activeStep].title}
                      className="w-24 h-24 opacity-80"
                    />
                  </div>
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#39FF14] rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-[#FF00FF] rounded-full animate-pulse delay-300"></div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;