import type { MetadataRoute } from 'next';
import { projetos } from '@/lib/data/projetos';

const SITE_URL = 'https://www.triumworks.com.br';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: 'weekly', priority: 1 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projetos.map((p) => ({
    url: `${SITE_URL}/projetos/${p.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes];
}
