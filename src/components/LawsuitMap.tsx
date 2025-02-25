import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { GeolocationResponse } from '@/types';

// Mock data for active lawsuits by state
const stateLawsuitData: Record<string, number> = {
  'Alabama': 1250,
  'Alaska': 320,
  'Arizona': 980,
  'Arkansas': 750,
  'California': 5200,
  'Colorado': 1100,
  'Connecticut': 890,
  'Delaware': 420,
  'Florida': 3800,
  'Georgia': 2100,
  'Hawaii': 280,
  'Idaho': 390,
  'Illinois': 2800,
  'Indiana': 1700,
  'Iowa': 890,
  'Kansas': 650,
  'Kentucky': 1200,
  'Louisiana': 1500,
  'Maine': 780,
  'Maryland': 1650,
  'Massachusetts': 2200,
  'Michigan': 3100,
  'Minnesota': 1900,
  'Mississippi': 820,
  'Missouri': 1400,
  'Montana': 310,
  'Nebraska': 480,
  'Nevada': 720,
  'New Hampshire': 950,
  'New Jersey': 2700,
  'New Mexico': 580,
  'New York': 4200,
  'North Carolina': 2900,
  'North Dakota': 240,
  'Ohio': 2600,
  'Oklahoma': 890,
  'Oregon': 1100,
  'Pennsylvania': 3200,
  'Rhode Island': 380,
  'South Carolina': 1300,
  'South Dakota': 270,
  'Tennessee': 1600,
  'Texas': 4100,
  'Utah': 520,
  'Vermont': 410,
  'Virginia': 1800,
  'Washington': 1700,
  'West Virginia': 1100,
  'Wisconsin': 1500,
  'Wyoming': 190,
};

// States with high PFAS contamination
const highContaminationStates = [
  'Michigan', 
  'New York', 
  'North Carolina', 
  'West Virginia', 
  'New Hampshire', 
  'New Jersey', 
  'Alabama', 
  'California', 
  'Pennsylvania', 
  'Massachusetts'
];

interface LawsuitMapProps {
  geolocationData?: GeolocationResponse;
}

const LawsuitMap: React.FC<LawsuitMapProps> = ({ geolocationData }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [userState, setUserState] = React.useState<string | null>(null);
  const [activeLawsuits, setActiveLawsuits] = React.useState<number>(0);
  
  // Extract state from geolocation data
  useEffect(() => {
    if (geolocationData?.locationName) {
      const locationParts = geolocationData.locationName.split(',');
      if (locationParts.length > 1) {
        const state = locationParts[1].trim();
        setUserState(state);
        setActiveLawsuits(stateLawsuitData[state] || Math.floor(Math.random() * 1000) + 500);
      }
    }
  }, [geolocationData]);
  
  // Draw the map
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw a simplified US map (this is a placeholder - in a real app, you'd use a proper mapping library)
    ctx.fillStyle = '#e5e7eb'; // Light gray background
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw state hotspots
    const statePositions: Record<string, [number, number]> = {
      'Alabama': [0.65, 0.65],
      'Alaska': [0.15, 0.15],
      'Arizona': [0.2, 0.6],
      'Arkansas': [0.55, 0.6],
      'California': [0.1, 0.45],
      'Colorado': [0.3, 0.45],
      'Connecticut': [0.85, 0.35],
      'Delaware': [0.82, 0.45],
      'Florida': [0.75, 0.8],
      'Georgia': [0.7, 0.65],
      'Hawaii': [0.15, 0.85],
      'Idaho': [0.2, 0.3],
      'Illinois': [0.6, 0.45],
      'Indiana': [0.65, 0.45],
      'Iowa': [0.5, 0.4],
      'Kansas': [0.45, 0.5],
      'Kentucky': [0.65, 0.5],
      'Louisiana': [0.55, 0.75],
      'Maine': [0.9, 0.25],
      'Maryland': [0.8, 0.45],
      'Massachusetts': [0.87, 0.33],
      'Michigan': [0.65, 0.35],
      'Minnesota': [0.5, 0.25],
      'Mississippi': [0.6, 0.7],
      'Missouri': [0.55, 0.5],
      'Montana': [0.25, 0.25],
      'Nebraska': [0.45, 0.4],
      'Nevada': [0.15, 0.4],
      'New Hampshire': [0.87, 0.3],
      'New Jersey': [0.83, 0.4],
      'New Mexico': [0.3, 0.6],
      'New York': [0.8, 0.3],
      'North Carolina': [0.75, 0.55],
      'North Dakota': [0.4, 0.25],
      'Ohio': [0.7, 0.45],
      'Oklahoma': [0.45, 0.6],
      'Oregon': [0.1, 0.3],
      'Pennsylvania': [0.75, 0.4],
      'Rhode Island': [0.88, 0.35],
      'South Carolina': [0.75, 0.6],
      'South Dakota': [0.4, 0.35],
      'Tennessee': [0.65, 0.55],
      'Texas': [0.4, 0.7],
      'Utah': [0.2, 0.45],
      'Vermont': [0.85, 0.28],
      'Virginia': [0.75, 0.5],
      'Washington': [0.1, 0.2],
      'West Virginia': [0.72, 0.47],
      'Wisconsin': [0.55, 0.3],
      'Wyoming': [0.3, 0.35],
    };
    
    // Draw hotspots for each state
    Object.entries(statePositions).forEach(([state, [x, y]]) => {
      const lawsuitCount = stateLawsuitData[state] || 0;
      const isHighContamination = highContaminationStates.includes(state);
      const isUserState = state === userState;
      
      // Size based on lawsuit count
      const size = Math.max(5, Math.min(20, lawsuitCount / 500));
      
      // Color based on contamination level
      let color = '#3b82f6'; // Default blue
      if (isHighContamination) color = '#ef4444'; // Red for high contamination
      if (isUserState) color = '#f59e0b'; // Yellow for user's state
      
      // Draw circle
      ctx.beginPath();
      ctx.arc(x * canvas.width, y * canvas.height, size, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      
      // Add pulsing effect for user's state or high contamination states
      if (isUserState || isHighContamination) {
        ctx.beginPath();
        ctx.arc(x * canvas.width, y * canvas.height, size + 5, 0, Math.PI * 2);
        ctx.fillStyle = `${color}40`; // 25% opacity
        ctx.fill();
      }
      
      // Add state abbreviation
      ctx.fillStyle = '#ffffff';
      ctx.font = `${Math.max(8, size/2)}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(state.substring(0, 2), x * canvas.width, y * canvas.height);
    });
    
    // Add legend
    ctx.fillStyle = '#1f2937';
    ctx.font = '12px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Active PFAS Lawsuits', 10, 20);
    
    // Legend items
    const legendItems = [
      { color: '#3b82f6', label: 'Active Cases' },
      { color: '#ef4444', label: 'High Contamination' },
      { color: '#f59e0b', label: 'Your Location' },
    ];
    
    legendItems.forEach((item, index) => {
      const y = 40 + index * 20;
      
      // Draw circle
      ctx.beginPath();
      ctx.arc(20, y, 6, 0, Math.PI * 2);
      ctx.fillStyle = item.color;
      ctx.fill();
      
      // Draw label
      ctx.fillStyle = '#1f2937';
      ctx.fillText(item.label, 35, y);
    });
    
  }, [canvasRef, userState]);
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-full">
      <h3 className="text-xl font-bold mb-4">Active PFAS Lawsuits Map</h3>
      
      {userState && (
        <motion.div 
          className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="font-medium">
            <span className="text-amber-600">Your State:</span> {userState} has{' '}
            <span className="font-bold text-red-600">{activeLawsuits.toLocaleString()}</span> active PFAS lawsuits
          </p>
        </motion.div>
      )}
      
      <div className="relative aspect-video w-full">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full rounded-md border border-gray-200"
        />
      </div>
      
      <p className="mt-4 text-sm text-gray-600">
        Data updated daily. Lawsuit counts represent active cases in federal and state courts.
      </p>
    </div>
  );
};

export default LawsuitMap; 