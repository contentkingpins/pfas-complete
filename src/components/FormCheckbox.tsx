import React, { forwardRef } from 'react';

interface FormCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

const FormCheckbox = forwardRef<HTMLInputElement, FormCheckboxProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="mb-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            ref={ref}
            className={`
              h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded
              ${error ? 'border-red-500' : 'border-gray-300'} 
              ${className}
            `}
            {...props}
          />
          <label 
            htmlFor={props.id || props.name} 
            className="ml-2 block text-sm text-gray-700"
          >
            {label}
          </label>
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

FormCheckbox.displayName = 'FormCheckbox';

export default FormCheckbox; 