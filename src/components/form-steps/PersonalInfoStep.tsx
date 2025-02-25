import React from 'react';
import { useFormContext } from 'react-hook-form';
import FormInput from '../FormInput';
import { ClaimFormData } from '@/types';

const PersonalInfoStep: React.FC = () => {
  const { register, formState: { errors } } = useFormContext<ClaimFormData>();
  
  return (
    <div className="space-y-4">
      <p className="text-gray-600 mb-6">
        Please provide your personal information so we can contact you about your PFAS claim.
      </p>
      
      <FormInput
        label="First Name"
        {...register('personalInfo.firstName')}
        error={errors.personalInfo?.firstName?.message}
        placeholder="Enter your first name"
        autoComplete="given-name"
      />
      
      <FormInput
        label="Last Name"
        {...register('personalInfo.lastName')}
        error={errors.personalInfo?.lastName?.message}
        placeholder="Enter your last name"
        autoComplete="family-name"
      />
      
      <FormInput
        label="Email Address"
        type="email"
        {...register('personalInfo.email')}
        error={errors.personalInfo?.email?.message}
        placeholder="Enter your email address"
        autoComplete="email"
      />
      
      <FormInput
        label="Phone Number"
        type="tel"
        {...register('personalInfo.phoneNumber')}
        error={errors.personalInfo?.phoneNumber?.message}
        placeholder="Enter your phone number"
        autoComplete="tel"
      />
      
      <div className="mt-4 p-4 bg-blue-50 rounded-md">
        <p className="text-sm text-blue-800">
          <strong>Privacy Notice:</strong> Your information is secure and will only be used to process your PFAS claim. We will never sell your data to third parties.
        </p>
      </div>
    </div>
  );
};

export default PersonalInfoStep; 