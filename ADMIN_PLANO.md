# Plano do admin

Central de operação da TRIUM em `/admin`: clientes, monitoramento e auditoria dos sites, relatórios, leads, prospecção e conteúdo. Este documento é a proposta de arquitetura. **Nada do admin é codado antes da sua aprovação.**

O que depende de você (chaves, acessos e decisões) está em `PRECISO_DO_LUCAS.md`.

---

## 1. Análise do projeto atual

| Item | Situação |
|---|---|
| Stack | Next.js 16.4 (App Router, Turbopack), React 19.3, TypeScript 5.9, Tailwind 4, motion 14, lenis 1.3 |
| Onde está | Branch `upgrade/2026`, ainda não mesclado na `main`. O que está no ar hoje roda Next 14 |
| Deploy | Vercel, região São Paulo (`gru1`), pelo GitHub `TRIUM-works/TRIUMworks-site`. Não há `vercel.json` |
| Banco | Nenhum |
| Autenticação | Nenhuma |
| Variáveis de ambiente | Só `NEXT_PUBLIC_SITE_URL`, opcional |
| CLAUDE.md | Não existia; criado junto com este plano |

Estrutura relevante:

```
app/
  (site)/layout.tsx      layout raiz do site: fontes, cursor, Lenis, snap, fundo animado
  (site)/page.tsx        página única: Hero, Projetos, Contato
  (site)/not-found.tsx
  robots.ts, sitemap.ts  (o sitemap só lista "/")
components/              layout/, sections/, motion/, ui/, animations/
lib/data/projetos.ts     conteúdo dos projetos
```

Duas consequências para o admin:

- **O layout do site não serve para o admin.** Cursor customizado, scroll por seção, Lenis e fundo animado atrapalhariam um painel de trabalho. O admin ganha um **layout raiz próprio** em `app/(admin)/`. O Next permite vários layouts raiz em grupos de rota; a única diferença é que navegar entre site e admin recarrega a página inteira, o que aqui é desejável.
- **O site público não tem formulário hoje**, só links de WhatsApp, e-mail e Instagram. A captura de leads da Fase 4 parte dos cliques nesses links (ver decisão 7 em `PRECISO_DO_LUCAS.md`).

---

## 2. Princípios

1. **O site público não muda**, exceto o mínimo para registrar contatos (Fase 4).
2. **Segurança em três camadas**, nenhuma confiando na outra:
   - `proxy.ts` barra quem não tem sessão antes de a rota carregar;
   - cada página, Server Action e route handler confere de novo se a pessoa é admin;
   - o banco aplica Row Level Security em toda tabela.

   A própria documentação do Next 16 recomenda não depender só do proxy: mudar um `matcher` ou mover uma Server Action pode tirar a rota da cobertura sem aviso.
3. **Nenhum dado inventado.** Sem dado real, a tela mostra um estado vazio dizendo o que falta e como preencher.
4. **Nenhuma chave secreta no navegador.** Chaves de serviço só em código de servidor (`import 'server-only'`).
5. **Uma fase por vez**, com commit ao fim de cada funcionalidade e `CLAUDE.md` atualizado ao fim de cada fase.

---

## 3. Rotas

### Páginas do admin (layout raiz próprio, `noindex`)

| Rota | Fase | Conteúdo |
|---|---|---|
| `/admin/entrar` | 1 | Login (e-mail e senha) |
| `/admin` | 1 | Dashboard: clientes, sites com alerta, leads do mês, tarefas pendentes |
| `/admin/tarefas` | 1 | Lista simples de tarefas (alimenta o card do dashboard) |
| `/admin/clientes` | 2 | Lista, busca e filtros por nicho e status |
| `/admin/clientes/novo`, `/admin/clientes/[id]` | 2 | Cadastro e ficha do cliente, com os sites dele |
| `/admin/sites/[id]` | 2 e 3 | Checklist de entrega, auditorias, checagens, gráfico de evolução |
| `/admin/alertas` | 3 | Alertas abertos e resolvidos |
| `/admin/leads` | 4 | Inbox com status e anotações |
| `/admin/leads/[id]` | 4 | Detalhe do lead e histórico de notas |
| `/admin/api` | 4 | Chaves de API por cliente e documentação do endpoint |
| `/admin/relatorios` e `/admin/relatorios/[id]` | 5 | Relatório mensal: gerar, editar observações e métricas manuais, PDF, link |
| `/admin/prospeccao` e `/admin/prospeccao/[id]` | 6 | Prospects, histórico de contato, diagnóstico, mensagem de abordagem |
| `/admin/prospeccao/diagnostico` | 6 | Cola a URL e gera o diagnóstico gratuito |
| `/admin/conteudo` | 7 | Calendário por cliente e da TRIUM, geração com IA |
| `/admin/configuracoes` | 1 | Modelos de mensagem, membros com acesso |

### Página pública de relatório

| Rota | Fase | Conteúdo |
|---|---|---|
| `/r/[token]` | 5 | Versão web do relatório para o cliente, com botão de PDF. Token aleatório de 32 bytes, revogável. `noindex` |

### Route handlers

| Rota | Quem chama | Proteção |
|---|---|---|
| `POST /api/contato` | Site público, ao clicar em WhatsApp ou e-mail | Validação, limite por origem, sem chave |
| `POST /api/v1/leads` | Sites dos clientes | `Authorization: Bearer <chave do cliente>`, CORS só para os domínios do cliente, limite por chave |
| `GET /api/cron/diario` | Vercel Cron | Header `Authorization: Bearer ${CRON_SECRET}` |
| `GET /api/admin/relatorios/[id]/pdf` | Admin | Sessão + papel admin |
| `GET /api/r/[token]/pdf` | Cliente com o link | Token válido e não revogado |
| `POST /api/admin/ia/gerar` | Admin | Sessão + papel admin |

As demais escritas do admin usam Server Actions, cada uma conferindo o papel antes de agir.

---

## 4. Banco (Supabase Postgres)

Nomes em português, como o resto do código. Toda tabela com `id uuid` (salvo onde indicado), `criado_em` e `atualizado_em`, e **RLS ligado**. Migrations versionadas em `supabase/migrations/`.

### Acesso

| Tabela | Campos | Fase |
|---|---|---|
| `membros` | `user_id` (PK, referência a `auth.users`), `nome`, `papel` (`admin`) | 1 |

Função `public.e_admin()` (`security definer`, `stable`) devolve se `auth.uid()` está em `membros` com papel `admin`. Toda política de RLS usa essa função: `for all using (e_admin()) with check (e_admin())`. Não existe política para visitante anônimo em nenhuma tabela; o que vem de fora (cliques, leads de clientes, cron) entra por route handlers no servidor.

### Operação

| Tabela | Campos principais | Fase |
|---|---|---|
| `tarefas` | `titulo`, `cliente_id` (opcional), `prazo`, `concluida_em` | 1 |
| `clientes` | `nome`, `nicho` (`concessionaria`, `beleza`, `eventos`, `outro`), `contato_nome`, `email`, `whatsapp`, `plano`, `valor_mensal` (numeric 10,2), `status` (`ativo`, `pausado`, `encerrado`), `google_place_id` (Fase 7), `observacoes` | 2 |
| `sites` | `cliente_id`, `nome`, `url`, `ativo` | 2 |
| `checklist_itens` | PK (`site_id`, `item`); `item` em `ssl`, `velocidade`, `seo_basico`, `schema`, `ga4`, `pixel`, `search_console`, `whatsapp_rastreio`, `google_meu_negocio`; `concluido`, `observacao` | 2 |

Um cliente pode ter mais de um site, por isso `sites` é tabela própria. O progresso do checklist é calculado (itens concluídos / 9), não armazenado.

### Monitoramento

| Tabela | Campos principais | Fase |
|---|---|---|
| `auditorias` | `site_id` ou `prospect_id`, `url`, `estrategia` (`mobile`, `desktop`), notas de `performance`, `seo`, `acessibilidade`, `boas_praticas` (0 a 100), `lcp_ms`, `cls`, `tbt_ms`, `problemas` (jsonb: os itens reprovados, já resumidos), `origem` (`manual`, `cron`, `diagnostico`) | 3 |
| `checagens` | `site_id`, `no_ar`, `status_http`, `tempo_resposta_ms`, `ssl_valido`, `ssl_expira_em`, `title`, `description`, `links_quebrados` (jsonb) | 3 |
| `alertas` | `site_id`, `tipo` (`fora_do_ar`, `ssl_expirando`, `queda_nota`, `links_quebrados`, `lentidao`, `sem_title`), `mensagem`, `resolvido_em` | 3 |

A resposta bruta do PageSpeed passa de 1 MB por análise. Guardamos só as notas, as métricas principais e os itens reprovados.

### Leads

| Tabela | Campos principais | Fase |
|---|---|---|
| `leads` | `cliente_id` (vazio = lead da própria TRIUM), `tipo` (`clique`, `formulario`, `api`), `origem` (`whatsapp`, `email`, `formulario`, `site_cliente`), `pagina`, `nome`, `contato`, `mensagem`, `utm` (jsonb), `status` (`novo`, `em_contato`, `proposta`, `fechado`, `perdido`) | 4 |
| `lead_notas` | `lead_id`, `texto`, `autor_id` | 4 |
| `chaves_api` | `cliente_id`, `prefixo` (visível), `hash` (sha-256 da chave), `revogada_em`, `ultimo_uso_em` | 4 |

A chave completa aparece uma única vez, na criação. No banco fica só o hash.

### Relatórios

| Tabela | Campos principais | Fase |
|---|---|---|
| `relatorios` | `cliente_id`, `mes` (primeiro dia do mês), `observacoes`, `metricas_manuais` (jsonb: `visitas_ga4`, `investimento_meta`, `custo_por_lead_meta`), `token_publico`, `token_revogado_em`, `pdf_path`, `gerado_em` | 5 |

`metricas_manuais` é o ponto de encaixe das integrações futuras: quando GA4 Data API e Meta Marketing API forem conectadas, os mesmos campos passam a ser preenchidos por elas, e o campo manual vira sobrescrita opcional.

### Prospecção

| Tabela | Campos principais | Fase |
|---|---|---|
| `prospects` | `nome`, `nicho`, `cidade`, `url`, `whatsapp`, `status` (`a_contatar`, `contatado`, `respondeu`, `reuniao`, `fechado`, `descartado`) | 6 |
| `prospect_contatos` | `prospect_id`, `canal`, `nota` | 6 |
| `diagnosticos` | `prospect_id`, `problemas` (jsonb: os 3 a 5 principais), `pdf_path` | 6 |
| `modelos_mensagem` | `tipo` (`abordagem`, `avaliacao`), `titulo`, `corpo` (com marcadores como `{nome}` e `{problema_1}`) | 6 |

### Conteúdo

| Tabela | Campos principais | Fase |
|---|---|---|
| `conteudos` | `cliente_id` (vazio = TRIUM), `data`, `formato` (`post`, `reels`, `legenda`, `anuncio`), `titulo`, `texto`, `status` (`ideia`, `roteiro`, `aprovado`, `publicado`), `gerado_por_ia` | 7 |
| `geracoes_ia` | `cliente_id`, `formato`, `modelo`, `tokens_entrada`, `tokens_saida` | 7 |

`geracoes_ia` existe para você acompanhar quanto a IA está custando.

### Storage

Bucket privado `relatorios` (PDFs de relatório e diagnóstico). Os arquivos só saem por URL assinada, gerada no servidor.

---

## 5. Segurança

- **Login** com e-mail e senha pelo Supabase Auth. **Cadastro público desligado**: os usuários são criados no painel do Supabase e incluídos em `membros`. Recomendo ligar o segundo fator (TOTP) assim que a Fase 1 estiver de pé.
- **`proxy.ts`** (o antigo middleware, renomeado no Next 16) atua só em `/admin/:path*` e `/api/admin/:path*`: renova a sessão do Supabase e manda para `/admin/entrar` quem não tem sessão.
- **No servidor**, um helper `exigirAdmin()` em `lib/admin/auth.ts` roda no início de todo layout, página, Server Action e route handler do admin. Sem sessão ou sem papel, responde 401 ou redireciona.
- **RLS** em todas as tabelas. Mesmo que uma rota escape do proxy e do helper, o banco não entrega nada a quem não está em `membros`.
- **Chaves:** a chave pública do Supabase (`publishable` ou `anon`) pode ir ao navegador, porque o RLS a limita. A chave secreta (`secret` ou `service_role`) e as chaves do PageSpeed, da Anthropic e do cron ficam só no servidor. Tudo em `.env.local`, documentado em `.env.example` sem valores.
- **`noindex`:** `metadata.robots` no layout do admin e header `X-Robots-Tag: noindex, nofollow` em `/admin`, `/r` e `/api` pelo `next.config.ts`. Nada disso entra no sitemap.
- **Entradas públicas** (`/api/contato`, `/api/v1/leads`): validação de formato, tamanho máximo dos campos, campo isca contra robôs e limite de requisições por origem. IP não é guardado; para o limite, só o hash.

---

## 6. Integrações

| Serviço | Para quê | Fase |
|---|---|---|
| Supabase (Auth, Postgres, Storage) | Base de tudo | 1 |
| Google PageSpeed Insights API v5 | Notas de performance, SEO, acessibilidade e boas práticas, mobile e desktop | 3 |
| Checagem própria em Node | No ar, tempo de resposta, validade e vencimento do SSL, title e description, links quebrados da home (até 50 links, poucos por vez) | 3 |
| Vercel Cron | Agenda da checagem diária e da auditoria semanal | 3 |
| Anthropic (Claude) | Ideias de post, roteiros de Reels, legendas, textos de anúncio | 7 |
| Link de avaliação do Google | `https://search.google.com/local/writereview?placeid=<Place ID>` | 7 |
| GA4 Data API, Meta Marketing API | **Depois.** Estrutura pronta na Fase 5; até lá, campos manuais | Futuro |

### Detalhes da IA (Fase 7)

- SDK oficial `@anthropic-ai/sdk`, chamado só no servidor.
- Modelo padrão `claude-opus-5-5` (US$ 4 por milhão de tokens de entrada e US$ 20 de saída), configurável por `ANTHROPIC_MODEL`. Uma geração típica, com o perfil do cliente na entrada e uns 2 mil tokens de texto na saída, fica na casa de **5 centavos de dólar**. Alternativas mais baratas na decisão 9 de `PRECISO_DO_LUCAS.md`.
- **Saída estruturada** (`output_config.format` com schema): as ideias voltam como lista de objetos (título, gancho, legenda, hashtags), prontas para virar itens do calendário, sem precisar interpretar texto livre.
- **Esforço `low` ou `medium`**: escrever legenda não pede raciocínio profundo, e esforço maior só encarece.
- **Fallback de recusa** ligado (`fallbacks: "default"`), para que um bloqueio por engano do filtro de segurança não devolva uma tela vazia.
- **Cache de prompt não compensa aqui.** O cache só vale a partir de um tamanho mínimo de prefixo, e o perfil de um cliente mais as instruções fica abaixo disso. Se um dia o prompt crescer (guia de marca longo, exemplos de posts), vale ligar.
- O texto gerado entra como **rascunho** no calendário. Nada é publicado ou enviado automaticamente.

---

## 7. Cron

**Um único cron diário** (`/api/cron/diario`), em vez de dois:

1. checa todos os sites ativos (no ar, SSL, tempo de resposta, title e description, links da home);
2. audita no PageSpeed os sites cuja última auditoria tem mais de 7 dias.

Por que um só: cada análise do PageSpeed leva de 10 a 40 segundos, e são duas por site (mobile e desktop). Com muitos sites, uma rodada semanal única estouraria o tempo máximo de uma função na Vercel. Rodando todo dia e auditando só quem está "vencido", o trabalho se espalha pela semana e cabe em qualquer plano. Se uma rodada não terminar, o que sobrou fica para o dia seguinte.

**Alertas** são gerados ao fim de cada rodada, comparando com a anterior:

| Situação | Alerta |
|---|---|
| Fora do ar em **duas checagens seguidas** (uma só pode ser instabilidade momentânea) | `fora_do_ar` |
| Certificado SSL vencendo em menos de 14 dias | `ssl_expirando` |
| Nota de performance ou SEO caiu 10 pontos ou mais desde a última auditoria | `queda_nota` |
| Links quebrados na home | `links_quebrados` |
| Tempo de resposta acima de 3 segundos | `lentidao` |
| Home sem `title` ou sem `description` | `sem_title` |

Alertas iguais não se repetem enquanto o anterior estiver aberto, e são resolvidos sozinhos quando a condição some.

Alternativa, se preferir não depender da Vercel para agendar: `pg_cron` e `pg_net` do próprio Supabase chamando o mesmo endpoint.

---

## 8. Dependências novas

Só entram quando a fase precisa delas.

| Pacote | Fase | Por quê |
|---|---|---|
| `@supabase/supabase-js` | 1 | Cliente oficial do Supabase |
| `@supabase/ssr` | 1 | Sessão em cookies para App Router, Server Actions e proxy; é o caminho oficial do Supabase para Next |
| `server-only` | 1 | Faz o build falhar se um arquivo com chave secreta for importado em componente de navegador |
| `zod` | 2 | Valida formulários do admin e o corpo de `/api/v1/leads`. Nas rotas públicas, validar tudo é obrigatório, e escrever isso à mão para cada campo seria mais código e mais lugar para erro |
| `@react-pdf/renderer` | 5 | Gera os PDFs de relatório e diagnóstico em JavaScript puro. A alternativa, Chromium headless, pesa mais de 50 MB e é frágil em função serverless |
| `@anthropic-ai/sdk` | 7 | SDK oficial da Anthropic |

O que **não** entra: biblioteca de gráficos (o gráfico de evolução é um componente SVG próprio, de poucas dezenas de linhas), biblioteca de componentes de UI, ORM (o cliente do Supabase com tipos gerados resolve) e parser de HTML (a checagem lê só `title`, `description` e `href`).

---

## 9. Variáveis de ambiente (`.env.example`)

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=   # pode ir ao navegador: o RLS limita
SUPABASE_SECRET_KEY=                    # só servidor. Nunca com NEXT_PUBLIC_

# Cron (gerado por nós, cadastrado na Vercel)
CRON_SECRET=

# Fase 3
PAGESPEED_API_KEY=

# Fase 7
ANTHROPIC_API_KEY=
ANTHROPIC_MODEL=claude-opus-5-5

# Já existente
NEXT_PUBLIC_SITE_URL=https://www.triumworks.com.br
```

---

## 10. Fases

Cada fase em branch próprio a partir de `upgrade/2026`, commits pequenos, preview na Vercel para você testar antes de seguir.

### Fase 1: Base
- Migration: `membros`, `tarefas`, função `e_admin()`, RLS.
- Clientes do Supabase para servidor, navegador e proxy; `proxy.ts`; `exigirAdmin()`.
- Layout raiz do admin: sidebar, escuro, acento `#09C2A7`, Inter e IBM Plex Mono, sem os efeitos do site.
- Login e logout.
- Dashboard com os quatro números. Clientes, alertas e leads mostram estado vazio indicando a fase em que entram; tarefas funcionam já.
- `noindex`, `.env.example`.
- **Pronto quando:** sem login não se vê nada do admin nem pelo navegador nem chamando a API direto; o site público segue idêntico (diff de pixels em 0%).

### Fase 2: Clientes e sites
- CRUD de clientes e sites; checklist de entrega com progresso em %.
- **Pronto quando:** dá para cadastrar a carteira real e marcar o checklist de cada site.

### Fase 3: Monitoramento e auditoria
- "Auditar agora" por site (mobile e desktop em paralelo); histórico com data.
- Checagem própria; cron diário; alertas; gráfico de evolução.
- **Pronto quando:** um site cadastrado tem histórico de notas e um site fora do ar gera alerta no dashboard.

### Fase 4: Leads
- Site público: cliques em WhatsApp e e-mail viram registro (`navigator.sendBeacon` para `/api/contato`). É a única mudança no site, sem nada visível.
- Inbox com status e notas.
- Chaves de API por cliente, endpoint `/api/v1/leads` e documentação em `docs/API_LEADS.md` com exemplo pronto para colar no site do cliente.
- **Pronto quando:** um clique no WhatsApp do site aparece na inbox, e um `curl` com a chave de um cliente cria um lead daquele cliente.

### Fase 5: Relatórios
- Relatório mensal: notas, uptime, leads do período, observações e métricas manuais.
- PDF, link público copiável, revogação do link.
- **Pronto quando:** você gera o relatório de um cliente real e abre o link num navegador anônimo.

### Fase 6: Prospecção
- Diagnóstico gratuito: cola a URL, roda a auditoria e gera PDF com a marca da TRIUM e os 3 a 5 problemas que mais pesam.
- Lista de prospects com status, nicho, cidade e histórico de contato.
- Mensagem de abordagem a partir de modelo editável, com botão que abre o WhatsApp com o texto pronto. Nenhum envio automático.
- **Pronto quando:** de uma URL você chega a um PDF e a uma mensagem prontos em poucos cliques.

### Fase 7: Conteúdo e IA
- Calendário por cliente e da TRIUM.
- Geração de ideias de post, roteiros de Reels, legendas e textos de anúncio, usando nicho e dados do cliente.
- Link de pedido de avaliação no Google por cliente, com mensagem pronta para WhatsApp.
- **Pronto quando:** você gera uma semana de ideias para um cliente e elas caem no calendário como rascunho.

---

## 11. Riscos

| Risco | Como tratamos |
|---|---|
| Rota do admin escapar do proxy após uma mudança | Conferência no servidor em cada página e ação, e RLS no banco |
| Spam nas entradas públicas | Validação, campo isca, limite por origem; nenhuma política anônima no banco |
| Cota ou lentidão do PageSpeed | Chave própria do Google (cota bem maior que sem chave), auditorias espalhadas pela semana |
| PDF quebrar com React 19 | Prova de conceito do `@react-pdf/renderer` no início da Fase 5, antes de montar o relatório |
| Custo de IA crescer sem perceber | Registro de tokens por geração em `geracoes_ia` e total do mês visível no admin |
| Dados pessoais de leads (LGPD) | Só o necessário, sem IP; política de privacidade no site é decisão sua (ver `PRECISO_DO_LUCAS.md`) |
