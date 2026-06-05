import { Hero } from '@/components/sections/Hero';
import { Portfolio } from '@/components/sections/Portfolio';
import { Sobre } from '@/components/sections/Sobre';
import { FAQ } from '@/components/sections/FAQ';
import { Contato } from '@/components/sections/Contato';
import { Footer } from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Portfolio />
      <Sobre />
      <FAQ />
      <Contato />
      <Footer />
    </>
  );
}
