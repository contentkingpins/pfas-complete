import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PFAS Claim Website - Check Your Eligibility",
  description: "Find out if you've been exposed to PFAS chemicals and may qualify for compensation. Check your location and file a claim today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-white shadow-md py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-red-600 font-bold text-2xl">PFAS</span>
              <span className="text-blue-600 font-bold text-2xl ml-1">Claim</span>
            </div>
            <nav>
              <ul className="flex space-x-6">
                <li><a href="/" className="text-gray-700 hover:text-red-600">Home</a></li>
                <li><a href="#about" className="text-gray-700 hover:text-red-600">About PFAS</a></li>
                <li><a href="#qualify" className="text-gray-700 hover:text-red-600">Do I Qualify?</a></li>
                <li><a href="#contact" className="text-gray-700 hover:text-red-600">Contact</a></li>
              </ul>
            </nav>
          </div>
        </header>
        
        {children}
        
        <footer className="bg-gray-800 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">PFAS Claim</h3>
                <p className="text-gray-300">
                  We help individuals who have been exposed to PFAS chemicals seek the compensation they deserve.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="/" className="text-gray-300 hover:text-white">Home</a></li>
                  <li><a href="#about" className="text-gray-300 hover:text-white">About PFAS</a></li>
                  <li><a href="#qualify" className="text-gray-300 hover:text-white">Eligibility</a></li>
                  <li><a href="#contact" className="text-gray-300 hover:text-white">Contact Us</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Legal Disclaimer</h3>
                <p className="text-gray-300 text-sm">
                  This website provides general information about PFAS claims and is not legal advice. 
                  Results may vary. Please consult with a qualified attorney for specific legal advice.
                </p>
              </div>
            </div>
            
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
              <p>&copy; {new Date().getFullYear()} PFAS Claim Website. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
