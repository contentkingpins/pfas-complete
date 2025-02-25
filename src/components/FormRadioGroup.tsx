import React, { forwardRef } from 'react';

interface Option {
  value: string;
  label: string;
}

interface FormRadioGroupProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  options: Option[];
  error?: string;
  helperText?: string;
}

const FormRadioGroup = forwardRef<HTMLInputElement, FormRadioGroupProps>(
  ({ label, options, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
        <div className="space-y-2">
          {options.map((option) => (
            <div key={option.value} className="flex items-center">
              <input
                type="radio"
                id={`${props.name}-${option.value}`}
                value={option.value}
                className={`
                  h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300
                  ${error ? 'border-red-500' : 'border-gray-300'} 
                  ${className}
                `}
                ref={ref}
                {...props}
              />
              <label
                htmlFor={`${props.name}-${option.value}`}
                className="ml-2 block text-sm text-gray-700"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

FormRadioGroup.displayName = 'FormRadioGroup';

export default FormRadioGroup; 