# TRIUM: site e admin

Site institucional da TRIUM (estúdio de sites de Volta Redonda, RJ) em `triumworks.com.br`, e o admin interno em construção (ver `ADMIN_PLANO.md`).

## Stack e comandos

Next.js 16 (App Router, Turbopack), React 19, TypeScript 5, Tailwind 4, `motion` 14, `lenis` 1.3. Deploy na Vercel (região São Paulo), a partir do GitHub.

```
npm run dev     # desenvolvimento (saída em .next/dev)
npm run build   # build de produção
npm run lint    # ESLint 9, config flat (o `next lint` não existe mais no Next 16)
npx tsc --noEmit
```

O Next 16 mudou APIs em relação ao que costuma aparecer em exemplos antigos. Antes de usar uma API nova, ler o guia em `node_modules/next/dist/docs/`. Exemplos: `middleware.ts` agora se chama `proxy.ts` e roda em Node.js; `next/image` só aceita qualidade 75 sem configurar `images.qualities`.

## Estrutura

```
app/
  (site)/layout.tsx      layout raiz do site (fontes, cursor, Lenis, snap, fundo)
  (site)/page.tsx        página única: Hero, Projetos, Contato
  robots.ts, sitemap.ts  ficam na raiz de app/: dentro de um grupo de rota o Next não os gera
components/
  layout/                Atmosphere (cor do fundo por seção), BackgroundFX, CustomCursor,
                         SnapController (scroll por seção), SmoothScrollProvider, MotionProvider
  sections/              Hero, Projetos (deck em leque), Contato
  motion/                Reveal, SplitTitle, Magnetic
lib/
  data/projetos.ts       conteúdo dos projetos do deck
  easing.ts              curvas de animação (também em globals.css como --ease-*)
  hooks/                 useMediaQuery, useMobile
styles/globals.css       tema do Tailwind 4 (@theme) e estilos de base
scripts/convert-images.mjs   converte PNG/JPG de public/images/projetos para WebP
```

## Convenções

- Comentários em português, explicando o porquê, não o quê.
- Textos novos em português do Brasil, tom direto, **sem travessão (—)**.
- Commits pequenos, um por funcionalidade.

## Identidade visual (decisões do Lucas, não reverter sem pedir)

- Fundo escuro; teal `#09C2A7` só em acentos pequenos.
- **Cantos retos** nos cards do deck e nos botões de contato.
- Botões de WhatsApp e e-mail **sem ícone**.
- Evitar o que deixa o site com cara de gerado por IA: o ícone ✦, palavra em itálico serifado colorido no meio de título, CTA centralizado genérico.
- O TRIUM gigante do contato é cortado de raspão pela linha do rodapé no desktop e fica inteiro no mobile.

## Conteúdo dos projetos

- `descricaoCurta` aparece inteira no carrossel, sem "ler mais": até uns 130 caracteres, ou passa de 4 linhas e empurra a paginação.
- O nome do cliente só aparece se for diferente do título.
- `urlExterna` vazia esconde o link; `tecnologias` vazia esconde a ficha técnica.
- Imagens novas: colocar o PNG em `public/images/projetos/<nome>/` e rodar `node scripts/convert-images.mjs` (gera WebP e apaga o original).

## Armadilhas conhecidas

**Tailwind 4**
- CSS fora de camada vence qualquer utilitário. Regras de elemento (`button`, `a`, `img`) ficam em `@layer base`, senão apagam bordas, cores e fontes das classes.
- Não criar tokens de espaçamento chamados `xs`, `sm`, `md`, `lg`: eles colidem com os tamanhos de container e `max-w-sm` passa a valer o espaçamento.
- Um `leading-*` explícito vence a entrelinha embutida num tamanho de texto (`text-body-lg`) em qualquer breakpoint.
- Não redefinir `--ease-out`: é do Tailwind e muda a classe `ease-out`. As curvas do site são `--ease-soft`, `--ease-mask`, `--ease-artisan`, `--ease-ink`.

**motion**
- Usar `m.*`, não `motion.*`: o `LazyMotion` está em modo `strict` e `motion.*` quebra no dev.
- `domMax` (e não `domAnimation`) porque o deck usa `drag`.

**React 19**
- Media query: `useMediaQuery` (com `useSyncExternalStore`), não `useState` + `useEffect`. A regra `set-state-in-effect` acusa o segundo.

**Deck de projetos**
- Só as cartas da frente ficam montadas, mas a última vaga do leque fica sempre montada. Sem ela a carta da frente some de uma vez ao avançar.

## Como verificar mudanças visuais

O painel de navegador do app pode estar oculto. Nesse caso `document.hidden` fica `true`, o `requestAnimationFrame` não roda, e as animações congelam no estado inicial: medidas tiradas ali ficam erradas (elementos com `initial={{ y: ... }}` aparecem fora do lugar). Para validar de verdade:

- Chrome headless com `playwright-core` instalado **fora do projeto** (pasta temporária), apontando para o Chrome do sistema, rodando contra `next build` + `next start`;
- comparar prints antes e depois com diff de pixels, contando só diferenças fortes, porque o fundo tem um brilho que se move o tempo todo;
- ou conferir no navegador do Lucas.

## Admin

Ainda não começou. Arquitetura proposta em `ADMIN_PLANO.md`, pendências em `PRECISO_DO_LUCAS.md`. Esta seção passa a descrever a estrutura do admin ao fim de cada fase.
