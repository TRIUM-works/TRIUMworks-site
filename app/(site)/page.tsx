import { Hero } from '@/components/sections/Hero';
import { Projetos } from '@/components/sections/Projetos';
import { ProjetosIndividuais } from '@/components/sections/ProjetosIndividuais';
import { Sobre } from '@/components/sections/Sobre';
import { Contato } from '@/components/sections/Contato';
import { Footer } from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Projetos />
      <ProjetosIndividuais />
      <Sobre />
      <Contato />
      <Footer />
    </>
  );
}
