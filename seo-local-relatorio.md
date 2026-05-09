# Relatório de SEO Local — TriumTech

**Foco:** Volta Redonda, RJ e região do Médio Paraíba / Sul Fluminense
**Data:** 2026-05-09

---

## 1. Arquivos alterados

| # | Arquivo | Tipo de mudança |
|---|---------|-----------------|
| 1 | `app/layout.tsx` | `<title>`, `description`, OpenGraph |
| 2 | `app/projetos/page.tsx` | Metadata da rota |
| 3 | `components/Hero.tsx` | Subtítulo da home |
| 4 | `components/Footer.tsx` | Tagline + linha de copyright com cidade |
| 5 | `app/sobre/page.tsx` | Lede do hero + texto da crença #03 |
| 6 | `app/contato/page.tsx` | Descrição do hero + bloco de localização |
| 7 | `components/ContactSection.tsx` | Descrição do CTA da home |

Total: **7 arquivos**.

---

## 2. Antes → Depois

### 2.1 `app/layout.tsx` (metadata global)

**Title — antes:**
> TriumTech — Criação de Sites Profissionais

**Title — depois:**
> TriumTech — Criação de Sites em Volta Redonda, RJ

**Description — antes (115 chars):**
> Design minimalista e performance excepcional. Criamos sites profissionais que transformam negócios e conquistam clientes.

**Description — depois (153 chars):**
> Agência de criação de sites em Volta Redonda, RJ. Desenvolvemos sites profissionais, rápidos e estratégicos para empresas do Médio Paraíba e Sul Fluminense.

**OpenGraph — depois:** título e descrição atualizados para refletir a localização. `locale: 'pt_BR'` adicionado.

---

### 2.2 `app/projetos/page.tsx` (metadata da rota)

**Title — antes:** `Projetos — TriumTech`
**Title — depois:** `Projetos — Sites Desenvolvidos em Volta Redonda, RJ | TriumTech`

**Description — antes:**
> Conheça os projetos desenvolvidos pela TriumTech. Sites de alta performance com design impactante.

**Description — depois (149 chars):**
> Conheça os sites desenvolvidos pela TriumTech, agência de Volta Redonda, RJ. Projetos de alta performance e design impactante para o Médio Paraíba.

---

### 2.3 `components/Hero.tsx` (subtítulo da home)

**Antes:**
> Sites profissionais com performance excepcional e design que conquista clientes. Transformamos ideias em experiências digitais impactantes.

**Depois:**
> Sites profissionais com performance excepcional e design que conquista clientes. Direto de Volta Redonda, RJ, transformamos ideias em experiências digitais para empresas de todo o Médio Paraíba.

---

### 2.4 `components/Footer.tsx`

**Tagline — antes:**
> Criamos experiências digitais que elevam marcas ao próximo nível.

**Tagline — depois:**
> Criação de sites em Volta Redonda, RJ. Elevamos marcas ao próximo nível com experiências digitais sob medida.

**Copyright — antes:**
> © 2026 TriumTech

**Copyright — depois:**
> © 2026 TriumTech — Volta Redonda, RJ · Médio Paraíba

---

### 2.5 `app/sobre/page.tsx`

**Lede do hero — antes:**
> A TriumTech é um estúdio criativo focado em criar sites modernos, rápidos e estratégicos. Sem burocracia, sem excesso de camadas e sem atendimento distante.

**Lede do hero — depois:**
> A TriumTech é um estúdio criativo de Volta Redonda, RJ, focado em criar sites modernos, rápidos e estratégicos para empresas do Médio Paraíba e de todo o Brasil. Sem burocracia, sem excesso de camadas e sem atendimento distante.

**Crença #03 — antes:**
> Não somos uma agência grande, e isso é uma vantagem. Você fala direto com quem está construindo seu projeto.

**Crença #03 — depois:**
> Não somos uma agência grande, e isso é uma vantagem. Estamos no Sul Fluminense e atendemos de perto — você fala direto com quem está construindo seu projeto.

---

### 2.6 `app/contato/page.tsx`

**Descrição do hero — antes:**
> Estamos prontos para transformar sua ideia em realidade. Escolha o canal que preferir e vamos conversar sobre seu projeto.

**Descrição do hero — depois:**
> Estamos em Volta Redonda, RJ, prontos para transformar sua ideia em realidade. Escolha o canal que preferir e vamos conversar sobre seu projeto.

**Bloco de localização — antes:**
> Atendemos todo o Brasil remotamente

**Bloco de localização — depois:**
> Volta Redonda, RJ — atendemos o Médio Paraíba e todo o Brasil

---

### 2.7 `components/ContactSection.tsx`

**Antes:**
> Entre em contato e vamos transformar sua ideia em uma experiência digital incrível.

**Depois:**
> Entre em contato e vamos transformar sua ideia em uma experiência digital incrível para sua empresa em Volta Redonda ou região.

---

## 3. Densidade de palavras-chave por página

| Página | Volta Redonda | Médio Paraíba | Sul Fluminense | Total |
|--------|---------------|---------------|----------------|-------|
| Home (`/`) | 3× (Hero, ContactSection, Footer) | 1× (Hero) | 0 | 4 |
| Projetos (`/projetos`) | 1× (metadata) | 1× (metadata) | 0 | 2 |
| Sobre (`/sobre`) | 1× (lede) + 1× (Footer) | 1× (lede) | 1× (crença #03) | 4 |
| Contato (`/contato`) | 2× (hero + info) + 1× (Footer) | 1× (info) | 0 | 4 |

> Observação: o Footer aparece em todas as páginas e contribui com 1 menção a "Volta Redonda, RJ · Médio Paraíba". Como é um sinal de endereço (não keyword stuffing), não inflaciona a densidade dentro do corpo de cada página.

---

## 4. Palavras-chave aplicadas

| Keyword alvo | Onde aparece (natural) |
|---|---|
| **criação de sites em Volta Redonda** | `layout.tsx` (title + description), Footer tagline |
| **agência de sites em Volta Redonda** | `layout.tsx` description, `/projetos` description |
| **desenvolvimento de sites Volta Redonda, RJ** | `layout.tsx` description (variação) |
| **sites para empresas em Volta Redonda e região** | Hero, ContactSection, Sobre |
| **criação de sites no Sul Fluminense** | `layout.tsx` description, Sobre (crença #03) |
| **sites profissionais para o Médio Paraíba** | Hero, Sobre, `/projetos` description, Contato |

---

## 5. Sugestões adicionais NÃO implementadas

### 5.1 Metadata de páginas client-side (alta prioridade)

`app/sobre/page.tsx` e `app/contato/page.tsx` são `'use client'` e por isso **não exportam `metadata`** próprio. Hoje ambas herdam o `<title>` global. Para corrigir:

- **Opção A (recomendada):** criar `app/sobre/layout.tsx` e `app/contato/layout.tsx` como server components apenas para definir `metadata`, e mover o componente atual para um arquivo `Sobre.client.tsx` / `Contato.client.tsx` importado pelo layout.
- **Opção B:** dividir a página em wrapper server (com `metadata`) + componente client interativo.

Sugestões de title/description prontas:

```ts
// app/sobre/layout.tsx
export const metadata = {
  title: 'Sobre a TriumTech — Estúdio de Sites em Volta Redonda, RJ',
  description: 'Conheça a TriumTech, estúdio de criação de sites em Volta Redonda. Atendimento próximo para empresas do Médio Paraíba e Sul Fluminense.',
};

// app/contato/layout.tsx
export const metadata = {
  title: 'Contato — TriumTech | Sites em Volta Redonda, RJ',
  description: 'Fale com a TriumTech, agência de sites em Volta Redonda, RJ. WhatsApp, Instagram e atendimento para todo o Médio Paraíba.',
};
```

### 5.2 JSON-LD `LocalBusiness` (alta prioridade)

Adicionar no `app/layout.tsx` um `<script type="application/ld+json">` com schema `LocalBusiness` ou `ProfessionalService`. Exemplo de campos:

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "TriumTech",
  "image": "https://triumtech.com.br/images/logo.png",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Volta Redonda",
    "addressRegion": "RJ",
    "addressCountry": "BR"
  },
  "areaServed": ["Volta Redonda", "Barra Mansa", "Resende", "Barra do Piraí", "Pinheiral", "Piraí", "Itatiaia", "Porto Real", "Quatis", "Rio Claro", "Valença"],
  "url": "https://triumtech.com.br",
  "telephone": "+5585981254006",
  "sameAs": ["https://www.instagram.com/triumtech_/"]
}
```

> Importante: o WhatsApp atual usa DDD **85** (Ceará). Verificar se é o número correto, ou se deveria ser DDD **24** (Volta Redonda). Inconsistência prejudica SEO local.

### 5.3 Página dedicada de "Atendimento na região" (média prioridade)

Bloco curto sugerido (não inserido automaticamente):

```html
<!-- SUGESTÃO SEO LOCAL: adicionar esta seção, idealmente em /sobre ou em uma nova /regiao -->
<section className="regiao-atendida">
  <h2>Sites para empresas em Volta Redonda e Médio Paraíba</h2>
  <p>
    Da nossa base em Volta Redonda, atendemos toda a região do Sul Fluminense:
    Barra Mansa, Resende, Barra do Piraí, Pinheiral, Piraí, Itatiaia, Porto Real,
    Quatis, Rio Claro e Valença. Atendimento próximo, com a possibilidade de reuniões
    presenciais para clientes da região.
  </p>
</section>
```

### 5.4 Página de portfólio com filtro local (baixa prioridade)

Identificar quais projetos do `data/projects.ts` foram feitos para clientes da região e destacar isso no card / na página do projeto. Exemplo: o projeto "Veículos RJ" tem afinidade regional clara — adicionar uma tag `Volta Redonda` ou `Médio Paraíba` quando aplicável.

> **Não foi alterado** porque as descrições dos projetos foram tratadas como informações factuais sobre os clientes (regra do briefing).

### 5.5 Google Business Profile

Fora do código, mas crítico para SEO local:
- Criar / reivindicar perfil no **Google Business Profile** com endereço de Volta Redonda.
- Cadastrar áreas de atuação (Volta Redonda + cidades vizinhas).
- Solicitar avaliações de clientes existentes (Gabriel Passig, Veículos RJ, AXIS).
- Postar atualizações regulares (novos projetos lançados).

### 5.6 `sitemap.xml` e `robots.txt`

Hoje o projeto não tem `app/sitemap.ts` nem `app/robots.ts`. Recomendado criar:

```ts
// app/sitemap.ts
import { projects } from '@/data/projects';

export default function sitemap() {
  const base = 'https://triumtech.com.br';
  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/sobre`, lastModified: new Date() },
    { url: `${base}/projetos`, lastModified: new Date() },
    { url: `${base}/contato`, lastModified: new Date() },
    ...projects.map((p) => ({ url: `${base}/projetos/${p.slug}`, lastModified: new Date() })),
  ];
}
```

### 5.7 `alt` de imagens locais

As imagens em `data/projects.ts` têm `alt` genérico (`<title> — Desktop/Mobile`). Quando o cliente é regional, vale enriquecer com cidade, ex.: `"Veículos RJ — site para concessionária no RJ — desktop"`.

### 5.8 Conteúdo / blog (longo prazo)

Considerar uma seção `/blog` com artigos do tipo:
- "Quanto custa um site profissional em Volta Redonda?"
- "Como escolher uma agência de sites no Médio Paraíba"
- "Sites para advogados em Volta Redonda: o que considerar"

Conteúdo educacional com keywords locais é o vetor mais sustentável de SEO local orgânico.

---

## 6. Verificações pós-edição recomendadas

- [ ] Rodar `npm run build` para garantir que nada quebrou (apenas edits de texto, mas vale conferir).
- [ ] Inspecionar `<title>` e `<meta description>` no DevTools de cada página em produção.
- [ ] Validar JSON-LD em https://search.google.com/test/rich-results (após item 5.2).
- [ ] Conferir Lighthouse SEO score antes/depois.
- [ ] Submeter `sitemap.xml` no Google Search Console (após item 5.6).
