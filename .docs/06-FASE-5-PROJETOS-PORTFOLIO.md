# 🚀 FASE 5: Projetos e Portfólio

## 📅 Duração Estimada: 4-5 dias

## 🎯 Objetivos

- Criar seção de projetos com design impactante
- Implementar cards de projetos com detalhes
- Adicionar modal/dialog para visualização detalhada
- Integrar imagens dos projetos (screenshots)
- Adicionar links para repositórios e demos
- Implementar filtros e busca (opcional)
- Animações de entrada e interação

## 📋 Tarefas Detalhadas

### 1. Estrutura de Dados

#### 1.1 `lib/constants/projects.ts`
**Dados dos projetos do currículo:**

```typescript
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  category: 'web' | 'mobile' | 'desktop' | 'automation' | 'saas';
  image: string; // Path para screenshot
  githubUrl?: string;
  liveUrl?: string;
  learnings: string[]; // Aprendizados do projeto
  featured?: boolean; // Projeto em destaque
  date?: string; // Data de conclusão
}

export const projects: Project[] = [
  {
    id: 'finance-control',
    title: 'Finance Control',
    description: 'Sistema completo de gestão financeira pessoal.',
    longDescription: 'Aplicação completa para controle financeiro pessoal com dashboard interativo, gráficos de receitas e despesas, categorização de transações e relatórios mensais.',
    technologies: ['TypeScript', 'React', 'Next.js', 'PostgreSQL', 'TailwindCSS'],
    category: 'web',
    image: '/images/projects/finance-control.jpg',
    githubUrl: 'https://github.com/lanario/finance-control',
    learnings: [
      'Arquitetura de aplicações financeiras',
      'Integração com APIs de pagamento',
      'Desenvolvimento de dashboards com gráficos interativos',
      'Implementação de autenticação e autorização',
    ],
    featured: true,
  },
  {
    id: 'consultorio-dr-pedro',
    title: 'Consultório Dr. Pedro',
    description: 'Blog e site institucional para consultório odontológico.',
    longDescription: 'Site institucional moderno com blog integrado, sistema de agendamento e informações sobre serviços odontológicos.',
    technologies: ['Next.js 14', 'TypeScript', 'TailwindCSS', 'Server Components'],
    category: 'web',
    image: '/images/projects/consultorio-dr-pedro.jpg',
    githubUrl: 'https://github.com/lanario/consultorio-dr-pedro',
    learnings: [
      'Aprofundamento no Next.js App Router',
      'Otimização de performance com Server Components',
      'Técnicas de SEO e meta tags',
      'Design responsivo mobile-first',
    ],
    featured: true,
  },
  {
    id: 'saas-church',
    title: 'SaaS Church',
    description: 'Plataforma SaaS para gestão de igrejas.',
    longDescription: 'Sistema completo de gestão para igrejas com controle de membros, eventos, finanças e relatórios. Arquitetura multi-tenant com sistema de permissões granular.',
    technologies: ['TypeScript', 'Next.js', 'PostgreSQL', 'Sistema de permissões baseado em roles'],
    category: 'saas',
    image: '/images/projects/saas-church.jpg',
    githubUrl: 'https://github.com/lanario/saas-church',
    learnings: [
      'Arquitetura SaaS multi-tenant',
      'Implementação de sistemas de permissões granulares',
      'Gerenciamento de estado complexo',
      'Desenvolvimento de APIs RESTful',
    ],
    featured: true,
  },
  {
    id: 'arquivo',
    title: 'Arquivo',
    description: 'Script Python para organização automática de arquivos.',
    longDescription: 'Ferramenta de linha de comando para organização automática de arquivos por tipo, data ou padrão personalizado.',
    technologies: ['Python', 'Manipulação de sistema de arquivos'],
    category: 'automation',
    image: '/images/projects/arquivo.jpg',
    githubUrl: 'https://github.com/lanario/arquivo',
    learnings: [
      'Automação de tarefas com Python',
      'Manipulação de sistema de arquivos',
      'Processamento assíncrono',
      'Criação de scripts utilitários',
    ],
    featured: false,
  },
];
```

### 2. Componente ProjectCard

#### 2.1 `components/sections/ProjectCard.tsx`
**Funcionalidades:**
- Imagem do projeto (screenshot)
- Título e descrição
- Tags de tecnologias
- Botões (Ver mais, GitHub, Demo)
- Badge "Featured" (se aplicável)
- Animação de hover (lift effect, overlay)
- Gradient overlay no hover

**Design:**
- Card com imagem destacada
- Informações sobrepostas (opcional)
- Hover: Scale, shadow, overlay
- Transições suaves

### 3. Seção de Projetos

#### 3.1 `components/sections/Projects.tsx`
**Layout:**
- Título da seção
- Filtros por categoria (opcional)
- Grid responsivo de projetos
- Featured projects em destaque (carousel ou grid maior)
- Animações de entrada ao fazer scroll

**Componentes auxiliares:**
- `components/sections/ProjectGrid.tsx` - Grid de cards
- `components/sections/FeaturedProjects.tsx` - Projetos em destaque
- `components/sections/ProjectFilter.tsx` - Filtros (opcional)

### 4. Modal de Detalhes

#### 4.1 `components/sections/ProjectModal.tsx`
**Funcionalidades:**
- Dialog do Radix UI
- Imagem grande do projeto
- Descrição completa
- Lista de tecnologias
- Aprendizados (seção destacada)
- Links (GitHub, Demo)
- Galeria de imagens (opcional)
- Animações de entrada/saída

**Layout:**
- Overlay com blur
- Conteúdo centralizado
- Scroll interno (se necessário)
- Botão de fechar
- Navegação entre projetos (opcional)

### 5. Galeria de Imagens

#### 5.1 `components/sections/ProjectGallery.tsx`
**Funcionalidade:**
- Carousel de imagens do projeto
- Navegação (anterior/próximo)
- Thumbnails (opcional)
- Zoom (opcional)
- Lightbox effect

**Tecnologias:**
- Framer Motion para transições
- Swiper.js (opcional) ou implementação custom

### 6. Filtros e Busca

#### 6.1 `components/sections/ProjectFilter.tsx`
**Funcionalidades:**
- Filtro por categoria
- Busca por nome/tecnologia
- Ordenação (data, nome, featured)
- Contador de resultados

**Implementação:**
- Radix UI para componentes
- Estado local ou Context API
- Debounce na busca

### 7. Featured Projects

#### 7.1 `components/sections/FeaturedProjects.tsx`
**Layout especial:**
- Cards maiores
- Mais destaque visual
- Carousel ou grid destacado
- Animações especiais

### 8. Otimização de Imagens

#### 8.1 Screenshots dos Projetos:
- Usar Next.js Image component
- Lazy loading
- WebP/AVIF format
- Dimensões otimizadas
- Placeholder blur

#### 8.2 `lib/utils/projects.ts`
**Funções:**
- `getProjectImage()` - Retornar imagem otimizada
- `getProjectUrl()` - URLs dos projetos

### 9. Animações

#### 9.1 `lib/animations/projects.ts`
**Animações:**
- Stagger animation para grid
- Hover effects nos cards
- Modal entrance/exit
- Image transitions
- Scroll reveal

**GSAP Timeline:**
```typescript
export function animateProjectsGrid(container: HTMLElement) {
  gsap.fromTo(
    container.children,
    { opacity: 0, y: 50, scale: 0.9 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
      },
    }
  );
}
```

### 10. Links e CTAs

#### 10.1 Botões de ação:
- "Ver Detalhes" - Abre modal
- "GitHub" - Link externo (nova aba)
- "Demo" - Link para aplicação (se disponível)
- Ícones apropriados (React Icons)

## 📝 Código de Exemplo

### ProjectCard Component

```typescript
// components/sections/ProjectCard.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Project } from '@/lib/constants/projects';
import { CTAButton } from '@/components/ui/CTAButton';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenModal: (project: Project) => void;
}

function ProjectCard({ project, index, onOpenModal }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: 'power3.out',
      }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
    >
      {/* Imagem */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Badge Featured */}
        {project.featured && (
          <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
            Destaque
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tecnologias */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Botões */}
        <div className="flex gap-2">
          <CTAButton
            onClick={() => onOpenModal(project)}
            variant="primary"
            className="flex-1"
          >
            Ver Detalhes
          </CTAButton>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <FiGithub className="w-5 h-5" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <FiExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export { ProjectCard };
```

### Projects Section

```typescript
// components/sections/Projects.tsx
'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { projects, Project } from '@/lib/constants/projects';

function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  function handleOpenModal(project: Project) {
    setSelectedProject(project);
  }

  function handleCloseModal() {
    setSelectedProject(null);
  }

  return (
    <section id="projetos" className="py-20">
      <Container>
        <h2 className="text-4xl font-bold text-center mb-4">
          Projetos
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
          Alguns dos projetos que desenvolvi
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpenModal={handleOpenModal}
            />
          ))}
        </div>

        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={handleCloseModal}
          />
        )}
      </Container>
    </section>
  );
}

export { Projects };
```

### ProjectModal Component

```typescript
// components/sections/ProjectModal.tsx
'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Project } from '@/lib/constants/projects';
import { FiX, FiGithub, FiExternalLink } from 'react-icons/fi';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <Dialog.Root open={true} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl max-h-[90vh] bg-white dark:bg-gray-800 rounded-xl shadow-2xl z-50 overflow-y-auto">
          {/* Imagem */}
          <div className="relative h-64 md:h-96">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
            <Dialog.Close className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors">
              <FiX className="w-6 h-6" />
            </Dialog.Close>
          </div>

          {/* Conteúdo */}
          <div className="p-6 md:p-8">
            <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">
              {project.title}
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              {project.longDescription || project.description}
            </p>

            {/* Tecnologias */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
                Tecnologias
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Aprendizados */}
            {project.learnings && project.learnings.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
                  Aprendizados
                </h3>
                <ul className="space-y-2">
                  {project.learnings.map((learning, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-gray-600 dark:text-gray-400"
                    >
                      <span className="text-blue-500 mt-1">•</span>
                      <span>{learning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Links */}
            <div className="flex gap-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
                >
                  <FiGithub className="w-5 h-5" />
                  Ver no GitHub
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <FiExternalLink className="w-5 h-5" />
                  Ver Demo
                </a>
              )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export { ProjectModal };
```

## ✅ Checklist de Conclusão

- [ ] Dados de projetos organizados
- [ ] ProjectCard component criado
- [ ] Seção Projects implementada
- [ ] Modal de detalhes funcional
- [ ] Imagens dos projetos otimizadas
- [ ] Links para GitHub/Demo funcionando
- [ ] Animações de entrada implementadas
- [ ] Filtros funcionais (se implementados)
- [ ] Responsividade verificada
- [ ] Performance otimizada

## 🧪 Testes de Validação

1. Testar abertura/fechamento do modal
2. Verificar links externos
3. Validar responsividade do grid
4. Testar animações de hover
5. Verificar otimização de imagens
6. Validar acessibilidade do modal

## 📝 Notas Importantes

- **Imagens:** Preparar screenshots de qualidade dos projetos
- **Links:** Verificar se todos os links estão funcionando
- **Modal:** Garantir navegação por teclado (ESC para fechar)
- **Performance:** Lazy loading de imagens do modal

## 🚀 Próxima Fase

Após concluir esta fase, seguir para **FASE 6: Educação e Contato**
