'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FiX, FiGithub, FiExternalLink } from 'react-icons/fi';
import { Project } from '@/types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <Dialog.Root open={!!project} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <AnimatePresence>
          {project && (
            <>
              {/* Overlay */}
              <Dialog.Overlay asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[55]"
                />
              </Dialog.Overlay>

              {/* Modal Content */}
              <Dialog.Content asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  className="fixed top-[10%] left-1/2 transform -translate-x-1/2 w-full max-w-4xl max-h-[85vh] bg-gray-900 text-gray-100 rounded-xl shadow-2xl z-[60] overflow-hidden flex flex-col mx-4"
                >
                  {/* Imagem do Projeto */}
                  <div className="relative h-48 md:h-64 w-full overflow-hidden bg-gray-800 flex-shrink-0">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 80vw"
                        priority
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center">
                        <span className="text-white text-6xl font-bold opacity-30">
                          {project.title.charAt(0)}
                        </span>
                      </div>
                    )}
                    {/* Overlay escuro para melhor legibilidade */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    
                    {/* Botão Fechar */}
                    <Dialog.Close asChild>
                      <button
                        className="absolute top-4 right-4 p-2 bg-gray-900/80 hover:bg-gray-800 rounded-full transition-colors z-10"
                        aria-label="Fechar"
                      >
                        <FiX className="w-6 h-6 text-white" />
                      </button>
                    </Dialog.Close>

                    {/* Badge Featured */}
                    {project.featured && (
                      <div className="absolute top-4 left-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold z-10">
                        ⭐ Destaque
                      </div>
                    )}
                  </div>

                  {/* Conteúdo */}
                  <div className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
                    {/* Título */}
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                      {project.title}
                    </h2>

                    {/* Categoria */}
                    <span className="inline-block px-3 py-1 bg-primary-600 text-white text-sm rounded-full mb-6">
                      {project.category.toUpperCase()}
                    </span>

                    {/* Descrição Longa */}
                    <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                      {project.longDescription || project.description}
                    </p>

                    {/* Tecnologias */}
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold mb-3 text-white">
                        Tecnologias Utilizadas
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1.5 bg-gray-800 text-gray-200 rounded-lg text-sm border border-gray-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Aprendizados */}
                    {project.learnings && project.learnings.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-3 text-white">
                          Aprendizados
                        </h3>
                        <ul className="space-y-2">
                          {project.learnings.map((learning, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-3 text-gray-300"
                            >
                              <span className="text-primary-400 mt-1.5">▸</span>
                              <span>{learning}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Links */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-800">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                        >
                          <FiExternalLink className="w-5 h-5" />
                          Ver Projeto ao Vivo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium border border-gray-700"
                        >
                          <FiGithub className="w-5 h-5" />
                          Ver Código no GitHub
                        </a>
                      )}
                    </div>
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

export { ProjectModal };
