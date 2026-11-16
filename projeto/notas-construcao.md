# Notas de construção · Spazio 61 (demonstração) · versão 3, template Leeward

> Arquivo interno (`projeto/`), nunca publicado nem compartilhado com o cliente.
> Autor: construtor-de-site · 16/11/2026. Substitui as notas da versão anterior (AERRA, commit 3c01366, que continua no histórico do git).

## 1. O que foi feito
O site foi refeito a partir do prompt do template **Leeward** (GetLayers), adaptado à Spazio 61, conforme as decisões do Lucas de 16/11/2026:
1. **Animações como o prompt pede:** GSAP + ScrollTrigger + Lenis (scroll suave). Por causa da CSP estrita, as bibliotecas estão hospedadas em `site/js/vendor/` em vez de vir do CDN.
2. **Estrutura de arquivos + CSP estrita:** os estilos inline do template viraram classes. Não há `style=""` no HTML, nem no HTML gerado por JS. Posições e cores dinâmicas são aplicadas via CSSOM (`element.style`), que a CSP permite.
3. **5 seções adaptadas** (mapeamento na seção 4).
4. **Topo escuro com módulos**, com um placeholder identificado para foto ou vídeo em alta.

Páginas: `index.html` (5 seções), `politica-de-privacidade.html` e `404.html`.

## 2. Arquivos de `site/`
| Arquivo | O que é |
|---|---|
| `index.html` | Página única. Textos de reserva iguais aos do `config.js` |
| `politica-de-privacidade.html` | Política (dados TROCAR vêm do `config.js`) |
| `404.html` | Página de erro com o visual do topo; caminhos absolutos a partir de `/` |
| `config.js` | Todos os textos, dados provisórios (TROCAR), itens "confirmar" e a lista de fotos |
| `css/style.css` | Grid Kelder, tokens e componentes |
| `js/vw.js` | Síncrono no `<head>`: define `--vw`/`--vw-full` e troca `no-js` por `js` |
| `js/preloader.js` | Monta as faixas de módulos do pré-carregamento antes da primeira pintura. Se o `main.js` não rodar, o pré-carregamento some sozinho em 4 s |
| `js/cfg.js` | Preenche textos e links (WhatsApp, mapa, Instagram, e-mail, ano) a partir do `config.js`. Usa só `textContent` e atributos |
| `js/main.js` | Movimento, faixa de módulos do topo, menu, formulário simulado, cursor |
| `js/vendor/` | `gsap.min.js` e `ScrollTrigger.min.js` (3.15.0), `lenis.min.js` e `lenis.css` (1.3.26), com as licenças |
| `fontes/` | Archivo variável (latin) + `OFL-Archivo.txt` |
| `assets/` | Logo, favicons e as 4 fotos WebP (inalteradas desde a versão anterior) |
| `_headers` | CSP e demais cabeçalhos + `X-Robots-Tag: noindex, nofollow` (inalterado; continua válido) |

Caminhos: `index.html` e a política usam caminhos relativos; a `404.html` usa caminhos absolutos (por isso, aberta por `file://`, fica sem estilo, o que é esperado).

## 3. Bibliotecas, fonte e licenças
| Item | Versão | Origem | Licença |
|---|---|---|---|
| GSAP (`gsap.min.js`) | 3.15.0 (existe, versão exata do prompt) | jsDelivr `gsap@3.15.0/dist/` (baixado uma vez, hospedado em `site/js/vendor/`) | GSAP Standard "No Charge" License (Webflow): uso comercial permitido em sites, inclusive quando o cliente paga para criar o site. Texto copiado em `js/vendor/LICENSE-gsap.txt`. Restrição: não usar em ferramenta visual que concorra com o Webflow (não é o caso) |
| ScrollTrigger | 3.15.0 | idem | idem |
| Lenis (`lenis.min.js`, `lenis.css`) | 1.3.26 (versão exata do prompt) | jsDelivr `lenis@1.3.26/dist/` | MIT (`js/vendor/LICENSE-lenis.txt`). A linha `sourceMappingURL` foi removida para não pedir o `.map` |
| Archivo (variável, pesos 100–900, usados 400 e 500) | Fontsource `@fontsource-variable/archivo@5`, arquivo `latin-wght-normal` | jsDelivr; licença do repositório google/fonts | SIL OFL 1.1 (`fontes/OFL-Archivo.txt`). Não foi usada a cópia do GetLayers |

A Outfit (versão anterior) foi apagada. O glifo "→" não existe no subconjunto latin, então as setas são SVG.

## 4. Template Leeward: uso e licença
- **Licença NÃO verificada.** Antes de qualquer uso comercial ou publicação real: conferir a licença no GetLayers e registrar em `vellora-time/templates/` (TEMPLATE.txt com origem, licença e data), conforme REGRAS-VELLORA.
- **Aproveitado (estrutura e movimento):**
  - grid Kelder (quatro quadros 1440/1024/768/390, font-size da raiz por faixa, pesos `--raw-w*`, `fl()` no JS, módulo = coluna + calha, faixas de borda a borda);
  - tabela de tipos e espaçamentos;
  - pré-carregamento de módulos com contador real;
  - cabeçalho que fica sólido e some ao rolar para baixo;
  - menu móvel com anéis de módulos;
  - títulos que abrem por quadrados (`clip-path: path()`);
  - faixa de tiles no topo com dissolução em módulos no scroll e tiles de vidro que reagem ao ponteiro;
  - frase com fotos inline e véu de células;
  - pin de etapas com chegada em módulos e linha do tempo;
  - cards altos com scroller no celular;
  - marquee;
  - rodapé com cartão de vidro e parallax;
  - cursor customizado;
  - eases e durações.
- **Não copiado:**
  - textos, nomes, wordmark e SVGs (cata-vento, turbinas, logos de parceiros);
  - fotos, vídeos e URLs de assets (nenhuma referência a `storage.getlayers.ai`);
  - o banner de falha de assets, que é do template;
  - o CSS compilado do Tailwind (o CSS foi reescrito com classes próprias).
  - O código JS foi reescrito/adaptado a partir da referência. A lógica de movimento segue a do template.
- **Mapeamento das 7 seções do Leeward para as 5 da Spazio:**

| Leeward | Spazio 61 |
|---|---|
| Hero (filme + tiles + números + MW ao vivo) | 1. **Topo** escuro com grade de módulos. Tiles com textos públicos (Marcenaria / Casa e empresa / Brasília/DF) e o módulo do WhatsApp no lugar do "Output right now" |
| What we do (frase com fotos inline) | 2. **O que fazemos**: "Marcenaria [sala] descomplicada, / móveis planejados [lavabo] / para casa [loja] e empresa." |
| Process (pin de 4 etapas) | 3. **Como funciona**: pin de 3 etapas (Atendimento → Projeto → Execução), todas "a confirmar" |
| Field planner | **removido**: dependia de números (hectares, valores) que não existem |
| Neighbours (3 cards) | 4. **Linhas e projetos**: card de foto (sala de jantar), card branco com foto (lavabo), card verde com as 6 linhas |
| Partners (marquee de logos) | Virou marquee com os **nomes das 6 linhas**, dentro da seção 4. Sem logos e sem parceiros |
| Footer (cartão de vidro sobre filme) | 5. **Contato**: cartão de vidro sobre fundo escuro de módulos; formulário simulado, endereço, mapa, Instagram e módulo do WhatsApp |
| Live wind (vento e MW ao vivo) | **removido**: dado inventado. O ponto "ao vivo" virou o ponto verde do WhatsApp |

- **Desvios do prompt (registrados):**
  - bibliotecas hospedadas no site (CSP 'self');
  - âncoras tratadas pelo próprio `main.js` (deslizam com o Lenis e levam o foco ao destino, o que o `anchors: true` do Lenis não faz);
  - sem banner de falha (nada é carregado de fora);
  - Lenis guiado pelo ticker do GSAP;
  - com movimento reduzido, o ScrollTrigger é desligado (`ScrollTrigger.disable()`), porque mantém um laço de requestAnimationFrame; assim nada roda com a página parada;
  - as palavras das etapas usam um tamanho Display próprio por quadro (150/100/72/52), porque "Atendimento" não cabia no Display do template.

## 5. Imagens (todas pequenas; nenhuma em tela cheia, no topo, em fundo ou esticada)
| Arquivo | Origem | Onde aparece |
|---|---|---|
| `assets/sala-de-jantar.webp` (694×862) | `Captura de tela 2026-11-13 130815.png` | Foto inline (150×72), card de foto (~435×690, reduzida), tile do menu |
| `assets/lavabo.webp` (622×812) | `130909.png` recortado (sem a seta e os pontinhos do Instagram) | Foto inline, card branco (~410×440), — |
| `assets/loja-spazio-61.webp` (696×865) | `130557.png` | Foto inline circular (72×72), tile do menu |
| `assets/fabrica.webp` (568×552) | `130957.png` recortado (sem a marca da máquina) | Quadro pequeno na etapa Execução (≤ 22rem) |
| `assets/logo-spazio-61.webp` | `logo spazio.jpg` | Cabeçalho, rodapé, 404 |
Todas: uso só em demonstração, sem autorização do cliente (ver `projeto/materiais/origem-imagens.md`).

## 6. Placeholders (identificados com `data-placeholder` + rótulo "… a confirmar")
1. **Topo:** "Foto ou vídeo do topo a confirmar". Hoje o topo é um fundo escuro com módulos. Com um vídeo/foto em alta (≥ 1920 px), dá para pôr no `.hero-fundo` e ligar o filme.
2. **Como funciona · Atendimento:** "Foto do atendimento a confirmar". A composição atual é de cor e módulos.
3. **Como funciona · Projeto:** "Foto do projeto a confirmar". A composição atual é uma prancheta com linhas.
4. **Linhas e projetos:** só 2 projetos com foto. Novos projetos entram como novos cards (o scroller do celular já comporta mais).

## 7. Itens do `config.js`
- **TROCAR (13):**
  - `demonstracao`;
  - `whatsapp.numero`, `whatsapp.exibicao` e `whatsapp.mensagem`;
  - `empresa.razaoSocial`, `empresa.cnpj`, `empresa.email` e `empresa.atualizacaoPolitica`;
  - `topo.placeholderMidia`;
  - os 2 placeholders das etapas;
  - `contato.avisoDemo` e `contato.sucesso`.
- **confirmar:** endereço (linhas, CEP, busca do mapa), etapas e descrições das linhas.
- Nenhum TROCAR fora do `config.js`.

## 8. Testes feitos (16/11/2026)
Servidor local aplicando o `_headers` (CSP ativa) e Playwright em 1440, 1024, 768 e 390 px. Os prints estão no scratchpad da sessão (`leeward/`).
- **Console e rede:** console sem erros nem violações de CSP; nenhuma requisição a domínio externo.
- **Layout:** sem rolagem horizontal; pin funcionando nos 4 quadros; os quadrados da chegada somem depois de pousar.
- **Menu (390):** abre por teclado com os anéis; o foco vai para "Fechar menu" e o Tab fica preso no menu; o Esc fecha e devolve o foco ao botão; `inert` quando fechado; a rolagem é liberada.
- **Formulário:**
  - com erro, as mensagens aparecem nos campos e o foco vai ao primeiro;
  - com sucesso, a mensagem aparece em `aria-live`;
  - nada em localStorage, sessionStorage ou cookies, e nenhuma requisição.
- **Movimento reduzido:** sem Lenis, sem pin, sem pré-carregamento animado, títulos visíveis; 0 requestAnimationFrame em 1 s com a página parada; as etapas viram abas.
- **file://:** o JS, o GSAP, o Lenis, as imagens e o link do WhatsApp funcionam. **O Chrome bloqueia a fonte por `file://`** (CORS de fontes em origem `null`), então a página aparece com Arial. Para ver o site fiel, use um servidor local: `python -m http.server 8080 --directory site` e abra `http://localhost:8080`.
- **Limite conhecido:** sem movimento reduzido, o ScrollTrigger e o Lenis mantêm um laço de requestAnimationFrame enquanto a página está aberta (comportamento das bibliotecas).

## 8b. Correções da rodada QA/segurança (16/11/2026)
1. **Contraste na etapa "Projeto"**: o texto das etapas agora fica sobre um painel escuro (`rgb(26 23 18 / 0.8)`, cantos arredondados). Medido nos pixels dos prints, com a etapa Projeto ativa (fundo bege):
   - em 390 px: nome (#FFF) 13,87:1 na mediana e 8,77:1 no pior pixel de fundo; descrição e selo (#E6DED3) 10,41:1 e 6,58:1;
   - em 1440 px: nome 14,06:1 e 8,18:1; descrição e selo 10,55:1 e 6,14:1.
2. **Leitor de tela nas etapas**:
   - Os textos visuais das etapas (`.proc-textos`) ficaram `aria-hidden`.
   - Uma lista `.proc-lista` com as três etapas (nome, selo "a confirmar" e descrição) fica sempre na árvore de acessibilidade, em sr-only.
   - Com movimento reduzido, a lista aparece visível (3 colunas no desktop, empilhada no celular) e a linha do tempo, as palavras e o texto sobre a caixa somem (sem abas).
   - Os botões da linha do tempo têm `aria-controls="proc-caixa"`.
3. **Título das linhas**: "Nossas linhas." no `config.js` e no HTML de reserva.
4. **Comentários**: tirei do CSS, dos JS próprios e do `config.js` as menções ao template, à plataforma, à licença e a `projeto/`. A procedência fica só nestas notas.
5. **Formulário sem JS**: `method="dialog"`. Sem JS não há navegação nem dados na URL; com JS o envio continua simulado.
Testado em 390 e 1440 px com o `_headers` aplicado: console limpo; nenhuma requisição externa; movimento reduzido sem Lenis e sem pin, com a lista visível e 0 requestAnimationFrame em 1 s. Prints em `scratchpad/leeward/*-r2-*.png`.

## 9. Pendências
- **Lucas:**
  - conferir a licença do Leeward no GetLayers e registrar em `vellora-time/templates/`;
  - fotos em alta resolução (topo, etapas, mais projetos);
  - links dos posts de origem das imagens;
  - decidir se os 5 benefícios dos carrosséis entram;
  - confirmar "Mesas" e "Poltronas" nos destaques;
  - decidir se o `file://` com Arial basta ou se a fonte deve ir embutida (exigiria `font-src data:` na CSP).
- **Cliente, ao fechar:**
  - trocar os 13 TROCAR;
  - confirmar endereço, etapas e descrições;
  - autorizar as imagens;
  - ligar o formulário real (`/api/lead` + Turnstile; a CSP vai precisar liberar `challenges.cloudflare.com` e `connect-src 'self'`);
  - tirar o noindex e os avisos de demonstração.
- **QA e segurança:** revisar esta versão (os relatórios `projeto/qa.md` e `projeto/seguranca.md` ainda são da versão AERRA).
