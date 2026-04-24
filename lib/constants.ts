/**
 * Dados pessoais do desenvolvedor
 */
export const developerData = {
    name: 'Alan Barros',
    title: 'Desenvolvedor FullStack',
    email: 'alanbarros.dev15@gmail.com',
    phone: '+55 21 99291-3627',
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
    whatsapp: `https://wa.me/${developerData.phone.replace(/\D/g, '')}`,
    phone: `tel:+${developerData.phone.replace(/\D/g, '')}`,
} as const;

/**
 * Seções de navegação
 */
export const navigationSections = [
    { id: 'hero', label: 'Início' },
    { id: 'sobre', label: 'Sobre' },
    { id: 'projetos', label: 'Projetos' },
    { id: 'tecnologias', label: 'Tecnologias' },
    { id: 'contato', label: 'Contato' },
] as const;

/**
 * Configurações globais
 */
export const siteConfig = {
    title: `${developerData.name} - ${developerData.title}`,
    description:
        'Alan Barros — desenvolvimento de sites, sistemas e integrações sob medida para empresas que querem presença digital profissional, processos mais claros e uma marca mais forte.',
    url: 'https://alanbarros.dev', // Atualizar quando tiver domínio
    ogImage: '/og-image.jpg',
    /** Logo principal (arquivo em /public/images/) */
    logoPath: '/images/logo_alan_1.png',
} as const;
