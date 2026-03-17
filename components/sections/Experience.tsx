'use client';

import { motion } from 'framer-motion';
import { FiBriefcase, FiCalendar, FiMapPin } from 'react-icons/fi';
import { Container } from '@/components/ui/Container';
import { Section } from './Section';
import { experiences } from '@/lib/constants/experience';

function Experience() {
  function getTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      'full-time': 'Tempo Integral',
      'part-time': 'Meio Período',
      freelance: 'Freelancer',
      internship: 'Estágio',
    };
    return labels[type] || type;
  }

  return (
    <Section id="experiencia" variant="default" className="py-20 md:py-24">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Experiência Profissional
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Minha jornada profissional e projetos desenvolvidos
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Linha da Timeline */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-700" />

            {/* Items da Timeline */}
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative pl-20"
                >
                  {/* Ícone */}
                  <div className="absolute left-0 top-0 w-16 h-16 bg-primary-900 rounded-full flex items-center justify-center border-4 border-gray-900 z-10">
                    <FiBriefcase className="w-8 h-8 text-primary-400" />
                  </div>

                  {/* Card */}
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">
                          {exp.position}
                        </h3>
                        <p className="text-primary-400 font-medium">
                          {exp.company}
                        </p>
                      </div>
                      <span className="inline-block px-3 py-1 bg-primary-900 text-primary-200 text-xs rounded-full mt-2 md:mt-0">
                        {getTypeLabel(exp.type)}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <FiCalendar className="w-4 h-4" />
                        <span>
                          {exp.startDate} - {exp.endDate || 'Atual'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FiMapPin className="w-4 h-4" />
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    {/* Descrição */}
                    <ul className="space-y-2 mb-4">
                      {exp.description.map((desc, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-300">
                          <span className="text-primary-400 mt-1.5">▸</span>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tecnologias */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-700">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
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

export { Experience };
