import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { ClaimFormData } from '@/types';
import { claimFormSchema } from '@/lib/validation';
import Button from './Button';
import PersonalInfoStep from './form-steps/PersonalInfoStep';
import InjuryInfoStep from './form-steps/InjuryInfoStep';
import ExposureInfoStep from './form-steps/ExposureInfoStep';
import LegalInfoStep from './form-steps/LegalInfoStep';
import SuccessStep from './form-steps/SuccessStep';
import DisqualifiedStep from './form-steps/DisqualifiedStep';
import { GeolocationResponse } from '@/types';

interface ClaimFormProps {
  geolocationData?: GeolocationResponse;
}

const ClaimForm: React.FC<ClaimFormProps> = ({ geolocationData }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isDisqualified, setIsDisqualified] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const methods = useForm<ClaimFormData>({
    resolver: zodResolver(claimFormSchema),
    defaultValues: {
      personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
      },
      injuryInfo: {
        injuryType: 'Cancer',
      },
      exposureInfo: {
        isCurrentlyInContaminationZone: geolocationData?.isContaminated || false,
      },
      legalInfo: {
        hasLegalRetainer: false,
      },
    },
    mode: 'onChange',
  });

  const { handleSubmit, watch, trigger } = methods;
  
  // Watch for legal retainer status to disqualify if needed
  const hasLegalRetainer = watch('legalInfo.hasLegalRetainer');
  
  useEffect(() => {
    if (hasLegalRetainer && currentStep === 3) {
      setIsDisqualified(true);
    }
  }, [hasLegalRetainer, currentStep]);

  const steps = [
    { id: 'personal', title: 'Personal Information', component: PersonalInfoStep },
    { id: 'injury', title: 'Injury Information', component: InjuryInfoStep },
    { id: 'exposure', title: 'Exposure Information', component: ExposureInfoStep },
    { id: 'legal', title: 'Legal Information', component: LegalInfoStep },
  ];

  const goToNextStep = async () => {
    const fieldsToValidate = getFieldsToValidate(currentStep);
    const isStepValid = await trigger(fieldsToValidate as any);
    
    if (isStepValid) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
        window.scrollTo(0, 0);
      }
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const getFieldsToValidate = (step: number) => {
    switch (step) {
      case 0:
        return ['personalInfo'];
      case 1:
        return ['injuryInfo'];
      case 2:
        return ['exposureInfo'];
      case 3:
        return ['legalInfo'];
      default:
        return [];
    }
  };

  const onSubmit = (data: ClaimFormData) => {
    console.log('Form submitted:', data);
    
    // In a real application, you would send this data to your backend
    // For now, we'll just simulate a successful submission
    setIsSubmitted(true);
  };

  // Animation variants
  const variants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  if (isDisqualified) {
    return <DisqualifiedStep />;
  }

  if (isSubmitted) {
    return <SuccessStep />;
  }

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {steps.map((step, index) => (
            <div 
              key={step.id}
              className={`flex flex-col items-center ${index <= currentStep ? 'text-blue-600' : 'text-gray-400'}`}
            >
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                  index < currentStep 
                    ? 'bg-blue-600 text-white' 
                    : index === currentStep 
                      ? 'border-2 border-blue-600 text-blue-600' 
                      : 'border-2 border-gray-300 text-gray-400'
                }`}
              >
                {index < currentStep ? '✓' : index + 1}
              </div>
              <span className="text-xs hidden sm:block">{step.title}</span>
            </div>
          ))}
        </div>
        <div className="relative h-2 bg-gray-200 rounded-full">
          <div 
            className="absolute top-0 left-0 h-2 bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-6">{steps[currentStep].title}</h2>
              <CurrentStepComponent geolocationData={geolocationData} />
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-between">
            {currentStep > 0 && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={goToPreviousStep}
              >
                Previous
              </Button>
            )}
            
            <div className={`${currentStep > 0 ? 'ml-auto' : ''}`}>
              {currentStep < steps.length - 1 ? (
                <Button 
                  type="button" 
                  onClick={goToNextStep}
                >
                  Next
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  variant="primary"
                >
                  Submit Claim
                </Button>
              )}
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ClaimForm; 