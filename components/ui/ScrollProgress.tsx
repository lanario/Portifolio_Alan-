'use client';

import { useScroll, motion } from 'framer-motion';

/**
 * Componente que mostra o progresso do scroll na parte superior da página
 */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary-600 dark:bg-primary-400 z-50 origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

export { ScrollProgress };
