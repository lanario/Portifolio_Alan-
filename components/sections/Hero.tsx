'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowDown } from 'react-icons/fi';
import { developerData } from '@/lib/constants';
import { scrollToSection } from '@/lib/utils/scroll';
import { CTAButton } from '@/components/ui/CTAButton';

function Hero() {
  const [loadProgress, setLoadProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [typeIndex, setTypeIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const roles = useMemo(
    () => ['Desenvolvedor FullStack', 'Arquiteto de Soluções', 'Frontend Engineer', 'Backend Developer'],
    []
  );
  const tags = ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Python'];

  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 8 + 2;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => setLoaded(true), 400);
      }
      setLoadProgress(Math.floor(progress));
    }, 60);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const current = roles[typeIndex];
    let timeout: number | undefined;

    if (!isDeleting && displayText.length < current.length) {
      timeout = window.setTimeout(() => setDisplayText(current.slice(0, displayText.length + 1)), 80);
    } else if (!isDeleting && displayText.length === current.length) {
      timeout = window.setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText.length > 0) {
      timeout = window.setTimeout(() => setDisplayText(current.slice(0, displayText.length - 1)), 40);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setTypeIndex((i) => (i + 1) % roles.length);
    }

    return () => {
      if (timeout) window.clearTimeout(timeout);
    };
  }, [loaded, displayText, isDeleting, typeIndex, roles]);

  useEffect(() => {
    function handleScroll() {
      setScrollY(window.scrollY);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles = Array.from({ length: 70 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    function draw() {
      const ctx = context;
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96, 165, 250, ${p.alpha})`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(59,130,246, ${0.06 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animationId = requestAnimationFrame(draw);
    }

    draw();

    function handleResize() {
      if (!canvas) return;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    }

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [loaded]);

  const SCROLL_THRESHOLD = 500;
  const scrollRatio = Math.min(scrollY / SCROLL_THRESHOLD, 1);
  const heroOpacity = 1 - scrollRatio;
  const heroScale = 1 - scrollRatio * 0.06;
  const heroTranslateY = scrollY * 0.35;

  return (
    <section id="hero" className="relative min-h-screen bg-[#0d1117] text-slate-200 overflow-hidden">
      {/* Loading */}
      <div
        className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-4 bg-[#0d1117] transition-opacity duration-700"
        style={{
          opacity: loaded ? 0 : 1,
          pointerEvents: loaded ? 'none' : 'auto',
        }}
      >
        <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-[0_0_24px_rgba(59,130,246,0.4)]">
          <div className="h-2.5 w-2.5 rounded-full bg-white" />
        </div>
        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">
          Initializing
        </div>
        <div className="h-0.5 w-40 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)] transition-[width] duration-100"
            style={{ width: `${loadProgress}%` }}
          />
        </div>
        <div className="font-mono text-[10px] text-white/30">{loadProgress}%</div>
      </div>

      {/* Hero fixo com scroll-driven */}
      <div
        className="fixed inset-0 z-10 flex items-center justify-center"
        style={{
          opacity: loaded ? heroOpacity : 0,
          transform: `scale(${heroScale}) translateY(${-heroTranslateY * 0.3}px)`,
          transition: loaded ? 'none' : 'opacity 1s ease',
          pointerEvents: scrollRatio > 0.7 ? 'none' : 'auto',
        }}
      >
        {/* Canvas de partículas */}
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 h-full w-full"
        />

        {/* Grid de fundo */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* Glow radial */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.08)_0%,transparent_70%)] blur-[40px]" />

        {/* Conteúdo */}
        <div className="relative mx-6 max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1.5 backdrop-blur-xl">
            <span className="inline-block h-[7px] w-[7px] rounded-full bg-blue-500" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-blue-300/90">
              Sites e sistemas sob medida para o seu negócio
            </span>
          </div>

          <h1 className="mb-4 text-balance text-[clamp(2.8rem,7vw,5.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-slate-50">
            {developerData.name}
          </h1>

          {/* Typewriter */}
          <div className="mb-7 flex min-h-[2.5rem] items-center justify-center gap-1 text-[clamp(1rem,2.5vw,1.35rem)] font-normal text-slate-400">
            <span className="font-medium text-blue-400">{displayText}</span>
            <span className="inline-block h-[1.1em] w-[2px] animate-pulse bg-blue-500 align-middle" />
          </div>

          {/* Tags */}
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="cursor-default rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12px] text-slate-300 transition-colors hover:border-blue-400/60 hover:bg-blue-500/10 hover:text-blue-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-3">
            <CTAButton
              onClick={() => scrollToSection('projetos')}
              variant="primary"
            >
              Ver Projetos
            </CTAButton>
            <CTAButton
              onClick={() => scrollToSection('contato')}
              variant="secondary"
            >
              Entrar em Contato
            </CTAButton>
          </div>

          {/* Scroll indicator */}
          <div
            className="mt-14 flex flex-col items-center gap-2 transition-opacity duration-300"
            style={{ opacity: scrollRatio > 0.1 ? 0 : 0.4 }}
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-slate-600">
              Scroll
            </span>
            <div className="h-10 w-px animate-[scroll-line_1.8s_ease-in-out_infinite] bg-gradient-to-b from-blue-500 to-transparent" />
          </div>
        </div>
      </div>

      {/* Scroll indicator fixo no fim da seção para acessibilidade */}
      <motion.button
        type="button"
        onClick={() => scrollToSection('sobre')}
        className="pointer-events-auto fixed bottom-6 left-1/2 z-20 -translate-x-1/2 text-white/70 hover:text-white md:hidden"
        aria-label="Rolar para a seção Sobre"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      >
        <FiArrowDown className="mx-auto h-6 w-6" />
      </motion.button>

      {/* Keyframes extras */}
      <style>{`
        @keyframes scroll-line {
          0% { transform: scaleY(0); transform-origin: top; opacity: 0; }
          40% { transform: scaleY(1); transform-origin: top; opacity: 1; }
          60% { transform: scaleY(1); transform-origin: bottom; opacity: 1; }
          100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
        }
      `}</style>
    </section>
  );
}

export { Hero };