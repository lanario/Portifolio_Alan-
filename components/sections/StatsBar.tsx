'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Section } from './Section';
import { CountUp } from '@/components/motion/CountUp';

function StatsBar() {
  return (
    <Section
      id="stats"
      variant="default"
      className="py-14 md:py-16 border-y border-gray-800/60 bg-gray-900"
    >
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <StatItem label="Projetos" value={4} suffix="+" />
          <StatItem label="Anos de experiência" value={2} suffix="+" delay={0.05} />
          <StatItem label="Tecnologias" value={5} suffix="+" delay={0.1} />
          <StatItem label="Freelancer" value={100} suffix="%" delay={0.15} />
        </div>
      </Container>
    </Section>
  );
}

interface StatItemProps {
  label: string;
  value: number;
  suffix: string;
  delay?: number;
}

function StatItem({ label, value, suffix, delay = 0 }: StatItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.45, delay, ease: 'easeOut' }}
      className="px-2"
    >
      <CountUp
        value={value}
        suffix={suffix}
        className="text-3xl md:text-4xl font-bold text-white mb-1"
      />
      <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
        {label}
      </p>
    </motion.div>
  );
}

export { StatsBar };

