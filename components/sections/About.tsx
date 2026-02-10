'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { FiCode, FiTarget, FiHeart, FiZap } from 'react-icons/fi';
import { developerData } from '@/lib/constants';
import { Container } from '@/components/ui/Container';
import { AboutCard } from './AboutCard';
import { Section } from './Section';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animação do texto
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top 80%',
            },
          }
        );
      }

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
            Conheça um pouco mais sobre minha trajetória e paixões
          </p>
        </div>

        {/* Grid principal: Texto + Imagem */}
        <div className="grid md:grid-cols-2 gap-12 mb-16 items-center">
          {/* Texto */}
          <div ref={textRef}>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              Desenvolvedor autodidata apaixonado por tecnologia e verdadeiro esponja de conhecimento. 
              Minha experiência envolve automação de tarefas, criptografia de dados, web scraping e 
              desenvolvimento de software, sempre focado em melhorar o conhecimento tecnológico e 
              otimizar soluções para desafios diários.
            </p>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              Estou procurando novas oportunidades na área e pronto para enfrentar desafios inovadores.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              <strong className="text-primary-400">Curiosidade extra:</strong> Além de ser desenvolvedor, 
              no meu tempo livre, gosto de jogar online com meus amigos e praticar vôlei – porque o 
              equilíbrio entre tecnologia e movimento é essencial!
            </p>
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
            description="Tecnologia e inovação são minha motivação diária"
            icon={<FiHeart className="w-8 h-8" />}
          />
          <AboutCard
            title="Foco"
            description="Soluções otimizadas e código de qualidade"
            icon={<FiTarget className="w-8 h-8" />}
          />
          <AboutCard
            title="Aprendizado"
            description="Sempre em busca de novos conhecimentos"
            icon={<FiCode className="w-8 h-8" />}
          />
          <AboutCard
            title="Performance"
            description="Aplicações rápidas e eficientes"
            icon={<FiZap className="w-8 h-8" />}
          />
        </div>
      </Container>
    </Section>
  );
}

export { About };
