'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

type Service = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string;
  path: string;
};

type ServiceSelectorProps = {
  services: Service[];
  title?: string;
  subtitle?: string;
};

const ServiceSelector: React.FC<ServiceSelectorProps> = ({ 
  services,
  title = 'Our Services',
  subtitle = 'Select a service to learn more'
}) => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  
  const handleServiceClick = (serviceId: string) => {
    setSelectedService(serviceId === selectedService ? null : serviceId);
  };
  
  const selectedServiceData = services.find(service => service.title === selectedService);
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {title && <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">{title}</h2>}
        {subtitle && <p className="text-xl text-gray-400 mb-12 text-center">{subtitle}</p>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(service => (
            <motion.div
              key={service.title}
              className={`service-card p-6 rounded-xl cursor-pointer border transition-all ${
                selectedService === service.title 
                  ? 'border-[#00F3FF] bg-[#0F0F1A] shadow-lg shadow-[#00F3FF]/10' 
                  : 'border-gray-800 bg-[#0A0A12] hover:border-gray-700'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleServiceClick(service.title)}
            >
              <div className="icon mb-4 text-[#00F3FF]">{service.icon}</div>
              <h4 className="text-xl font-bold mb-2">{service.title}</h4>
              <p className="text-gray-400">{service.description}</p>
            </motion.div>
          ))}
        </div>
        
        {selectedServiceData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="mt-12 p-8 bg-[#0F0F1A] rounded-xl border border-[#00F3FF]/30 shadow-lg shadow-[#00F3FF]/5"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">{selectedServiceData.title}</h3>
                <p className="text-gray-300">{selectedServiceData.description}</p>
              </div>
              <Link 
                href={selectedServiceData.path}
                className="mt-4 md:mt-0 py-3 px-6 bg-gradient-to-r from-[#00F3FF] to-[#0A0A12] text-white font-bold rounded-lg transition-all hover:shadow-lg hover:shadow-[#00F3FF]/20"
              >
                Learn More
              </Link>
            </div>
            
            <p className="text-gray-300">{selectedServiceData.details}</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ServiceSelector;