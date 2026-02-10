# 💻 FASE 4: Tecnologias e Skills

## 📅 Duração Estimada: 2-3 dias

## 🎯 Objetivos

- Criar seção de tecnologias visualmente atrativa
- Implementar cards animados para cada tecnologia
- Adicionar ícones e logos das tecnologias
- Criar sistema de categorização (Linguagens, Frameworks, etc.)
- Implementar animações de hover e interação
- Adicionar nível de proficiência (opcional)

## 📋 Tarefas Detalhadas

### 1. Estrutura de Dados

#### 1.1 `lib/constants/technologies.ts`
**Dados do currículo organizados:**

```typescript
export interface Technology {
  name: string;
  category: 'language' | 'framework' | 'style' | 'database' | 'tool' | 'test';
  icon?: string; // Nome do ícone ou URL
  proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  color?: string; // Cor da tecnologia
}

export const technologies: Technology[] = [
  // Linguagens
  { name: 'Python', category: 'language', color: '#3776AB' },
  { name: 'JavaScript', category: 'language', color: '#F7DF1E' },
  { name: 'TypeScript', category: 'language', color: '#3178C6' },
  { name: 'HTML5', category: 'language', color: '#E34F26' },
  { name: 'CSS3', category: 'language', color: '#1572B6' },
  
  // Frameworks
  { name: 'React', category: 'framework', color: '#61DAFB' },
  { name: 'Next.js', category: 'framework', color: '#000000' },
  { name: 'FastAPI', category: 'framework', color: '#009688' },
  { name: 'Django', category: 'framework', color: '#092E20' },
  { name: 'Flask', category: 'framework', color: '#000000' },
  
  // Estilos
  { name: 'TailwindCSS', category: 'style', color: '#06B6D4' },
  { name: 'Chakra UI', category: 'style', color: '#319795' },
  
  // Database & Tools
  { name: 'PostgreSQL', category: 'database', color: '#336791' },
  { name: 'Supabase', category: 'database', color: '#3ECF8E' },
  { name: 'Git', category: 'tool', color: '#F05032' },
  { name: 'Docker', category: 'tool', color: '#2496ED' },
  
  // Testes
  { name: 'Pytest', category: 'test', color: '#0A9EDC' },
  { name: 'Jest', category: 'test', color: '#C21325' },
];
```

### 2. Componente de Tecnologia

#### 2.1 `components/sections/TechnologyCard.tsx`
**Funcionalidades:**
- Card com nome da tecnologia
- Ícone/Logo da tecnologia
- Animação de hover (scale, glow, etc.)
- Cor de destaque da tecnologia
- Badge de categoria (opcional)
- Nível de proficiência (opcional - barra ou estrelas)

**Animações:**
- Hover: Scale up, shadow, glow
- Entrada: Fade-in com stagger
- Interação: Ripple effect no click

**Design:**
- Glassmorphism (opcional)
- Gradiente baseado na cor da tecnologia
- Border animado

### 3. Seção de Tecnologias

#### 3.1 `components/sections/Technologies.tsx`
**Layout:**
- Título da seção
- Filtros por categoria (tabs ou buttons)
- Grid responsivo de cards
- Animações de entrada ao fazer scroll

**Categorias:**
- Todas
- Linguagens
- Frameworks
- Estilos
- Database & Tools
- Testes

**Componentes auxiliares:**
- `components/sections/TechnologyFilter.tsx` - Filtros (Radix UI Tabs)
- `components/sections/TechnologyGrid.tsx` - Grid de cards

### 4. Ícones e Logos

#### 4.1 Estratégia de ícones:
- **React Icons:** Para tecnologias comuns
- **SVG Custom:** Para logos específicos
- **Next.js Image:** Para imagens de logos

#### 4.2 `components/ui/TechnologyIcon.tsx`
**Funcionalidade:**
- Renderizar ícone baseado no nome
- Fallback para ícone genérico
- Suporte a cores customizadas

**Bibliotecas de ícones:**
- `react-icons` (SiSimpleicons, FaBrands, etc.)
- SVGs customizados em `/public/icons/`

### 5. Animações

#### 5.1 `lib/animations/technologies.ts`
**Animações específicas:**
- Stagger animation para grid
- Hover effects individuais
- Filter transition (quando mudar categoria)
- Scroll reveal

**GSAP Timeline:**
```typescript
export function animateTechnologiesGrid(container: HTMLElement) {
  gsap.fromTo(
    container.children,
    { opacity: 0, scale: 0.8, y: 20 },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.05,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
      },
    }
  );
}
```

### 6. Filtros Interativos

#### 6.1 `components/sections/TechnologyFilter.tsx`
**Funcionalidade:**
- Tabs do Radix UI
- Animações de transição ao mudar filtro
- Indicador ativo
- Acessibilidade (keyboard navigation)

**Implementação:**
- Usar Radix UI Tabs
- Framer Motion para transições
- Estado para controlar categoria ativa

### 7. Grid Responsivo

#### 7.1 Layout:
- Mobile: 2 colunas
- Tablet: 3 colunas
- Desktop: 4-5 colunas

#### 7.2 `components/sections/TechnologyGrid.tsx`
**Funcionalidade:**
- Grid CSS com Tailwind
- Responsive columns
- Gap consistente
- Animações de entrada

### 8. Efeitos Visuais

#### 8.1 Hover Effects:
- Scale transform
- Shadow/Glow
- Border animation
- Color transition

#### 8.2 Background Effects:
- Gradiente sutil
- Partículas (opcional)
- Pattern overlay (opcional)

### 9. Estatísticas (Opcional)

#### 9.1 `components/sections/TechnologyStats.tsx`
**Métricas:**
- Total de tecnologias
- Por categoria
- Anos de experiência (se aplicável)

**Design:**
- Cards de estatísticas
- Animações de contador
- Ícones representativos

### 10. Performance

#### 10.1 Otimizações:
- Lazy loading de ícones
- Memoização de componentes
- Virtual scrolling (se muitos itens)
- Code splitting

## 📝 Código de Exemplo

### TechnologyCard Component

```typescript
// components/sections/TechnologyCard.tsx
'use client';

import { motion } from 'framer-motion';
import { TechnologyIcon } from '@/components/ui/TechnologyIcon';
import { Technology } from '@/lib/constants/technologies';

interface TechnologyCardProps {
  technology: Technology;
  index: number;
}

function TechnologyCard({ technology, index }: TechnologyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: 'back.out(1.7)',
      }}
      whileHover={{
        scale: 1.05,
        y: -5,
        transition: { duration: 0.2 },
      }}
      className="group relative p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
    >
      {/* Border animado */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(135deg, ${technology.color}20, ${technology.color}40)`,
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-3">
        <TechnologyIcon
          name={technology.name}
          color={technology.color}
          size={48}
        />
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {technology.name}
        </h3>
      </div>

      {/* Glow effect no hover */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-300 -z-10"
        style={{ backgroundColor: technology.color }}
      />
    </motion.div>
  );
}

export { TechnologyCard };
```

### Technologies Section

```typescript
// components/sections/Technologies.tsx
'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { TechnologyFilter } from './TechnologyFilter';
import { TechnologyGrid } from './TechnologyGrid';
import { technologies, Technology } from '@/lib/constants/technologies';

function Technologies() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredTechnologies =
    activeCategory === 'all'
      ? technologies
      : technologies.filter((tech) => tech.category === activeCategory);

  return (
    <section id="tecnologias" className="py-20 bg-gray-50 dark:bg-gray-900">
      <Container>
        <h2 className="text-4xl font-bold text-center mb-4">
          Tecnologias
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
          Stack tecnológica que utilizo no desenvolvimento
        </p>

        <TechnologyFilter
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <TechnologyGrid technologies={filteredTechnologies} />
      </Container>
    </section>
  );
}

export { Technologies };
```

### TechnologyFilter Component

```typescript
// components/sections/TechnologyFilter.tsx
'use client';

import * as Tabs from '@radix-ui/react-tabs';
import { motion } from 'framer-motion';

interface TechnologyFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: 'all', label: 'Todas' },
  { id: 'language', label: 'Linguagens' },
  { id: 'framework', label: 'Frameworks' },
  { id: 'style', label: 'Estilos' },
  { id: 'database', label: 'Database & Tools' },
  { id: 'test', label: 'Testes' },
];

function TechnologyFilter({
  activeCategory,
  onCategoryChange,
}: TechnologyFilterProps) {
  return (
    <Tabs.Root
      value={activeCategory}
      onValueChange={onCategoryChange}
      className="mb-8"
    >
      <Tabs.List className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <Tabs.Trigger
            key={category.id}
            value={category.id}
            className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            {category.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs.Root>
  );
}

export { TechnologyFilter };
```

## ✅ Checklist de Conclusão

- [ ] Dados de tecnologias organizados
- [ ] TechnologyCard component criado
- [ ] Seção Technologies implementada
- [ ] Filtros funcionais (Radix UI)
- [ ] Ícones renderizando corretamente
- [ ] Animações de entrada funcionando
- [ ] Hover effects implementados
- [ ] Grid responsivo
- [ ] Performance otimizada
- [ ] Acessibilidade verificada

## 🧪 Testes de Validação

1. Testar filtros por categoria
2. Verificar animações de hover
3. Validar responsividade do grid
4. Testar transições entre filtros
5. Verificar performance com muitas tecnologias
6. Validar acessibilidade (keyboard navigation)

## 📝 Notas Importantes

- **Ícones:** Usar biblioteca confiável (react-icons)
- **Cores:** Manter consistência com design system
- **Performance:** Memoizar componentes pesados
- **Acessibilidade:** Labels descritivos para tecnologias

## 🚀 Próxima Fase

Após concluir esta fase, seguir para **FASE 5: Projetos e Portfólio**
