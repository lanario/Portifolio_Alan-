const { useState, useEffect, useRef } = React;

function App() {
  const [loadProgress, setLoadProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [typeIndex, setTypeIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  const containerRef = useRef(null);

  const roles = ['Desenvolvedor FullStack', 'Arquiteto de Soluções', 'Frontend Engineer', 'Backend Developer'];

  // Loading screen
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

  // Typewriter
  useEffect(() => {
    if (!loaded) return;
    const current = roles[typeIndex];
    let timeout;
    if (!isDeleting && displayText.length < current.length) {
      timeout = setTimeout(() => setDisplayText(current.slice(0, displayText.length + 1)), 80);
    } else if (!isDeleting && displayText.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => setDisplayText(current.slice(0, displayText.length - 1)), 40);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setTypeIndex((i) => (i + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [loaded, displayText, isDeleting, typeIndex]);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Canvas particles
  useEffect(() => {
    if (!loaded) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let W = canvas.width = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;

    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96, 165, 250, ${p.alpha})`;
        ctx.fill();
      });
      // Draw subtle connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.06 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, [loaded]);

  // Scroll-driven values
  const SCROLL_THRESHOLD = 500;
  const scrollRatio = Math.min(scrollY / SCROLL_THRESHOLD, 1);
  const heroOpacity = 1 - scrollRatio;
  const heroScale = 1 - scrollRatio * 0.06;
  const heroTranslateY = scrollY * 0.35;

  const tags = ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Python'];

  return (
    <div
      ref={containerRef}
      style={{
        fontFamily: "'Inter', -apple-system, sans-serif",
        background: '#0d1117',
        minHeight: '200vh',
        color: '#e2e8f0',
      }}
    >
      {/* ── LOADING SCREEN ── */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 100,
          background: '#0d1117',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          opacity: loaded ? 0 : 1,
          pointerEvents: loaded ? 'none' : 'auto',
          transition: 'opacity 0.8s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        {/* Logo mark */}
        <div style={{
          width: 36, height: 36,
          background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
          borderRadius: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 24px rgba(59,130,246,0.4)',
          marginBottom: 8,
        }}>
          <div style={{ width: 10, height: 10, background: '#fff', borderRadius: '50%' }} />
        </div>

        <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#475569', fontWeight: 600 }}>
          Initializing
        </div>

        {/* Progress bar */}
        <div style={{
          width: 160, height: 2,
          background: 'rgba(255,255,255,0.06)',
          borderRadius: 99, overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${loadProgress}%`,
            background: 'linear-gradient(90deg, #3b82f6, #60a5fa)',
            borderRadius: 99,
            transition: 'width 0.1s ease-out',
            boxShadow: '0 0 8px rgba(96,165,250,0.6)',
          }} />
        </div>

        <div style={{ fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.2)' }}>
          {loadProgress}%
        </div>
      </div>

      {/* ── HERO (FIXED, SCROLL-DRIVEN) ── */}
      <div
        ref={heroRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: loaded ? heroOpacity : 0,
          transform: `scale(${heroScale}) translateY(${-heroTranslateY * 0.3}px)`,
          transition: loaded ? 'none' : 'opacity 1s ease',
          pointerEvents: scrollRatio > 0.7 ? 'none' : 'auto',
        }}
      >
        {/* Canvas particles */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            pointerEvents: 'none',
          }}
        />

        {/* Background grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          pointerEvents: 'none',
        }} />

        {/* Radial glow */}
        <div style={{
          position: 'absolute',
          width: 700, height: 700,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          filter: 'blur(40px)',
        }} />

        {/* Content */}
        <div style={{ position: 'relative', textAlign: 'center', padding: '0 24px', maxWidth: 720 }}>

          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 14px', borderRadius: 99,
            border: '1px solid rgba(59,130,246,0.2)',
            background: 'rgba(59,130,246,0.06)',
            backdropFilter: 'blur(12px)',
            marginBottom: 32,
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: '50%',
              background: '#3b82f6',
              boxShadow: '0 0 0 0 rgba(59,130,246,0.5)',
              animation: 'pulse-badge 2.5s ease-in-out infinite',
              display: 'inline-block',
            }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(96,165,250,0.9)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Disponível para projetos
            </span>
          </div>

          {/* Name */}
          <h1 style={{
            fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            marginBottom: 16,
            color: '#f1f5f9',
          }}>
            Alan Barros
          </h1>

          {/* Typewriter role */}
          <div style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.35rem)',
            fontWeight: 400,
            color: '#64748b',
            marginBottom: 28,
            minHeight: '2em',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
          }}>
            <span style={{ color: '#3b82f6', fontWeight: 500 }}>{displayText}</span>
            <span style={{
              display: 'inline-block', width: 2, height: '1.1em',
              background: '#3b82f6', borderRadius: 1,
              animation: 'blink 1s step-end infinite',
              verticalAlign: 'middle',
            }} />
          </div>

          {/* Tech tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 40 }}>
            {tags.map((tag) => (
              <span key={tag} style={{
                padding: '4px 12px',
                borderRadius: 99,
                border: '1px solid rgba(255,255,255,0.07)',
                background: 'rgba(255,255,255,0.03)',
                fontSize: 12,
                color: '#94a3b8',
                cursor: 'default',
                transition: 'all 0.2s ease',
              }}
                onMouseEnter={e => {
                  e.target.style.borderColor = 'rgba(59,130,246,0.4)';
                  e.target.style.color = '#60a5fa';
                  e.target.style.background = 'rgba(59,130,246,0.08)';
                }}
                onMouseLeave={e => {
                  e.target.style.borderColor = 'rgba(255,255,255,0.07)';
                  e.target.style.color = '#94a3b8';
                  e.target.style.background = 'rgba(255,255,255,0.03)';
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{
              height: 44, padding: '0 28px',
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              border: 'none', borderRadius: 99,
              color: '#fff', fontSize: 13, fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 0 28px rgba(59,130,246,0.3), 0 1px 3px rgba(0,0,0,0.3)',
              display: 'flex', alignItems: 'center', gap: 8,
              transition: 'all 0.3s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(59,130,246,0.5), 0 4px 12px rgba(0,0,0,0.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 28px rgba(59,130,246,0.3), 0 1px 3px rgba(0,0,0,0.3)'; }}
            >
              Ver Projetos
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>

            <button style={{
              height: 44, padding: '0 28px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 99,
              color: '#cbd5e1', fontSize: 13, fontWeight: 500,
              cursor: 'pointer',
              backdropFilter: 'blur(16px)',
              transition: 'all 0.3s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Entrar em Contato
            </button>
          </div>

          {/* Scroll indicator */}
          <div style={{
            marginTop: 56,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            opacity: scrollRatio > 0.1 ? 0 : 0.4,
            transition: 'opacity 0.3s ease',
          }}>
            <span style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#475569' }}>Scroll</span>
            <div style={{
              width: 1, height: 40,
              background: 'linear-gradient(to bottom, #3b82f6, transparent)',
              animation: 'scroll-line 1.8s ease-in-out infinite',
            }} />
          </div>
        </div>
      </div>

      {/* ── SPACER para o scroll funcionar ── */}
      <div style={{ height: '100vh' }} />

      {/* ── CONTEÚDO ABAIXO (simula o resto do site) ── */}
      <div style={{
        position: 'relative', zIndex: 20,
        background: '#0d1117',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '80px 24px',
        textAlign: 'center',
      }}>
        <p style={{ color: '#475569', fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>
          Sobre Mim
        </p>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: '#f1f5f9', letterSpacing: '-0.02em' }}>
          Conheça um pouco mais sobre minha trajetória
        </h2>
      </div>

      {/* Keyframes via style tag */}
      <style>{`
        @keyframes pulse-badge {
          0%, 100% { box-shadow: 0 0 0 0 rgba(59,130,246,0.5); }
          50% { box-shadow: 0 0 0 6px rgba(59,130,246,0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes scroll-line {
          0% { transform: scaleY(0); transform-origin: top; opacity: 0; }
          40% { transform: scaleY(1); transform-origin: top; opacity: 1; }
          60% { transform: scaleY(1); transform-origin: bottom; opacity: 1; }
          100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
        }
      `}</style>
    </div>
  );
}