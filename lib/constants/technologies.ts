import { Technology } from '@/types';

/**
 * Lista de tecnologias organizadas por categoria
 */
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

/**
 * Categorias de tecnologias
 */
export const technologyCategories = [
  { id: 'all', label: 'Todas' },
  { id: 'language', label: 'Linguagens' },
  { id: 'framework', label: 'Frameworks' },
  { id: 'style', label: 'Estilos' },
  { id: 'database', label: 'Database & Tools' },
  { id: 'test', label: 'Testes' },
] as const;
