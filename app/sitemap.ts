import { projetos } from '@/lib/data/projetos';
import { MetadataRoute } from 'next';

const SITE_URL = 'https://www.triumworks.com.br';

export default function sitemap(): MetadataRoute.Sitemap {
  const projetoUrls = projetos.map((p) => ({
    url: `${SITE_URL}/projetos/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    ...projetoUrls,
  ];
}
