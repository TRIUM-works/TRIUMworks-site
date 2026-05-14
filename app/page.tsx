import Hero from '@/components/Hero';
import ProjectShowcase from '@/components/ProjectShowcase';
import ContactSection from '@/components/ContactSection';

const SITE_URL = 'https://www.triumworks.com.br';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#business`,
  name: 'TRIUM',
  description:
    'Estúdio criativo de Volta Redonda, RJ. Criação de sites profissionais, rápidos e estratégicos para empresas de Volta Redonda e de todo o Brasil.',
  url: SITE_URL,
  image: `${SITE_URL}/logo/logo.png`,
  logo: `${SITE_URL}/logo/logo.png`,
  telephone: '+55 85 98125-4006',
  email: 'contato@triumtech.com.br',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Volta Redonda',
    addressRegion: 'RJ',
    addressCountry: 'BR',
  },
  areaServed: [
    { '@type': 'City', name: 'Volta Redonda' },
    { '@type': 'Country', name: 'Brasil' },
  ],
  sameAs: ['https://www.instagram.com/triumtech_/'],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <ProjectShowcase />
      <ContactSection />
    </>
  );
}
