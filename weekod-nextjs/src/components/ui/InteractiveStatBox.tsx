'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';

interface TeamMembersBoxProps {
  className?: string;
}

export const TeamMembersBox: React.FC<TeamMembersBoxProps> = ({ className }) => {
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const avatarVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: shouldReduceMotion ? 0 : 1.5, 
        ease: "easeInOut" 
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      transition: { 
        duration: shouldReduceMotion ? 0 : 1.2, 
        ease: "easeInOut" 
      }
    }
  };

  return (
    <motion.div
      className={`bg-[#0F0F1A] rounded-lg sm:rounded-xl p-4 sm:p-6 border border-[#00F3FF]/20 text-center relative overflow-hidden ${className}`}
      whileHover={{ 
        y: -5,
        boxShadow: "0 5px 15px rgba(0, 243, 255, 0.3)"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      aria-label="4 Team Members - Interactive statistic"
    >
      {/* Team Avatars Illustration */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 10, mixBlendMode: 'screen' }}
        variants={avatarVariants}
        initial="hidden"
        animate={isHovered ? "visible" : "exit"}
      >
        <svg width="80%" height="80%" viewBox="0 0 120 80" className="opacity-60">
          {/* Avatar 1 */}
          <circle cx="20" cy="40" r="12" fill="#00F3FF" opacity="0.3" />
          <circle cx="20" cy="35" r="6" fill="#00F3FF" opacity="0.5" />
          <path d="M12 45 Q20 50 28 45" stroke="#00F3FF" strokeWidth="2" fill="none" opacity="0.4" />
          
          {/* Avatar 2 */}
          <circle cx="45" cy="40" r="12" fill="#39FF14" opacity="0.3" />
          <circle cx="45" cy="35" r="6" fill="#39FF14" opacity="0.5" />
          <path d="M37 45 Q45 50 53 45" stroke="#39FF14" strokeWidth="2" fill="none" opacity="0.4" />
          
          {/* Avatar 3 */}
          <circle cx="75" cy="40" r="12" fill="#FF00FF" opacity="0.3" />
          <circle cx="75" cy="35" r="6" fill="#FF00FF" opacity="0.5" />
          <path d="M67 45 Q75 50 83 45" stroke="#FF00FF" strokeWidth="2" fill="none" opacity="0.4" />
          
          {/* Avatar 4 */}
          <circle cx="100" cy="40" r="12" fill="#FFD700" opacity="0.3" />
          <circle cx="100" cy="35" r="6" fill="#FFD700" opacity="0.5" />
          <path d="M92 45 Q100 50 108 45" stroke="#FFD700" strokeWidth="2" fill="none" opacity="0.4" />
        </svg>
      </motion.div>

      <div className="relative z-20">
        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#00F3FF] mb-1 sm:mb-2" style={{ textShadow: "0 0 10px rgba(0, 243, 255, 0.5)" }}>4</div>
        <p className="text-gray-400 text-xs sm:text-sm">Team Members</p>
      </div>
    </motion.div>
  );
};

interface ProjectsCompletedBoxProps {
  className?: string;
}

export const ProjectsCompletedBox: React.FC<ProjectsCompletedBoxProps> = ({ className }) => {
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const starVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.2,
        delay: shouldReduceMotion ? 0 : i * 0.08,
        ease: "easeOut"
      }
    }),
    exit: {
      opacity: 0,
      scale: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.15,
        ease: "easeIn"
      }
    }
  };

  const starColors = [
    '#39FF14', '#00F3FF', '#FF00FF', '#FFD700', '#FF6B35'
  ];

  return (
    <motion.div
      className={`bg-[#0F0F1A] rounded-lg sm:rounded-xl p-4 sm:p-6 border border-[#39FF14]/20 text-center relative overflow-hidden ${className}`}
      whileHover={{ 
        y: -5,
        boxShadow: "0 5px 15px rgba(57, 255, 20, 0.3)"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      aria-label="15+ Projects Completed - Interactive statistic"
    >
      <div className="relative z-20 flex flex-col items-center justify-center h-full">
        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#39FF14] mb-1 sm:mb-2" style={{ textShadow: "0 0 10px rgba(57, 255, 20, 0.5)" }}>15+</div>
        <p className="text-gray-400 text-xs sm:text-sm mb-2">Projects Completed</p>
        
        {/* Stars Row - positioned below text */}
        <div className="flex items-center justify-center gap-1 flex-wrap max-w-full px-1">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="flex items-center justify-center"
              variants={starVariants}
              initial="hidden"
              animate={isHovered ? "visible" : "exit"}
              custom={i}
            >
              <svg 
                width="8" 
                height="8" 
                viewBox="0 0 24 24" 
                fill={starColors[i % starColors.length]}
                stroke={starColors[i % starColors.length]}
                strokeWidth="1"
                style={{ 
                  filter: `drop-shadow(0 0 2px ${starColors[i % starColors.length]}60)`
                }}
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

interface ClientSatisfactionBoxProps {
  className?: string;
}

export const ClientSatisfactionBox: React.FC<ClientSatisfactionBoxProps> = ({ className }) => {
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const liquidVariants = {
    hidden: { 
      y: "100%",
      transition: { 
        duration: shouldReduceMotion ? 0 : 2.2, 
        ease: "easeInOut" 
      }
    },
    visible: { 
      y: "1%", // Fill to 99%
      transition: { 
        duration: shouldReduceMotion ? 0 : 2.5, 
        ease: "easeInOut" 
      }
    }
  };

  const waveVariants = {
    animate: {
      rotate: 360,
      y: [0, -100],
      transition: {
        rotate: {
          duration: shouldReduceMotion ? 0 : 6,
          repeat: Infinity,
          ease: "linear"
        },
        y: {
          duration: shouldReduceMotion ? 0 : 6,
          repeat: Infinity,
          ease: "linear"
        }
      }
    }
  };

  const textVariants = {
    default: { 
      color: "#FF00FF",
      textShadow: "0 0 10px rgba(255, 0, 255, 0.5)"
    },
    active: { 
      color: "#39FF14",
      textShadow: "0 0 12px rgba(57, 255, 20, 0.8)",
      transition: { duration: shouldReduceMotion ? 0 : 0.3 }
    }
  };

  return (
    <motion.div
      className={`bg-[#0F0F1A] rounded-lg sm:rounded-xl p-4 sm:p-6 border border-[#FF00FF]/20 text-center relative overflow-hidden ${className}`}
      whileHover={{ 
        y: -5,
        boxShadow: "0 5px 15px rgba(255, 0, 255, 0.3)"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      aria-label="99% Client Satisfaction - Interactive statistic"
    >
      {/* Liquid Fill Container */}
      <div className="absolute inset-0 rounded-lg sm:rounded-xl overflow-hidden">
        {/* Base liquid fill */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#FF6FA7] to-[#FF6FA7]/90"
          variants={liquidVariants}
          initial="hidden"
          animate={isHovered ? "visible" : "hidden"}
          style={{ 
            height: "100%",
            borderRadius: "inherit"
          }}
        >
          {/* Wave effect using rotating circular elements */}
          <motion.div
            className="absolute -bottom-1/2 -left-1/2 w-[200%] h-[200%] rounded-[40%]"
            style={{
              background: "#0F0F1A", // Background color to create wave effect
              boxSizing: "border-box"
            }}
            variants={waveVariants}
            animate={isHovered && !shouldReduceMotion ? "animate" : ""}
          />
          
          {/* Second wave for more complex motion */}
          <motion.div
            className="absolute -bottom-1/2 -left-1/2 w-[200%] h-[200%] rounded-[40%] opacity-70"
            style={{
              background: "#0F0F1A",
              boxSizing: "border-box"
            }}
            variants={{
              animate: {
                rotate: -360,
                y: [0, -100],
                transition: {
                  rotate: {
                    duration: shouldReduceMotion ? 0 : 8,
                    repeat: Infinity,
                    ease: "linear"
                  },
                  y: {
                    duration: shouldReduceMotion ? 0 : 8,
                    repeat: Infinity,
                    ease: "linear"
                  }
                }
              }
            }}
            animate={isHovered && !shouldReduceMotion ? "animate" : ""}
          />
        </motion.div>
      </div>

      <motion.div 
        className="relative z-20"
        variants={textVariants}
        animate={isHovered ? "active" : "default"}
      >
        <motion.div 
          className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2"
          style={{ 
            color: isHovered ? "#39FF14" : "#FF00FF",
            textShadow: isHovered ? "0 0 12px rgba(57, 255, 20, 0.8)" : "0 0 10px rgba(255, 0, 255, 0.5)" 
          }}
        >
          99%
        </motion.div>
        <p className="text-gray-400 text-xs sm:text-sm">Client Satisfaction</p>
      </motion.div>
    </motion.div>
  );
};

interface SupportAvailableBoxProps {
  className?: string;
}

export const SupportAvailableBox: React.FC<SupportAvailableBoxProps> = ({ className }) => {
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const clockVariants = {
    hidden: { opacity: 0, rotate: 0 },
    visible: { 
      opacity: 0.6, 
      rotate: 15,
      transition: { 
        duration: shouldReduceMotion ? 0 : 1.8, 
        ease: "easeOut" 
      }
    },
    exit: { 
      opacity: 0, 
      rotate: 0,
      transition: { 
        duration: shouldReduceMotion ? 0 : 1.4, 
        ease: "easeOut" 
      }
    }
  };

  const handVariants = {
    tick: {
      rotate: [0, 6, 0],
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
        repeat: isHovered ? Infinity : 0,
        repeatDelay: 1
      }
    }
  };

  return (
    <motion.div
      className={`bg-[#0F0F1A] rounded-lg sm:rounded-xl p-4 sm:p-6 border border-[#00F3FF]/20 text-center relative overflow-hidden ${className}`}
      whileHover={{ 
        y: -5,
        boxShadow: "0 5px 15px rgba(0, 243, 255, 0.3)"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      aria-label="24/7 Support Available - Interactive statistic"
    >
      {/* Clock Icon */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        variants={clockVariants}
        initial="hidden"
        animate={isHovered ? "visible" : "exit"}
      >
        <svg width="60%" height="60%" viewBox="0 0 100 100" className="text-[#39FF14]">
          {/* Clock Face */}
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.6" />
          
          {/* Hour Markers - Pre-calculated coordinates to avoid hydration mismatch */}
          {[
            { x1: 50, y1: 15, x2: 50, y2: 20 }, // 12 o'clock
            { x1: 67.5, y1: 21.7, x2: 63.7, y2: 25.5 }, // 1 o'clock
            { x1: 78.3, y1: 35, x2: 73.3, y2: 35 }, // 2 o'clock
            { x1: 82.1, y1: 52.5, x2: 77.1, y2: 50 }, // 3 o'clock
            { x1: 78.3, y1: 70, x2: 73.3, y2: 65 }, // 4 o'clock
            { x1: 67.5, y1: 83.3, x2: 63.7, y2: 79.5 }, // 5 o'clock
            { x1: 50, y1: 85, x2: 50, y2: 80 }, // 6 o'clock
            { x1: 32.5, y1: 83.3, x2: 36.3, y2: 79.5 }, // 7 o'clock
            { x1: 21.7, y1: 70, x2: 26.7, y2: 65 }, // 8 o'clock
            { x1: 17.9, y1: 52.5, x2: 22.9, y2: 50 }, // 9 o'clock
            { x1: 21.7, y1: 35, x2: 26.7, y2: 35 }, // 10 o'clock
            { x1: 32.5, y1: 21.7, x2: 36.3, y2: 25.5 }, // 11 o'clock
          ].map((coords, i) => (
            <line
              key={i}
              x1={coords.x1}
              y1={coords.y1}
              x2={coords.x2}
              y2={coords.y2}
              stroke="currentColor"
              strokeWidth="2"
              opacity="0.4"
            />
          ))}
          
          {/* Clock Hands */}
          <motion.g variants={handVariants} animate={isHovered ? "tick" : ""}>
            {/* Hour Hand */}
            <line x1="50" y1="50" x2="50" y2="30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
            {/* Minute Hand */}
            <line x1="50" y1="50" x2="65" y2="25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          </motion.g>
          
          {/* Center Dot */}
          <circle cx="50" cy="50" r="3" fill="currentColor" opacity="0.8" />
        </svg>
      </motion.div>

      <div className="relative z-20">
        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#00F3FF] mb-1 sm:mb-2" style={{ textShadow: "0 0 10px rgba(0, 243, 255, 0.5)" }}>24/7</div>
        <p className="text-gray-400 text-xs sm:text-sm">Support Available</p>
      </div>
    </motion.div>
  );
};