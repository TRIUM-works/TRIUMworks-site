import { Hero } from '@/components/sections/Hero';
import { Projetos } from '@/components/sections/Projetos';
import { Contato } from '@/components/sections/Contato';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Projetos />
      <Contato />
    </>
  );
}
