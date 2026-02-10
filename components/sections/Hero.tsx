'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import Image from 'next/image';
import { FiArrowDown } from 'react-icons/fi';
import { developerData } from '@/lib/constants';
import { scrollToSection } from '@/lib/utils/scroll';
import { CTAButton } from '@/components/ui/CTAButton';

function Hero() {
    const heroRef = useRef<HTMLElement>(null);
    const greetingRef = useRef<HTMLParagraphElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Animações sequenciais com GSAP
        const timeline = gsap.timeline();

        if (greetingRef.current) {
            timeline.fromTo(
                greetingRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
            );
        }

        if (titleRef.current) {
            timeline.fromTo(
                titleRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
                '-=0.3'
            );
        }

        if (subtitleRef.current) {
            timeline.fromTo(
                subtitleRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
                '-=0.5'
            );
        }

        if (descriptionRef.current) {
            timeline.fromTo(
                descriptionRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
                '-=0.4'
            );
        }

        if (buttonsRef.current) {
            timeline.fromTo(
                buttonsRef.current.children,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: 'power3.out',
                },
                '-=0.3'
            );
        }

        return () => {
            timeline.kill();
        };
    }, []);

    return (
        <section
            ref={heroRef}
            id="hero"
            className="min-h-screen flex items-start justify-start relative overflow-hidden"
        >
            {/* Imagem de Capa como Background */}
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/capa_Alan.jpg"
                    alt="Alan da Silva de Barros - Desenvolvedor FullStack"
                    fill
                    className="object-cover"
                    priority
                    quality={90}
                    sizes="100vw"
                />
                {/* Overlay gradiente para melhor legibilidade */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-800/85 to-gray-900/90" />
                {/* Overlay adicional para contraste */}
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Grid pattern sutil */}
            <div className="absolute inset-0 opacity-10 z-[1]" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '50px 50px'
            }} />

            <div className="relative z-10 pt-16 md:pt-20 pl-4">
                <div className="text-left max-w-4xl pt-20 mt-20 ml-16">
                    {/* Saudação */}
                    <p
                        ref={greetingRef}
                        className="text-lg md:text-xl lg:text-2xl text-white/80 mb-2 font-medium"
                    >
                        Olá, eu sou
                    </p>

                    {/* Nome */}
                    <h1
                        ref={titleRef}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4"
                    >
                        {developerData.name}
                    </h1>

                    {/* Título/Profissão */}
                    <p
                        ref={subtitleRef}
                        className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-6 font-medium"
                    >
                        {developerData.title}
                    </p>

                    {/* Descrição breve */}
                    <p
                        ref={descriptionRef}
                        className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl"
                    >
                        Desenvolvedor autodidata apaixonado por tecnologia, sempre em busca de soluções inovadoras e otimizadas.
                    </p>

                    {/* CTAs */}
                    <div
                        ref={buttonsRef}
                        className="flex flex-col sm:flex-row gap-4 justify-start items-start"
                    >
                        <CTAButton
                            onClick={() => scrollToSection('contato')}
                            variant="primary"
                        >
                            Entre em Contato
                        </CTAButton>
                        <CTAButton
                            onClick={() => scrollToSection('projetos')}
                            variant="secondary"
                        >
                            Ver Projetos
                        </CTAButton>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            >
                <button
                    onClick={() => scrollToSection('sobre')}
                    className="flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors group"
                    aria-label="Rolar para baixo"
                >
                    <span className="text-sm font-medium">Scroll</span>
                    <FiArrowDown className="w-6 h-6 group-hover:translate-y-1 transition-transform" />
                </button>
            </motion.div>
        </section>
    );
}

export { Hero };