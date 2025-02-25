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
import ClickToCall from './ClickToCall';
import { GeolocationResponse } from '@/types';

interface ClaimFormProps {
  geolocationData?: GeolocationResponse;
  onBack?: () => void;
}

const ClaimForm: React.FC<ClaimFormProps> = ({ geolocationData, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isDisqualified, setIsDisqualified] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if the device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
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
        pastLocations: '',
        workplaceDetails: '',
        militaryServiceHistory: '',
        exposureDuration: '',
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
    return (
      <>
        <DisqualifiedStep />
        <ClickToCall phoneNumber="8005551234" />
      </>
    );
  }

  if (isSubmitted) {
    return (
      <>
        <SuccessStep />
        <ClickToCall phoneNumber="8005551234" />
      </>
    );
  }

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {onBack && !isSubmitted && !isDisqualified && (
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={onBack} 
            size="sm"
            className="flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Button>
        </div>
      )}
      
      <h1 className="text-3xl font-bold text-center mb-8">PFAS Claim Form</h1>
      
      <div className="max-w-2xl mx-auto bg-white p-4 sm:p-6 rounded-lg shadow-lg">
        <div className="mb-6 sm:mb-8">
          <div className="flex justify-between items-center mb-4">
            {steps.map((step, index) => (
              <div 
                key={step.id}
                className={`flex flex-col items-center ${index <= currentStep ? 'text-blue-600' : 'text-gray-400'}`}
              >
                <div 
                  className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mb-1 text-xs sm:text-sm ${
                    index < currentStep 
                      ? 'bg-blue-600 text-white' 
                      : index === currentStep 
                        ? 'border-2 border-blue-600 text-blue-600' 
                        : 'border-2 border-gray-300 text-gray-400'
                  }`}
                >
                  {index < currentStep ? '✓' : index + 1}
                </div>
                <span className="text-[10px] sm:text-xs md:text-sm">{isMobile ? step.id.charAt(0).toUpperCase() : step.title}</span>
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
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">{steps[currentStep].title}</h2>
                <CurrentStepComponent geolocationData={geolocationData} />
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 sm:mt-8 flex justify-between">
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
      
      {/* Add the Click-to-Call button */}
      <ClickToCall phoneNumber="8005551234" />
    </div>
  );
};

export default ClaimForm; 