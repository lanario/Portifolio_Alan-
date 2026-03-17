/**
 * Dados de experiência profissional
 */

export interface Experience {
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    location: string;
    description: string[];
    technologies: string[];
    type: 'full-time' | 'part-time' | 'freelance' | 'internship';
}

export const experiences: Experience[] = [
    {
        id: 'freelance',
        company: 'Freelancer',
        position: 'Desenvolvedor FullStack',
        startDate: '2022',
        endDate: 'Atual',
        location: 'Rio de Janeiro, Brasil',
        description: [
            'Desenvolvimento de aplicações web modernas com React e Next.js',
            'Criação de sistemas SaaS para gestão financeira',
            'Desenvolvimento de sites institucionais responsivos e otimizados para SEO',
            'Arquitetura de sistemas escaláveis com PostgreSQL e APIs RESTful',
        ],
        technologies: [
            'React',
            'Next.js',
            'TypeScript',
            'PostgreSQL',
            'TailwindCSS',
            'Node.js',
        ],
        type: 'freelance',
    },
];
