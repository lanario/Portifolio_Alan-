'use client';

import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiReact,
  SiNextdotjs,
  SiFastapi,
  SiDjango,
  SiFlask,
  SiTailwindcss,
  SiChakraui,
  SiPostgresql,
  SiSupabase,
  SiGit,
  SiDocker,
  SiPytest,
  SiJest,
} from 'react-icons/si';
import { FaCode } from 'react-icons/fa';

interface TechnologyIconProps {
  name: string;
  color?: string;
  size?: number;
}

type IconComponent = React.ComponentType<{ size?: number; className?: string }>;

const iconMap: Record<string, IconComponent> = {
  Python: SiPython,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  HTML5: SiHtml5,
  CSS3: SiCss3,
  React: SiReact,
  'Next.js': SiNextdotjs,
  FastAPI: SiFastapi,
  Django: SiDjango,
  Flask: SiFlask,
  TailwindCSS: SiTailwindcss,
  'Chakra UI': SiChakraui,
  PostgreSQL: SiPostgresql,
  Supabase: SiSupabase,
  Git: SiGit,
  Docker: SiDocker,
  Pytest: SiPytest,
  Jest: SiJest,
};

function TechnologyIcon({ name, color, size = 48 }: TechnologyIconProps) {
  const IconComponent = iconMap[name] || FaCode;
  const iconColor = color || '#6B7280';

  return (
    <div
      className="transition-colors duration-300 flex items-center justify-center"
      style={{ color: iconColor }}
    >
      <IconComponent size={size} />
    </div>
  );
}

export { TechnologyIcon };
