'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { Navigation } from './Navigation';
import { developerData } from '@/lib/constants';

interface MobileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function MobileMenu({ open, onOpenChange }: MobileMenuProps) {
  function handleLinkClick() {
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
                  <div className="flex items-center justify-between p-6 border-b border-gray-800">
                    <h2 className="text-lg font-bold text-white">
                      {developerData.name.split(' ')[0]}
                    </h2>
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
