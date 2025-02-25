import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Button variants
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text' | 'call';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

// Button props
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  animated?: boolean;
  href?: string;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  animated = false,
  href,
  fullWidth = false,
  className = '',
  ...props
}) => {
  // Button variants styling
  const baseStyles = 'font-semibold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Size classes - increased padding for better touch targets on mobile
  const sizeClasses = {
    sm: 'py-2 px-3 text-sm',
    md: 'py-2.5 px-4 text-base',
    lg: 'py-3 px-6 text-lg',
    xl: 'py-4 px-8 text-xl',
  };
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-red-600 hover:bg-red-700 text-white shadow hover:shadow-md focus:ring-red-500',
    secondary: 'bg-blue-600 hover:bg-blue-700 text-white shadow hover:shadow-md focus:ring-blue-500',
    outline: 'border-2 border-red-600 text-red-600 hover:bg-red-50 focus:ring-red-500',
    text: 'text-red-600 hover:text-red-700 hover:underline focus:ring-red-500',
    call: 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl focus:ring-green-500',
  };
  
  // Disabled state
  const disabledClasses = 'opacity-50 cursor-not-allowed';
  
  // Full width class
  const widthClass = fullWidth ? 'w-full' : '';
  
  // Combine classes
  const buttonStyles = `
    ${baseStyles}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${(isLoading || props.disabled) ? disabledClasses : ''}
    ${widthClass}
    ${className}
  `.trim();
  
  // Animation variants
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.03 },
    tap: { scale: 0.98 },
  };
  
  // Button content
  const content = (
    <>
      {isLoading && (
        <span className="mr-2">
          <svg className="animate-spin h-4 w-4 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
      )}
      {children}
    </>
  );
  
  // If href is provided, render as a link
  if (href) {
    return animated ? (
      <Link href={href} passHref>
        <motion.a 
          className={buttonStyles}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          variants={buttonVariants}
        >
          {content}
        </motion.a>
      </Link>
    ) : (
      <Link href={href} className={buttonStyles}>
        {content}
      </Link>
    );
  }
  
  // Otherwise render as a button
  if (animated) {
    // Extract only the props that are safe to pass to motion.button
    const { onDrag, onDragStart, onDragEnd, ...safeProps } = props;
    
    return (
      <motion.button
        className={buttonStyles}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        variants={buttonVariants}
        disabled={isLoading || safeProps.disabled}
        {...safeProps}
      >
        {content}
      </motion.button>
    );
  }
  
  // Regular button
  return (
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