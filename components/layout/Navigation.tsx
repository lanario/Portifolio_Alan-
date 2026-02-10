'use client';

import Link from 'next/link';
import { navigationSections } from '@/lib/constants';
import { scrollToSection } from '@/lib/utils/scroll';
import { useActiveSection } from '@/lib/hooks/useActiveSection';
import { cn } from '@/lib/utils';

interface NavigationProps {
  onLinkClick?: () => void;
  className?: string;
}

function Navigation({ onLinkClick, className }: NavigationProps) {
  const activeSection = useActiveSection();

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) {
    e.preventDefault();
    scrollToSection(sectionId);
    onLinkClick?.();
  }

  return (
    <nav className={cn('flex items-center gap-6', className)}>
      {navigationSections.map((section) => {
        const isActive = activeSection === section.id;
        return (
          <Link
            key={section.id}
            href={`#${section.id}`}
            onClick={(e) => handleClick(e, section.id)}
            className={cn(
              'text-sm font-medium transition-colors relative',
              isActive
                ? 'text-primary-400'
                : 'text-white/90 hover:text-white'
            )}
          >
            {section.label}
            {isActive && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-400" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}

export { Navigation };
