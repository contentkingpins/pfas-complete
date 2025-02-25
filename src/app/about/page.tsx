import React from 'react';
import Link from 'next/link';
import Button from '@/components/Button';

export default function About() {
  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">About PFAS Chemicals</h1>
        
        <div className="max-w-4xl mx-auto">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">What Are PFAS Chemicals?</h2>
            <p className="text-gray-700 mb-4">
              PFAS (Per- and polyfluoroalkyl substances) are a group of man-made chemicals that have been manufactured and used in a variety of industries around the globe since the 1940s. These chemicals are very persistent in the environment and in the human body – meaning they don't break down and can accumulate over time.
            </p>
            <p className="text-gray-700 mb-4">
              There are thousands of PFAS chemicals, and they can be found in many different consumer, commercial, and industrial products. This makes it challenging to study and assess the potential human health effects of PFAS exposure.
            </p>
            <div className="bg-blue-50 p-6 rounded-lg my-6">
              <h3 className="text-xl font-semibold mb-2">Common Products Containing PFAS:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Non-stick cookware (e.g., Teflon)</li>
                <li>Stain-resistant fabrics and carpets</li>
                <li>Water-repellent clothing</li>
                <li>Food packaging (e.g., pizza boxes, fast food wrappers)</li>
                <li>Firefighting foams</li>
                <li>Cleaning products</li>
                <li>Personal care products (e.g., shampoo, dental floss)</li>
              </ul>
            </div>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Health Effects of PFAS Exposure</h2>
            <p className="text-gray-700 mb-4">
              Scientific studies have shown that exposure to certain PFAS may be associated with harmful health effects in humans. The most consistent findings from human epidemiology studies are increased cholesterol levels among exposed populations, with more limited findings related to:
            </p>
            <div className="grid md:grid-cols-2 gap-6 my-6">
              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Cancer Risks</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Kidney cancer</li>
                  <li>Testicular cancer</li>
                  <li>Prostate cancer</li>
                  <li>Liver cancer</li>
                  <li>Pancreatic cancer</li>
                  <li>Breast cancer</li>
                  <li>Thyroid cancer</li>
                  <li>Non-Hodgkin's lymphoma</li>
                </ul>
              </div>
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Non-Cancer Effects</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Thyroid hormone disruption</li>
                  <li>Liver damage</li>
                  <li>Increased cholesterol levels</li>
                  <li>Decreased vaccine response in children</li>
                  <li>Decreased fertility</li>
                  <li>Pregnancy-induced hypertension/pre-eclampsia</li>
                  <li>Low birth weight</li>
                  <li>Immune system effects</li>
                </ul>
              </div>
            </div>
            <p className="text-gray-700">
              The science on health effects of PFAS is still developing. Scientists are working to better understand how exposure to PFAS might affect people's health.
            </p>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Major PFAS Contamination Sites</h2>
            <p className="text-gray-700 mb-6">
              PFAS contamination has been identified at numerous locations across the United States. Some of the most significant contamination sites include:
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="py-3 px-4 border-b text-left">Location</th>
                    <th className="py-3 px-4 border-b text-left">Source of Contamination</th>
                    <th className="py-3 px-4 border-b text-left">Affected Area</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-3 px-4 border-b">Camp Lejeune, North Carolina</td>
                    <td className="py-3 px-4 border-b">Military base operations</td>
                    <td className="py-3 px-4 border-b">Drinking water for military personnel and families</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-b">Hoosick Falls, New York</td>
                    <td className="py-3 px-4 border-b">Manufacturing facilities</td>
                    <td className="py-3 px-4 border-b">Municipal water supply</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-b">Parkersburg, West Virginia</td>
                    <td className="py-3 px-4 border-b">DuPont Washington Works plant</td>
                    <td className="py-3 px-4 border-b">Ohio River and surrounding communities</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-b">Parchment, Michigan</td>
                    <td className="py-3 px-4 border-b">Paper mill</td>
                    <td className="py-3 px-4 border-b">Municipal water supply</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-b">Decatur, Alabama</td>
                    <td className="py-3 px-4 border-b">3M manufacturing facility</td>
                    <td className="py-3 px-4 border-b">Tennessee River and local groundwater</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Legal Actions and Settlements</h2>
            <p className="text-gray-700 mb-4">
              In recent years, there have been significant legal actions against companies that manufactured PFAS chemicals or used them in their products. Some notable settlements include:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>
                <strong>DuPont/Chemours Settlement (2017)</strong>: $671 million settlement for approximately 3,550 personal injury claims related to PFOA contamination in the Mid-Ohio Valley.
              </li>
              <li>
                <strong>3M Settlement with Minnesota (2018)</strong>: $850 million settlement to resolve the State of Minnesota's natural resource damages claims for PFAS contamination.
              </li>
              <li>
                <strong>Multi-District Litigation (Ongoing)</strong>: Thousands of cases consolidated in federal court against PFAS manufacturers, with potential settlements expected to reach billions of dollars.
              </li>
              <li>
                <strong>Camp Lejeune Justice Act (2022)</strong>: Allows military personnel and their families who were exposed to contaminated water at Camp Lejeune to file claims against the government.
              </li>
            </ul>
            <p className="text-gray-700">
              These legal actions demonstrate the growing recognition of the serious health and environmental impacts of PFAS chemicals, and the responsibility of manufacturers to address the harm caused by these "forever chemicals."
            </p>
          </section>
          
          <div className="text-center mt-12">
            <h2 className="text-2xl font-bold mb-4">Check If You Qualify for Compensation</h2>
            <p className="text-gray-700 mb-6">
              If you believe you've been exposed to PFAS chemicals and have experienced health issues, you may be eligible for compensation.
            </p>
            <Link href="/" passHref>
              <Button size="lg">Check Your Eligibility Now</Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
} 