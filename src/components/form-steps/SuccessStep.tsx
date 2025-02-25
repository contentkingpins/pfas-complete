import React from 'react';
import { motion } from 'framer-motion';
import Button from '../Button';
import Link from 'next/link';

const SuccessStep: React.FC = () => {
  return (
    <motion.div
      className="text-center py-8"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-10 w-10 text-green-600" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 13l4 4L19 7" 
          />
        </svg>
      </div>
      
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Claim Submitted Successfully!</h2>
      
      <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
        Thank you for submitting your PFAS claim information. Our team will review your details and contact you within 48 hours.
      </p>
      
      <div className="bg-blue-50 p-6 rounded-lg mb-8 max-w-md mx-auto">
        <h3 className="text-xl font-semibold text-blue-800 mb-2">What Happens Next?</h3>
        <ol className="text-left text-blue-800 space-y-2 pl-5 list-decimal">
          <li>Our legal team will review your claim details</li>
          <li>We'll contact you to verify information</li>
          <li>If eligible, we'll discuss next steps for your claim</li>
          <li>You'll receive regular updates on your case status</li>
        </ol>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link href="/" passHref>
          <Button variant="outline">Return to Home</Button>
        </Link>
        
        <Button 
          onClick={() => window.print()}
          variant="secondary"
        >
          Print Confirmation
        </Button>
      </div>
    </motion.div>
  );
};

export default SuccessStep; 