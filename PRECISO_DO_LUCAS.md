# Preciso do Lucas

Tudo que depende de você para o admin andar: decisões, chaves, IDs e acessos. Atualizado a cada fase. Item resolvido sai da lista e vai para o fim, em "Resolvido".

Nenhuma chave deve ser colada em chat, issue ou commit. Elas vão direto para o `.env.local` da sua máquina e para as variáveis de ambiente do projeto na Vercel.

---

## Antes de começar (bloqueia a Fase 1)

### Decisões

1. **Aprovar o `ADMIN_PLANO.md`.** Pode aprovar inteiro ou pedir mudança em qualquer parte.
2. **Mesclar o `upgrade/2026` na `main`?** O admin é construído em cima dele (Next 16, React 19, Tailwind 4). Sugiro abrir o preview da Vercel desse branch, conferir o site e mesclar antes da Fase 1.
3. **Plano da Vercel: Hobby (gratuito) ou Pro?** Muda o tempo máximo de cada função e a frequência permitida dos crons. O plano do admin foi desenhado para funcionar nos dois; saber qual é ajuda a calibrar os lotes do cron.
4. **Quem acessa o admin?** Os e-mails das pessoas que vão entrar. Todas com o mesmo nível (admin) por enquanto.

### Acessos

5. **Projeto no Supabase.** Duas opções:
   - você cria o projeto (região **São Paulo, `sa-east-1`**, a mesma da Vercel) e me passa as chaves pelo `.env.local`; ou
   - você me dá acesso à organização no Supabase e eu crio.

   Chaves necessárias: **Project URL**, **publishable key** (antiga `anon`) e **secret key** (antiga `service_role`). A secret key dá acesso total ao banco: só no servidor, nunca com prefixo `NEXT_PUBLIC_`.

   Para aplicar as migrations pela linha de comando, também preciso de um **access token** do Supabase (Account, Access Tokens) e do **project ref**. Sem eles, eu te entrego os arquivos SQL e você roda no SQL Editor do painel.

6. **Variáveis na Vercel.** Ou você cadastra (te passo a lista pronta), ou me dá acesso ao projeto na Vercel.

---

## Decisões para as fases seguintes

7. **Clique no WhatsApp conta como lead?** (Fase 4) O site não tem formulário, então o que dá para registrar é o clique: origem, página e horário, sem nome nem telefone. Duas formas:
   - **conta como lead** com tipo `clique`, como o seu prompt pede;
   - ou **separa em "contatos iniciados"**, e lead fica só quem deixou dado de contato.

   Recomendo a segunda: um clique não garante que a mensagem foi enviada, e contar cliques como leads infla o número do dashboard. Funciona igual nos dois casos; muda só como o número é exibido.

8. **Criar um formulário de contato no site?** (Fase 4) Daria leads com nome e telefone, mas muda o site público, que hoje é só WhatsApp e e-mail. Fora do escopo atual, a menos que você queira.

9. **Modelo de IA.** (Fase 7) Preços por milhão de tokens, entrada e saída:

   | Modelo | Preço | Para que serve |
   |---|---|---|
   | `claude-opus-5-5` (padrão do plano) | US$ 4 / US$ 20 | Melhor texto; cerca de 5 centavos de dólar por geração |
   | `claude-sonnet-5-5` | US$ 2 / US$ 10 | Metade do preço, texto muito bom para legenda e post |
   | `claude-haiku-5-5` | US$ 0,10 / US$ 0,50 | Bem mais barato, para volume alto e textos curtos |

   Dá para trocar a qualquer momento pela variável `ANTHROPIC_MODEL`, sem mexer no código.

10. **LGPD.** O admin vai guardar dado pessoal (nome e telefone de lead, dados de contato de clientes e prospects). Recomendo uma página de política de privacidade no site da TRIUM antes de a Fase 4 ir ao ar, e que os sites dos clientes que mandarem leads pela API tenham a sua. Não sou advogado: vale passar o texto por quem entende.

11. **Nome antigo da empresa ainda aparece no site.** O e-mail de contato é `contato@triumtech.com.br` (domínio do nome antigo) e os dados estruturados do Google listam "TRIUM Tech" como nome alternativo. Esse e-mail continua valendo? Se houver um novo, troco nos dois lugares.

---

## Chaves por fase

| Chave | Fase | Onde conseguir |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SECRET_KEY` | 1 | Supabase, Project Settings, API Keys |
| `CRON_SECRET` | 3 | Eu gero um valor aleatório; você cadastra na Vercel |
| `PAGESPEED_API_KEY` | 3 | Google Cloud Console: criar projeto, ativar "PageSpeed Insights API", criar chave de API restrita a essa API |
| `ANTHROPIC_API_KEY` | 7 | console.anthropic.com, API Keys |

## Dados por cliente

| Dado | Fase | Para quê |
|---|---|---|
| URL de cada site | 2 | Monitoramento e auditoria |
| Plano contratado e valor mensal | 2 | Ficha do cliente |
| Google Place ID | 7 | Link de pedido de avaliação. Sai do Perfil da Empresa no Google ou da ferramenta Place ID Finder do Google |

## Integrações futuras (não bloqueiam nada)

| Integração | O que vai precisar |
|---|---|
| GA4 Data API | ID da propriedade GA4 de cada cliente e uma conta de serviço do Google Cloud com acesso de leitura a essas propriedades |
| Meta Marketing API | App na Meta for Developers, token de sistema e ID da conta de anúncios de cada cliente |

Até lá, essas métricas entram à mão no relatório (Fase 5).

---

## Resolvido

Nada ainda.
