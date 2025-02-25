import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ClickToCallProps {
  phoneNumber: string;
  text?: string;
  className?: string;
}

const ClickToCall: React.FC<ClickToCallProps> = ({ 
  phoneNumber, 
  text = "Call Now For Free Consultation", 
  className = "" 
}) => {
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if the device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // Format phone number for display
  const formattedPhoneNumber = phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  
  // Clean phone number for href (remove any non-digit characters)
  const cleanPhoneNumber = phoneNumber.replace(/\D/g, '');
  
  return (
    <motion.div 
      className={`fixed bottom-4 right-4 z-50 ${className} ${!isMobile && 'sm:relative sm:bottom-auto sm:right-auto'}`}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.3 }}
    >
      <a 
        href={`tel:${cleanPhoneNumber}`}
        className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
          />
        </svg>
        <span>{text}</span>
        <span className="hidden sm:inline">: {formattedPhoneNumber}</span>
      </a>
    </motion.div>
  );
};

export default ClickToCall; 