import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  exposureType: 'factory' | 'water' | 'military';
  image: string;
  quote: string;
  settlement: string;
  year: number;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  // Map exposure type to icon
  const exposureIcon = {
    factory: '🏭',
    water: '💧',
    military: '🎖️',
  }[testimonial.exposureType];

  // Map exposure type to label
  const exposureLabel = {
    factory: 'Factory Exposure',
    water: 'Drinking Water Contamination',
    military: 'Military Base Exposure',
  }[testimonial.exposureType];
  
  // Map exposure type to color
  const exposureColor = {
    factory: 'from-orange-600 to-red-600',
    water: 'from-blue-600 to-cyan-600',
    military: 'from-green-600 to-emerald-600',
  }[testimonial.exposureType];

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col"
      whileHover={{ 
        y: -8,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        transition: { duration: 0.2 }
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative h-56 w-full">
        <Image
          src={testimonial.image}
          alt={testimonial.name}
          fill
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-700 ease-in-out group-hover:scale-110"
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${exposureColor} opacity-60`}></div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4">
          <motion.div 
            className="flex items-center"
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <span className="text-2xl mr-2 bg-white bg-opacity-20 p-1 rounded-full" aria-hidden="true">{exposureIcon}</span>
            <span className="text-white font-medium text-sm">{exposureLabel}</span>
          </motion.div>
        </div>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <motion.blockquote 
          className="italic text-gray-700 mb-4 flex-grow"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <span className="text-4xl text-gray-300 leading-none font-serif">"</span>
          <p className="inline">{testimonial.quote}</p>
          <span className="text-4xl text-gray-300 leading-none font-serif">"</span>
        </motion.blockquote>
        
        <motion.div 
          className="flex justify-between items-end mt-auto pt-4 border-t border-gray-100"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div>
            <p className="font-bold text-gray-900">{testimonial.name}</p>
            <p className="text-sm text-gray-600">{testimonial.location}</p>
          </div>
          <div className="text-right">
            <motion.p 
              className="font-bold text-green-600"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {testimonial.settlement}
            </motion.p>
            <p className="text-xs text-gray-500">Settlement ({testimonial.year})</p>
          </div>
        </motion.div>
      </div>
      
      {/* Corner ribbon */}
      <div className="absolute top-0 right-0 overflow-hidden w-24 h-24 z-10">
        <div className={`bg-gradient-to-r ${exposureColor} text-white font-bold text-xs text-center 
                        transform rotate-45 w-32 absolute top-5 right-[-32px] py-1 shadow-md`}>
          {testimonial.year}
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard; 