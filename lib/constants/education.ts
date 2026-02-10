/**
 * Dados de educação e formação acadêmica
 */

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  description?: string;
  location: string;
  icon?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  icon?: string;
}

export const education: Education[] = [
  {
    id: 'engenharia-software',
    institution: 'Faculdade Estácio',
    degree: 'Engenharia de Software',
    field: 'Engenharia de Software',
    startDate: '06/2022',
    endDate: '06/2026',
    description: 'Graduação em Engenharia de Software com foco em desenvolvimento de software, arquitetura de sistemas, gestão de projetos e metodologias ágeis.',
    location: 'Rio de Janeiro, Brasil',
  },
  {
    id: 'tecnico-eletronica',
    institution: 'FAETEC (João Luis do Nascimento)',
    degree: 'Técnico em Eletrônica',
    field: 'Eletrônica',
    startDate: '2015',
    endDate: '2017',
    description: 'Curso técnico em Eletrônica com formação em circuitos eletrônicos, manutenção de equipamentos e fundamentos de eletrônica digital e analógica.',
    location: 'Rio de Janeiro, Brasil',
  },
];

export const certifications: Certification[] = [
  // Adicionar certificações quando disponíveis
];
