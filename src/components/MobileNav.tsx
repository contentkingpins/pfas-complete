"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
      {/* Hamburger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex flex-col justify-center items-center w-10 h-10 space-y-1.5 focus:outline-none"
        aria-label="Toggle menu"
      >
        <span className={`block w-6 h-0.5 bg-gray-800 transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-gray-800 transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
        <span className={`block w-6 h-0.5 bg-gray-800 transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-4 z-50">
          <ul className="space-y-3">
            <li>
              <Link 
                href="/" 
                className="block text-gray-700 hover:text-red-600 py-2 px-4 hover:bg-gray-50 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                href="/about" 
                className="block text-gray-700 hover:text-red-600 py-2 px-4 hover:bg-gray-50 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                About PFAS
              </Link>
            </li>
            <li>
              <Link 
                href="/eligibility" 
                className="block text-gray-700 hover:text-red-600 py-2 px-4 hover:bg-gray-50 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Do I Qualify?
              </Link>
            </li>
            <li>
              <Link 
                href="/contact" 
                className="block text-gray-700 hover:text-red-600 py-2 px-4 hover:bg-gray-50 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
} 