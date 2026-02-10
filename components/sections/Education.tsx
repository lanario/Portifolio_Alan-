'use client';

import { motion } from 'framer-motion';
import { FiBook } from 'react-icons/fi';
import { Container } from '@/components/ui/Container';
import { Section } from './Section';
import { education } from '@/lib/constants/education';

function Education() {
  return (
    <Section id="educacao" variant="default" className="py-20 md:py-24">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Educação
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Minha trajetória de aprendizado e formação
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Linha da Timeline */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-700" />

            {/* Items da Timeline */}
            <div className="space-y-8">
              {education.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative pl-20"
                >
                  {/* Ícone */}
                  <div className="absolute left-0 top-0 w-16 h-16 bg-primary-900 rounded-full flex items-center justify-center border-4 border-gray-900 z-10">
                    <FiBook className="w-8 h-8 text-primary-400" />
                  </div>

                  {/* Card */}
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <h3 className="text-xl font-bold text-white">
                        {item.degree}
                      </h3>
                      <span className="text-sm text-gray-400 mt-1 md:mt-0">
                        {item.startDate} - {item.endDate || 'Atual'}
                      </span>
                    </div>

                    <p className="text-primary-400 font-medium mb-2">
                      {item.institution}
                    </p>

                    <p className="text-gray-400 text-sm mb-3">
                      {item.field} • {item.location}
                    </p>

                    {item.description && (
                      <p className="text-gray-300 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export { Education };
