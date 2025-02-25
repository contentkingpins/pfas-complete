import { z } from 'zod';

// Personal Information validation schema
export const personalInfoSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
});

// Injury Information validation schema
export const injuryInfoSchema = z.object({
  injuryType: z.enum(['Cancer', 'Non-Cancer'], {
    required_error: 'Please select an injury type',
  }),
  cancerType: z.enum([
    'Kidney Cancer',
    'Testicular Cancer',
    'Prostate Cancer',
    'Liver Cancer',
    'Pancreatic Cancer',
    'Breast Cancer',
    'Thyroid Cancer',
    'Non-Hodgkin\'s Lymphoma',
  ]).optional(),
  nonCancerType: z.enum([
    'Thyroid Disease',
    'Autoimmune Disorders',
    'Liver Disease',
    'High Cholesterol',
  ]).optional(),
  diagnosisYear: z.union([
    z.string().refine(val => {
      if (!val) return true; // Allow empty string
      const year = parseInt(val, 10);
      return !isNaN(year) && year >= 1900 && year <= new Date().getFullYear();
    }, {
      message: `Year must be between 1900 and ${new Date().getFullYear()}`,
    }),
    z.number().min(1900).max(new Date().getFullYear())
  ]).optional(),
}).refine(
  (data) => {
    if (data.injuryType === 'Cancer') {
      return !!data.cancerType;
    }
    if (data.injuryType === 'Non-Cancer') {
      return !!data.nonCancerType;
    }
    return true;
  },
  {
    message: 'Please select a specific condition',
    path: ['cancerType'],
  }
);

// Exposure Information validation schema
export const exposureInfoSchema = z.object({
  isCurrentlyInContaminationZone: z.boolean(),
  pastLocations: z.array(z.string()).optional(),
  workplaceDetails: z.string().optional(),
  militaryServiceHistory: z.string().optional(),
  exposureDuration: z.string().optional(),
}).refine(
  (data) => {
    if (!data.isCurrentlyInContaminationZone) {
      return (
        (data.pastLocations && data.pastLocations.length > 0) ||
        !!data.workplaceDetails ||
        !!data.militaryServiceHistory
      );
    }
    return true;
  },
  {
    message: 'Please provide information about your exposure',
    path: ['pastLocations'],
  }
);

// Legal Information validation schema
export const legalInfoSchema = z.object({
  hasLegalRetainer: z.boolean(),
});

// Complete claim form validation schema
export const claimFormSchema = z.object({
  personalInfo: personalInfoSchema,
  injuryInfo: injuryInfoSchema,
  exposureInfo: exposureInfoSchema,
  legalInfo: legalInfoSchema,
}); 