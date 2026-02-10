import { MainLayout } from '@/components/layout/MainLayout';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Technologies } from '@/components/sections/Technologies';
import { Projects } from '@/components/sections/Projects';
import { Education } from '@/components/sections/Education';
import { Experience } from '@/components/sections/Experience';
import { Contact } from '@/components/sections/Contact';

function HomePage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <Hero />

      {/* Sobre Mim */}
      <About />

      {/* Tecnologias */}
      <Technologies />

      {/* Projetos */}
      <Projects />

      {/* Experiência Profissional */}
      <Experience />

      {/* Educação */}
      <Education />

      {/* Contato */}
      <Contact />
    </MainLayout>
  );
}

export default HomePage;
