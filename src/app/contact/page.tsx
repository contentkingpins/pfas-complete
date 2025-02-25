'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/Button';
import FormInput from '@/components/FormInput';
import FormTextarea from '@/components/FormTextarea';
import LegalWarRoom from '@/components/LegalWarRoom';
import { getCurrentLocation, checkContaminationZone } from '@/lib/geolocation';
import { GeolocationResponse } from '@/types';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [geolocationData, setGeolocationData] = useState<GeolocationResponse | null>(null);
  
  // Fetch geolocation data on page load
  useEffect(() => {
    const fetchGeolocation = async () => {
      setIsLoadingLocation(true);
      setLocationError(null);
      
      try {
        const coordinates = await getCurrentLocation();
        const response = await checkContaminationZone(coordinates);
        setGeolocationData(response);
      } catch (err) {
        console.error('Error checking location:', err);
        setLocationError('Unable to access your location. Some features may be limited.');
      } finally {
        setIsLoadingLocation(false);
      }
    };
    
    fetchGeolocation();
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };
  
  return (
    <main className="min-h-screen">
      <div className="bg-gradient-to-r from-blue-900 to-indigo-800 py-16 px-4">
        <div className="container mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            PFAS Legal War Room
          </motion.h1>
          <motion.p 
            className="text-xl text-blue-100 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Track active lawsuits, monitor settlements, and connect with our legal team to fight for the compensation you deserve.
          </motion.p>
        </div>
      </div>
      
      {isLoadingLocation ? (
        <div className="py-12 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading location data...</p>
        </div>
      ) : (
        <LegalWarRoom geolocationData={geolocationData || undefined} />
      )}
      
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Contact Our Legal Team</h2>
        
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          {isSubmitted ? (
            <motion.div
              className="text-center py-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-8 w-8 text-green-600" 
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
              
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Message Sent Successfully!</h2>
              
              <p className="text-lg text-gray-600 mb-8">
                Thank you for contacting us. A member of our legal team will get back to you within 24 hours.
              </p>
              
              <Button 
                onClick={() => setIsSubmitted(false)}
                variant="outline"
              >
                Send Another Message
              </Button>
            </motion.div>
          ) : (
            <>
              <p className="text-gray-600 mb-8">
                Have questions about PFAS exposure or your potential claim? Fill out the form below and our legal team will get back to you as soon as possible.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormInput
                    label="First Name"
                    name="firstName"
                    placeholder="Enter your first name"
                    required
                  />
                  
                  <FormInput
                    label="Last Name"
                    name="lastName"
                    placeholder="Enter your last name"
                    required
                  />
                </div>
                
                <FormInput
                  label="Email Address"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                />
                
                <FormInput
                  label="Phone Number"
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                />
                
                <FormTextarea
                  label="Message"
                  name="message"
                  placeholder="Please provide details about your situation or questions"
                  rows={5}
                  required
                />
                
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    Send Message
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
        
        <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 text-blue-600" 
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
            </div>
            <h3 className="text-xl font-semibold mb-2">Phone</h3>
            <p className="text-gray-600">(800) 555-PFAS</p>
            <p className="text-gray-600">Mon-Fri, 9am-5pm EST</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 text-red-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-gray-600">legal@pfasclaim.com</p>
            <p className="text-gray-600">support@pfasclaim.com</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 text-green-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                />
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Office</h3>
            <p className="text-gray-600">123 Legal Avenue</p>
            <p className="text-gray-600">New York, NY 10001</p>
          </div>
        </div>
      </div>
    </main>
  );
} 