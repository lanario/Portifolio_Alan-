/**
 * Dados pessoais do desenvolvedor
 */
export const developerData = {
    name: 'Alan Barros',
    title: 'Desenvolvedor FullStack',
    email: 'alanbarros.dev15@gmail.com',
    phone: '+55 (21) 96641-8522',
    location: 'Nova Iguaçu, RJ -Brasil',
    github: 'https://github.com/lanario',
    linkedin: 'https://linkedin.com/in/alan-barrosdev15',
    birthDate: '07/10/1999',
} as const;

/**
 * Links de redes sociais
 */
export const socialLinks = {
    github: 'https://github.com/lanario',
    linkedin: 'https://www.linkedin.com/in/alan-barrosdev15/',
    instagram: 'https://instagram.com/alan.barr0s',
    email: `mailto:${developerData.email}?subject=Contato%20do%20Portfólio`,
    whatsapp: `https://wa.me/5521966418522`,
    phone: `tel:${developerData.phone.replace(/\s/g, '')}`,
} as const;

/**
 * Seções de navegação
 */
export const navigationSections = [
    { id: 'hero', label: 'Início' },
    { id: 'sobre', label: 'Sobre' },
    { id: 'tecnologias', label: 'Tecnologias' },
    { id: 'projetos', label: 'Projetos' },
    { id: 'experiencia', label: 'Experiência' },
    { id: 'educacao', label: 'Educação' },
    { id: 'contato', label: 'Contato' },
] as const;

/**
 * Configurações globais
 */
export const siteConfig = {
    title: `${developerData.name} - ${developerData.title}`,
    description: 'Portfólio de Alan da Silva de Barros - Desenvolvedor FullStack especializado em React, Next.js, TypeScript e Python',
    url: 'https://alanbarros.dev', // Atualizar quando tiver domínio
    ogImage: '/og-image.jpg',
} as const;
