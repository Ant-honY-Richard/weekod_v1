'use client';

import React from 'react';

interface ServiceIconProps {
  type: string;
  className?: string;
  color?: string;
}

const ServiceIcon: React.FC<ServiceIconProps> = ({ type, className = "w-8 h-8", color = "currentColor" }) => {
  const getIcon = () => {
    switch (type) {
      case 'website-design':
        return (
          <svg className={className} fill="none" stroke={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            <circle cx="8" cy="9" r="1" fill={color}/>
            <circle cx="12" cy="9" r="1" fill={color}/>
            <circle cx="16" cy="9" r="1" fill={color}/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 13h10"/>
          </svg>
        );
      
      case 'ai-solutions':
        return (
          <svg className={className} fill="none" stroke={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
            <circle cx="12" cy="8" r="1.5" fill={color}/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 12h4"/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 14h2"/>
          </svg>
        );
      
      case 'app-development':
        return (
          <svg className={className} fill="none" stroke={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z"/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 7h6"/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 10h6"/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 13h4"/>
            <circle cx="12" cy="16" r="1" fill={color}/>
          </svg>
        );
      
      case 'maintenance-support':
        return (
          <svg className={className} fill="none" stroke={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            <circle cx="12" cy="12" r="1" fill={color}/>
          </svg>
        );
      
      case 'ideation-planning':
        return (
          <svg className={className} fill="none" stroke={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 10l2 2 4-4"/>
          </svg>
        );
      
      case 'ai-development':
        return (
          <svg className={className} fill="none" stroke={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            <circle cx="7" cy="7" r="1" fill={color}/>
            <circle cx="17" cy="17" r="1" fill={color}/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 5l2 2"/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 17l2 2"/>
          </svg>
        );
      
      case 'launch-optimize':
        return (
          <svg className={className} fill="none" stroke={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11.5V14m0-2.5v-5a1.5 1.5 0 113 0m-3 5a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 20l3-3-3-3"/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h4"/>
          </svg>
        );
      
      default:
        return (
          <svg className={className} fill="none" stroke={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        );
    }
  };

  return getIcon();
};

export default ServiceIcon;