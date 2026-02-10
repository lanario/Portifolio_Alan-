'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { TechnologyFilter } from './TechnologyFilter';
import { TechnologyCard } from './TechnologyCard';
import { technologies } from '@/lib/constants/technologies';
import { Technology } from '@/types';
import { Section } from './Section';

function Technologies() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredTechnologies: Technology[] =
    activeCategory === 'all'
      ? technologies
      : activeCategory === 'database'
      ? technologies.filter((tech) => tech.category === 'database' || tech.category === 'tool')
      : technologies.filter((tech) => tech.category === activeCategory);

  return (
    <Section id="tecnologias" variant="default" className="py-20 md:py-24">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Tecnologias
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Stack tecnológica que utilizo no desenvolvimento de aplicações modernas e escaláveis
          </p>
        </div>

        <TechnologyFilter
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {filteredTechnologies.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
            >
              {filteredTechnologies.map((technology, index) => (
                <TechnologyCard
                  key={technology.name}
                  technology={technology}
                  index={index}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">Nenhuma tecnologia encontrada nesta categoria.</p>
          </div>
        )}
      </Container>
    </Section>
  );
}

export { Technologies };
