"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import ViewportHeightFix from "@/components/ViewportHeightFix";
import MobileNav from "@/components/MobileNav";
import CopyrightYear from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Client component for viewport height fix */}
        <ViewportHeightFix />
        
        <header className="bg-white shadow-md py-3 sm:py-4 sticky top-0 z-40">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-red-600 font-bold text-xl sm:text-2xl">PFAS</span>
              <span className="text-blue-600 font-bold text-xl sm:text-2xl ml-1">Claim</span>
            </div>
            
            {/* Mobile Navigation */}
            <div className="block sm:hidden">
              <MobileNav />
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden sm:block">
              <ul className="flex space-x-6">
                <li><Link href="/" className="text-gray-700 hover:text-red-600">Home</Link></li>
                <li><Link href="/about" className="text-gray-700 hover:text-red-600">About PFAS</Link></li>
                <li><Link href="/eligibility" className="text-gray-700 hover:text-red-600">Do I Qualify?</Link></li>
                <li><Link href="/contact" className="text-gray-700 hover:text-red-600">Contact</Link></li>
              </ul>
            </nav>
          </div>
        </header>
        
        <main className="min-h-screen">
          {children}
        </main>
        
        <footer className="bg-gray-800 text-white py-8 sm:py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">PFAS Claim</h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  We help individuals who have been exposed to PFAS chemicals seek the compensation they deserve.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><Link href="/" className="text-gray-300 hover:text-white text-sm sm:text-base">Home</Link></li>
                  <li><Link href="/about" className="text-gray-300 hover:text-white text-sm sm:text-base">About PFAS</Link></li>
                  <li><Link href="/eligibility" className="text-gray-300 hover:text-white text-sm sm:text-base">Eligibility</Link></li>
                  <li><Link href="/contact" className="text-gray-300 hover:text-white text-sm sm:text-base">Contact Us</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Legal Disclaimer</h3>
                <p className="text-gray-300 text-xs sm:text-sm">
                  This website provides general information about PFAS claims and is not legal advice. 
                  Results may vary. Please consult with a qualified attorney for specific legal advice.
                </p>
              </div>
            </div>
            
            <div className="border-t border-gray-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400 text-xs sm:text-sm">
              <p>&copy; <CopyrightYear /> PFAS Claim Website. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
