import { NextRequest, NextResponse } from 'next/server';
import { 
  getLocationClient, 
  getLocationIndexName, 
  isLocationInContaminationZone 
} from '@/lib/aws-config';
import { SearchPlaceIndexForPositionCommand } from '@aws-sdk/client-location';

export async function POST(request: NextRequest) {
  try {
    const { latitude, longitude } = await request.json();

    if (!latitude || !longitude) {
      return NextResponse.json(
        { error: 'Latitude and longitude are required' },
        { status: 400 }
      );
    }

    // Check if the location is in a contamination zone using our helper function
    const contaminationCheck = isLocationInContaminationZone(latitude, longitude);

    // If we're in a contamination zone, return that information
    if (contaminationCheck.isContaminated) {
      return NextResponse.json({
        isContaminated: true,
        zoneName: contaminationCheck.zoneName,
        description: contaminationCheck.description,
        message: `Your location has been identified as being within ${contaminationCheck.zoneName}, a known PFAS contamination zone.`,
      });
    }

    // If not in our mock zones, try to get more location details from AWS
    try {
      const locationClient = getLocationClient();
      const indexName = getLocationIndexName();

      const command = new SearchPlaceIndexForPositionCommand({
        IndexName: indexName,
        Position: [longitude, latitude], // AWS expects [longitude, latitude]
        MaxResults: 1,
      });

      const response = await locationClient.send(command);
      
      const place = response.Results?.[0]?.Place;
      const locationName = place?.Label || 'Unknown location';
      
      return NextResponse.json({
        isContaminated: false,
        locationName,
        message: `Your location (${locationName}) is not identified as a known PFAS contamination zone. Please provide additional information about your potential exposure.`,
      });
    } catch (awsError) {
      console.error('AWS Location Service error:', awsError);
      
      // Fallback response if AWS call fails
      return NextResponse.json({
        isContaminated: false,
        locationName: 'Unknown location',
        message: 'Your location is not identified as a known PFAS contamination zone. Please provide additional information about your potential exposure.',
        error: 'Could not retrieve detailed location information',
      });
    }
  } catch (error) {
    console.error('Geolocation API error:', error);
    return NextResponse.json(
      { error: 'Failed to process geolocation request' },
      { status: 500 }
    );
  }
} 