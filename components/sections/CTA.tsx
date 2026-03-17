'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { CTAButton } from '@/components/ui/CTAButton';
import { scrollToSection } from '@/lib/utils/scroll';
import { Section } from './Section';

function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 40%'],
  });

  const leftX = useTransform(scrollYProgress, [0, 1], ['0%', '-60%']);
  const rightX = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
  const contentOpacity = useTransform(scrollYProgress, [0.25, 0.55], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.25, 0.55], [16, 0]);

  return (
    <Section
      ref={sectionRef}
      id="cta"
      variant="default"
      className="py-20 md:py-24"
    >
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-gray-800/70 bg-gray-950/35 shadow-[0_30px_120px_rgba(0,0,0,0.55)]">
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 25% 35%, rgba(59,130,246,0.22), transparent 60%), radial-gradient(circle at 80% 70%, rgba(59,130,246,0.14), transparent 60%)',
            }}
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 1px, transparent 1px)',
              backgroundSize: '42px 42px',
              maskImage:
                'linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)',
            }}
          />

          <div className="relative min-h-[420px] md:min-h-[460px] flex items-center justify-center px-6 md:px-10 py-16">
            {/* Painéis (portas) */}
            <motion.div
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-1/2 border-r border-white/10 bg-white/[0.035] backdrop-blur-xl"
              style={{
                x: shouldReduceMotion ? 0 : leftX,
              }}
            >
              <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_55%)]" />
            </motion.div>
            <motion.div
              aria-hidden="true"
              className="absolute inset-y-0 right-0 w-1/2 border-l border-white/10 bg-white/[0.035] backdrop-blur-xl"
              style={{
                x: shouldReduceMotion ? 0 : rightX,
              }}
            >
              <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.12),transparent_55%)]" />
            </motion.div>

            {/* Conteúdo revelado */}
            <motion.div
              style={{
                opacity: shouldReduceMotion ? 1 : contentOpacity,
                y: shouldReduceMotion ? 0 : contentY,
              }}
              className="relative z-10 max-w-2xl text-center"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-300/90 mb-4">
                Vamos construir algo incrível
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-5">
                Pronto para tirar sua ideia do papel?
              </h2>
              <p className="text-gray-300/90 text-base md:text-lg leading-relaxed mb-8">
                Se você quer um site ou sistema com performance, SEO e uma experiência que “parece viva”,
                eu posso te ajudar do design à entrega.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <CTAButton onClick={() => scrollToSection('contato')} variant="primary">
                  Falar comigo
                </CTAButton>
                <CTAButton onClick={() => scrollToSection('projetos')} variant="secondary">
                  Ver projetos
                </CTAButton>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export { CTA };

