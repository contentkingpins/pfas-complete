import React from 'react';
import { motion } from 'framer-motion';
import { GeolocationResponse } from '@/types';
import LawsuitMap from './LawsuitMap';
import SettlementTracker from './SettlementTracker';
import Button from './Button';

interface LegalWarRoomProps {
  geolocationData?: GeolocationResponse;
}

const LegalWarRoom: React.FC<LegalWarRoomProps> = ({ geolocationData }) => {
  // Extract state from geolocation data for headline
  const userState = React.useMemo(() => {
    if (geolocationData?.locationName) {
      const locationParts = geolocationData.locationName.split(',');
      if (locationParts.length > 1) {
        return locationParts[1].trim();
      }
    }
    return null;
  }, [geolocationData]);

  // Mock data for people filing in user's state
  const peopleFilingCount = React.useMemo(() => {
    if (!userState) return 0;
    // Generate a realistic but random number based on state name
    const stateNameSum = userState?.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) || 0;
    return Math.floor((stateNameSum * 17) % 10000) + 5000;
  }, [userState]);

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            PFAS Legal War Room
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Track active lawsuits, settlements, and legal developments in the fight against PFAS contamination.
          </p>
        </motion.div>

        {userState && (
          <motion.div 
            className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-xl shadow-lg mb-10 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-2">
              {peopleFilingCount.toLocaleString()} people in {userState} are filing PFAS claims
            </h3>
            <p className="text-lg opacity-90 mb-4">
              Find out what you could be owed based on your exposure and location
            </p>
            <Button 
              variant="secondary" 
              size="lg"
              href="/eligibility"
              className="mt-2 bg-white text-blue-700 hover:bg-blue-50"
            >
              Start Your Claim Now
            </Button>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <LawsuitMap geolocationData={geolocationData} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <SettlementTracker />
          </motion.div>
        </div>
        
        <div className="mt-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Don't Wait to Seek Justice
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
              PFAS lawsuits are time-sensitive. Statutes of limitations vary by state and can limit your ability to file a claim.
            </p>
            <Button 
              variant="primary" 
              size="lg"
              href="/eligibility"
              className="mx-auto"
            >
              Check Your Eligibility Now
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LegalWarRoom; 