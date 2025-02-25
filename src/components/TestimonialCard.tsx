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

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden h-full"
      whileHover={{ 
        y: -5,
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        transition: { duration: 0.2 }
      }}
    >
      <div className="relative h-48 w-full">
        <Image
          src={testimonial.image}
          alt={testimonial.name}
          fill
          style={{ objectFit: 'cover' }}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex items-center">
            <span className="text-2xl mr-2" aria-hidden="true">{exposureIcon}</span>
            <span className="text-white font-medium text-sm">{exposureLabel}</span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <blockquote className="italic text-gray-700 mb-4">"{testimonial.quote}"</blockquote>
        
        <div className="flex justify-between items-end">
          <div>
            <p className="font-bold text-gray-900">{testimonial.name}</p>
            <p className="text-sm text-gray-600">{testimonial.location}</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-green-600">{testimonial.settlement}</p>
            <p className="text-xs text-gray-500">Settlement ({testimonial.year})</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard; 