import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar plugin uma vez
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Configura animações de entrada ao fazer scroll
 * @param selector - Seletor CSS dos elementos a animar
 * @param options - Opções de animação
 */
export function setupScrollAnimations(
  selector: string,
  options: {
    start?: string;
    duration?: number;
    y?: number;
  } = {}
) {
  const {
    start = 'top 80%',
    duration = 1,
    y = 50,
  } = options;

  const elements = document.querySelectorAll(selector);

  elements.forEach((element) => {
    gsap.fromTo(
      element,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start,
          toggleActions: 'play none none reverse',
        },
      }
    );
  });
}

/**
 * Animação com stagger para listas
 * @param container - Container dos elementos
 * @param childSelector - Seletor dos filhos
 * @param options - Opções de animação
 */
export function setupStaggerAnimation(
  container: HTMLElement | null,
  childSelector: string,
  options: {
    start?: string;
    duration?: number;
    stagger?: number;
    y?: number;
  } = {}
) {
  if (!container) return;

  const {
    start = 'top 80%',
    duration = 0.6,
    stagger = 0.1,
    y = 30,
  } = options;

  const children = container.querySelectorAll(childSelector);

  gsap.fromTo(
    Array.from(children),
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container,
        start,
      },
    }
  );
}

/**
 * Efeito parallax sutil
 * @param element - Elemento a aplicar parallax
 * @param speed - Velocidade do parallax (0-1)
 */
export function setupParallax(
  element: HTMLElement | null,
  speed = 0.5
) {
  if (!element) return;

  gsap.to(element, {
    yPercent: -50 * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
}
