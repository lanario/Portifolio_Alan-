'use client';

import { useMemo, useRef } from 'react';
import { motion, MotionValue, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface KaraokeTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
}

function KaraokeText({ text, className, wordClassName }: KaraokeTextProps) {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLParagraphElement>(null);

  const words = useMemo(() => {
    return text.split(/\s+/).filter(Boolean);
  }, [text]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'end 35%'],
  });

  if (shouldReduceMotion) {
    return (
      <p ref={containerRef} className={className}>
        {text}
      </p>
    );
  }

  return (
    <p ref={containerRef} className={className}>
      {words.map((word, index) => (
        <KaraokeWord
          key={`${word}-${index}`}
          scrollYProgress={scrollYProgress}
          index={index}
          total={words.length}
          wordClassName={wordClassName}
          word={word}
          withTrailingSpace={index < words.length - 1}
        />
      ))}
    </p>
  );
}

export { KaraokeText };

interface KaraokeWordProps {
  scrollYProgress: MotionValue<number>;
  index: number;
  total: number;
  word: string;
  withTrailingSpace: boolean;
  wordClassName?: string;
}

function KaraokeWord({
  scrollYProgress,
  index,
  total,
  word,
  withTrailingSpace,
  wordClassName,
}: KaraokeWordProps) {
  const start = total <= 1 ? 0 : index / total;
  const end = total <= 1 ? 1 : (index + 1) / total;
  const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
  const blur = useTransform(scrollYProgress, [start, end], ['2px', '0px']);

  return (
    <motion.span
      className={cn('transition-colors', wordClassName)}
      style={{ opacity, filter: blur }}
    >
      {word}
      {withTrailingSpace ? ' ' : ''}
    </motion.span>
  );
}

