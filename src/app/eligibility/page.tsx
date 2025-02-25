'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import FormInput from '@/components/FormInput';
import FormSelect from '@/components/FormSelect';
import FormCheckbox from '@/components/FormCheckbox';

export default function Eligibility() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isEligible, setIsEligible] = useState<boolean | null>(null);
  const [formData, setFormData] = useState({
    location: '',
    exposureType: '',
    exposureDuration: '',
    healthIssues: false,
    healthCondition: '',
    diagnosisYear: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
  
  const handleNext = () => {
    setStep(step + 1);
    window.scrollTo(0, 0);
  };
  
  const handleBack = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple eligibility check logic
    // In a real application, this would be more sophisticated
    const hasLocation = !!formData.location;
    const hasExposure = !!formData.exposureType && !!formData.exposureDuration;
    const hasHealthIssues = formData.healthIssues && !!formData.healthCondition;
    
    // User is eligible if they have location, exposure, and health issues
    setIsEligible(hasLocation && hasExposure && hasHealthIssues);
  };
  
  const handleStartClaim = () => {
    router.push('/');
  };
  
  // Animation variants
  const variants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };
  
  // Render eligibility result
  if (isEligible !== null) {
    return (
      <main className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {isEligible ? (
              <>
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-10 w-10 text-green-600" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M5 13l4 4L19 7" 
                    />
                  </svg>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-800 mb-4">You May Qualify for Compensation!</h1>
                
                <p className="text-lg text-gray-600 mb-8">
                  Based on your responses, you may be eligible to file a PFAS claim. Our team can help you pursue the compensation you deserve.
                </p>
                
                <div className="bg-blue-50 p-6 rounded-lg mb-8">
                  <h2 className="text-xl font-semibold text-blue-800 mb-2">Next Steps</h2>
                  <p className="text-blue-800 mb-4">
                    To proceed with your claim, we'll need to gather more detailed information about your exposure and health condition.
                  </p>
                  <Button 
                    size="lg" 
                    onClick={handleStartClaim}
                  >
                    Start Your Claim Now
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-10 w-10 text-yellow-600" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                    />
                  </svg>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-800 mb-4">We Need More Information</h1>
                
                <p className="text-lg text-gray-600 mb-8">
                  Based on your responses, we need more information to determine if you qualify for a PFAS claim. Please contact us for a personalized evaluation.
                </p>
                
                <div className="bg-yellow-50 p-6 rounded-lg mb-8">
                  <h2 className="text-xl font-semibold text-yellow-800 mb-2">Why You Might Still Qualify</h2>
                  <p className="text-yellow-800 mb-4">
                    PFAS claims are complex, and your situation may require individual assessment by our legal team.
                  </p>
                  <Button 
                    size="lg" 
                    variant="secondary"
                    onClick={() => router.push('/contact')}
                  >
                    Contact Us for Evaluation
                  </Button>
                </div>
              </>
            )}
            
            <Button 
              variant="outline"
              onClick={() => setIsEligible(null)}
              className="mt-4"
            >
              Retake Eligibility Check
            </Button>
          </motion.div>
        </div>
      </main>
    );
  }
  
  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Check Your PFAS Claim Eligibility</h1>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="mb-8">
              <div className="relative h-2 bg-gray-200 rounded-full">
                <div 
                  className="absolute top-0 left-0 h-2 bg-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${(step / 3) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-2">
                <span className={`text-sm ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>Location</span>
                <span className={`text-sm ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>Exposure</span>
                <span className={`text-sm ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>Health</span>
              </div>
            </div>
            
            <form onSubmit={handleSubmit}>
              <motion.div
                key={step}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3 }}
              >
                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold mb-4">Location Information</h2>
                    <p className="text-gray-600 mb-6">
                      Please provide information about where you may have been exposed to PFAS chemicals.
                    </p>
                    
                    <FormSelect
                      label="Where have you lived or worked that may have exposed you to PFAS?"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      options={[
                        { value: '', label: 'Select a location' },
                        { value: 'military_base', label: 'Military Base (e.g., Camp Lejeune)' },
                        { value: 'industrial_area', label: 'Near Industrial Facility' },
                        { value: 'firefighting', label: 'Firefighting Training Area' },
                        { value: 'contaminated_water', label: 'Area with Contaminated Water Supply' },
                        { value: 'other', label: 'Other Location' },
                      ]}
                      required
                    />
                    
                    <div className="flex justify-end mt-8">
                      <Button 
                        type="button" 
                        onClick={handleNext}
                        disabled={!formData.location}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
                
                {step === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold mb-4">Exposure Information</h2>
                    <p className="text-gray-600 mb-6">
                      Please provide details about your potential exposure to PFAS chemicals.
                    </p>
                    
                    <FormSelect
                      label="Type of Exposure"
                      name="exposureType"
                      value={formData.exposureType}
                      onChange={handleChange}
                      options={[
                        { value: '', label: 'Select exposure type' },
                        { value: 'drinking_water', label: 'Contaminated Drinking Water' },
                        { value: 'occupational', label: 'Occupational Exposure' },
                        { value: 'consumer_products', label: 'Consumer Products' },
                        { value: 'firefighting_foam', label: 'Firefighting Foam' },
                        { value: 'other', label: 'Other Exposure' },
                      ]}
                      required
                    />
                    
                    <FormSelect
                      label="Duration of Exposure"
                      name="exposureDuration"
                      value={formData.exposureDuration}
                      onChange={handleChange}
                      options={[
                        { value: '', label: 'Select duration' },
                        { value: 'less_than_1', label: 'Less than 1 year' },
                        { value: '1_to_5', label: '1-5 years' },
                        { value: '5_to_10', label: '5-10 years' },
                        { value: 'more_than_10', label: 'More than 10 years' },
                        { value: 'unknown', label: 'Unknown' },
                      ]}
                      required
                    />
                    
                    <div className="flex justify-between mt-8">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={handleBack}
                      >
                        Back
                      </Button>
                      <Button 
                        type="button" 
                        onClick={handleNext}
                        disabled={!formData.exposureType || !formData.exposureDuration}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
                
                {step === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold mb-4">Health Information</h2>
                    <p className="text-gray-600 mb-6">
                      Please provide information about any health issues you may have experienced.
                    </p>
                    
                    <FormCheckbox
                      label="Have you been diagnosed with a health condition that may be related to PFAS exposure?"
                      name="healthIssues"
                      checked={formData.healthIssues as boolean}
                      onChange={handleChange}
                    />
                    
                    {formData.healthIssues && (
                      <>
                        <FormSelect
                          label="Health Condition"
                          name="healthCondition"
                          value={formData.healthCondition}
                          onChange={handleChange}
                          options={[
                            { value: '', label: 'Select condition' },
                            { value: 'kidney_cancer', label: 'Kidney Cancer' },
                            { value: 'testicular_cancer', label: 'Testicular Cancer' },
                            { value: 'thyroid_disease', label: 'Thyroid Disease' },
                            { value: 'ulcerative_colitis', label: 'Ulcerative Colitis' },
                            { value: 'high_cholesterol', label: 'High Cholesterol' },
                            { value: 'other_cancer', label: 'Other Cancer' },
                            { value: 'other_condition', label: 'Other Condition' },
                          ]}
                          required={formData.healthIssues}
                        />
                        
                        <FormSelect
                          label="Year of Diagnosis"
                          name="diagnosisYear"
                          value={formData.diagnosisYear}
                          onChange={handleChange}
                          options={[
                            { value: '', label: 'Select year' },
                            ...Array.from({ length: 30 }, (_, i) => {
                              const year = new Date().getFullYear() - i;
                              return { value: year.toString(), label: year.toString() };
                            }),
                          ]}
                          required={formData.healthIssues}
                        />
                      </>
                    )}
                    
                    <div className="flex justify-between mt-8">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={handleBack}
                      >
                        Back
                      </Button>
                      <Button 
                        type="submit"
                        disabled={formData.healthIssues && !formData.healthCondition}
                      >
                        Check Eligibility
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
} 