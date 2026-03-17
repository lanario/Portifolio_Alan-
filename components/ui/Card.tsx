import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined';
  hover?: boolean;
}

function Card({
  children,
  className,
  variant = 'default',
  hover = false,
  ...props
}: CardProps) {
  const baseClasses = 'rounded-xl transition-all duration-300';

  const variantClasses = {
    default: 'bg-gray-800 shadow-md',
    elevated: 'bg-gray-800 shadow-lg',
    outlined:
      'bg-transparent border-2 border-gray-700',
  };

  const hoverClasses = hover
    ? 'hover:shadow-xl hover:-translate-y-1 cursor-pointer'
    : '';

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], hoverClasses, className)}
      {...props}
    >
      {children}
    </div>
  );
}

function CardHeader({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('p-6 pb-4', className)} {...props}>
      {children}
    </div>
  );
}

function CardContent({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('p-6 pt-0', className)} {...props}>
      {children}
    </div>
  );
}

function CardFooter({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('p-6 pt-4 border-t border-gray-700', className)} {...props}>
      {children}
    </div>
  );
}

export { Card, CardHeader, CardContent, CardFooter };
