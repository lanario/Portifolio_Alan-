'use client';

import { ReactNode, forwardRef } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionProps extends Omit<MotionProps, 'children'> {
    id: string;
    children: ReactNode;
    variant?: 'default' | 'dark' | 'light';
    className?: string;
}

const variantClasses = {
    default: 'bg-gray-900 text-gray-100',
    dark: 'bg-gray-950 text-white',
    light: 'bg-gray-800 text-gray-200',
};

const Section = forwardRef<HTMLElement, SectionProps>(
    function Section(
        {
            id,
            children,
            variant = 'default',
            className,
            ...motionProps
        },
        ref
    ) {
        return (
            <motion.section
                ref={ref}
                id={id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '0px' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className={cn(
                    'py-20 md:py-24',
                    variantClasses[variant],
                    className
                )}
                style={{ minHeight: '200px' }}
                {...motionProps}
            >
                {children}
            </motion.section>
        );
    }
);

export { Section };
