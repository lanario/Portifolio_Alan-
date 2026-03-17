'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { ProjectModal } from './ProjectModal';
import { projects } from '@/lib/constants/projects';
import { Project } from '@/types';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Reveal } from '@/components/motion/Reveal';

function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const stepsCount = projects.length;
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 60%', 'end 60%'],
  });
  const fillHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const timelineSteps = useMemo(() => projects, []);

  function handleOpenModal(project: Project) {
    setSelectedProject(project);
  }

  function handleCloseModal() {
    setSelectedProject(null);
  }

  useEffect(() => {
    if (activeStepIndex >= stepsCount) setActiveStepIndex(Math.max(0, stepsCount - 1));
  }, [activeStepIndex, stepsCount]);

  return (
    <section id="projetos" className="py-20 bg-gray-900 min-h-[400px]">
      <Container>
        <Reveal className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Projetos
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Alguns dos projetos que desenvolvi, cada um com seu próprio desafio e aprendizado único.
          </p>
        </Reveal>

        {timelineSteps.length > 0 ? (
          <div
            ref={trackRef}
            className="relative max-w-6xl mx-auto pl-6 md:pl-0"
            aria-label="Timeline de projetos"
          >
            {/* Linhas guias */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gray-800 md:-translate-x-px" />
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-700/50 to-transparent md:-translate-x-px opacity-60" />

            {/* Linha de preenchimento */}
            <motion.div
              aria-hidden="true"
              className="absolute left-6 md:left-1/2 top-0 w-px bg-primary-500 shadow-[0_0_18px_rgba(59,130,246,0.55)] md:-translate-x-px origin-top z-10"
              style={{ height: shouldReduceMotion ? '100%' : fillHeight }}
            >
              {/* Scanner head */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_22px_2px_rgba(59,130,246,0.9)] z-20" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-12 h-12 border border-primary-500/30 rounded-full animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite] opacity-50" />
            </motion.div>

            {/* Steps */}
            <div className="space-y-20 md:space-y-28 py-6 md:py-12">
              {timelineSteps.map((project, index) => (
                <ProjectTimelineStep
                  key={project.id}
                  index={index}
                  project={project}
                  isActive={index === activeStepIndex}
                  onActive={setActiveStepIndex}
                  onOpenModal={handleOpenModal}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">Nenhum projeto encontrado.</p>
          </div>
        )}

        {/* Modal de Detalhes */}
        <ProjectModal project={selectedProject} onClose={handleCloseModal} />
      </Container>
    </section>
  );
}

export { Projects };

interface ProjectTimelineStepProps {
  project: Project;
  index: number;
  isActive: boolean;
  onActive: (index: number) => void;
  onOpenModal: (project: Project) => void;
}

function ProjectTimelineStep({
  project,
  index,
  isActive,
  onActive,
  onOpenModal,
}: ProjectTimelineStepProps) {
  const stepRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(stepRef, { margin: '-35% 0px -45% 0px', amount: 0.35 });
  const shouldReduceMotion = useReducedMotion();
  const isEven = index % 2 === 0;

  useEffect(() => {
    if (isInView) onActive(index);
  }, [index, isInView, onActive]);

  return (
    <motion.div
      ref={stepRef}
      initial={shouldReduceMotion ? false : { opacity: 0.2, filter: 'blur(4px)', scale: 0.98 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, filter: 'blur(0px)', scale: 1 }}
      viewport={{ once: false, amount: 0.35 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16"
    >
      {/* Dot/âncora */}
      <div
        aria-hidden="true"
        className={[
          'absolute left-6 md:left-1/2 top-0 md:top-6 w-3 h-3 -ml-1.5 rounded-full border z-20 transition-all duration-500',
          'bg-gray-900 border-gray-600',
          isActive ? 'scale-125 border-transparent bg-primary-500 shadow-[0_0_18px_rgba(59,130,246,0.6)]' : '',
          'md:-translate-x-0',
        ].join(' ')}
      />

      {/* Coluna esquerda (desktop alternado) */}
      <div className={['order-2 md:order-1', isEven ? 'md:text-right md:pr-10' : 'md:text-right md:pr-10 md:opacity-0 md:pointer-events-none'].join(' ')}>
        {isEven ? (
          <ProjectTimelineCard
            project={project}
            isActive={isActive}
            onOpenModal={onOpenModal}
            align="right"
          />
        ) : (
          <div aria-hidden="true" />
        )}
      </div>

      {/* Coluna direita (desktop alternado) */}
      <div className={['order-3 md:order-2 pl-10 md:pl-0', !isEven ? 'md:pl-10' : 'md:pl-10 md:opacity-0 md:pointer-events-none'].join(' ')}>
        {!isEven ? (
          <ProjectTimelineCard
            project={project}
            isActive={isActive}
            onOpenModal={onOpenModal}
            align="left"
          />
        ) : (
          <div aria-hidden="true" />
        )}

        {/* Mobile fallback: sempre renderiza card na direita */}
        <div className="md:hidden">
          <ProjectTimelineCard
            project={project}
            isActive={isActive}
            onOpenModal={onOpenModal}
            align="left"
          />
        </div>
      </div>
    </motion.div>
  );
}

type TimelineAlign = 'left' | 'right';

interface ProjectTimelineCardProps {
  project: Project;
  isActive: boolean;
  onOpenModal: (project: Project) => void;
  align: TimelineAlign;
}

function ProjectTimelineCard({ project, isActive, onOpenModal, align }: ProjectTimelineCardProps) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpenModal(project)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={[
        'group relative w-full text-left rounded-2xl border bg-gray-900/60 backdrop-blur-md overflow-hidden',
        'border-gray-800 hover:border-primary-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400/50',
        isActive ? 'shadow-[0_18px_60px_rgba(0,0,0,0.45)]' : 'shadow-[0_12px_40px_rgba(0,0,0,0.25)]',
        align === 'right' ? 'ml-auto' : '',
      ].join(' ')}
    >
      {/* Visual / preview */}
      <div className="relative w-full overflow-hidden bg-gray-800 aspect-[16/9]">
        {/* Imagem de preview do projeto */}
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 40vw"
            priority={project.featured}
          />
        ) : null}

        {/* Overlays para gradiente e legibilidade */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/30 via-primary-500/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
        {/* Chips de categoria / destaque */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-primary-500/15 text-primary-200 border border-primary-500/25">
            {project.category.toUpperCase()}
          </span>
          {project.featured ? (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-yellow-400/15 text-yellow-200 border border-yellow-400/25">
              Destaque
            </span>
          ) : null}
        </div>

      </div>

      {/* Pop-up lateral “connect stack” */}
      <div
        className={[
          'pointer-events-none absolute top-6 z-20 hidden md:block',
          align === 'right' ? '-left-[320px]' : 'right-[-320px]',
        ].join(' ')}
      >
        <motion.div
          initial={{ opacity: 0, x: align === 'right' ? 24 : -24 }}
          animate={{ opacity: 0, x: align === 'right' ? 24 : -24 }}
          whileHover={{}}
          className="relative"
        >
          <div
            className="pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            {/* card em si */}
            <div className="relative w-[280px] rounded-2xl border border-primary-500/25 bg-slate-950/95 px-5 py-4 shadow-[0_20px_70px_rgba(15,23,42,0.9)]">
              {/* glow */}
              <div className="pointer-events-none absolute -inset-10 -z-10 rounded-[32px] bg-[radial-gradient(circle_at_10%_0%,rgba(59,130,246,0.18),transparent_55%),radial-gradient(circle_at_80%_100%,rgba(59,130,246,0.12),transparent_55%)] opacity-80" />

              {/* título */}
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-300/90">
                Stack do projeto
              </p>
              <p className="mb-4 text-sm font-medium text-white">
                {project.title}
              </p>

              {/* Nó central */}
              <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-primary-400/50 bg-slate-950 shadow-[0_0_40px_rgba(59,130,246,0.6)]">
                <div className="absolute -inset-3 rounded-full border border-primary-500/25 border-dashed animate-[spin_14s_linear_infinite]" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary-200">
                  Core
                </span>
              </div>

              {/* Tecnos conectadas */}
              <div className="flex flex-wrap justify-center gap-1.5">
                {project.technologies.slice(0, 8).map((tech) => (
                  <div
                    key={tech}
                    className="flex items-center gap-1 rounded-full border border-primary-400/35 bg-slate-950 px-2.5 py-1 text-[10px] font-medium text-slate-100"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary-400" />
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Conteúdo */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
            {project.title}
          </h3>
          <span className={['shrink-0 mt-1 w-2 h-2 rounded-full', isActive ? 'bg-primary-400 shadow-[0_0_12px_rgba(59,130,246,0.7)]' : 'bg-gray-700'].join(' ')} />
        </div>

        <p className="text-gray-300 leading-relaxed mb-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 6).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-lg text-xs bg-gray-800/70 text-gray-200 border border-gray-700"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 6 ? (
            <span className="px-2.5 py-1 rounded-lg text-xs bg-gray-800/70 text-gray-400 border border-gray-800">
              +{project.technologies.length - 6}
            </span>
          ) : null}
        </div>
      </div>
    </motion.button>
  );
}
