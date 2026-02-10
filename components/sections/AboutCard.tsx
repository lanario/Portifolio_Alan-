'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';

interface AboutCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

function AboutCard({ title, description, icon }: AboutCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card variant="elevated" hover className="h-full">
        <CardContent className="p-6">
          {icon && (
            <div className="mb-4 text-primary-400">
              {icon}
            </div>
          )}
          <h3 className="text-xl font-bold mb-2 text-white">
            {title}
          </h3>
          <p className="text-gray-300">
            {description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export { AboutCard };
