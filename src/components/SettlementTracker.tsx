import React from 'react';
import { motion } from 'framer-motion';

// Mock settlement data
const settlements = [
  {
    id: 1,
    company: "DuPont",
    amount: 670000000,
    year: 2017,
    description: "Settlement for contamination in the Mid-Ohio Valley"
  },
  {
    id: 2,
    company: "3M",
    amount: 850000000,
    year: 2018,
    description: "Settlement with the state of Minnesota for groundwater contamination"
  },
  {
    id: 3,
    company: "Chemours",
    amount: 4000000,
    year: 2019,
    description: "Settlement for cleanup of Cape Fear River in North Carolina"
  },
  {
    id: 4,
    company: "Saint-Gobain",
    amount: 13000000,
    year: 2020,
    description: "Settlement for contamination in Hoosick Falls, NY"
  },
  {
    id: 5,
    company: "3M",
    amount: 98000000,
    year: 2021,
    description: "Settlement for water contamination in Alabama"
  },
  {
    id: 6,
    company: "Multiple Manufacturers",
    amount: 1180000000,
    year: 2022,
    description: "Multi-district litigation settlement for firefighting foam"
  },
  {
    id: 7,
    company: "3M",
    amount: 10300000000,
    year: 2023,
    description: "Nationwide settlement for PFAS water contamination"
  }
];

const SettlementTracker: React.FC = () => {
  const totalSettlementAmount = settlements.reduce((sum, settlement) => sum + settlement.amount, 0);
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-full">
      <h3 className="text-xl font-bold mb-4">PFAS Settlement Tracker</h3>
      
      <div className="mb-6">
        <motion.div 
          className="bg-gradient-to-r from-blue-600 to-green-500 text-white p-4 rounded-lg text-center"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ 
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <p className="text-sm font-medium">Total Settlements to Date</p>
          <p className="text-3xl font-bold">${(totalSettlementAmount / 1000000000).toFixed(2)} Billion</p>
        </motion.div>
      </div>
      
      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
        {settlements.sort((a, b) => b.year - a.year).map((settlement, index) => (
          <motion.div 
            key={settlement.id}
            className="border border-gray-200 rounded-md p-3 bg-gray-50"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-gray-900">{settlement.company}</h4>
                <p className="text-sm text-gray-600">{settlement.description}</p>
              </div>
              <div className="text-right">
                <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                  {settlement.year}
                </span>
              </div>
            </div>
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <motion.div 
                  className="bg-green-600 h-2.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, (settlement.amount / 10300000000) * 100)}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>
              <p className="mt-1 text-right text-sm font-medium text-gray-900">
                ${(settlement.amount / 1000000).toFixed(1)} Million
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <p className="mt-4 text-sm text-gray-600">
        Data represents major PFAS settlements. Individual claim amounts vary based on exposure and injury.
      </p>
    </div>
  );
};

export default SettlementTracker; 