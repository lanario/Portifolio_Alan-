'use client';

import { useEffect, useMemo, useRef } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

interface CountUpProps {
  value: number;
  suffix?: string;
  durationSeconds?: number;
  className?: string;
}

function CountUp({ value, suffix = '', durationSeconds = 1.6, className }: CountUpProps) {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.6 });

  const decimals = useMemo(() => {
    return value % 1 !== 0 ? 2 : 0;
  }, [value]);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    if (shouldReduceMotion) {
      el.textContent = `${value.toFixed(decimals)}${suffix}`;
      return;
    }

    if (!isInView) return;

    const controls = animate(0, value, {
      duration: durationSeconds,
      ease: 'easeOut',
      onUpdate(latest) {
        el.textContent = `${latest.toFixed(decimals)}${suffix}`;
      },
    });

    return () => controls.stop();
  }, [decimals, durationSeconds, isInView, shouldReduceMotion, suffix, value]);

  return (
    <div ref={containerRef} className={className}>
      <span ref={textRef}>0{suffix}</span>
    </div>
  );
}

export { CountUp };

