# 🎨 FASE 2: Estrutura de Layout e Navegação

## 📅 Duração Estimada: 2-3 dias

## 🎯 Objetivos

- Criar layout responsivo completo
- Implementar navegação suave (smooth scroll)
- Desenvolver Header com menu responsivo
- Criar sistema de navegação por seções
- Implementar Footer completo
- Adicionar indicador de scroll progress

## 📋 Tarefas Detalhadas

### 1. Header Avançado

#### 1.1 `components/layout/Header.tsx`
**Funcionalidades:**
- Logo/Nome com animação de entrada
- Menu de navegação horizontal (desktop)
- Menu hambúrguer (mobile)
- Indicador de seção ativa (scroll spy)
- Efeito de blur/transparência ao fazer scroll
- Sticky header com animação

**Componentes auxiliares:**
- `components/layout/Navigation.tsx` - Menu de navegação
- `components/layout/MobileMenu.tsx` - Menu mobile (Radix UI Dialog)
- `components/ui/ScrollIndicator.tsx` - Barra de progresso de scroll

**Tecnologias:**
- Framer Motion para animações
- GSAP ScrollTrigger para scroll spy
- Radix UI Dialog para menu mobile

### 2. Navegação Suave

#### 2.1 `lib/utils/scroll.ts`
**Funções:**
- `scrollToSection()` - Scroll suave para seções
- `getActiveSection()` - Identificar seção visível
- `setupScrollSpy()` - Configurar observador de scroll

**Implementação:**
- Usar `scrollIntoView` com behavior smooth
- Integrar com GSAP ScrollTrigger
- Adicionar offset para header fixo

### 3. Footer Completo

#### 3.1 `components/layout/Footer.tsx`
**Seções:**
- Links de redes sociais (com ícones animados)
- Informações de contato
- Links rápidos (navegação)
- Copyright e ano dinâmico
- Badge "Made with ❤️"

**Componentes:**
- `components/ui/SocialLinks.tsx` - Grid de redes sociais
- Ícones do React Icons

### 4. Layout Principal

#### 4.1 `app/layout.tsx`
**Estrutura:**
- Metadata completa (SEO)
- Open Graph tags
- Twitter Cards
- Fonts otimizadas (Next.js Font)
- Providers globais
- Analytics (preparação)

#### 4.2 `components/layout/MainLayout.tsx`
**Wrapper principal:**
- Header
- Main content (children)
- Footer
- Scroll to top button (opcional)

### 5. Sistema de Seções

#### 5.1 Estrutura de IDs
Cada seção terá um ID único:
- `#hero` - Hero Section
- `#sobre` - Sobre Mim
- `#tecnologias` - Tecnologias
- `#projetos` - Projetos
- `#educacao` - Educação
- `#contato` - Contato

#### 5.2 `components/sections/Section.tsx`
**Componente wrapper:**
- ID único para navegação
- Padding consistente
- Animações de entrada (Framer Motion)
- Variantes de background

### 6. Scroll Progress Indicator

#### 6.1 `components/ui/ScrollProgress.tsx`
**Funcionalidade:**
- Barra no topo da página
- Mostra progresso do scroll
- Animação suave
- Opcional: mostrar porcentagem

**Implementação:**
- Usar `useScroll` do Framer Motion
- Ou usar GSAP ScrollTrigger

### 7. Botão Scroll to Top

#### 7.1 `components/ui/ScrollToTop.tsx`
**Funcionalidade:**
- Aparece após scroll de X pixels
- Animação de entrada/saída
- Scroll suave para o topo
- Ícone animado

**Tecnologias:**
- Framer Motion para animação
- React Icons para ícone

### 8. Menu Mobile (Radix UI)

#### 8.1 `components/layout/MobileMenu.tsx`
**Funcionalidades:**
- Dialog do Radix UI
- Overlay com blur
- Animações de entrada/saída
- Links de navegação
- Fechar ao clicar em link

**Animações:**
- Framer Motion para transições
- Menu slide-in da direita/esquerda

### 9. Toggle de Tema (Preparação)

#### 9.1 `components/ui/ThemeToggle.tsx`
**Preparação para Fase futura:**
- Estrutura básica
- Toggle button
- Integração com contexto (preparação)

### 10. Responsividade

#### 10.1 Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

#### 10.2 Testes
- Menu hambúrguer em mobile
- Navegação horizontal em desktop
- Footer responsivo
- Espaçamentos adaptativos

## 📝 Código de Exemplo

### Header com Scroll Spy

```typescript
// components/layout/Header.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useActiveSection } from '@/lib/hooks/useActiveSection';

function Header() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [1, 0.95]);
  const blur = useTransform(scrollY, [0, 100], [0, 10]);
  const activeSection = useActiveSection();

  return (
    <motion.header
      style={{ opacity, backdropFilter: `blur(${blur}px)` }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80"
    >
      <nav className="container mx-auto px-4 py-4">
        {/* Navegação */}
      </nav>
    </motion.header>
  );
}
```

### Scroll to Section

```typescript
// lib/utils/scroll.ts
export function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (element) {
    const headerHeight = 80; // altura do header
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
}
```

## ✅ Checklist de Conclusão

- [ ] Header completo com navegação
- [ ] Menu mobile funcional
- [ ] Scroll spy implementado
- [ ] Navegação suave entre seções
- [ ] Footer completo com links
- [ ] Scroll progress indicator
- [ ] Scroll to top button
- [ ] Layout responsivo em todos os breakpoints
- [ ] Animações suaves no header
- [ ] Metadata SEO básica
- [ ] Testes de navegação funcionando

## 🧪 Testes de Validação

1. Testar navegação entre seções
2. Verificar scroll spy (destaque da seção ativa)
3. Testar menu mobile em diferentes tamanhos
4. Verificar animações de scroll
5. Testar scroll to top
6. Validar responsividade em dispositivos reais
7. Verificar performance (60fps nas animações)

## 📝 Notas Importantes

- **Performance:** Usar `will-change` CSS para elementos animados
- **Acessibilidade:** Navegação por teclado funcional
- **SEO:** IDs de seções devem ser semânticos
- **Animações:** Reduzir motion para usuários que preferem (prefers-reduced-motion)

## 🚀 Próxima Fase

Após concluir esta fase, seguir para **FASE 3: Hero Section e Sobre Mim**
