'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { processSteps } from '@/data';
import { PageType } from '@/types';

interface ProcessPageProps {
  setCurrentPage?: (page: PageType) => void;
}

const ProcessPage: React.FC<ProcessPageProps> = ({ setCurrentPage }) => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="bg-[#0A0A12]">
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#0F0F1A] to-[#0A0A12]">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white leading-tight" style={{ textShadow: "0 0 15px rgba(0, 243, 255, 0.5)" }}>
              Our AI-Powered Process
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 px-2">
              From concept to launch, we blend AI efficiency with human creativity
            </p>
            <p className="text-sm sm:text-base text-gray-400 max-w-3xl mx-auto px-2">
              Our unique 6-step process ensures your project is delivered on time, within budget, and exceeds your expectations. We leverage AI for rapid prototyping while maintaining the human touch that makes your project truly special.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Step Navigation - Mobile Optimized */}
          <div className="mb-8 sm:mb-12">
            {/* Mobile: Dropdown Style Navigation */}
            <div className="block sm:hidden mb-6">
              <select
                value={activeStep}
                onChange={(e) => setActiveStep(Number(e.target.value))}
                className="w-full px-4 py-3 bg-[#0F0F1A] border border-[#00F3FF]/30 rounded-lg text-white focus:border-[#00F3FF] focus:outline-none"
              >
                {processSteps.map((step, index) => (
                  <option key={index} value={index} className="bg-[#0F0F1A]">
                    Step {index + 1}: {step.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Desktop: Button Navigation */}
            <div className="hidden sm:flex flex-wrap justify-center gap-2 lg:gap-4">
              {processSteps.map((step, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-full font-medium transition-all text-xs sm:text-sm lg:text-base ${
                    activeStep === index
                      ? 'bg-[#00F3FF] text-[#0A0A12] shadow-[0_0_20px_rgba(0,243,255,0.5)]'
                      : 'bg-[#0F0F1A] text-gray-300 hover:bg-[#141420] border border-[#00F3FF]/20'
                  }`}
                >
                  <span className="hidden lg:inline">{index + 1}. {step.title}</span>
                  <span className="lg:hidden">{index + 1}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Active Step Content - Mobile Optimized */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-[#0F0F1A] rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 xl:p-12 border border-[#00F3FF]/20"
          >
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
              <div className="order-2 lg:order-1">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col sm:flex-row sm:items-center mb-4 sm:mb-6"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#00F3FF] rounded-full flex items-center justify-center text-[#0A0A12] font-bold text-lg sm:text-xl mb-3 sm:mb-0 sm:mr-4 mx-auto sm:mx-0">
                    {activeStep + 1}
                  </div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white text-center sm:text-left">
                    {processSteps[activeStep].title}
                  </h2>
                </motion.div>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-base sm:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 text-center sm:text-left"
                >
                  {processSteps[activeStep].description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                >
                  {activeStep > 0 && (
                    <button
                      onClick={() => setActiveStep(activeStep - 1)}
                      className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-[#0A0A12] border border-[#00F3FF]/30 text-white rounded-full hover:bg-[#00F3FF]/10 transition-all text-sm sm:text-base"
                    >
                      Previous Step
                    </button>
                  )}
                  {activeStep < processSteps.length - 1 ? (
                    <button
                      onClick={() => setActiveStep(activeStep + 1)}
                      className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-[#00F3FF] text-[#0A0A12] font-bold rounded-full hover:bg-[#00D1E0] transition-all text-sm sm:text-base"
                    >
                      Next Step
                    </button>
                  ) : (
                    <motion.button
                      onClick={() => setCurrentPage?.('contact')}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 0 20px rgba(57, 255, 20, 0.7)"
                      }}
                      className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-[#39FF14] text-[#0A0A12] font-bold rounded-full hover:bg-[#2ecc0f] transition-all text-sm sm:text-base"
                    >
                      Start Your Project
                    </motion.button>
                  )}
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="relative order-1 lg:order-2"
              >
                <div className="aspect-video rounded-lg sm:rounded-xl overflow-hidden border border-[#00F3FF]/30">
                  <img 
                    src={processSteps[activeStep].image}
                    alt={processSteps[activeStep].title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 bg-[#39FF14] rounded-full animate-pulse"></div>
                <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-4 h-4 sm:w-6 sm:h-6 bg-[#FF00FF] rounded-full animate-pulse delay-300"></div>
              </motion.div>
            </div>
          </motion.div>

          {/* Process Timeline - Mobile Optimized */}
          <div className="mt-12 sm:mt-16">
            <h3 className="text-xl sm:text-2xl font-bold text-white text-center mb-6 sm:mb-8">Complete Timeline</h3>
            
            {/* Mobile Timeline - Vertical Stack */}
            <div className="block lg:hidden space-y-6">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-[#00F3FF] rounded-full flex items-center justify-center text-[#0A0A12] font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1 bg-[#0F0F1A] p-4 rounded-xl border border-[#00F3FF]/20">
                    <h4 className="text-base sm:text-lg font-bold text-white mb-2">{step.title}</h4>
                    <p className="text-sm sm:text-base text-gray-400">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Desktop Timeline - Alternating Layout */}
            <div className="hidden lg:block relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#00F3FF] to-[#FF00FF]"></div>
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex items-center mb-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <div className="bg-[#0F0F1A] p-6 rounded-xl border border-[#00F3FF]/20">
                      <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                      <p className="text-gray-400">{step.description}</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-[#00F3FF] rounded-full flex items-center justify-center text-[#0A0A12] font-bold text-sm relative z-10">
                    {index + 1}
                  </div>
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProcessPage;