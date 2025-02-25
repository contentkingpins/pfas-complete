import { Coordinates, GeolocationResponse } from '@/types';

// Get the user's current location using the browser's Geolocation API
export const getCurrentLocation = (): Promise<Coordinates> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        reject(error);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  });
};

// Check if the user's location is in a PFAS contamination zone
export const checkContaminationZone = async (
  coordinates: Coordinates
): Promise<GeolocationResponse> => {
  try {
    const response = await fetch('/api/geolocation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(coordinates),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error checking contamination zone:', error);
    return {
      isContaminated: false,
      message: 'Unable to determine if your location is in a contamination zone. Please provide additional information.',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

// Get a location name based on coordinates (fallback for when AWS service is unavailable)
export const getLocationNameFallback = async (
  coordinates: Coordinates
): Promise<string> => {
  try {
    // Using a free geocoding service as fallback
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coordinates.latitude}&lon=${coordinates.longitude}&zoom=10`,
      {
        headers: {
          'User-Agent': 'PFAS-Claim-Website',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.display_name || 'Unknown location';
  } catch (error) {
    console.error('Error getting location name fallback:', error);
    return 'Unknown location';
  }
}; 