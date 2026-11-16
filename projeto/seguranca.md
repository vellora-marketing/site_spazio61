# Segurança · Spazio 61 (demonstração) · versão 3, template Leeward

> Arquivo interno (`projeto/`), nunca publicado nem compartilhado com o cliente.
> Data: **16/11/2026**. Revisão feita pelo agente `seguranca` (só recomenda ou bloqueia; quem decide é o Lucas).
> Base: contexto do time **v3** (refazer com o template Leeward), `projeto/notas-construcao.md` (v3), `REGRAS-VELLORA.md` ("Regras de segurança") e o roteiro `.claude/agents/seguranca.md`.
> Substitui o relatório da versão anterior (AERRA, commit 3c01366), que continua no histórico do git.
> Nada foi corrigido, apagado, commitado ou enviado por esta revisão. A única escrita foi este arquivo.

## Pareceres

| Uso | Parecer |
|---|---|
| **(a) Demonstração local, vídeo e prints** (mostrar ao próprio cliente) | **LIBERADO COM RESSALVAS** (ver abaixo) |
| **(b) Publicação real** (domínio do cliente ou qualquer endereço público, inclusive prévia `*.pages.dev`) | **BLOQUEADO** (esperado nesta fase) |

**`projeto/` está exposto?**
- **No site: não**, no teste local. Com o servidor servindo só `site/`, `/projeto/seguranca.md`, `/projeto/qa.md`, `/projeto/briefing.md`, `/projeto/notas-construcao.md`, `/docs/revisoes-seguranca/`, `/.git/config`, `/.gitignore` e `/site/index.html` deram **404** (seção 6). O servidor local não tem fallback de página única: o 404 é o próprio 404, não a home.
- **No endereço publicado: não testável**, porque ainda não há prévia nem Cloudflare configurada. Testar antes de qualquer prévia e antes da publicação real; até esse teste, qualquer publicação fica BLOQUEADA.
- **No GitHub: sim, por desenho.** O repositório tem remoto `github.com/vellora-marketing/site_spazio61` (privado), e o `main` remoto já está no commit 3c01366, que contém `projeto/`. Isso é o esperado: `projeto/` fica no repositório privado, fora da pasta publicada. Condição: o repositório continuar **privado**, e a Cloudflare, quando configurada, publicar **só `site/`** (diretório de saída `site`, sem build). Quem configura é o Lucas ou o Carlos; esta revisão não alterou nada.

### Ressalvas da demonstração (a)
1. As imagens são do Instagram do cliente **sem autorização**: mostrar só ao próprio cliente (Spazio 61), por arquivo local, servidor local, vídeo ou print. Não postar, não usar em portfólio, não enviar a terceiros.
2. A estrutura e o movimento vêm do template **Leeward** (GetLayers), com **licença não verificada**. Para mostrar ao cliente em reunião, vídeo ou print, o risco é baixo; não usar a peça em portfólio nem em publicação até a licença ser registrada (S2).
3. Não publicar a demonstração em endereço público (nem prévia) sem o teste de exposição da seção 6 no endereço real e sem novo parecer.
4. Antes do próximo commit, decidir sobre os prints de `projeto/materiais/referencias/` (S6), que continuam fora do `.gitignore`.

### Motivos do BLOQUEADO para publicação real (b)
- **Licença do template Leeward (GetLayers) NÃO verificada**: não há `TEMPLATE.txt` em `vellora-time/templates/` (a pasta só tem o `README.md`). O site reaproveita a estrutura, o grid, a coreografia e o runtime de movimento adaptado do prompt do template, que trazia código "verbatim" (S2).
- Itens `TROCAR` em `site/config.js` (13 segundo as notas) e itens "a confirmar" (endereço, etapas, descrições das linhas).
- noindex ativo (meta nas 3 páginas e `X-Robots-Tag` no `_headers`), como deve ser na demonstração.
- Imagens sem autorização por escrito do cliente (S3).
- Formulário simulado: falta o servidor (`/api/lead` com validação no servidor, Turnstile, limite por IP e regra de firewall), conforme `projeto/trocas-ao-fechar.md` (S4).
- Exposição de `projeto/` não testada no endereço publicado; Cloudflare ainda não configurada para publicar só `site/`.

## Problemas encontrados

| # | Gravidade | Onde | Problema | Recomendação | Quem resolve |
|---|---|---|---|---|---|
| S1 | Alta (bloqueia publicação; esperado) | `site/config.js`, `site/*.html`, `site/_headers` | TROCAR, "a confirmar" e noindex ativos | Seguir `trocas-ao-fechar.md` ao fechar; buscar "TROCAR" em `site/` até zero; tirar noindex e avisos de demonstração só na publicação aprovada | Lucas (dados com o cliente) + construtor |
| S2 | **Alta (bloqueia adoção e publicação)** | Template Leeward (GetLayers): `site/css/style.css`, `site/js/main.js`, `site/js/preloader.js`, `site/js/vw.js`, estrutura do `index.html` | Licença não verificada. O prompt do template trazia código "verbatim"; o site reaproveita a estrutura (grid Kelder, `fl()`, `--raw-w*`, módulos), a coreografia e o runtime de movimento adaptado. Os textos, nomes, wordmark, SVGs, fotos, vídeos, URLs de assets e o CSS compilado **não** foram copiados (conferido: nenhuma ocorrência de `storage.getlayers.ai`, `getlayers` em URL, termos do Leeward como turbina, vento, MW, hectares). Mesmo assim, código-fonte adaptado de perto é cópia para fins de licença: se a licença do GetLayers não permitir uso comercial em projeto de cliente (ou exigir plano pago, atribuição ou limite de projetos), o JS e o CSS de movimento não podem ir para produção como estão. Também há risco contratual (cláusulas 6.5 e 9.1): o site entregue precisa ser adaptado, não uma cópia | Antes de adotar: (1) conferir no GetLayers a licença do Leeward (uso comercial em projeto de cliente, revenda, atribuição, limite de projetos, se exige assinatura ativa) e guardar print ou link da página da licença; (2) criar `vellora-time/templates/leeward/TEMPLATE.txt` com os campos do `templates/README.md` (nome, origem e link, licença, uso comercial sim/não e onde está escrito, restrições, data da conferência, conferido por); (3) se a licença exigir plano pago, registrar quem tem a licença comercial e avisar o cliente se houver custo (cláusula 9.3); (4) se não permitir, reescrever o movimento sem o código do template, mantendo só ideias gerais. Depois, nova revisão da segurança | Lucas (confere e registra) + construtor (se precisar reescrever) |
| S3 | Alta para publicação / Baixa para demonstração | `site/assets/*.webp`, `projeto/materiais/origem-imagens.md` | Imagens do Instagram do cliente sem autorização; links dos posts de origem "a anotar" | Autorização por escrito do cliente para cada imagem e registro em `origem-imagens.md`; anotar os links dos posts | Lucas |
| S4 | Alta para publicação | Formulário (`site/index.html`, `site/js/main.js`, linhas 264–292) | Envio simulado, validação só no navegador, sem servidor | Ao fechar: `/api/lead` na Cloudflare com validação no servidor, Turnstile, limite por IP + regra no firewall, CORS só do domínio e só `POST`, neutralização de fórmula (`=`, `+`, `-`, `@`), segredo e URL do Apps Script só nas configurações da Cloudflare, aprovação registrada dos serviços que recebem dados, política atualizada. Nova revisão depois | Construtor + Lucas/Carlos (aprovação) |
| S5 | Média (ao fechar) | `site/_headers` (CSP) e `site/politica-de-privacidade.html` | O Turnstile exige liberar `https://challenges.cloudflare.com` em `script-src` e `frame-src`, e `connect-src 'none'` bloqueia o `fetch` para `/api/lead`. A política, correta para a demonstração, ainda não cita destino dos dados, Turnstile, registros técnicos da hospedagem (IP), prazo de guarda e base legal | Ao ligar o formulário real: `connect-src 'self'`, `script-src 'self' https://challenges.cloudflare.com`, `frame-src https://challenges.cloudflare.com`, nada além disso. Atualizar a política; o cliente revisa com o assessor jurídico | Construtor + cliente |
| S6 | Média | `projeto/materiais/referencias/*.jpg` (7 prints) e `projeto/materiais/imagens/` (12 arquivos, ~7,8 MB), ambos **não rastreados** | Pendência da versão anterior: os prints de `referencias/` mostram dados pessoais de terceiros (perfis em "Seguido(a) por", avatar e notificações de quem capturou). O `.gitignore` não cobre essas pastas; um `git add -A` os levaria ao histórico e ao GitHub (privado, mas fica para sempre no histórico) | Não commitar `referencias/` como está: borrar/recortar ou manter fora do git (mover para `projeto/materiais/originais/`, já ignorada, ou incluir no `.gitignore`). Para `imagens/`, decidir se os originais do cliente vão para o repositório privado ou ficam só na máquina | Lucas (decide) + coordenador (antes do commit) |
| S7 | Baixa (antes de publicar) | Comentários em `site/css/style.css` (linhas 3–4), `site/js/main.js` (linha 4) e `site/js/vw.js` (linha 1) | Os arquivos publicados dizem "inspirados no template Leeward (GetLayers; licença não verificada, ver projeto/notas-construcao.md)". Na publicação, isso fica visível para qualquer pessoa e revela origem do layout, situação da licença e um caminho interno (que dá 404, então não há exposição de conteúdo) | Antes de publicar: tirar dos arquivos de `site/` a menção a "licença não verificada" e ao caminho de `projeto/`; o registro fica nas notas e no `TEMPLATE.txt` | Construtor |
| S8 | Baixa | Formulário sem JavaScript (`site/index.html`, `<form id="form-contato">` sem `action`/`method`) | Se o `main.js` não carregar ou falhar antes da linha 282, o envio do formulário vira um GET para a própria página com `nome`, `telefone` e `email` na URL (fica no histórico do navegador e nos registros do servidor). Não sai do próprio domínio (`form-action 'self'`), mas contraria "nada é enviado" | Na demonstração, aceitável. Na versão real, o formulário passa a ter `method="post"` e `action` para `/api/lead`; até lá, opcional: desabilitar o botão até o JS ligar o envio simulado | Construtor |
| S9 | Informativo | `site/_headers` | No servidor local (`python -m http.server`) o `/_headers` é entregue como arquivo comum (200, 675 bytes). Na Cloudflare Pages ele é lido como configuração. Não contém nada sensível | No teste da prévia, conferir `/_headers` (404 ou sem o arquivo) | Segurança (no teste da prévia) |
| S10 | Informativo | `site/js/vendor/lenis.min.js` | O arquivo não tem cabeçalho de copyright (o original do Lenis também não). A MIT exige o aviso junto: está atendida pelo `LICENSE-lenis.txt` na mesma pasta | Manter o `LICENSE-lenis.txt` sempre junto do `lenis.min.js` na publicação | Construtor |
| S11 | Informativo | `site/js/vendor/LICENSE-gsap.txt` | A licença "No Charge" do GSAP (Webflow) permite uso comercial em sites, inclusive com o cliente pagando para criar o site; proíbe uso em ferramenta visual que concorra com o Webflow e cobrança de acesso dos usuários finais. Nenhuma das duas se aplica | Nada a fazer. Se um dia o site cobrar acesso de usuário final, revisar | — |

## O que foi verificado

### 1. Segredos e `.gitignore`
- **Arquivos atuais** (`site/` e `projeto/`, por grep de `api_key`, `secret`, `token`, `password`, `senha`, chaves privadas, `ghp_`, `github_pat_`, `AKIA`, `sk-…`): nenhum segredo. As únicas ocorrências são a palavra "Tokens" (cores no CSS) e textos das notas.
- **Histórico do git** (`git log --all -p`, 4 commits, só leitura): nenhum segredo, chave, token, senha ou credencial da Cloudflare. Nenhum `.env`, `.log`, `.map` ou pasta do Playwright em qualquer commit.
- **Remoto**: `origin = github.com/vellora-marketing/site_spazio61` (privado, segundo o contexto do time), `main` remoto em 3c01366; nada local à frente além das alterações não commitadas desta versão. Esta revisão não fez push.
- **`.gitignore`**: cobre o bloco de segredos da Vellora (`.env`, `.env.*`, `*.key`, `*.pem`, `*.p12`, `*.pfx`, `.dev.vars`, `.dev.vars.*`, `.wrangler/`, `credentials.json`, `*credentials*.json`, `*.credentials`, `secrets.*`, `.claude/settings.local.json`), `.playwright-mcp/` e `projeto/materiais/originais/`. Não cobre `projeto/materiais/referencias/` nem `projeto/materiais/imagens/` (S6).
- **Pasta de logs**: existe `.playwright-mcp/` na raiz (4 arquivos, um deles `console-….log`), mas é **ignorada** pelo `.gitignore` e nunca foi rastreada (`git ls-files` e histórico sem ocorrências). Nenhuma pasta de logs no repositório.

### 2. `_headers` (`site/_headers`)
Uma regra `/*` com:
- `Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'none'; manifest-src 'self'; form-action 'self'; frame-ancestors 'none'; base-uri 'self'; object-src 'none'; upgrade-insecure-requests` → só `'self'`, **sem `unsafe-inline` e sem `unsafe-eval`**, sem domínio externo.
- `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Strict-Transport-Security: max-age=31536000; includeSubDomains`, `Permissions-Policy` (sensores, câmera, microfone, localização, pagamento, USB e browsing-topics desligados), `Cross-Origin-Opener-Policy: same-origin`, **`X-Robots-Tag: noindex, nofollow`**.
- O `img-src data:` não é usado hoje (nenhum `data:` em HTML, CSS ou JS); pode ficar, é de baixo risco.

### 3. Recursos externos, links e código inline (`site/`, HTML, CSS e JS próprios)
- **URLs `http(s)://`**: só links de navegação (WhatsApp `wa.me/5561900000000`, Google Maps, Instagram `@spazio.61`) em `index.html`, `politica-de-privacidade.html`, `config.js` e `js/cfg.js`. Nenhum script, folha de estilo, fonte, imagem ou iframe de fora.
- **`storage.getlayers.ai`, `cdn.jsdelivr.net`, `unpkg`, `googleapis`, `gstatic`**: nenhuma ocorrência. "Leeward"/"GetLayers" só em comentários (S7).
- **CSS**: único `url()` é a fonte local `../fontes/archivo-latin-wght-normal.woff2`; sem `@import`. `js/vendor/lenis.css` sem `url()`.
- **`target="_blank"`**: todos os 9 links no HTML e o tile do WhatsApp criado pelo `main.js` (linhas 188–189) têm `rel="noopener noreferrer"`.
- **Inline**: nenhum `<style>`, nenhum `style=""`, nenhum `<script>` com conteúdo e nenhum atributo `on*=` nas 3 páginas. Todos os scripts são `src=` locais (`vw.js` síncrono no `<head>`; `config.js`, vendor, `cfg.js` e `main.js` com `defer`; `preloader.js` no fim do `<body>`). Estilos dinâmicos via CSSOM (`element.style`/`setProperty`), permitido pela CSP.
- **noindex**: `<meta name="robots" content="noindex, nofollow">` em `index.html`, `politica-de-privacidade.html` e `404.html`.

### 4. `js/vendor`: versões, origem, rede e licenças
Comparação por SHA-256 com os arquivos publicados no jsDelivr (API de dados `data.jsdelivr.com`, só leitura):

| Arquivo | Versão no arquivo | Origem conferida | Resultado |
|---|---|---|---|
| `gsap.min.js` (72 927 B) | GSAP 3.15.0 (cabeçalho) | npm `gsap@3.15.0/dist/gsap.min.js` | **idêntico** (hash igual) |
| `ScrollTrigger.min.js` (44 575 B) | ScrollTrigger 3.15.0 (cabeçalho) | npm `gsap@3.15.0/dist/ScrollTrigger.min.js` | **idêntico** |
| `lenis.min.js` (18 685 B) | Lenis `1.3.26` (constante interna) | npm `lenis@1.3.26/dist/lenis.min.js` (18 722 B) | **idêntico ao original menos a última linha** `//# sourceMappingURL=lenis.min.js.map` (37 bytes), removida de propósito, conforme as notas |
| `lenis.css` (513 B) | — | npm `lenis@1.3.26/dist/lenis.css` | **idêntico** |

- **Rede e execução dinâmica** nos três `.js`: nenhuma ocorrência de `fetch(`, `XMLHttpRequest`, `sendBeacon`, `WebSocket`, `EventSource`, `importScripts`, `eval(`, `new Function`, `document.cookie`, `localStorage`, `sessionStorage`, `postMessage` ou `sourceMappingURL`. As únicas URLs no GSAP/ScrollTrigger são `gsap.com` em comentário de licença e os namespaces XHTML/SVG do W3C (não são requisições).
- **Licenças junto**: `LICENSE-gsap.txt` (Standard "No Charge" GSAP License, Webflow, texto copiado em 16/11/2026; uso comercial em sites permitido, inclusive com o cliente pagando para criar o site) e `LICENSE-lenis.txt` (MIT, darkroom.engineering). Ver S10 e S11.

### 5. JS próprio (`vw.js`, `preloader.js`, `cfg.js`, `main.js`, `config.js`)
- **`innerHTML`/`insertAdjacentHTML`**: 3 usos, todos com **strings fixas** no código, nunca com dados do `config.js` ou do usuário: `main.js:197` (SVG da seta, constante `SETA`), `main.js:387` (barras do botão de fechar) e `preloader.js:34` (rótulo "Carregando" e contador). Sem risco de XSS.
- **`cfg.js`**: preenche a página só com `textContent` e atributos; WhatsApp montado com dígitos (`replace(/\D/g, "")`) e `encodeURIComponent`; mapa com `encodeURIComponent`; Instagram só se a URL começar com `https://`; e-mail só se passar por um padrão sem espaços, `<`, `>` ou aspas. Bom.
- **Rede, armazenamento e cookies**: nenhum `fetch`, XHR, `sendBeacon`, `WebSocket`, `localStorage`, `sessionStorage`, IndexedDB, cookie ou `postMessage`. Nenhum `console.`, `debug` ou caminho local (`localhost`, `C:\`, nome de usuário) nos arquivos de `site/`.

### Formulário e política
- **Formulário simulado** (`main.js`, linhas 264–292): `preventDefault`, validação no navegador (nome ≥ 2, telefone 10–13 dígitos, e-mail), erros nos campos com `aria-invalid` e foco no primeiro; no sucesso, `reset()` e mensagem em `role="status"`. Nada é enviado nem guardado. Aviso honesto acima ("Demonstração: este formulário não envia nem guarda nenhum dado") e link para a política. Ver S8 para o caso sem JS.
- **Política** (`politica-de-privacidade.html`): coerente com o site. Diz que é demonstração, que o formulário não envia nem guarda dados, que não há cookies, medição nem gravação no navegador (confirmado: nem o código próprio nem GSAP/Lenis usam armazenamento), cita os links para WhatsApp, Instagram e Google Maps, direitos da LGPD e dados da empresa "a informar". Para a versão real, ver S5.

### Licenças
- **Fonte Archivo**: `site/fontes/archivo-latin-wght-normal.woff2` é **idêntica** (SHA-256) ao arquivo do Fontsource `@fontsource-variable/archivo` 5.2.6–5.2.8 (não é a cópia do GetLayers). `OFL-Archivo.txt` junto (SIL Open Font License 1.1, "Copyright 2020 The Archivo Project Authors"). Uso comercial permitido. A Outfit da versão anterior foi apagada de `site/fontes/` (ainda está no histórico, também OFL).
- **GSAP e Lenis**: ver seção 4.
- **Imagens**: do Instagram do cliente, sem autorização, só para demonstração (S3).
- **Template Leeward (GetLayers)**: licença NÃO verificada (S2). O que falta para adotar: `vellora-time/templates/leeward/TEMPLATE.txt` preenchido (origem e link, licença, uso comercial em projeto de cliente sim/não e onde está escrito, restrições, data da conferência, conferido por) e a confirmação da licença comercial (plano/assinatura, se houver custo).

### 6. Estrutura e exposição (teste local, 16/11/2026)
- **Estrutura**: `site/` contém só o site (3 HTML, `_headers`, `config.js`, `assets/`, `css/`, `fontes/`, `js/`, `js/vendor/`). Nada interno em `site/` (sem `.md`, sem relatórios, sem originais, sem `.map`, sem `.env`). `projeto/` fica na raiz, fora de `site/`.
- **Teste**: agente `seguranca`, 16/11/2026, `python -m http.server 8791 --bind 127.0.0.1 --directory site`, `curl` só com GET e saída descartada; servidor encerrado no fim.

| Caminho | Código | Tipo / tamanho | Conclusão |
|---|---|---|---|
| `/` e `/index.html` | 200 | text/html, 21 934 B | home |
| `/projeto/seguranca.md` | **404** | text/html, 460 B | não exposto |
| `/projeto/qa.md` | **404** | text/html, 460 B | não exposto |
| `/projeto/briefing.md` | **404** | text/html, 460 B | não exposto |
| `/projeto/notas-construcao.md` | **404** | text/html, 460 B | não exposto |
| `/docs/revisoes-seguranca/` | **404** | text/html, 460 B | não exposto |
| `/.git/config` | **404** | text/html, 460 B | não exposto |
| `/.gitignore` | **404** | text/html, 460 B | não exposto |
| `/site/index.html` | **404** | text/html, 460 B | não exposto |
| `/nao-existe-xyz` (controle) | 404 | text/html, 460 B | igual aos internos |
| `/_headers` | 200 | octet-stream, 675 B | esperado no servidor local (S9) |
| `/js/vendor/LICENSE-gsap.txt`, `/fontes/OFL-Archivo.txt` | 200 | text/plain | licenças públicas, devem ser publicadas |

- **Cloudflare**: ainda não configurada. Quando for, deve publicar **só `site/`** (diretório de saída `site`), com Rocket Loader, Zaraz e Web Analytics automático desligados (quebram a CSP) e branch de prévia até o ok. Depois, repetir esta tabela no endereço de prévia e no público (pelo `curl` ou com confirmação manual do Lucas ou do Carlos).

## Entrega (para quando fechar)
Lista de acessos temporários da Vellora a remover nas contas do cliente (Registro.br, planilha do cliente, redes sociais) e senhas que não podem ficar guardadas: **nenhum acesso do cliente foi usado nesta fase**. Reavaliar na entrega.
