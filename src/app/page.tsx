'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getCurrentLocation, checkContaminationZone } from '@/lib/geolocation';
import { GeolocationResponse } from '@/types';
import Button from '@/components/Button';
import ClaimForm from '@/components/ClaimForm';
import TestimonialsSection from '@/components/TestimonialsSection';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [geolocationData, setGeolocationData] = useState<GeolocationResponse | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState('/images/default-background.jpg');

  useEffect(() => {
    // Set background image based on time of day for initial load
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) {
      setBackgroundImage('/images/morning-background.jpg');
    } else if (hour >= 12 && hour < 18) {
      setBackgroundImage('/images/afternoon-background.jpg');
    } else {
      setBackgroundImage('/images/evening-background.jpg');
    }
  }, []);

  // Update background image based on geolocation data
  useEffect(() => {
    if (geolocationData) {
      if (geolocationData.isContaminated) {
        if (geolocationData.zoneName?.includes('Military') || geolocationData.zoneName?.includes('Camp')) {
          setBackgroundImage('/images/military-background.jpg');
        } else if (geolocationData.zoneName?.includes('Factory') || geolocationData.zoneName?.includes('Plant')) {
          setBackgroundImage('/images/factory-background.jpg');
        } else {
          setBackgroundImage('/images/contaminated-water-background.jpg');
        }
      }
    }
  }, [geolocationData]);

  const handleCheckLocation = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const coordinates = await getCurrentLocation();
      const response = await checkContaminationZone(coordinates);
      setGeolocationData(response);
    } catch (err) {
      console.error('Error checking location:', err);
      setError('Unable to access your location. Please enable location services and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartClaim = () => {
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate dynamic headline based on geolocation
  const getHeadline = () => {
    if (!geolocationData) {
      return "Find Out If You've Been Exposed to PFAS";
    }
    
    if (geolocationData.isContaminated && geolocationData.zoneName) {
      return `If You Lived in ${geolocationData.zoneName}, You May Have Been Exposed to PFAS`;
    }
    
    if (geolocationData.locationName) {
      return `${geolocationData.locationName} Residents: Check Your PFAS Exposure Risk`;
    }
    
    return "Your Water. Your Health. Your Fight. See If You Qualify.";
  };

  return (
    <main className="min-h-screen flex flex-col">
      {showForm ? (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-8">PFAS Claim Form</h1>
          <ClaimForm geolocationData={geolocationData || undefined} />
        </div>
      ) : (
        <>
          <div 
            className="relative flex flex-col items-center justify-center px-4 py-20 md:py-32 text-center"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
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
              <div className="bg-red-600 text-white p-4 rounded-md mb-6 max-w-md">
                <p>{error}</p>
              </div>
            )}
            
            {geolocationData ? (
              <div className="mb-8">
                <div className={`p-4 rounded-md mb-6 max-w-md ${geolocationData.isContaminated ? 'bg-red-600' : 'bg-blue-600'} text-white`}>
                  <p className="font-semibold">{geolocationData.message}</p>
                </div>
                
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Button 
                    size="lg" 
                    onClick={handleStartClaim}
                    className="text-xl px-8 py-4"
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
              >
                <Button 
                  size="lg" 
                  onClick={handleCheckLocation}
                  isLoading={isLoading}
                  className="text-xl px-8 py-4"
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
          
          <section className="py-16 px-4 bg-white">
            <div className="container mx-auto max-w-5xl">
              <h2 className="text-3xl font-bold text-center mb-12">What Are PFAS Chemicals?</h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-3">Forever Chemicals</h3>
                  <p className="text-gray-700">
                    PFAS (Per- and polyfluoroalkyl substances) are man-made chemicals that don't break down in the environment or in your body.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-3">Widespread Exposure</h3>
                  <p className="text-gray-700">
                    Found in drinking water, food packaging, household products, and industrial sites across America.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-3">Serious Health Risks</h3>
                  <p className="text-gray-700">
                    Linked to cancer, liver damage, decreased fertility, increased cholesterol, and weakened immune system.
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          <section className="py-16 px-4 bg-gray-50">
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-3xl font-bold text-center mb-2">Voices of PFAS</h2>
              <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
                Real stories from people who have been affected by PFAS contamination and fought back to get the compensation they deserve.
              </p>
              
              <TestimonialsSection geolocationData={geolocationData || undefined} />
              
              <div className="mt-12 text-center">
                <Button 
                  size="lg" 
                  onClick={handleStartClaim}
                >
                  Start Your Claim Today
                </Button>
              </div>
            </div>
          </section>
          
          <section className="py-16 px-4 bg-red-50">
            <div className="container mx-auto max-w-5xl">
              <h2 className="text-3xl font-bold text-center mb-12">Do You Qualify for Compensation?</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-3">Location Factors</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Lived near a military base with PFAS contamination</li>
                    <li>Resided near industrial facilities that used PFAS</li>
                    <li>Used water from a contaminated municipal system</li>
                    <li>Worked at a facility that manufactured or used PFAS</li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-3">Health Conditions</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Kidney, testicular, or other cancers</li>
                    <li>Thyroid disease or disorders</li>
                    <li>Ulcerative colitis</li>
                    <li>High cholesterol</li>
                    <li>Pregnancy-induced hypertension</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-12 text-center">
                <Button 
                  size="lg" 
                  onClick={handleCheckLocation}
                  isLoading={isLoading}
                >
                  Check Your Eligibility Now
                </Button>
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
