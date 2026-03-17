'use client';

import { ReactNode, useMemo, useRef } from 'react';
import { cn } from '@/lib/utils';

interface SpotlightTiltCardProps {
  children: ReactNode;
  className?: string;
  maxTiltDeg?: number;
}

function SpotlightTiltCard({ children, className, maxTiltDeg = 5 }: SpotlightTiltCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  const tilt = useMemo(() => {
    return Math.max(0, Math.min(10, maxTiltDeg));
  }, [maxTiltDeg]);

  function setCssVarsFromPointer(clientX: number, clientY: number) {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const px = (clientX - rect.left) / Math.max(1, rect.width);
    const py = (clientY - rect.top) / Math.max(1, rect.height);

    const sx = Math.round(px * 100);
    const sy = Math.round(py * 100);

    const rotateY = (px - 0.5) * 2 * tilt;
    const rotateX = (0.5 - py) * 2 * tilt;

    el.style.setProperty('--sx', `${sx}%`);
    el.style.setProperty('--sy', `${sy}%`);
    el.style.setProperty('--rx', `${rotateX.toFixed(2)}deg`);
    el.style.setProperty('--ry', `${rotateY.toFixed(2)}deg`);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    const { clientX, clientY } = event;
    frameRef.current = window.requestAnimationFrame(() => setCssVarsFromPointer(clientX, clientY));
  }

  function handlePointerLeave() {
    const el = containerRef.current;
    if (!el) return;
    el.style.setProperty('--sx', `50%`);
    el.style.setProperty('--sy', `50%`);
    el.style.setProperty('--rx', `0deg`);
    el.style.setProperty('--ry', `0deg`);
  }

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn(
        'group relative overflow-hidden rounded-[22px] border border-gray-800/70 bg-gray-900/55 backdrop-blur-xl',
        'shadow-[0_18px_60px_rgba(0,0,0,0.35)]',
        'transition-[border-color,transform] duration-300 will-change-transform',
        'hover:border-primary-500/35',
        className
      )}
      style={{
        transformStyle: 'preserve-3d',
        transform: 'perspective(900px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))',
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-28 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(circle at var(--sx, 50%) var(--sy, 50%), rgba(255,255,255,0.12), transparent 55%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60 mix-blend-overlay"
        style={{
          background:
            'radial-gradient(circle at 20% 15%, rgba(59,130,246,0.14), transparent 55%), radial-gradient(circle at 70% 80%, rgba(59,130,246,0.08), transparent 60%)',
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export { SpotlightTiltCard };

