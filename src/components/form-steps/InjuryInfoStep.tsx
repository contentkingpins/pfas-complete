import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import FormSelect from '../FormSelect';
import FormInput from '../FormInput';
import { ClaimFormData, InjuryType } from '@/types';

const InjuryInfoStep: React.FC = () => {
  const { register, control, watch, formState: { errors } } = useFormContext<ClaimFormData>();
  
  const injuryType = watch('injuryInfo.injuryType') as InjuryType;
  
  const cancerOptions = [
    { value: 'Kidney Cancer', label: 'Kidney Cancer' },
    { value: 'Testicular Cancer', label: 'Testicular Cancer' },
    { value: 'Prostate Cancer', label: 'Prostate Cancer' },
    { value: 'Liver Cancer', label: 'Liver Cancer' },
    { value: 'Pancreatic Cancer', label: 'Pancreatic Cancer' },
    { value: 'Breast Cancer', label: 'Breast Cancer' },
    { value: 'Thyroid Cancer', label: 'Thyroid Cancer' },
    { value: 'Non-Hodgkin\'s Lymphoma', label: 'Non-Hodgkin\'s Lymphoma' },
  ];
  
  const nonCancerOptions = [
    { value: 'Thyroid Disease', label: 'Thyroid Disease' },
    { value: 'Autoimmune Disorders', label: 'Autoimmune Disorders' },
    { value: 'Liver Disease', label: 'Liver Disease' },
    { value: 'High Cholesterol', label: 'High Cholesterol' },
  ];
  
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 50 }, (_, i) => {
    const year = currentYear - i;
    return { value: year.toString(), label: year.toString() };
  });
  
  return (
    <div className="space-y-4">
      <p className="text-gray-600 mb-6">
        Please provide information about your PFAS-related health condition.
      </p>
      
      <Controller
        name="injuryInfo.injuryType"
        control={control}
        render={({ field }) => (
          <FormSelect
            label="Type of Injury"
            options={[
              { value: 'Cancer', label: 'Cancer' },
              { value: 'Non-Cancer', label: 'Non-Cancer Condition' },
            ]}
            error={errors.injuryInfo?.injuryType?.message}
            {...field}
          />
        )}
      />
      
      {injuryType === 'Cancer' && (
        <Controller
          name="injuryInfo.cancerType"
          control={control}
          render={({ field }) => (
            <FormSelect
              label="Type of Cancer"
              options={cancerOptions}
              error={errors.injuryInfo?.cancerType?.message}
              helperText="Select the type of cancer you have been diagnosed with"
              {...field}
            />
          )}
        />
      )}
      
      {injuryType === 'Non-Cancer' && (
        <Controller
          name="injuryInfo.nonCancerType"
          control={control}
          render={({ field }) => (
            <FormSelect
              label="Type of Condition"
              options={nonCancerOptions}
              error={errors.injuryInfo?.nonCancerType?.message}
              helperText="Select the type of condition you have been diagnosed with"
              {...field}
            />
          )}
        />
      )}
      
      <Controller
        name="injuryInfo.diagnosisYear"
        control={control}
        render={({ field }) => (
          <FormSelect
            label="Year of Diagnosis"
            options={yearOptions}
            error={errors.injuryInfo?.diagnosisYear?.message}
            helperText="Select the year you were diagnosed"
            {...field}
          />
        )}
      />
      
      <div className="mt-4 p-4 bg-yellow-50 rounded-md">
        <p className="text-sm text-yellow-800">
          <strong>Important:</strong> PFAS exposure has been linked to various health conditions. Your specific diagnosis will help determine your eligibility for compensation.
        </p>
      </div>
    </div>
  );
};

export default InjuryInfoStep; 