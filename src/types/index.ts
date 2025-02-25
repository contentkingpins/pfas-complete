// Geolocation types
export interface GeolocationResponse {
  isContaminated: boolean;
  zoneName?: string;
  description?: string;
  locationName?: string;
  message: string;
  error?: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface ContaminationZone {
  name: string;
  coordinates: Coordinates;
  radius: number; // in kilometers
  description: string;
}

// Form types
export interface PersonalInfo {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

export type InjuryType = 'Cancer' | 'Non-Cancer';

export type CancerType = 
  | 'Kidney Cancer'
  | 'Testicular Cancer'
  | 'Prostate Cancer'
  | 'Liver Cancer'
  | 'Pancreatic Cancer'
  | 'Breast Cancer'
  | 'Thyroid Cancer'
  | 'Non-Hodgkin\'s Lymphoma';

export type NonCancerType = 
  | 'Thyroid Disease'
  | 'Autoimmune Disorders'
  | 'Liver Disease'
  | 'High Cholesterol';

export interface InjuryInfo {
  injuryType: InjuryType;
  cancerType?: CancerType;
  nonCancerType?: NonCancerType;
  diagnosisYear?: number;
}

export interface ExposureInfo {
  isCurrentlyInContaminationZone: boolean;
  pastLocations?: string[];
  workplaceDetails?: string;
  militaryServiceHistory?: string;
  exposureDuration?: string;
}

export interface LegalInfo {
  hasLegalRetainer: boolean;
}

export interface ClaimFormData {
  personalInfo: PersonalInfo;
  injuryInfo: InjuryInfo;
  exposureInfo: ExposureInfo;
  legalInfo: LegalInfo;
} 