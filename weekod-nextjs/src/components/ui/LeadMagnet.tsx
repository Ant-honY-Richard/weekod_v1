'use client';

import { useState } from 'react';
import Image from 'next/image';

type LeadMagnetProps = {
  title: string;
  description: string;
  image: string;
  formId: string;
  downloadName: string;
};

const LeadMagnet: React.FC<LeadMagnetProps> = ({ 
  title, 
  description, 
  image, 
  formId,
  downloadName 
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In production, replace with actual API call
      // const response = await fetch('/api/lead-magnet', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, formId }),
      // });
      
      setIsSuccess(true);
      
      // Track conversion
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'lead_magnet_download', {
          'event_category': 'conversion',
          'event_label': formId
        });
      }
    } catch (error) {
      console.error('Lead magnet error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-[#0F0F1A] rounded-2xl overflow-hidden border border-[#00F3FF]/20 shadow-lg shadow-[#00F3FF]/5">
      <div className="grid md:grid-cols-2 gap-0">
        <div className="p-8">
          <h3 className="text-2xl font-bold mb-4">{title}</h3>
          <p className="text-gray-300 mb-6">{description}</p>
          
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full p-3 bg-[#0A0A12] border border-gray-700 rounded-lg focus:border-[#00F3FF] text-white"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-[#00F3FF] to-[#0A0A12] text-white font-bold rounded-lg transition-all hover:shadow-lg hover:shadow-[#00F3FF]/20"
              >
                {isSubmitting ? 'Sending...' : `Download ${downloadName}`}
              </button>
            </form>
          ) : (
            <div className="text-center p-6 bg-[#00F3FF]/10 rounded-lg border border-[#00F3FF]/30">
              <p className="text-[#00F3FF] font-bold mb-2">Thank you!</p>
              <p className="text-white mb-4">Check your email for your download link.</p>
              <a 
                href="#" 
                className="inline-block py-2 px-4 bg-[#00F3FF]/20 hover:bg-[#00F3FF]/30 text-white rounded-lg transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  // In production, replace with actual download link
                  alert('In production, this would trigger the actual download');
                }}
              >
                Download Now
              </a>
            </div>
          )}
        </div>
        <div className="relative h-64 md:h-auto">
          <Image
            src={image}
            alt={title}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </div>
  );
};

export default LeadMagnet;