import React from 'react';
import { motion } from 'framer-motion';
import Button from '../Button';
import Link from 'next/link';

const DisqualifiedStep: React.FC = () => {
  return (
    <motion.div
      className="text-center py-8"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-10 w-10 text-red-600" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
          />
        </svg>
      </div>
      
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Already Represented</h2>
      
      <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
        As much as we would like to help, if you have already retained a firm, we cannot submit your claim. Please consult with your current attorney.
      </p>
      
      <div className="bg-yellow-50 p-6 rounded-lg mb-8 max-w-md mx-auto">
        <h3 className="text-xl font-semibold text-yellow-800 mb-2">Why This Matters</h3>
        <p className="text-left text-yellow-800 mb-4">
          Legal ethics rules prevent multiple law firms from representing the same client for the same matter. This protects you from:
        </p>
        <ul className="text-left text-yellow-800 space-y-2 pl-5 list-disc">
          <li>Conflicting legal advice</li>
          <li>Confusion over who is handling your case</li>
          <li>Potential disputes over legal fees</li>
        </ul>
      </div>
      
      <div className="flex justify-center">
        <Link href="/" passHref>
          <Button variant="outline">Return to Home</Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default DisqualifiedStep; 