import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import FormCheckbox from '../FormCheckbox';
import { ClaimFormData } from '@/types';

const LegalInfoStep: React.FC = () => {
  const { control, formState: { errors } } = useFormContext<ClaimFormData>();
  
  return (
    <div className="space-y-4">
      <p className="text-gray-600 mb-6">
        Please provide information about your legal representation status.
      </p>
      
      <div className="p-4 bg-red-50 rounded-md mb-6">
        <p className="text-sm text-red-800">
          <strong>Important:</strong> If you already have legal representation for your PFAS claim, we cannot submit a claim on your behalf. Please consult with your current attorney.
        </p>
      </div>
      
      <Controller
        name="legalInfo.hasLegalRetainer"
        control={control}
        render={({ field: { onChange, value, ...field } }) => (
          <FormCheckbox
            label="I currently have a legal retainer regarding my PFAS claim"
            checked={value}
            onChange={onChange}
            error={errors.legalInfo?.hasLegalRetainer?.message}
            {...field}
          />
        )}
      />
      
      <div className="mt-8 p-4 bg-gray-50 rounded-md">
        <h3 className="text-lg font-semibold mb-2">Legal Disclaimer</h3>
        <p className="text-sm text-gray-700 mb-2">
          By submitting this form, you acknowledge that:
        </p>
        <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
          <li>The information provided is true and accurate to the best of your knowledge.</li>
          <li>Submission of this form does not guarantee compensation.</li>
          <li>You authorize us to contact you regarding your PFAS claim.</li>
          <li>You understand that legal representation may be necessary to pursue your claim.</li>
        </ul>
      </div>
    </div>
  );
};

export default LegalInfoStep; 