'use client';

import { FaWhatsapp } from 'react-icons/fa';
import { socialLinks } from '@/lib/constants';

const defaultMessage =
  'Olá! Vim pelo seu portfólio e gostaria de conversar sobre um projeto para minha empresa.';

/**
 * Botão fixo do WhatsApp para contato rápido (canto inferior direito).
 */
function WhatsAppFloat() {
  const href = `${socialLinks.whatsapp}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_24px_rgba(37,211,102,0.45)] transition-transform hover:scale-105 hover:shadow-[0_6px_28px_rgba(37,211,102,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
      aria-label="Enviar mensagem no WhatsApp"
    >
      <FaWhatsapp className="h-8 w-8" aria-hidden />
    </a>
  );
}

export { WhatsAppFloat };
