# Segurança · Spazio 61 (demonstração)

> Arquivo interno (`projeto/`), nunca publicado nem compartilhado com o cliente.
> Data: **16/11/2026**. Revisão feita pelo agente `seguranca` (só recomenda ou bloqueia; quem decide é o Lucas).
> Base: contexto do time v2, `projeto/notas-construcao.md`, `REGRAS-VELLORA.md` ("Regras de segurança") e o roteiro `seguranca.md`.
> Nada foi corrigido, apagado ou commitado por esta revisão. A única escrita foi este arquivo.

## Pareceres

| Uso | Parecer |
|---|---|
| **(a) Demonstração local, vídeo e prints** (mostrar ao próprio cliente) | **LIBERADO COM RESSALVAS** (ver "Ressalvas da demonstração") |
| **(b) Publicação real** (domínio do cliente ou qualquer endereço público, inclusive prévia `*.pages.dev`) | **BLOQUEADO** (esperado nesta fase) |

**`projeto/` está exposto?** **Não**, no teste local: com o servidor servindo só `site/`, todos os caminhos internos deram `404` (tabela na seção 7). **No endereço publicado: não testável**, porque ainda não há prévia publicada. Testar antes de qualquer prévia `*.pages.dev` e antes da publicação real; até esse teste, qualquer publicação fica BLOQUEADA.

### Ressalvas da demonstração (a)
1. As imagens são do Instagram do cliente **sem autorização**: mostrar só ao próprio cliente (Spazio 61), por arquivo local, vídeo ou print. Não postar, não usar em portfólio e não enviar a terceiros.
2. Não publicar a demonstração em endereço público (nem prévia) sem o teste de exposição da seção 7 e sem novo parecer.
3. Antes do commit do coordenador, decidir sobre os prints de `projeto/materiais/referencias/` (problema S2 abaixo).

### Motivos do BLOQUEADO para publicação real (b)
- 13 itens `TROCAR` em `site/config.js` (WhatsApp, razão social, CNPJ, e-mail, data da política, `demonstracao: true`, 4 fotos) e itens "a confirmar" (endereço, etapas, descrições).
- noindex ativo (meta nas 3 páginas e `X-Robots-Tag` no `_headers`), como deve ser na demonstração.
- Licença do template AERRA (GetLayers) **não verificada** (sem `TEMPLATE.txt` em `vellora-time/templates/`).
- Imagens sem autorização por escrito do cliente.
- Formulário simulado: falta o servidor (`/api/lead` com Turnstile, limite por IP e regra de firewall), conforme `projeto/trocas-ao-fechar.md`, seção 3.
- Exposição de `projeto/` não testada no endereço publicado.

## Problemas encontrados

| # | Gravidade | Onde | Problema | Recomendação | Quem resolve |
|---|---|---|---|---|---|
| S1 | Alta (bloqueia publicação; esperado) | `site/config.js`, `site/*.html`, `site/_headers` | TROCAR, "a confirmar" e noindex ativos | Seguir `trocas-ao-fechar.md` (seções 2 e 4) ao fechar; buscar "TROCAR" em `site/` até zero | Lucas (dados com o cliente) + construtor |
| S2 | Média | `projeto/materiais/referencias/*.jpg` (7 prints, não rastreados no git) | Os prints do perfil mostram dados pessoais de terceiros: nomes de usuário e fotos de 3 perfis em "Seguido(a) por", além do avatar e das notificações da conta de quem capturou. Não estão em `site/` (conferido por grep), mas o `.gitignore` não cobre a pasta e o próximo commit os levaria ao histórico do git. A regra é: nenhum dado pessoal de terceiros no repositório | Não commitar esses prints como estão: recortar/borrar a faixa "Seguido(a) por" e a interface da conta, ou mantê-los fora do git (ex.: mover para `projeto/materiais/originais/`, que já é ignorada, ou incluir a pasta no `.gitignore`). Decisão do Lucas | Lucas (decide) + coordenador (antes do commit) |
| S3 | Alta para publicação / Baixa para demonstração | `site/assets/*.webp`, `projeto/materiais/origem-imagens.md` | Imagens do Instagram do cliente sem autorização; o link do post de origem ainda está "a anotar" | Autorização por escrito do cliente para cada imagem e registro em `origem-imagens.md`; anotar os links dos posts | Lucas |
| S4 | Alta para publicação (adoção) | Referência de layout AERRA (GetLayers) | Licença não verificada; a pasta `projeto/materiais/referencias/layout/` não existe; não há `TEMPLATE.txt` | Ver seção 6 | Lucas |
| S5 | Alta para publicação | Formulário (`site/index.html`, `site/js/main.js`) | Envio simulado. A validação é só no navegador; não há servidor | Ao fechar: `/api/lead` na Cloudflare com validação no servidor, Turnstile, limite por IP + regra no firewall, CORS só do domínio e só `POST`, neutralização de fórmula (`=`, `+`, `-`, `@`) antes de gravar na planilha, segredo e URL do Apps Script só nas configurações da Cloudflare, aprovação registrada dos serviços que recebem dados, política citando Google Planilhas (e Looker Studio, se usado) | Construtor + Lucas/Carlos (aprovação) |
| S6 | Média (ao fechar) | `site/_headers` (CSP) | Turnstile exige liberar `https://challenges.cloudflare.com` em `script-src` e `frame-src`, e `connect-src 'none'` bloqueará o `fetch` para `/api/lead` | Ao ligar o formulário real: `connect-src 'self'`, `script-src 'self' https://challenges.cloudflare.com`, `frame-src https://challenges.cloudflare.com`; nada além disso. Nova revisão da segurança depois da mudança | Construtor |
| S7 | Média (ao fechar) | `site/politica-de-privacidade.html` | Correta para a demonstração. Para a versão real, faltará citar: o destino dos dados do formulário (Google Planilhas/Apps Script), o Turnstile (Cloudflare) e os registros técnicos da hospedagem (Cloudflare, ex.: IP), além de prazo de guarda e base legal | Atualizar a página-modelo com os dados reais; o cliente revisa com o assessor jurídico | Construtor + cliente |
| S8 | Baixa | `site/js/main.js` (linha 61) | Hoje o `config.js` é estático e seguro. Se no futuro o conteúdo vier de fora (planilha, API, CMS), `cfg.instagram` é atribuído direto a `href` sem validar o esquema. Uma URL `javascript:` já seria bloqueada pela CSP (sem `'unsafe-inline'`), mas convém defesa em profundidade. O resto está seguro: textos por `textContent`, WhatsApp só com dígitos, mapa com `encodeURIComponent`, e-mail com prefixo `mailto:`, imagens limitadas por `img-src 'self'` | Se o config passar a vir de fora: aceitar só `https://` (de preferência só `https://www.instagram.com/`) e caminhos de imagem relativos em `assets/`; manter `textContent` e nunca usar `innerHTML` | Construtor (só se o config deixar de ser estático) |
| S9 | Baixa | `site/politica-de-privacidade.html` (linha 47) | O endereço da empresa está escrito no HTML, sem `data-cfg`, ao contrário da página inicial; se o endereço mudar no `config.js`, a política fica divergente | Ligar ao `config.js` (`endereco.busca`) ou lembrar de trocar nos dois lugares | Construtor |
| S10 | Informativo | `site/_headers` | No servidor local (`python -m http.server`) o arquivo `/_headers` é entregue como arquivo comum (200). Na Cloudflare Pages ele é lido como configuração e não deveria ser servido; não contém nada sensível | No teste da prévia, conferir `/_headers` (deve dar 404 ou não trazer o arquivo) | Segurança (no teste da prévia) |
| S11 | Informativo | `site/_headers` (HSTS) | `includeSubDomains` vai valer para todos os subdomínios do domínio do cliente | Ao fechar, confirmar que todos os subdomínios do domínio têm HTTPS | Lucas/Carlos |

Nenhum problema crítico de código (XSS, recurso externo, segredo) foi encontrado.

## O que foi verificado

### 1. Segredos e `.gitignore`
- **Histórico do git** (`git log --all -p`, 3 commits, só leitura): nenhum segredo, chave, token, senha ou credencial da Cloudflare. As únicas ocorrências de palavras como "segredo" são instruções em `trocas-ao-fechar.md` e o próprio `.gitignore`.
- **Arquivos atuais** (`grep` em todo o repositório, fora de `.git`): nenhum segredo. Nenhum `.env`, `.dev.vars`, `.wrangler/` ou arquivo de credencial.
- **Remoto:** o repositório não tem remoto configurado (nada foi enviado para fora).
- **`.gitignore`:** cobre o bloco de segredos da Vellora (`.env`, `.env.*`, `*.key`, `*.pem`, `*.p12`, `*.pfx`, `.dev.vars`, `.dev.vars.*`, `.wrangler/`, `credentials.json`, `*credentials*.json`, `*.credentials`, `secrets.*`, `.claude/settings.local.json`), `.playwright-mcp/` e `projeto/materiais/originais/`. Não cobre `projeto/materiais/referencias/` (ver S2).

### 2. `site/_headers`
Formato válido para a Cloudflare Pages: linha de caminho `/*` sem recuo, cabeçalhos com recuo de 2 espaços no formato `Nome: valor`, finais de linha LF, uma regra só, linha mais longa (CSP) bem abaixo do limite.

| Cabeçalho | Valor | Resultado |
|---|---|---|
| Content-Security-Policy | `default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'none'; manifest-src 'self'; form-action 'self'; frame-ancestors 'none'; base-uri 'self'; object-src 'none'; upgrade-insecure-requests` | OK: só `'self'`, sem `unsafe-inline` e sem `unsafe-eval`; tem `frame-ancestors`, `base-uri`, `object-src` e `form-action`. `img-src data:` é aceitável (não executa código) |
| X-Content-Type-Options | `nosniff` | OK |
| X-Frame-Options | `DENY` | OK |
| Referrer-Policy | `strict-origin-when-cross-origin` | OK |
| Strict-Transport-Security | `max-age=31536000; includeSubDomains` | OK (ver S11) |
| Permissions-Policy | câmera, microfone, localização, sensores, pagamento, USB e browsing-topics desligados | OK |
| Cross-Origin-Opener-Policy | `same-origin` | OK (extra) |
| X-Robots-Tag | `noindex, nofollow` | OK |

A CSP não foi testada por mim no navegador (o Playwright fica com o QA); as notas de construção registram 0 erros de CSP no console com os cabeçalhos aplicados.

### 3. Recursos externos e HTML
- `grep` por `http(s)://` em HTML, CSS e JS: só links de navegação (`<a>` para `instagram.com/spazio.61`, Google Maps em busca, e o `wa.me` montado pelo JS). Nenhum script, folha de estilo, fonte, imagem, vídeo ou `iframe` de domínio externo. No CSS, o único `url()` é a fonte local `../fontes/outfit-variable-latin.woff2`; nenhum `@import`.
- Todos os `target="_blank"` têm `rel="noopener noreferrer"` (os do WhatsApp recebem o mesmo `rel` pelo JS).
- Nenhum `style=""`, `<style>`, `<script>` inline ou atributo `on*=`. Os únicos `<script>` são `src` locais (`js/boot.js`, `config.js`, `js/main.js`). Nenhum `<iframe>`, `<object>`, `<embed>`, `<base>` ou `action=`.
- `<meta name="robots" content="noindex, nofollow">` nas 3 páginas.
- Nenhuma referência a `projeto/` ou `materiais/` em `site/`.

### 4. JavaScript (`js/boot.js`, `js/main.js`, `config.js`)
- Nenhum `innerHTML`, `outerHTML`, `insertAdjacentHTML` ou `document.write`. Conteúdo inserido por `textContent` e `createElement`.
- Nenhum `fetch`, `XMLHttpRequest`, `sendBeacon`, `WebSocket`, `postMessage`, `localStorage`, `sessionStorage` ou `cookie`.
- Nenhum `eval`, `new Function` ou `setTimeout` com texto.
- Nenhum listener de `wheel`/`touchmove`; o único `preventDefault` é no `submit` do formulário. Scroll em listener passivo. Nenhum smooth-scroll em JS (o CSS só força `scroll-behavior: auto` com reduced-motion).
- `style.setProperty` só em custom properties (`--lift`, `--py`), aceito pela CSP `style-src 'self'` (CSSOM).
- Risco futuro de XSS se o config vier de fora: ver S8.

### 5. Formulário
- `method="dialog"`, sem `action`: sem JS não envia nem navega; com JS o `submit` é interceptado, valida e mostra a mensagem em `role="status"`. Nenhuma requisição de rede, nada gravado no navegador.
- Validação no navegador (nome ≥ 2 caracteres, telefone com 10 ou 11 dígitos, e-mail com formato básico) e `maxlength` nos 3 campos. A mensagem de sucesso usa o primeiro nome via `textContent` (sem risco de XSS).
- Aviso honesto de demonstração e aviso LGPD com link para a política.
- **Obrigatório ao fechar** (`trocas-ao-fechar.md`, seção 3): servidor `/api/lead` com Turnstile, limite por IP, regra de limite no firewall da Cloudflare e validação no servidor (ver S5 e S6).

### 6. Privacidade e licenças
- **Política de privacidade:** presente e coerente com o que o site faz (nada enviado, sem cookies, sem medição, sem gravação no navegador; links externos explicados; direitos da LGPD). Dados da empresa provisórios (`TROCAR` no `config.js`; sem JS aparecem "a informar"). Sem aviso de cookies, o que está correto porque não há coleta.
- **Dados pessoais de terceiros em `site/`:** nenhum. Os nomes que aparecem em "Seguido(a) por" nos prints de referência não estão em `site/` nem nos `.md` de `projeto/` (grep). Eles existem só nas imagens de `projeto/materiais/referencias/` (S2).
- **Fonte:** `site/fontes/outfit-variable-latin.woff2` (WOFF2 válido) com `site/fontes/OFL-Outfit.txt` (SIL OFL 1.1, copyright "The Outfit Project Authors"). Uso comercial permitido. Fraunces e Manrope não estão mais em `site/fontes/`.
- **Imagens:** 5 WebP + favicons, todos derivados de `projeto/materiais/imagens/` (Instagram do cliente), registrados em `origem-imagens.md` como "sem autorização; uso só em demonstração". Nenhum metadado EXIF/XMP nos WebP. Conferi visualmente `fabrica.webp` (sem marca de máquina legível; o painel da máquina já aparece desfocado) e `lavabo.webp` (sem seta e sem pontinhos do Instagram). Nenhuma imagem de `referencias/` em `site/`.
- **Template AERRA (GetLayers):**
  - Licença **não verificada**: não há `TEMPLATE.txt` nem pasta do AERRA em `vellora-time/templates/` (só o `README.md`), e a pasta `projeto/materiais/referencias/layout/` não existe.
  - **Risco de cópia: baixo, com a limitação de que não pude comparar com o template** (não há cópia dele no repositório). O que dá para afirmar: em `site/` não há menção a AERRA, GetLayers, Webflow, Framer ou three.js, nem atributos típicos de exportação (`data-w-id`, `wf-`), nem URLs de assets externos, nem texto de exemplo (lorem). Os textos são da bio e das frases públicas da Spazio 61, os ícones SVG são simples e próprios, e as notas registram que só estrutura, ritmo e movimento foram usados, sem marca 3D, giro 360°, revelação por pixels, números ou depoimento. O que foi aproveitado (nav de vidro, título em duas partes, grade 3×3 com diagonal vazia, pré-carregador com contador) é padrão de layout, não código, texto nem asset.
  - **O que falta para adotar:** conferir a licença do AERRA no GetLayers (uso comercial em projeto de cliente, atribuição, limite de projetos, revenda), criar `vellora-time/templates/<nome>/TEMPLATE.txt` preenchido (origem, licença, data da conferência, quem conferiu), confirmar que nenhum código, texto, SVG, imagem, fonte ou URL do template foi copiado e que o resultado é adaptado ao cliente (contrato, cláusulas 6.5 e 9.1). Se a licença não permitir, manter só as ideias genéricas de layout.

### 7. Estrutura e exposição
- `site/` só tem arquivos do site (3 HTML, `config.js`, `_headers`, `css/`, `js/`, `fontes/`, `assets/`). Nenhum `.md`, nota, log ou arquivo interno.
- `projeto/` fica na raiz, fora de `site/`. Nada em `site/` aponta para `projeto/`.
- Nenhuma pasta de logs ou de prints de teste no repositório (`.playwright-mcp/` não existe; os prints do teste ficaram no scratchpad, fora do repositório).
- **Teste local**, feito pelo agente `seguranca` em 16/11/2026, com `python -m http.server 8791 --bind 127.0.0.1 --directory site` e `curl` (só GET, saída descartada); servidor encerrado no fim:

| Caminho | Código |
|---|---|
| `/` e `/index.html` | 200 (esperado) |
| `/config.js` | 200 (esperado; só dados públicos e provisórios) |
| `/_headers` | 200 (só no servidor local; ver S10) |
| `/projeto/seguranca.md` | **404** |
| `/projeto/qa.md` | **404** |
| `/projeto/briefing.md` | **404** |
| `/projeto/notas-construcao.md` | **404** |
| `/projeto/trocas-ao-fechar.md` | **404** |
| `/../projeto/briefing.md` e `/%2e%2e/projeto/briefing.md` (tentativa de sair da pasta) | **404** |
| `/docs/revisoes-seguranca/` | **404** |
| `/.git/config` e `/.gitignore` | **404** |
| `/nao-existe-xyz` | 404 |

Conclusão local: **`projeto/` não está exposto** quando só `site/` é servido.

- **Endereço publicado: não testável, sem prévia publicada.** Testar antes de qualquer prévia `*.pages.dev`: confirmar que a Cloudflare publica só `site/` (pedir a configuração do deploy ao Lucas ou ao Carlos) e rodar no endereço da prévia `/projeto/seguranca.md`, `/projeto/qa.md`, `/projeto/briefing.md`, `/docs/revisoes-seguranca/` e `/_headers`, esperando 404. Conferir também que os cabeçalhos do `_headers` chegam de fato (`curl -sI`) e que Rocket Loader, Zaraz e Web Analytics automático estão desligados.

## Próximos passos
1. Lucas: decidir sobre os prints de `referencias/` (S2) **antes** do commit do coordenador.
2. Demonstração: mostrar só ao cliente, por arquivo local, vídeo ou prints.
3. Ao fechar: `trocas-ao-fechar.md` inteiro, licença do AERRA (S4), S5 a S7 e S9; depois, nova revisão da segurança com o teste de exposição no endereço da prévia e no público.
