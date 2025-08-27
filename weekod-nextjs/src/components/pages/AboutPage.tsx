'use client';

import { motion } from 'framer-motion';
import { teamMembers } from '@/data';
import { PageType } from '@/types';

interface AboutPageProps {
  setCurrentPage?: (page: PageType) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ setCurrentPage }) => {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white" style={{ textShadow: "0 0 15px rgba(0, 243, 255, 0.5)" }}>About Weekod</h1>
            <p className="text-xl text-gray-300 mb-8">
              We&apos;re a passionate team of developers and AI experts dedicated to transforming your digital dreams into reality.
            </p>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Founded with the vision of combining cutting-edge AI technology with human creativity, Weekod represents the future of web development. Our young, energetic team brings fresh perspectives and innovative solutions to every project.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-white">Meet Our Team</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Four passionate individuals working together to bring your vision to life
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10, 
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                className="group relative"
              >
                {/* Glowing background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00F3FF]/20 via-[#39FF14]/10 to-[#FF6B6B]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Main card */}
                <div className="relative bg-gradient-to-br from-[#0F0F1A] via-[#1A1A2E] to-[#0F0F1A] rounded-2xl p-6 border border-[#00F3FF]/30 backdrop-blur-sm overflow-hidden">
                  {/* Animated border gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00F3FF]/50 via-[#39FF14]/50 to-[#FF6B6B]/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                       style={{ padding: '1px' }}>
                    <div className="bg-gradient-to-br from-[#0F0F1A] via-[#1A1A2E] to-[#0F0F1A] rounded-2xl h-full w-full" />
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 text-center">
                    {/* Profile image with creative styling */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-24 h-24 mx-auto mb-4"
                    >
                      {/* Rotating ring */}
                      <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#00F3FF]/50 animate-spin-slow" />
                      <div className="absolute inset-1 rounded-full border border-[#39FF14]/30" />
                      
                      {/* Image container */}
                      <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[#00F3FF]/40 bg-gradient-to-br from-[#00F3FF]/20 to-[#39FF14]/20">
                        <img 
                          src={member.image} 
                          alt={member.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A12]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </motion.div>

                    {/* Name with gradient text */}
                    <h3 className="text-lg font-bold mb-2 bg-gradient-to-r from-white via-[#00F3FF] to-white bg-clip-text text-transparent">
                      {member.name}
                    </h3>
                    
                    {/* Role with accent color */}
                    <div className="relative mb-3">
                      <p className="text-[#39FF14] font-semibold text-sm tracking-wide uppercase">
                        {member.role}
                      </p>
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-transparent via-[#39FF14] to-transparent" />
                    </div>
                    
                    {/* Bio with improved typography */}
                    <p className="text-gray-400 text-xs leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                      {member.bio}
                    </p>

                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 w-2 h-2 bg-[#00F3FF] rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 w-1 h-1 bg-[#39FF14] rounded-full opacity-30 group-hover:opacity-70 transition-opacity duration-300" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-[#0F0F1A]">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-white">Our Values</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Innovation First",
                description: "We embrace cutting-edge AI technology to deliver solutions that are ahead of the curve.",
                icon: "🚀"
              },
              {
                title: "Human Touch",
                description: "Technology is powerful, but human creativity and empathy make the difference.",
                icon: "❤️"
              },
              {
                title: "Transparency",
                description: "Clear communication and honest collaboration throughout every project.",
                icon: "🔍"
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-[#0A0A12] rounded-xl p-6 border border-[#00F3FF]/20 text-center"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
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
            <h2 className="text-3xl font-bold mb-6 text-white">Ready to Work Together?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss your project and see how we can bring your vision to life with our unique blend of AI and human creativity.
            </p>
            <motion.button 
              onClick={() => setCurrentPage?.('contact')}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 25px rgba(57, 255, 20, 0.7)"
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#39FF14] hover:bg-[#2ecc0f] text-[#0A0A12] text-lg font-bold px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-xl"
            >
              Start Your Project
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;