'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company?: string;
  avatar?: string;
};

type CaseStudyData = {
  title: string;
  client: string;
  type: string;
  duration: string;
  image: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  testimonial?: Testimonial;
  liveSite?: string;
};

type CaseStudyProps = {
  data: CaseStudyData;
};

const CaseStudy: React.FC<CaseStudyProps> = ({ data }) => {
  const {
    title,
    client,
    type,
    duration,
    image,
    challenge,
    solution,
    results,
    technologies,
    testimonial,
    liveSite
  } = data;
  
  return (
    <article className="case-study py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <span className="px-4 py-2 bg-[#0F0F1A] rounded-full text-sm">{client}</span>
              <span className="px-4 py-2 bg-[#0F0F1A] rounded-full text-sm">{type}</span>
              <span className="px-4 py-2 bg-[#0F0F1A] rounded-full text-sm">{duration}</span>
            </div>
          </header>
          
          <div className="relative w-full h-[400px] md:h-[500px] mb-12 rounded-xl overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, 1200px"
              priority
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-[#00F3FF]">The Challenge</h2>
              <p className="text-gray-300">{challenge}</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4 text-[#00F3FF]">Our Solution</h2>
              <p className="text-gray-300">{solution}</p>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {results.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-[#0F0F1A] p-6 rounded-xl border border-gray-800"
                >
                  <p className="text-center text-gray-200">{result}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          {testimonial && (
            <div className="mb-16 bg-[#0F0F1A] p-8 rounded-xl border border-[#00F3FF]/20">
              <blockquote className="text-xl italic text-gray-300 mb-6">"{testimonial.quote}"</blockquote>
              <div className="flex items-center">
                {testimonial.avatar && (
                  <div className="mr-4 relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                )}
                <div>
                  <p className="font-bold">{testimonial.author}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}{testimonial.company ? `, ${testimonial.company}` : ''}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">Technologies Used</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {technologies.map((tech, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 bg-[#0A0A12] border border-gray-800 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          {liveSite && (
            <div className="text-center">
              <a 
                href={liveSite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block py-3 px-8 bg-gradient-to-r from-[#00F3FF] to-[#0A0A12] text-white font-bold rounded-lg transition-all hover:shadow-lg hover:shadow-[#00F3FF]/20"
              >
                View Live Site
              </a>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default CaseStudy;