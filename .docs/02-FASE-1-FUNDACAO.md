# 🏗️ FASE 1: Fundação e Configuração Inicial

## 📅 Duração Estimada: 2-3 dias

## 🎯 Objetivos

- Configurar o ambiente de desenvolvimento
- Estruturar o projeto Next.js 14 com App Router
- Configurar TypeScript, TailwindCSS e ferramentas essenciais
- Criar estrutura base de pastas e arquivos
- Configurar ESLint e Prettier

## 📋 Tarefas Detalhadas

### 1. Inicialização do Projeto

#### 1.1 Criar projeto Next.js
```bash
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir
```

#### 1.2 Instalar dependências principais
```bash
npm install framer-motion gsap @radix-ui/react-dialog @radix-ui/react-tabs @radix-ui/react-tooltip @radix-ui/react-accordion sharp
npm install -D @types/node @types/react @types/react-dom
```

### 2. Estrutura de Pastas

Criar a seguinte estrutura:

```
app/
├── layout.tsx
├── page.tsx
├── globals.css
└── (main)/
    ├── layout.tsx
    └── page.tsx

components/
├── ui/
│   ├── Button.tsx
│   ├── Card.tsx
│   └── Container.tsx
├── layout/
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── Navigation.tsx
└── sections/
    └── (vazio por enquanto)

lib/
├── utils.ts
├── constants.ts
└── animations.ts

types/
└── index.ts

public/
├── images/
└── icons/
```

### 3. Configurações

#### 3.1 TypeScript (`tsconfig.json`)
- Configurar paths aliases
- Habilitar strict mode
- Configurar imports absolutos

#### 3.2 TailwindCSS (`tailwind.config.ts`)
- Configurar tema customizado
- Definir cores do design system
- Configurar fontes
- Adicionar plugins necessários

#### 3.3 Next.js (`next.config.js`)
- Configurar Sharp para otimização de imagens
- Configurar domínios de imagens (se necessário)
- Configurar headers de segurança

#### 3.4 ESLint (`.eslintrc.json`)
- Configurar regras TypeScript
- Integrar com Next.js
- Configurar regras de importação

### 4. Componentes Base

#### 4.1 Layout Principal (`app/layout.tsx`)
- Metadata básica
- Fonts do Next.js
- Providers globais (se necessário)
- Estrutura HTML base

#### 4.2 Container Component (`components/ui/Container.tsx`)
- Wrapper responsivo
- Padding e max-width consistentes
- Suporte a variantes

#### 4.3 Button Component (`components/ui/Button.tsx`)
- Baseado em Radix UI (se necessário)
- Variantes (primary, secondary, outline)
- Estados (hover, active, disabled)
- Tamanhos (sm, md, lg)

#### 4.4 Card Component (`components/ui/Card.tsx`)
- Card base reutilizável
- Suporte a hover effects
- Variantes de estilo

### 5. Utilitários Base

#### 5.1 `lib/utils.ts`
- Função `cn()` para merge de classes (clsx + tailwind-merge)
- Funções de formatação
- Helpers gerais

#### 5.2 `lib/constants.ts`
- Dados do desenvolvedor
- Links de redes sociais
- Configurações globais
- Informações de contato

#### 5.3 `lib/animations.ts`
- Configurações padrão do Framer Motion
- Configurações GSAP
- Variantes de animação reutilizáveis

### 6. Tipos TypeScript

#### 6.1 `types/index.ts`
- Tipos para projetos
- Tipos para tecnologias
- Tipos para seções
- Tipos para animações

### 7. Estilos Globais

#### 7.1 `app/globals.css`
- Reset CSS básico
- Variáveis CSS customizadas
- Estilos de scrollbar
- Animações base
- Dark mode variables (preparação)

### 8. Header e Footer Básicos

#### 8.1 `components/layout/Header.tsx`
- Logo/Nome
- Navegação básica (preparação)
- Toggle de tema (preparação)

#### 8.2 `components/layout/Footer.tsx`
- Links de redes sociais
- Copyright
- Informações básicas

### 9. Página Inicial Básica

#### 9.1 `app/page.tsx`
- Estrutura básica
- Importação de componentes
- Layout responsivo inicial

## ✅ Checklist de Conclusão

- [ ] Projeto Next.js criado e funcionando
- [ ] Todas as dependências instaladas
- [ ] Estrutura de pastas criada
- [ ] TypeScript configurado sem erros
- [ ] TailwindCSS funcionando
- [ ] Componentes base criados
- [ ] Utilitários básicos implementados
- [ ] Header e Footer renderizando
- [ ] Página inicial carregando sem erros
- [ ] ESLint configurado
- [ ] Git inicializado (opcional)

## 🧪 Testes de Validação

1. Executar `npm run dev` e verificar se o servidor inicia
2. Acessar `http://localhost:3000` e verificar renderização
3. Verificar console do navegador (sem erros)
4. Verificar TypeScript compilation (`npm run build`)
5. Testar responsividade básica

## 📝 Notas Importantes

- **Funções vs Consts:** Nesta fase, todos os componentes devem usar `function` ao invés de `const`
- **TypeScript:** Não usar `any`, sempre tipar corretamente
- **TailwindCSS:** Usar classes utilitárias, evitar CSS customizado quando possível
- **Performance:** Já considerar otimizações desde o início

## 🚀 Próxima Fase

Após concluir esta fase, seguir para **FASE 2: Estrutura de Layout e Navegação**
