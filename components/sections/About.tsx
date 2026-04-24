'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { FiTarget, FiHeart, FiZap, FiUsers } from 'react-icons/fi';
import { developerData } from '@/lib/constants';
import { Container } from '@/components/ui/Container';
import { AboutCard } from './AboutCard';
import { Section } from './Section';
import { KaraokeText } from '@/components/motion/KaraokeText';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animação da imagem
            if (imageRef.current) {
                gsap.fromTo(
                    imageRef.current,
                    { opacity: 0, x: 30 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: imageRef.current,
                            start: 'top 80%',
                        },
                    }
                );
            }

            // Animação dos cards com stagger
            if (cardsRef.current) {
                gsap.fromTo(
                    Array.from(cardsRef.current.children),
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        stagger: 0.15,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: cardsRef.current,
                            start: 'top 80%',
                        },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <Section
            ref={sectionRef}
            id="sobre"
            variant="default"
            className="py-20 md:py-24"
        >
            <Container>
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                        Sobre Mim
                    </h2>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Como trabalho e o que posso construir para o seu negócio crescer com presença digital de verdade
                    </p>
                </div>

                {/* Grid principal: Texto + Imagem */}
                <div className="grid md:grid-cols-2 gap-12 mb-16 items-center">
                    {/* Texto */}
                    <div>
                        <KaraokeText
                            className="text-lg text-gray-300 mb-6 leading-relaxed"
                            wordClassName="transition-all duration-500 ease-out"
                            text="Sou desenvolvedor e trabalho criando sites, sistemas web e tudo o que sua empresa precisa para se posicionar melhor no digital — com identidade profissional, navegação clara e ferramentas que organizam o dia a dia. Da vitrine no navegador ao painel por trás das telas, o foco é fazer seu negócio parecer único e confiável para quem chega até você."
                        />
                        <KaraokeText
                            className="text-lg text-gray-300 mb-6 leading-relaxed"
                            wordClassName="transition-all duration-500 ease-out"
                            text="Meu processo é direto: entendo seu contexto, alinhamos prioridades e prazos, e eu entrego soluções estáveis, seguras e fáceis de evoluir. Você acompanha o andamento, tira dúvidas quando quiser e recebe um produto pensado para converter visitantes em clientes e simplificar a operação — sem jargão desnecessário."
                        />
                    </div>

                    {/* Imagem de Perfil */}
                    <div ref={imageRef} className="flex justify-center">
                        <div className="relative w-64 h-64 md:w-80 md:h-80">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full blur-2xl opacity-30 animate-pulse" />
                            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-gray-800 shadow-2xl">
                                <Image
                                    src="/images/Perfil_Linkedn.png"
                                    alt={developerData.name}
                                    fill
                                    className="object-cover"
                                    priority
                                    sizes="(max-width: 768px) 256px, 320px"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cards de Destaque */}
                <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <AboutCard
                        title="Paixão"
                        description="Ver seu negócio ganhar presença digital forte e uma imagem à altura do serviço que você presta"
                        icon={<FiHeart className="w-8 h-8" />}
                    />
                    <AboutCard
                        title="Foco"
                        description="Sites e sistemas bem estruturados, com performance e clareza para quem usa"
                        icon={<FiTarget className="w-8 h-8" />}
                    />
                    <AboutCard
                        title="Parceria"
                        description="Comunicação transparente do briefing à entrega — você sabe o que está sendo feito e por quê"
                        icon={<FiUsers className="w-8 h-8" />}
                    />
                    <AboutCard
                        title="Performance"
                        description="Experiência rápida no celular e no desktop, pronta para crescer junto com a demanda"
                        icon={<FiZap className="w-8 h-8" />}
                    />
                </div>
            </Container>
        </Section>
    );
}

export { About };
