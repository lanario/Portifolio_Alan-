/**
 * Utilitários para navegação e scroll
 */

/**
 * Faz scroll suave até uma seção específica
 * @param sectionId - ID da seção (sem o #)
 * @param offset - Offset adicional em pixels (padrão: altura do header)
 */
export function scrollToSection(sectionId: string, offset: number = 80): void {
  const element = document.getElementById(sectionId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
}

/**
 * Identifica qual seção está atualmente visível na viewport
 * @param sections - Array de IDs de seções
 * @param offset - Offset para considerar seção ativa
 * @returns ID da seção ativa ou null
 */
export function getActiveSection(
  sections: string[],
  offset: number = 100
): string | null {
  const scrollPosition = window.scrollY + offset;

  for (let i = sections.length - 1; i >= 0; i--) {
    const section = document.getElementById(sections[i]);
    if (section) {
      const sectionTop = section.offsetTop;
      if (scrollPosition >= sectionTop) {
        return sections[i];
      }
    }
  }

  return sections[0] || null;
}

/**
 * Configura um observador de scroll para detectar seções ativas
 * @param sections - Array de IDs de seções
 * @param callback - Callback chamado quando a seção ativa muda
 * @param offset - Offset para considerar seção ativa
 * @returns Função para limpar o observador
 */
export function setupScrollSpy(
  sections: string[],
  callback: (activeSection: string | null) => void,
  offset: number = 100
): () => void {
  function handleScroll() {
    const active = getActiveSection(sections, offset);
    callback(active);
  }

  // Throttle para performance
  let ticking = false;
  function throttledScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', throttledScroll, { passive: true });
  handleScroll(); // Chamar imediatamente para definir seção inicial

  return () => {
    window.removeEventListener('scroll', throttledScroll);
  };
}
