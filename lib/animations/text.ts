import { gsap } from 'gsap';

/**
 * Revela texto com animação fade-in e movimento vertical
 * @param element - Elemento HTML a ser animado
 * @param delay - Delay em segundos antes de iniciar
 */
export function animateTextReveal(element: HTMLElement | null, delay = 0) {
  if (!element) return;

  gsap.fromTo(
    element,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay,
      ease: 'power3.out',
    }
  );
}

/**
 * Animação de fade-in sequencial para múltiplos elementos
 * @param elements - Array de elementos HTML
 * @param stagger - Intervalo entre cada animação
 */
export function animateTextFadeIn(
  elements: HTMLElement[],
  stagger = 0.1
) {
  gsap.fromTo(
    elements,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger,
      ease: 'power3.out',
    }
  );
}

/**
 * Efeito de digitação (typing effect)
 * @param element - Elemento HTML onde o texto será exibido
 * @param text - Texto a ser digitado
 * @param speed - Velocidade de digitação (ms por caractere)
 */
export function animateTypingEffect(
  element: HTMLElement | null,
  text: string,
  speed = 50
) {
  if (!element) return;

  element.textContent = '';
  let index = 0;

  function type() {
    if (!element) return;
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
      setTimeout(type, speed);
    }
  }

  type();
}
