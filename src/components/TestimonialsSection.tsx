import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TestimonialCard, { Testimonial } from './TestimonialCard';
import { GeolocationResponse } from '@/types';
import Link from "next/link";

// Base testimonials data
const baseTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Michael Johnson',
    location: 'Camp Lejeune, NC',
    exposureType: 'military',
    image: '/images/testimonials/military-worker.jpg',
    quote: 'After serving at Camp Lejeune for 8 years, I was diagnosed with kidney cancer. The settlement helped cover my medical expenses and provided for my family during treatment.',
    settlement: '$850,000',
    year: 2022,
  },
  {
    id: '2',
    name: 'Sarah Williams',
    location: 'Hoosick Falls, NY',
    exposureType: 'water',
    image: '/images/testimonials/office-worker.jpg',
    quote: 'Our entire community\'s water was contaminated. After years of health issues, we finally got justice. The settlement helped us relocate to a safer area.',
    settlement: '$425,000',
    year: 2021,
  },
  {
    id: '3',
    name: 'Robert Davis',
    location: 'Parkersburg, WV',
    exposureType: 'factory',
    image: '/images/testimonials/factory-worker.jpg',
    quote: 'I worked at the chemical plant for 15 years before being diagnosed. The legal team fought for me when I couldn\'t fight for myself.',
    settlement: '$1.2 Million',
    year: 2023,
  },
  {
    id: '4',
    name: 'Jennifer Martinez',
    location: 'Parchment, MI',
    exposureType: 'water',
    image: '/images/testimonials/mother.jpg',
    quote: 'My children developed serious health issues from our contaminated water supply. This settlement means they\'ll get the specialized care they need.',
    settlement: '$675,000',
    year: 2022,
  },
  {
    id: '5',
    name: 'David Wilson',
    location: 'Decatur, AL',
    exposureType: 'factory',
    image: '/images/testimonials/factory-manager.jpg',
    quote: 'As a factory supervisor, I was exposed daily. When I developed thyroid disease, I didn\'t make the connection until others came forward too.',
    settlement: '$525,000',
    year: 2021,
  },
  {
    id: '6',
    name: 'Lisa Thompson',
    location: 'Portsmouth, NH',
    exposureType: 'military',
    image: '/images/testimonials/military-family.jpg',
    quote: 'My husband served at the naval shipyard. After his passing from cancer, this settlement has provided financial security for our children\'s future.',
    settlement: '$950,000',
    year: 2023,
  },
];

// Regional testimonials to prioritize based on user location
const regionalTestimonials: Record<string, Testimonial[]> = {
  'North Carolina': [
    {
      id: '7',
      name: 'James Wilson',
      location: 'Jacksonville, NC',
      exposureType: 'military',
      image: '/images/testimonials/marine.jpg',
      quote: 'As a Marine stationed at Camp Lejeune, I drank contaminated water for years. My settlement helped pay for treatments not covered by VA benefits.',
      settlement: '$780,000',
      year: 2022,
    },
  ],
  'New York': [
    {
      id: '8',
      name: 'Emily Chen',
      location: 'Hoosick Falls, NY',
      exposureType: 'water',
      image: '/images/testimonials/teacher.jpg',
      quote: 'As a teacher in Hoosick Falls, I watched my students and colleagues get sick. Our class action lawsuit finally brought accountability.',
      settlement: '$380,000',
      year: 2021,
    },
  ],
  'West Virginia': [
    {
      id: '9',
      name: 'Thomas Miller',
      location: 'Parkersburg, WV',
      exposureType: 'factory',
      image: '/images/testimonials/chemical-worker.jpg',
      quote: 'Working at the chemical plant exposed me to PFAS daily. The settlement helped me get specialized treatment out of state.',
      settlement: '$920,000',
      year: 2022,
    },
  ],
  'Michigan': [
    {
      id: '10',
      name: 'Karen Adams',
      location: 'Parchment, MI',
      exposureType: 'water',
      image: '/images/testimonials/homeowner.jpg',
      quote: 'Our property value plummeted when the contamination was discovered. This settlement helped us recover our financial losses.',
      settlement: '$410,000',
      year: 2021,
    },
  ],
  'Alabama': [
    {
      id: '11',
      name: 'Marcus Johnson',
      location: 'Decatur, AL',
      exposureType: 'factory',
      image: '/images/testimonials/maintenance-worker.jpg',
      quote: 'As a maintenance worker, I handled PFAS-containing materials without proper protection. My settlement covered my liver treatment.',
      settlement: '$560,000',
      year: 2023,
    },
  ],
};

interface TestimonialsSectionProps {
  geolocationData?: GeolocationResponse;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ geolocationData }) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(baseTestimonials);

  useEffect(() => {
    if (geolocationData?.locationName) {
      // Extract state from location name (assuming format like "City, State")
      const locationParts = geolocationData.locationName.split(',');
      if (locationParts.length > 1) {
        const state = locationParts[1].trim();
        
        // If we have regional testimonials for this state, prioritize them
        if (regionalTestimonials[state]) {
          const localTestimonials = regionalTestimonials[state];
          const otherTestimonials = baseTestimonials.slice(0, 3);
          
          setTestimonials([...localTestimonials, ...otherTestimonials]);
          return;
        }
      }
    }
    
    // If contaminated, prioritize testimonials matching the contamination type
    if (geolocationData?.isContaminated && geolocationData.zoneName) {
      const zoneName = geolocationData.zoneName.toLowerCase();
      let exposureType: 'military' | 'factory' | 'water' = 'water';
      
      if (zoneName.includes('military') || zoneName.includes('camp') || zoneName.includes('base')) {
        exposureType = 'military';
      } else if (zoneName.includes('factory') || zoneName.includes('plant') || zoneName.includes('industrial')) {
        exposureType = 'factory';
      }
      
      // Prioritize testimonials matching the exposure type
      const matchingTestimonials = baseTestimonials.filter(t => t.exposureType === exposureType);
      const otherTestimonials = baseTestimonials.filter(t => t.exposureType !== exposureType);
      
      setTestimonials([...matchingTestimonials, ...otherTestimonials].slice(0, 6));
      return;
    }
    
    // Default to base testimonials
    setTestimonials(baseTestimonials);
  }, [geolocationData]);

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Voices of PFAS: Real Stories, Real Results</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            These are the stories of real people who fought back against PFAS contamination and won. Their courage paved the way for others seeking justice.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <motion.p 
            className="text-gray-600 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Join thousands of Americans who have successfully claimed compensation for PFAS exposure.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <Link 
              href="/" 
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Check Your Eligibility Now
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 