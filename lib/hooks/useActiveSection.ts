'use client';

import { useEffect, useState } from 'react';
import { setupScrollSpy } from '@/lib/utils/scroll';
import { navigationSections } from '@/lib/constants';

/**
 * Hook para detectar a seção ativa durante o scroll
 * @returns ID da seção ativa
 */
export function useActiveSection(): string | null {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const sectionIds = navigationSections.map((section) => section.id);
    const cleanup = setupScrollSpy(sectionIds, setActiveSection);

    return cleanup;
  }, []);

  return activeSection;
}
