'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCurrentLocation, checkContaminationZone } from '@/lib/geolocation';
import { GeolocationResponse } from '@/types';
import Button from '@/components/Button';
import ClaimForm from '@/components/ClaimForm';
import TestimonialsSection from '@/components/TestimonialsSection';
import Image from 'next/image';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [geolocationData, setGeolocationData] = useState<GeolocationResponse | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState('/images/backgrounds/default-background.jpg');
  const [showLocationAlert, setShowLocationAlert] = useState(false);

  useEffect(() => {
    // Set background image based on time of day for initial load
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) {
      setBackgroundImage('/images/backgrounds/morning-background.jpg');
    } else if (hour >= 12 && hour < 18) {
      setBackgroundImage('/images/backgrounds/afternoon-background.jpg');
    } else {
      setBackgroundImage('/images/backgrounds/evening-background.jpg');
    }
  }, []);

  // Update background image based on geolocation data
  useEffect(() => {
    if (geolocationData) {
      if (geolocationData.isContaminated) {
        // Show alert effect for contaminated zones
        setShowLocationAlert(true);
        setTimeout(() => setShowLocationAlert(false), 3000);
        
        if (geolocationData.zoneName?.includes('Military') || geolocationData.zoneName?.includes('Camp')) {
          setBackgroundImage('/images/backgrounds/military-background.jpg');
        } else if (geolocationData.zoneName?.includes('Factory') || geolocationData.zoneName?.includes('Plant')) {
          setBackgroundImage('/images/backgrounds/factory-background.jpg');
        } else {
          setBackgroundImage('/images/backgrounds/contaminated-water-background.jpg');
        }
      }
    }
  }, [geolocationData]);

  const handleCheckLocation = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const coordinates = await getCurrentLocation();
      const result = await checkContaminationZone(coordinates);
      setGeolocationData(result);
    } catch (err) {
      setError('Unable to check your location. Please try again or continue without location check.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleStartClaim = () => {
    setShowForm(true);
  };
  
  const getHeadline = () => {
    if (!geolocationData) return 'Have You Been Exposed to PFAS Chemicals?';
    
    if (geolocationData.isContaminated) {
      if (geolocationData.zoneName?.includes('Military') || geolocationData.zoneName?.includes('Camp')) {
        return `Military PFAS Exposure Detected in ${geolocationData.locationName}`;
      } else if (geolocationData.zoneName?.includes('Factory') || geolocationData.zoneName?.includes('Plant')) {
        return `Industrial PFAS Contamination Found in ${geolocationData.locationName}`;
      } else {
        return `PFAS Contamination Detected in ${geolocationData.locationName} Water Supply`;
      }
    } else {
      return `${geolocationData.locationName}: Check Your PFAS Exposure Risk`;
    }
  };

  return (
    <main className="min-h-screen">
      {showForm ? (
        <ClaimForm geolocationData={geolocationData || undefined} onBack={() => setShowForm(false)} />
      ) : (
        <>
          <section className="relative h-screen flex items-center">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
              <div className="relative w-full h-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={backgroundImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0"
                  >
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${backgroundImage})` }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50" />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            
            {/* Alert for contaminated zones */}
            <AnimatePresence>
              {showLocationAlert && (
                <motion.div 
                  className="fixed inset-0 z-50 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 border-8 border-red-600 animate-pulse" />
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="container mx-auto px-4 relative z-10">
              <motion.h1 
                className="text-3xl md:text-5xl font-bold text-white mb-6 max-w-4xl"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {getHeadline()}
              </motion.h1>
              
              <motion.p 
                className="text-xl text-white mb-8 max-w-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                PFAS has devastated families across America. If you've been exposed, it's time to fight back. Get justice now.
              </motion.p>
              
              {error && (
                <motion.div 
                  className="bg-red-600 text-white p-4 rounded-md mb-6 max-w-md"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <p>{error}</p>
                </motion.div>
              )}
              
              {geolocationData ? (
                <div className="mb-8">
                  <motion.div 
                    className={`p-4 rounded-md mb-6 max-w-md ${geolocationData.isContaminated ? 'bg-red-600' : 'bg-blue-600'} text-white`}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="font-semibold">{geolocationData.message}</p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      size="lg" 
                      onClick={handleStartClaim}
                      className="text-xl px-8 py-4 animate-pulse-subtle"
                    >
                      {geolocationData.isContaminated 
                        ? "Find Out What They Owe You – Check Your Eligibility" 
                        : "See If You Qualify – Time Is Running Out"}
                    </Button>
                  </motion.div>
                </div>
              ) : (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg" 
                    onClick={handleCheckLocation}
                    isLoading={isLoading}
                    className="text-xl px-8 py-4 animate-pulse-subtle"
                  >
                    Check Your Location
                  </Button>
                </motion.div>
              )}
              
              <motion.p 
                className="text-sm text-white mt-4 max-w-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                We'll check if your location is in a known PFAS contamination zone.
              </motion.p>
            </div>
          </section>
          
          <motion.section 
            className="py-16 px-4 bg-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="container mx-auto max-w-5xl">
              <h2 className="text-3xl font-bold text-center mb-12">What Are PFAS Chemicals?</h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <motion.div 
                  className="bg-gray-50 p-6 rounded-lg shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                >
                  <h3 className="text-xl font-semibold mb-3">Forever Chemicals</h3>
                  <p className="text-gray-700">
                    PFAS (Per- and polyfluoroalkyl substances) are man-made chemicals that don't break down in the environment or in your body.
                  </p>
                </motion.div>
                
                <motion.div 
                  className="bg-gray-50 p-6 rounded-lg shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                >
                  <h3 className="text-xl font-semibold mb-3">Widespread Exposure</h3>
                  <p className="text-gray-700">
                    Found in drinking water, food packaging, household products, and industrial sites across America.
                  </p>
                </motion.div>
                
                <motion.div 
                  className="bg-gray-50 p-6 rounded-lg shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                >
                  <h3 className="text-xl font-semibold mb-3">Serious Health Risks</h3>
                  <p className="text-gray-700">
                    Linked to cancer, liver damage, decreased fertility, increased cholesterol, and weakened immune system.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.section>
          
          <motion.section 
            className="py-16 px-4 bg-gray-50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-3xl font-bold text-center mb-2">Voices of PFAS</h2>
              <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
                Real stories from people who have been affected by PFAS contamination and fought back to get the compensation they deserve.
              </p>
              
              <TestimonialsSection geolocationData={geolocationData || undefined} />
              
              <motion.div 
                className="mt-12 text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  onClick={handleStartClaim}
                >
                  Start Your Claim Today
                </Button>
              </motion.div>
            </div>
          </motion.section>
          
          <motion.section 
            className="py-16 px-4 bg-red-50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="container mx-auto max-w-5xl">
              <h2 className="text-3xl font-bold text-center mb-12">Do You Qualify for Compensation?</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div 
                  className="bg-white p-6 rounded-lg shadow-md"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                >
                  <h3 className="text-xl font-semibold mb-3">Location Factors</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Lived near a military base with PFAS contamination</li>
                    <li>Resided near industrial facilities that used PFAS</li>
                    <li>Used water from a contaminated municipal system</li>
                    <li>Worked at a facility that manufactured or used PFAS</li>
                  </ul>
                </motion.div>
                
                <motion.div 
                  className="bg-white p-6 rounded-lg shadow-md"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                >
                  <h3 className="text-xl font-semibold mb-3">Health Conditions</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Kidney, testicular, or other cancers</li>
                    <li>Thyroid disease or disorders</li>
                    <li>Ulcerative colitis</li>
                    <li>High cholesterol</li>
                    <li>Pregnancy-induced hypertension</li>
                  </ul>
                </motion.div>
              </div>
              
              <motion.div 
                className="mt-12 text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  onClick={handleCheckLocation}
                  isLoading={isLoading}
                >
                  Check Your Eligibility Now
                </Button>
              </motion.div>
            </div>
          </motion.section>
        </>
      )}
    </main>
  );
}
