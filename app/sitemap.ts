import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';

const SITE_URL = 'https://www.triumworks.com.br';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/sobre`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/projetos`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/contato`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${SITE_URL}/projetos/${p.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes];
}
