# 🎭 FASE 3: Hero Section e Sobre Mim

## 📅 Duração Estimada: 3-4 dias

## 🎯 Objetivos

- Criar Hero Section impactante com animações
- Implementar seção "Sobre Mim" com design atrativo
- Adicionar animações de entrada com GSAP e Framer Motion
- Integrar efeitos de parallax e scroll
- Otimizar imagens com Sharp

## 📋 Tarefas Detalhadas

### 1. Hero Section

#### 1.1 `components/sections/Hero.tsx`
**Elementos:**
- Nome do desenvolvedor (animação de digitação ou fade-in)
- Título/Profissão (animação sequencial)
- Descrição breve (fade-in com delay)
- CTA buttons (Contato, Ver Projetos)
- Imagem de perfil ou ilustração (opcional)
- Background com gradiente animado
- Partículas ou efeitos visuais (opcional)

**Animações:**
- Texto aparecendo sequencialmente (GSAP Timeline)
- Botões com hover effects (Framer Motion)
- Background com movimento sutil
- Scroll indicator (seta ou texto)

**Tecnologias:**
- GSAP para animações de texto
- Framer Motion para interações
- React Icons para ícones

#### 1.2 Componentes auxiliares:
- `components/sections/HeroText.tsx` - Texto animado
- `components/sections/HeroButtons.tsx` - CTAs
- `components/sections/HeroBackground.tsx` - Background animado

### 2. Animações de Texto

#### 2.1 `lib/animations/text.ts`
**Funções:**
- `animateTextReveal()` - Revelar texto letra por letra
- `animateTextFadeIn()` - Fade-in sequencial
- `animateTypingEffect()` - Efeito de digitação

**Implementação GSAP:**
```typescript
// Exemplo de animação de texto
export function animateTextReveal(element: HTMLElement) {
  gsap.fromTo(
    element,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
  );
}
```

### 3. Seção Sobre Mim

#### 3.1 `components/sections/About.tsx`
**Conteúdo:**
- Título da seção
- Texto descritivo (do currículo)
- Destaques/Highlights (cards ou badges)
- Imagem de perfil (opcional)
- Estatísticas (opcional): anos de experiência, projetos, etc.

**Layout:**
- Grid responsivo (texto + imagem)
- Cards com informações destacadas
- Animações de entrada ao fazer scroll

**Dados do currículo:**
> "Desenvolvedor autodidata apaixonado por tecnologia e verdadeiro esponja de conhecimento. Minha experiência envolve automação de tarefas, criptografia de dados, web scraping e desenvolvimento de software, sempre focado em melhorar o conhecimento tecnológico e otimizar soluções para desafios diários. Estou procurando novas oportunidades na área e pronto para enfrentar desafios inovadores. Curiosidade extra: Além de ser desenvolvedor, no meu tempo livre, gosto de jogar online com meus amigos e praticar vôlei – porque o equilíbrio entre tecnologia e movimento é essencial!"

#### 3.2 Componentes auxiliares:
- `components/sections/AboutCard.tsx` - Cards de destaque
- `components/sections/AboutImage.tsx` - Imagem com efeitos

### 4. Animações de Scroll

#### 4.1 `lib/animations/scroll.ts`
**Configurações GSAP ScrollTrigger:**
- Animações de entrada ao fazer scroll
- Parallax effects (sutis)
- Reveal animations
- Stagger animations para listas

**Exemplo:**
```typescript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function setupScrollAnimations() {
  gsap.utils.toArray('.fade-in-up').forEach((element: any) => {
    gsap.fromTo(
      element,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });
}
```

### 5. Otimização de Imagens

#### 5.1 Configurar Sharp
- Next.js já usa Sharp por padrão
- Configurar domínios de imagens (se necessário)
- Criar função helper para imagens

#### 5.2 `lib/utils/images.ts`
**Funções:**
- `getOptimizedImage()` - Retornar URL otimizada
- `getImageDimensions()` - Obter dimensões
- Helpers para diferentes tamanhos

#### 5.3 Uso de Next.js Image
```typescript
import Image from 'next/image';

function AboutImage() {
  return (
    <Image
      src="/images/profile.jpg"
      alt="Alan da Silva de Barros"
      width={400}
      height={400}
      priority
      className="rounded-full"
    />
  );
}
```

### 6. Efeitos Visuais

#### 6.1 Background Gradiente Animado
- Gradiente que muda de cor suavemente
- Usar CSS animations ou Framer Motion
- Performance otimizada

#### 6.2 Partículas (Opcional)
- Biblioteca: `react-particles` ou similar
- Efeito sutil, não intrusivo
- Performance considerada

### 7. CTAs e Botões

#### 7.1 `components/ui/CTAButton.tsx`
**Variantes:**
- Primary (destaque)
- Secondary (outline)
- Ghost (transparente)

**Animações:**
- Hover effects
- Ripple effect (opcional)
- Loading state

### 8. Responsividade Hero

#### 8.1 Breakpoints específicos:
- Mobile: Stack vertical, texto centralizado
- Tablet: Layout adaptado
- Desktop: Layout completo com imagem

#### 8.2 Ajustes:
- Tamanhos de fonte responsivos
- Espaçamentos adaptativos
- Imagens responsivas

### 9. Acessibilidade

#### 9.1 Considerações:
- Texto alternativo para imagens
- Contraste adequado
- Animações respeitam `prefers-reduced-motion`
- Navegação por teclado

### 10. Performance

#### 10.1 Otimizações:
- Lazy loading de imagens (exceto hero)
- Code splitting automático
- Animações com `will-change`
- Debounce em scroll events

## 📝 Código de Exemplo

### Hero Section Completo

```typescript
// components/sections/Hero.tsx
'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollToSection } from '@/lib/utils/scroll';
import { CTAButton } from '@/components/ui/CTAButton';

gsap.registerPlugin(ScrollTrigger);

function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animação do título
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );

      // Animação do subtítulo (com delay)
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: 'power3.out' }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 animate-gradient" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center">
          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold text-white mb-4"
          >
            Alan da Silva de Barros
          </h1>
          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-white/90 mb-8"
          >
            Desenvolvedor FullStack
          </p>
          <div className="flex gap-4 justify-center">
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

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="text-white">↓</span>
      </motion.div>
    </section>
  );
}

export { Hero };
```

### About Section

```typescript
// components/sections/About.tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/ui/Container';
import { AboutCard } from './AboutCard';

gsap.registerPlugin(ScrollTrigger);

function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animação dos cards com stagger
      gsap.fromTo(
        cardsRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="sobre" className="py-20">
      <Container>
        <h2 className="text-4xl font-bold text-center mb-12">
          Sobre Mim
        </h2>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            {/* Texto do currículo */}
          </p>
          <div ref={cardsRef} className="grid md:grid-cols-2 gap-4">
            <AboutCard title="Paixão" description="Tecnologia e inovação" />
            <AboutCard title="Foco" description="Soluções otimizadas" />
          </div>
        </div>
      </Container>
    </section>
  );
}

export { About };
```

## ✅ Checklist de Conclusão

- [ ] Hero Section completa e animada
- [ ] Animações de texto funcionando
- [ ] Seção Sobre Mim implementada
- [ ] Imagens otimizadas com Next.js Image
- [ ] Scroll animations configuradas
- [ ] CTAs funcionais
- [ ] Responsividade em todos os dispositivos
- [ ] Performance otimizada (60fps)
- [ ] Acessibilidade verificada
- [ ] Conteúdo do currículo integrado

## 🧪 Testes de Validação

1. Verificar animações de entrada
2. Testar scroll animations
3. Validar responsividade
4. Verificar performance (Lighthouse)
5. Testar navegação dos CTAs
6. Validar otimização de imagens
7. Verificar acessibilidade (screen reader)

## 📝 Notas Importantes

- **Performance:** Animações devem ser suaves (60fps)
- **Conteúdo:** Usar texto real do currículo
- **Imagens:** Sempre usar Next.js Image component
- **Acessibilidade:** Respeitar `prefers-reduced-motion`

## 🚀 Próxima Fase

Após concluir esta fase, seguir para **FASE 4: Tecnologias e Skills**
