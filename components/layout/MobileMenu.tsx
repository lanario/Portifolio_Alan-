'use client';

import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { Navigation } from './Navigation';
import { developerData, siteConfig } from '@/lib/constants';
import { scrollToSection } from '@/lib/utils/scroll';

interface MobileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function MobileMenu({ open, onOpenChange }: MobileMenuProps) {
  function handleLinkClick() {
    onOpenChange(false);
  }

  function handleLogoClick() {
    scrollToSection('hero');
    onOpenChange(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <AnimatePresence>
          {open && (
            <>
              {/* Overlay */}
              <Dialog.Overlay asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                />
              </Dialog.Overlay>

              {/* Menu */}
              <Dialog.Content asChild>
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="fixed top-0 right-0 bottom-0 w-80 bg-gray-900 shadow-xl z-50 flex flex-col"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between gap-3 p-6 border-b border-gray-800">
                    <button
                      type="button"
                      onClick={handleLogoClick}
                      className="flex min-w-0 items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                      aria-label="Ir para o início"
                    >
                      <Image
                        src={siteConfig.logoPath}
                        alt={`${developerData.name} — logo`}
                        width={150}
                        height={38}
                        className="h-8 w-auto max-w-[150px] object-contain object-left"
                      />
                    </button>
                    <Dialog.Close asChild>
                      <button
                        className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                        aria-label="Fechar menu"
                      >
                        <FiX className="w-6 h-6 text-gray-400" />
                      </button>
                    </Dialog.Close>
                  </div>

                  {/* Navigation */}
                  <div className="flex-1 overflow-y-auto p-6">
                    <Navigation
                      onLinkClick={handleLinkClick}
                      className="flex-col items-start gap-4"
                    />
                  </div>
                </motion.div>
              </Dialog.Content>
            </>
          )}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export { MobileMenu };
