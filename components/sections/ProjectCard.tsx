'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiExternalLink } from 'react-icons/fi';
import { Project } from '@/types';
import { Card, CardContent } from '@/components/ui/Card';

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenModal?: (project: Project) => void;
}

function ProjectCard({ project, index, onOpenModal }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '0px' }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: 'easeOut',
      }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Card variant="elevated" hover className="h-full flex flex-col">
        {/* Imagem do Projeto */}
        <div className="relative h-48 w-full overflow-hidden rounded-t-xl bg-gray-800">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center">
            <span className="text-white text-4xl font-bold opacity-50">
              {project.title.charAt(0)}
            </span>
          </div>
          {project.image && (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={(e) => {
                // Se a imagem falhar, esconde o componente Image
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          )}
          {/* Overlay escuro para melhor legibilidade do badge */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          {project.featured && (
            <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-semibold z-10">
              Destaque
            </div>
          )}
        </div>

        <CardContent className="flex-1 flex flex-col">
          {/* Título e Categoria */}
          <div className="mb-3">
            <h3 className="text-xl font-bold mb-2 text-white">
              {project.title}
            </h3>
            <span className="inline-block px-2 py-1 bg-primary-900 text-primary-200 text-xs rounded">
              {project.category.toUpperCase()}
            </span>
          </div>

          {/* Descrição */}
          <p className="text-gray-300 mb-4 line-clamp-3 flex-1">
            {project.description}
          </p>

          {/* Tecnologias */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-1 bg-gray-700 text-gray-400 text-xs rounded">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          {/* Botões de Ação */}
          <div className="flex gap-2">
            <button
              onClick={() => onOpenModal?.(project)}
              className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium text-sm"
            >
              Ver Detalhes
            </button>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-colors"
                aria-label="Ver projeto"
              >
                <FiExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export { ProjectCard };
