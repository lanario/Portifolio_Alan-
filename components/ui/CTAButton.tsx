'use client';

import { forwardRef } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CTAButtonProps extends Omit<MotionProps, 'children'> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const CTAButton = forwardRef<HTMLButtonElement, CTAButtonProps>(
  ({ className, variant = 'primary', children, onClick, disabled, type = 'button', ...motionProps }, ref) => {
    const baseClasses =
      'inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-base transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

    const variantClasses = {
      primary:
        'bg-primary-600 text-white hover:bg-primary-700 hover:shadow-lg focus-visible:ring-primary-500',
      secondary:
        'bg-gray-800/80 text-white backdrop-blur-sm border-2 border-gray-700/50 hover:bg-gray-700/80 focus-visible:ring-gray-500',
      outline:
        'bg-transparent text-white border-2 border-white hover:bg-white hover:text-gray-900 focus-visible:ring-white/50',
    };

    return (
      <motion.button
        ref={ref}
        type={type}
        disabled={disabled}
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(baseClasses, variantClasses[variant], className)}
        {...motionProps}
      >
        {children}
      </motion.button>
    );
  }
);

CTAButton.displayName = 'CTAButton';

export { CTAButton };
