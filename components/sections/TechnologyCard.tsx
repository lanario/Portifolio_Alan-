'use client';

import { motion } from 'framer-motion';
import { Technology } from '@/types';
import { TechnologyIcon } from '@/components/ui/TechnologyIcon';
import { Card } from '@/components/ui/Card';

interface TechnologyCardProps {
  technology: Technology;
  index: number;
}

function TechnologyCard({ technology, index }: TechnologyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      whileHover={{
        scale: 1.05,
        y: -5,
        transition: { duration: 0.2 },
      }}
      className="h-full"
    >
      <Card variant="elevated" hover className="h-full group relative overflow-hidden">
        {/* Border animado baseado na cor da tecnologia */}
        <div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `linear-gradient(135deg, ${technology.color || '#6B7280'}20, ${technology.color || '#6B7280'}40)`,
          }}
        />

        {/* Conteúdo */}
        <div className="relative z-10 flex flex-col items-center justify-center p-6 gap-4 h-full">
          <TechnologyIcon
            name={technology.name}
            color={technology.color}
            size={56}
          />
        <h3 className="text-lg font-semibold text-white text-center">
          {technology.name}
        </h3>
        </div>

        {/* Glow effect no hover */}
        <div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300 -z-10"
          style={{ backgroundColor: technology.color || '#6B7280' }}
        />
      </Card>
    </motion.div>
  );
}

export { TechnologyCard };
