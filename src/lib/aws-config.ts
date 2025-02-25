import { LocationClient } from '@aws-sdk/client-location';

// Initialize the AWS Location client with environment variables
export const getLocationClient = () => {
  // Ensure we're only creating the client on the server side
  if (typeof window !== 'undefined') {
    throw new Error('AWS credentials should only be accessed on the server side');
  }

  return new LocationClient({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    },
  });
};

// Get the AWS Location Index name from environment variables
export const getLocationIndexName = () => {
  return process.env.AWS_LOCATION_INDEX_NAME || 'PFASContaminationIndex';
};

// Mock PFAS contamination zones for development/testing
// In production, this would be replaced with actual data from a database or API
export const MOCK_PFAS_CONTAMINATION_ZONES = [
  {
    name: 'Camp Lejeune, North Carolina',
    coordinates: { latitude: 34.6857, longitude: -77.3457 },
    radius: 50, // km
    description: 'Military base with known water contamination from 1953 to 1987',
  },
  {
    name: 'Hoosick Falls, New York',
    coordinates: { latitude: 42.9009, longitude: -73.3515 },
    radius: 20, // km
    description: 'Manufacturing facility contamination affecting drinking water',
  },
  {
    name: 'Parkersburg, West Virginia',
    coordinates: { latitude: 39.2667, longitude: -81.5615 },
    radius: 30, // km
    description: 'DuPont Washington Works plant PFOA contamination',
  },
  {
    name: 'Parchment, Michigan',
    coordinates: { latitude: 42.3233, longitude: -85.5800 },
    radius: 15, // km
    description: 'Paper mill contamination of municipal water supply',
  },
  {
    name: 'Decatur, Alabama',
    coordinates: { latitude: 34.6059, longitude: -86.9833 },
    radius: 25, // km
    description: '3M manufacturing facility contamination',
  },
];

// Helper function to check if a location is within a contamination zone
export const isLocationInContaminationZone = (
  userLatitude: number,
  userLongitude: number
): { isContaminated: boolean; zoneName?: string; description?: string } => {
  // Calculate distance between two points using Haversine formula
  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Check each contamination zone
  for (const zone of MOCK_PFAS_CONTAMINATION_ZONES) {
    const distance = calculateDistance(
      userLatitude,
      userLongitude,
      zone.coordinates.latitude,
      zone.coordinates.longitude
    );

    if (distance <= zone.radius) {
      return {
        isContaminated: true,
        zoneName: zone.name,
        description: zone.description,
      };
    }
  }

  return { isContaminated: false };
}; 