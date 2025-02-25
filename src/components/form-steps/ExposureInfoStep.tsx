import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import FormCheckbox from '../FormCheckbox';
import FormTextarea from '../FormTextarea';
import FormInput from '../FormInput';
import { ClaimFormData, GeolocationResponse } from '@/types';

interface ExposureInfoStepProps {
  geolocationData?: GeolocationResponse;
}

const ExposureInfoStep: React.FC<ExposureInfoStepProps> = ({ geolocationData }) => {
  const { register, control, watch, formState: { errors } } = useFormContext<ClaimFormData>();
  
  const isCurrentlyInContaminationZone = watch('exposureInfo.isCurrentlyInContaminationZone');
  
  return (
    <div className="space-y-4">
      <p className="text-gray-600 mb-6">
        Please provide information about your exposure to PFAS chemicals.
      </p>
      
      {geolocationData && (
        <div className={`p-4 rounded-md mb-6 ${geolocationData.isContaminated ? 'bg-red-50' : 'bg-blue-50'}`}>
          <p className={`text-sm ${geolocationData.isContaminated ? 'text-red-800' : 'text-blue-800'}`}>
            <strong>{geolocationData.isContaminated ? 'Alert:' : 'Notice:'}</strong> {geolocationData.message}
          </p>
        </div>
      )}
      
      <Controller
        name="exposureInfo.isCurrentlyInContaminationZone"
        control={control}
        render={({ field: { onChange, value, ...field } }) => (
          <FormCheckbox
            label="I currently live in a PFAS contamination zone"
            checked={value}
            onChange={onChange}
            error={errors.exposureInfo?.isCurrentlyInContaminationZone?.message}
            {...field}
          />
        )}
      />
      
      {!isCurrentlyInContaminationZone && (
        <>
          <FormTextarea
            label="Past Locations"
            {...register('exposureInfo.pastLocations')}
            error={errors.exposureInfo?.pastLocations?.message}
            placeholder="List any past locations where you may have been exposed to PFAS (e.g., cities, military bases, etc.)"
            helperText="Please include dates if possible"
          />
          
          <FormTextarea
            label="Workplace Details"
            {...register('exposureInfo.workplaceDetails')}
            error={errors.exposureInfo?.workplaceDetails?.message}
            placeholder="Describe any workplaces where you may have been exposed to PFAS chemicals"
            helperText="Include company names, locations, and your job roles"
          />
          
          <FormTextarea
            label="Military Service History"
            {...register('exposureInfo.militaryServiceHistory')}
            error={errors.exposureInfo?.militaryServiceHistory?.message}
            placeholder="If applicable, provide details about your military service"
            helperText="Include branch, bases, and dates of service"
          />
        </>
      )}
      
      <FormInput
        label="Estimated Exposure Duration"
        {...register('exposureInfo.exposureDuration')}
        error={errors.exposureInfo?.exposureDuration?.message}
        placeholder="How long were you exposed? (e.g., 5 years, 1980-1995)"
      />
      
      <div className="mt-4 p-4 bg-green-50 rounded-md">
        <p className="text-sm text-green-800">
          <strong>Tip:</strong> The more detailed information you can provide about your exposure, the stronger your claim will be. Include specific locations, time periods, and potential sources of exposure.
        </p>
      </div>
    </div>
  );
};

export default ExposureInfoStep; 