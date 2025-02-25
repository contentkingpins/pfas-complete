import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
  animated?: boolean;
  href?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  animated = true,
  className = '',
  href,
  ...props
}) => {
  // Base styles
  const baseStyles = 'font-semibold rounded-lg transition-all duration-200 flex items-center justify-center';
  
  // Size styles
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  // Variant styles
  const variantStyles = {
    primary: 'bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg',
    secondary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg',
    outline: 'bg-transparent border-2 border-red-600 text-red-600 hover:bg-red-50',
  };
  
  // Width styles
  const widthStyles = fullWidth ? 'w-full' : '';
  
  // Loading state
  const loadingState = isLoading ? 'opacity-70 cursor-not-allowed' : '';
  
  // Combine all styles
  const buttonStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyles} ${loadingState} ${className}`;
  
  // Animation variants
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.98 },
  };
  
  // Content to display
  const content = isLoading ? (
    <>
      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Processing...
    </>
  ) : (
    children
  );
  
  // If href is provided, render as a Link
  if (href) {
    return (
      <Link href={href} className={buttonStyles}>
        {content}
      </Link>
    );
  }
  
  // Otherwise render as a button
  return animated ? (
    <motion.button
      className={buttonStyles}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      variants={buttonVariants}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {content}
    </motion.button>
  ) : (
    <button
      className={buttonStyles}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button; 