# 📋 Planejamento Geral - Site Portfólio

## 👤 Dados do Desenvolvedor

**Nome:** Alan da Silva de Barros  
**Título:** Desenvolvedor FullStack  
**Email:** alanbarros.dev15@gmail.com  
**Telefone:** +55 (21) 96641-8522  
**Localização:** Rio de Janeiro, Brasil  
**GitHub:** github.com/lanario  
**LinkedIn:** linkedin.com/in/alan-barrosdev15  
**Data de Nascimento:** 07/10/1999

## 🎯 Objetivo do Projeto

Criar um site portfólio moderno, performático e visualmente impactante que apresente:
- Perfil profissional e habilidades técnicas
- Projetos desenvolvidos com detalhes e tecnologias utilizadas
- Experiência e educação
- Formas de contato e redes sociais
- Animações suaves e interações fluidas

## 🛠️ Stack Tecnológica

- **Framework:** Next.js 14 (App Router)
- **Linguagem:** TypeScript (tipagem rigorosa, sem `any`)
- **UI Library:** React 18+
- **Estilização:** TailwindCSS
- **Animações:** Framer Motion + GSAP + ScrollTrigger
- **Componentes:** Radix UI
- **Otimização:** Sharp (processamento de imagens)

## 📐 Arquitetura do Projeto

```
site-portfolio/
├── app/                    # Next.js App Router
│   ├── (routes)/          # Rotas agrupadas
│   ├── api/               # API Routes (se necessário)
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Home page
│   └── globals.css        # Estilos globais
├── components/            # Componentes React
│   ├── ui/               # Componentes base (Radix UI)
│   ├── sections/         # Seções da página
│   ├── animations/       # Componentes de animação
│   └── layout/           # Componentes de layout
├── lib/                   # Utilitários e configurações
│   ├── utils.ts          # Funções utilitárias
│   ├── animations.ts     # Configurações GSAP/Framer
│   └── constants.ts      # Constantes do projeto
├── public/               # Assets estáticos
│   ├── images/          # Imagens otimizadas
│   └── icons/           # Ícones SVG
├── types/                # Definições TypeScript
└── .docs/                # Documentação do projeto
```

## 🎨 Design System

### Cores
- **Primária:** Azul/Tech (a definir)
- **Secundária:** Gradientes modernos
- **Background:** Dark mode / Light mode (toggle)
- **Texto:** Alto contraste para acessibilidade

### Tipografia
- **Headings:** Font moderna e tech (ex: Inter, Poppins)
- **Body:** Font legível e clean
- **Code:** Font monospace para snippets

### Espaçamento
- Sistema de espaçamento consistente (TailwindCSS)
- Grid responsivo mobile-first

## 📱 Seções do Site

1. **Hero Section** - Apresentação impactante com animação
2. **Sobre Mim** - História, paixões e objetivos
3. **Tecnologias** - Stack técnica com ícones animados
4. **Projetos** - Grid de cards com detalhes dos projetos
5. **Educação** - Timeline de formação
6. **Contato** - Formulário e redes sociais
7. **Footer** - Links e informações adicionais

## ⚡ Performance Targets

- **Lighthouse Score:** 90+ em todas as métricas
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3s
- **Images:** WebP/AVIF com lazy loading
- **Code Splitting:** Automático via Next.js
- **Bundle Size:** Otimizado e minificado

## ♿ Acessibilidade

- **WCAG 2.1 AA** compliance
- Navegação por teclado
- Screen reader friendly
- Contraste adequado
- Alt texts em todas as imagens

## 📦 Dependências Principais

```json
{
  "next": "^14.0.0",
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "typescript": "^5.0.0",
  "tailwindcss": "^3.4.0",
  "framer-motion": "^10.16.0",
  "gsap": "^3.12.0",
  "@radix-ui/react-*": "latest",
  "sharp": "^0.32.0",
  "@next/font": "latest"
}
```

## 🚀 Estratégia de Deploy

- **Plataforma:** Vercel (otimizado para Next.js)
- **CDN:** Automático via Vercel
- **Analytics:** Vercel Analytics (opcional)
- **Domain:** Configurar domínio personalizado

## 📝 Convenções de Código

- **Funções:** Priorizar `function` ao invés de `const` para componentes e funções principais
- **Consts:** Usar apenas quando necessário (arrow functions em métodos de array, closures específicas)
- **Nomenclatura:** PascalCase para componentes, camelCase para funções/variáveis
- **Imports:** Organizados por tipo (React, Next.js, libs, componentes, utils)
- **Comentários:** JSDoc para funções complexas

## ✅ Checklist de Qualidade

- [ ] TypeScript sem erros
- [ ] ESLint configurado e sem warnings
- [ ] Responsivo em todos os dispositivos
- [ ] Animações performáticas (60fps)
- [ ] SEO otimizado (meta tags, sitemap)
- [ ] Testes básicos (opcional)
- [ ] Documentação de componentes
- [ ] Performance otimizada
