'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageType } from '@/types';
import { analytics } from '@/lib/analytics';
import TestimonialsCarousel from '@/components/ui/TestimonialsCarousel';

interface ContactPageProps {
  setCurrentPage?: (page: PageType) => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    project: '',
    budget: '',
    message: ''
  });

  // Testimonials data
  const testimonials = [
    {
      quote: "The fastest and most responsive team we've worked with!",
      author: "Jissy T.",
      role: "Founder"
    },
    {
      quote: "Their ability to turn abstract ideas into beautiful websites is impressive—I barely lifted a finger.",
      author: "Rohit Arora",
      role: "Product Manager"
    },
    {
      quote: "Weekod's AI-driven workflow cut our launch time in half. We're already seeing results.",
      author: "Mayuri Anand",
      role: "Operations Lead"
    },
    {
      quote: "I loved the hands-on approach. Every feedback loop made the end product better and uniquely ours.",
      author: "Alex Mathew",
      role: "Head of Marketing"
    },
    {
      quote: "Having a single team handle web, app, and AI made our journey seamless. Highly recommended!",
      author: "Neel Joshi",
      role: "Director"
    },
    {
      quote: "Support is phenomenal—proactively fixing issues before they even reached us.",
      author: "Ananya Mehra",
      role: "Community Manager"
    },
    {
      quote: "The progress updates were super clear. It felt like we had a real partnership, not just an agency.",
      author: "Sidharth L.",
      role: "Co-Founder"
    },
    {
      quote: "Weekod delivered what larger agencies promised, but with way more energy and actual innovation.",
      author: "Sneha Pillai",
      role: "UX Lead"
    },
    {
      quote: "They took our half-baked app idea and turned it into a functional prototype within two weeks.",
      author: "Ravi Chandra",
      role: "Program Lead"
    },
    {
      quote: "The creative use of AI made our site smarter and easier to manage. Analytics are up—and so is engagement!",
      author: "Aakash Deep",
      role: "Digital Growth Consultant"
    }
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [fieldValidation, setFieldValidation] = useState<Record<string, boolean>>({});
  const [formStarted, setFormStarted] = useState(false);

  // Floating dots animation
  const [dots, setDots] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    // Generate floating dots
    const newDots = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 10
    }));
    setDots(newDots);
  }, []);

  const validateField = (name: string, value: string): boolean => {
    let isValid = true;
    let errorMessage = '';

    switch (name) {
      case 'name':
        isValid = value.length >= 2;
        errorMessage = 'Please enter your name';
        break;
      case 'email':
        isValid = /^[^@]+@[^@]+\.[^@]+$/.test(value);
        errorMessage = 'Enter a valid email address';
        break;
      case 'project':
        isValid = value !== '';
        errorMessage = 'Please select your project type';
        break;
      case 'message':
        isValid = value.length >= 10;
        errorMessage = 'Please provide at least 10 characters';
        break;
      default:
        isValid = true;
    }

    setFieldErrors(prev => ({
      ...prev,
      [name]: isValid ? '' : errorMessage
    }));

    setFieldValidation(prev => ({
      ...prev,
      [name]: isValid
    }));

    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (!formStarted) {
      setFormStarted(true);
      analytics.trackFormStart();
    }

    setFormData({
      ...formData,
      [name]: value
    });

    // Clear any previous status messages when user starts typing
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: '' });
    }

    // Inline validation
    if (value) {
      validateField(name, value);
    } else {
      setFieldErrors(prev => ({ ...prev, [name]: '' }));
      setFieldValidation(prev => ({ ...prev, [name]: false }));
    }
  };

  const handleFieldBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    analytics.trackFieldFocus(name);
    if (value) {
      validateField(name, value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    // Validate all required fields
    const requiredFields = ['name', 'email', 'project', 'message'];
    let hasErrors = false;

    requiredFields.forEach(field => {
      if (!validateField(field, formData[field as keyof typeof formData])) {
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setIsSubmitting(false);
      setSubmitStatus({
        type: 'error',
        message: 'Please fix the errors above and try again.'
      });
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        analytics.trackFormSubmitSuccess(formData);
        setSubmitStatus({
          type: 'success',
          message: 'Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.'
        });
        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          project: '',
          budget: '',
          message: ''
        });
        setFieldErrors({});
        setFieldValidation({});
        setFormStarted(false);
      } else {
        analytics.trackFormSubmitError(result.error || 'API Error');
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Something went wrong. Please try again.'
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      analytics.trackFormSubmitError('Network Error');
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openWhatsApp = () => {
    analytics.trackWhatsAppClick();
    const message = encodeURIComponent("Hi! I'm interested in discussing a project with Weekod.");
    window.open(`https://wa.me/918151018502?text=${message}`, '_blank');
  };

  const getFieldIcon = (fieldName: string) => {
    const icons = {
      name: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      email: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      company: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      project: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
        </svg>
      ),
      budget: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      message: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      )
    };
    return icons[fieldName as keyof typeof icons];
  };

  return (
    <div className="min-h-screen bg-[#0A0A12] relative overflow-hidden">
      {/* Animated Background with Floating Dots */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F0F1A] via-[#0A0A12] to-[#0F0F1A]">
        {dots.map((dot) => (
          <motion.div
            key={dot.id}
            className="absolute w-1 h-1 bg-[#00F3FF]/20 rounded-full"
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 6,
              delay: dot.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Title Block */}
      <section className="relative py-20 text-center">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 
              className="text-5xl md:text-6xl font-bold mb-6 text-[#00F3FF] font-space-grotesk"
              style={{ 
                textShadow: "0 0 30px rgba(0, 243, 255, 0.5)"
              }}
            >
              Let's Build Something Amazing
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 font-manrope">
              Ready to transform your ideas into digital reality? Start the conversation.
            </p>
            <p className="text-gray-400 max-w-3xl mx-auto text-lg">
              Whether you have a clear plan or just a spark of an idea, we're here to help you bring it to life with our unique blend of AI and human creativity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-[#0F0F1A]/80 backdrop-blur-xl rounded-3xl p-8 border border-[#00F3FF]/30 shadow-2xl">
                <h2 className="text-2xl font-bold text-white mb-8 font-space-grotesk">
                  Tell Us About Your Project
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Error Summary */}
                  {Object.keys(fieldErrors).some(key => fieldErrors[key]) && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
                    >
                      <div className="flex items-center text-red-400 text-sm">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Please fix the errors below
                      </div>
                    </motion.div>
                  )}

                  {/* Form Fields */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                    >
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <div className={`${fieldValidation.name ? 'text-[#39FF14]' : fieldErrors.name ? 'text-red-400' : 'text-gray-500'}`}>
                            {getFieldIcon('name')}
                          </div>
                        </div>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          autoComplete="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          onBlur={handleFieldBlur}
                          className={`w-full pl-12 pr-12 py-4 bg-[#0A0A12]/50 backdrop-blur-sm rounded-xl text-white placeholder-gray-500 transition-all duration-300 ${
                            fieldValidation.name 
                              ? 'border-2 border-[#39FF14] focus:ring-2 focus:ring-[#39FF14]/20' 
                              : fieldErrors.name 
                                ? 'border-2 border-red-400 focus:ring-2 focus:ring-red-400/20'
                                : 'border border-[#00F3FF]/30 focus:border-[#00F3FF] focus:ring-2 focus:ring-[#00F3FF]/20'
                          } focus:outline-none`}
                          placeholder="Your full name"
                        />
                        {fieldValidation.name && (
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <svg className="w-5 h-5 text-[#39FF14]" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                        {fieldErrors.name && (
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                      {fieldErrors.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-sm text-red-400"
                        >
                          {fieldErrors.name}
                        </motion.p>
                      )}
                    </motion.div>

                    {/* Email Field */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <div className={`${fieldValidation.email ? 'text-[#39FF14]' : fieldErrors.email ? 'text-red-400' : 'text-gray-500'}`}>
                            {getFieldIcon('email')}
                          </div>
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          autoComplete="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          onBlur={handleFieldBlur}
                          className={`w-full pl-12 pr-12 py-4 bg-[#0A0A12]/50 backdrop-blur-sm rounded-xl text-white placeholder-gray-500 transition-all duration-300 ${
                            fieldValidation.email 
                              ? 'border-2 border-[#39FF14] focus:ring-2 focus:ring-[#39FF14]/20' 
                              : fieldErrors.email 
                                ? 'border-2 border-red-400 focus:ring-2 focus:ring-red-400/20'
                                : 'border border-[#00F3FF]/30 focus:border-[#00F3FF] focus:ring-2 focus:ring-[#00F3FF]/20'
                          } focus:outline-none`}
                          placeholder="your@email.com"
                        />
                        {fieldValidation.email && (
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <svg className="w-5 h-5 text-[#39FF14]" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                        {fieldErrors.email && (
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                      {fieldErrors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-sm text-red-400"
                        >
                          {fieldErrors.email}
                        </motion.p>
                      )}
                    </motion.div>
                  </div>

                  {/* Company Field */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                      Company/Organization
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                        {getFieldIcon('company')}
                      </div>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full pl-12 py-4 bg-[#0A0A12]/50 backdrop-blur-sm border border-[#00F3FF]/30 rounded-xl text-white placeholder-gray-500 focus:border-[#00F3FF] focus:outline-none focus:ring-2 focus:ring-[#00F3FF]/20 transition-all duration-300"
                        placeholder="Your company name (optional)"
                      />
                    </div>
                  </motion.div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Project Type Field */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      <label htmlFor="project" className="block text-sm font-medium text-gray-300 mb-2">
                        Project Type *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <div className={`${fieldValidation.project ? 'text-[#39FF14]' : fieldErrors.project ? 'text-red-400' : 'text-gray-500'}`}>
                            {getFieldIcon('project')}
                          </div>
                        </div>
                        <select
                          id="project"
                          name="project"
                          value={formData.project}
                          onChange={handleInputChange}
                          onBlur={handleFieldBlur}
                          className={`w-full pl-12 pr-4 py-4 bg-[#0A0A12]/50 backdrop-blur-sm rounded-xl text-white transition-all duration-300 ${
                            fieldValidation.project 
                              ? 'border-2 border-[#39FF14] focus:ring-2 focus:ring-[#39FF14]/20' 
                              : fieldErrors.project 
                                ? 'border-2 border-red-400 focus:ring-2 focus:ring-red-400/20'
                                : 'border border-[#00F3FF]/30 focus:border-[#00F3FF] focus:ring-2 focus:ring-[#00F3FF]/20'
                          } focus:outline-none`}
                        >
                          <option value="">Select project type</option>
                          <option value="Custom Website">Custom Website</option>
                          <option value="Mobile App">Mobile App</option>
                          <option value="AI Solution">AI Solution</option>
                          <option value="Maintenance & Support">Maintenance & Support</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      {fieldErrors.project && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-sm text-red-400"
                        >
                          {fieldErrors.project}
                        </motion.p>
                      )}
                    </motion.div>

                    {/* Budget Field */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">
                        Budget Range
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                          {getFieldIcon('budget')}
                        </div>
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-4 bg-[#0A0A12]/50 backdrop-blur-sm border border-[#00F3FF]/30 rounded-xl text-white focus:border-[#00F3FF] focus:outline-none focus:ring-2 focus:ring-[#00F3FF]/20 transition-all duration-300"
                        >
                          <option value="">Select budget range</option>
                          <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
                          <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                          <option value="₹1,00,000+">₹1,00,000+</option>
                          <option value="Let's discuss">Let's discuss</option>
                        </select>
                      </div>
                    </motion.div>
                  </div>

                  {/* Message Field */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Project Details *
                    </label>
                    <div className="relative">
                      <div className="absolute top-4 left-3 pointer-events-none">
                        <div className={`${fieldValidation.message ? 'text-[#39FF14]' : fieldErrors.message ? 'text-red-400' : 'text-gray-500'}`}>
                          {getFieldIcon('message')}
                        </div>
                      </div>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        onBlur={handleFieldBlur}
                        className={`w-full pl-12 pr-4 py-4 bg-[#0A0A12]/50 backdrop-blur-sm rounded-xl text-white placeholder-gray-500 resize-none transition-all duration-300 ${
                          fieldValidation.message 
                            ? 'border-2 border-[#39FF14] focus:ring-2 focus:ring-[#39FF14]/20' 
                            : fieldErrors.message 
                              ? 'border-2 border-red-400 focus:ring-2 focus:ring-red-400/20'
                              : 'border border-[#00F3FF]/30 focus:border-[#00F3FF] focus:ring-2 focus:ring-[#00F3FF]/20'
                        } focus:outline-none`}
                        placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                      />
                    </div>
                    {fieldErrors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-red-400"
                      >
                        {fieldErrors.message}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Status Message */}
                  <AnimatePresence>
                    {submitStatus.type && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`p-4 rounded-xl border backdrop-blur-sm ${
                          submitStatus.type === 'success'
                            ? 'bg-[#39FF14]/10 border-[#39FF14]/30 text-[#39FF14]'
                            : 'bg-red-500/10 border-red-500/30 text-red-400'
                        }`}
                      >
                        <div className="flex items-start">
                          {submitStatus.type === 'success' ? (
                            <motion.svg 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" 
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                            >
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </motion.svg>
                          ) : (
                            <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          )}
                          <span className="text-sm">{submitStatus.message}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    whileHover={!isSubmitting ? { 
                      scale: 1.02,
                      boxShadow: "0 0 40px rgba(57, 255, 20, 0.6)"
                    } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    className={`w-full text-lg font-bold py-4 rounded-full transition-all duration-300 font-space-grotesk ${
                      isSubmitting
                        ? 'bg-gray-600 cursor-not-allowed text-gray-300'
                        : 'bg-[#39FF14] hover:bg-[#2ecc0f] text-[#0A0A12] shadow-lg hover:shadow-2xl'
                    }`}
                    style={{ 
                      boxShadow: !isSubmitting ? '0 0 25px rgba(57, 255, 20, 0.4)' : 'none'
                    }}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <motion.svg 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 mr-3" 
                          fill="none" 
                          viewBox="0 0 24 24"
                        >
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </motion.svg>
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Send Message
                      </div>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Trust and Conversion Panel */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Quick Response Guarantee */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-[#0F0F1A]/80 backdrop-blur-xl rounded-2xl p-6 border border-[#00F3FF]/30"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#00F3FF]/10 rounded-xl flex items-center justify-center text-[#00F3FF]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Quick Response Guarantee</h3>
                    <p className="text-gray-300 text-sm">
                      We reply to all inquiries within 24 hours or less — usually much quicker.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* WhatsApp CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-[#0F0F1A]/80 backdrop-blur-xl rounded-2xl p-6 border border-[#00F3FF]/30"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#25D366]/10 rounded-xl flex items-center justify-center text-[#25D366]">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">Prefer phone or WhatsApp?</h3>
                    <p className="text-gray-300 text-sm mb-4">
                      Call us at +91 8088310013 or message instantly on WhatsApp.
                    </p>
                    <motion.button
                      onClick={openWhatsApp}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-[#25D366] hover:bg-[#20b858] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                    >
                      Start WhatsApp Chat
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Privacy Note */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-[#0F0F1A]/80 backdrop-blur-xl rounded-2xl p-6 border border-[#00F3FF]/30"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#39FF14]/10 rounded-xl flex items-center justify-center text-[#39FF14]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Privacy Note</h3>
                    <p className="text-gray-300 text-sm">
                      Your details stay private. We never share your info.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Testimonials Carousel */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-white mb-2 font-space-grotesk flex items-center">
                    <div className="w-8 h-8 bg-[#FFD700]/10 rounded-lg flex items-center justify-center text-[#FFD700] mr-3">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    Trusted by Founders
                  </h3>
                </div>
                <TestimonialsCarousel 
                  testimonials={testimonials}
                  intervalSeconds={4}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;