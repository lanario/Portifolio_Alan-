'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { projects } from '@/lib/constants/projects';
import { Project } from '@/types';

function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  function handleOpenModal(project: Project) {
    setSelectedProject(project);
  }

  function handleCloseModal() {
    setSelectedProject(null);
  }

  return (
    <section id="projetos" className="py-20 bg-gray-900 min-h-[400px]">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Projetos
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Alguns dos projetos que desenvolvi, cada um com seu próprio desafio e aprendizado único.
          </p>
        </div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onOpenModal={handleOpenModal}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">Nenhum projeto encontrado.</p>
          </div>
        )}

        {/* Modal de Detalhes */}
        <ProjectModal project={selectedProject} onClose={handleCloseModal} />
      </Container>
    </section>
  );
}

export { Projects };
