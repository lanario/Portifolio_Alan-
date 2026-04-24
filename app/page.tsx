import { MainLayout } from '@/components/layout/MainLayout';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Technologies } from '@/components/sections/Technologies';
import { Projects } from '@/components/sections/Projects';
import { StatsBar } from '@/components/sections/StatsBar';
import { CTA } from '@/components/sections/CTA';
import { Contact } from '@/components/sections/Contact';

function HomePage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <Hero />

      {/* Sobre Mim */}
      <About />

      {/* Projetos */}
      <Projects />

      {/* Tecnologias */}
      <Technologies />

      {/* Métricas */}
      <StatsBar />

      {/* CTA */}
      <CTA />

      {/* Contato */}
      <Contact />
    </MainLayout>
  );
}

export default HomePage;
