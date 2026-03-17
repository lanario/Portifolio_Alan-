'use client';

import { useMemo } from 'react';
import { Container } from '@/components/ui/Container';
import { technologies } from '@/lib/constants/technologies';
import { Technology } from '@/types';
import { Section } from './Section';
import { SpotlightTiltCard } from '@/components/ui/SpotlightTiltCard';
import { TechnologyIcon } from '@/components/ui/TechnologyIcon';
import { Reveal } from '@/components/motion/Reveal';

function Technologies() {
  const grouped = useMemo(() => {
    const language = technologies.filter((t) => t.category === 'language');
    const framework = technologies.filter((t) => t.category === 'framework');
    const style = technologies.filter((t) => t.category === 'style');
    const dataAndTools = technologies.filter((t) => t.category === 'database' || t.category === 'tool');
    const test = technologies.filter((t) => t.category === 'test');

    return { language, framework, style, dataAndTools, test };
  }, []);

  return (
    <Section id="tecnologias" variant="default" className="py-20 md:py-24">
      <Container>
        <Reveal className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Tecnologias
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Stack tecnológica que utilizo no desenvolvimento de aplicações modernas e escaláveis
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          <TechBentoCard
            title="Linguagens"
            description="Base sólida para automações, web e sistemas."
            technologies={grouped.language}
            className="md:col-span-7 p-7"
          />
          <TechBentoCard
            title="Frameworks"
            description="Construção de produtos com foco em DX, performance e escalabilidade."
            technologies={grouped.framework}
            className="md:col-span-5 p-7"
          />
          <TechBentoCard
            title="Estilos & UI"
            description="Interfaces responsivas, consistentes e fáceis de evoluir."
            technologies={grouped.style}
            className="md:col-span-5 p-7"
          />
          <TechBentoCard
            title="Banco & Ferramentas"
            description="Dados, infraestrutura e fluxo de entrega com segurança."
            technologies={grouped.dataAndTools}
            className="md:col-span-7 p-7"
          />
          <TechBentoCard
            title="Testes"
            description="Confiança na evolução do código com validação automatizada."
            technologies={grouped.test}
            className="md:col-span-12 p-7"
          />
        </div>
      </Container>
    </Section>
  );
}

export { Technologies };

interface TechBentoCardProps {
  title: string;
  description: string;
  technologies: Technology[];
  className?: string;
}

function TechBentoCard({ title, description, technologies, className }: TechBentoCardProps) {
  return (
    <SpotlightTiltCard className={className}>
      <div className="flex items-start justify-between gap-6">
        <div>
          <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
            {title}
          </h3>
          <p className="text-sm text-gray-300/80 max-w-lg leading-relaxed">
            {description}
          </p>
        </div>
        <div className="hidden md:flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-primary-300/70">
          <span className="h-px w-10 bg-primary-500/30" />
          <span>Stack</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
        {technologies.map((tech) => (
          <div
            key={tech.name}
            className="flex min-h-[64px] items-center gap-3 rounded-xl border border-gray-800/70 bg-gray-900/40 px-4 py-3 hover:border-primary-500/30 transition-colors"
          >
            <TechnologyIcon name={tech.name} color={tech.color} size={22} />
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {tech.name}
              </p>
              <p className="text-xs text-gray-300 truncate">
                {tech.category}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SpotlightTiltCard>
  );
}
