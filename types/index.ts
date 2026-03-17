/**
 * Tipos para projetos
 */
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  category: 'web' | 'mobile' | 'desktop' | 'automation' | 'saas';
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  learnings: string[];
  featured?: boolean;
  date?: string;
}

/**
 * Tipos para tecnologias
 */
export interface Technology {
  name: string;
  category: 'language' | 'framework' | 'style' | 'database' | 'tool' | 'test';
  icon?: string;
  proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  color?: string;
}

/**
 * Tipos para seções
 */
export interface Section {
  id: string;
  label: string;
  component: React.ComponentType;
}

/**
 * Tipos para animações
 */
export interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: string;
}
