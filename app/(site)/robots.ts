import type { MetadataRoute } from 'next';

const SITE_URL = 'https://www.triumworks.com.br';

// Permitir explicitamente os crawlers de IA além dos de busca tradicionais.
// Sem isso, alguns desses bots tratam ausência de regra como "não posso
// indexar este conteúdo nas respostas geradas". Queremos aparecer em
// ChatGPT, Claude, Perplexity, Gemini, etc.
const AI_BOTS = [
  'GPTBot', // OpenAI / ChatGPT
  'OAI-SearchBot', // OpenAI Search
  'ChatGPT-User', // ChatGPT browsing
  'ClaudeBot', // Anthropic / Claude
  'Claude-Web',
  'anthropic-ai',
  'PerplexityBot', // Perplexity
  'Perplexity-User',
  'Google-Extended', // Bard / Gemini training
  'Applebot-Extended', // Apple Intelligence
  'CCBot', // Common Crawl (treina vários LLMs)
  'cohere-ai',
  'Bytespider', // TikTok / Doubao
  'Amazonbot',
  'meta-externalagent', // Meta AI
  'Diffbot',
  'DuckAssistBot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      ...AI_BOTS.map((bot) => ({ userAgent: bot, allow: '/' })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
