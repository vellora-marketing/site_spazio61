# QA · Spazio 61

> Arquivo interno (`projeto/`), nunca publicado nem compartilhado com o cliente.

- **Data:** 16/11/2026
- **Etapa:** demonstração (site de abordagem, sem contrato), construção v2 do `construtor-de-site`
- **Revisado:** `site/index.html`, `site/politica-de-privacidade.html`, `site/404.html`, `site/config.js`, `site/_headers`, `site/css/`, `site/js/`, `site/assets/`, `site/fontes/`
- **Como:** servidor Python local (porta 8790, script no scratchpad) que aplica os cabeçalhos de `site/_headers` (CSP de verdade) e serve a `404.html` com status 404. Playwright (Chromium) em 390, 768, 1280 e 1440 px. Contraste medido com script: cor do texto contra o fundo efetivo (composição das camadas) e, no vidro e nos gradientes, contra os pixels reais do print. O site não foi editado.

## Problemas encontrados

| # | O quê | Onde | Gravidade |
|---|---|---|---|
| 1 | Selo "a confirmar" do endereço com contraste **1,74:1** (exigido 4,5:1). O painel claro fica dentro de `.escuro`, então vale a regra `.escuro .selo` (cor `#B8AFA3`, feita para fundo escuro) sobre o painel `#E9E6E1`. Fica quase invisível justamente no aviso de dado a confirmar. Ele também herda o caixa-alta de `.info-titulo` ("A CONFIRMAR"), diferente dos outros selos | `index.html`, Contato, `.info-titulo .selo`; `css/style.css` (`.escuro .selo`) | **média** |
| 2 | Nav de vidro sobre fundo claro: texto `#F4F1EC` sobre o vidro escuro a 55 % por cima do off-white dá fundo efetivo ≈ `#7C7A74` → **3,81:1** nos links (15 px, peso 400) e 3,89:1 no "Spazio 61" (15 px, peso 500). Medido nos pixels do print em 1440 px (Sobre e Projetos) e 4,24:1 em 390 px. Reprova AA (4,5:1). Sobre fundo escuro passa com folga (≈ 15:1). Visualmente a barra também vira um cinza meio "sujo" sobre as seções claras | `.nav-barra` (`css/style.css`, `background: rgba(26,23,18,0.55)`) | **média** |
| 3 | Projetos: 4 das 6 posições são placeholders "Foto a confirmar". Está correto pelo briefing, mas é a seção mais fraca para mostrar: a grade fica com 2 fotos e 4 caixas hachuradas (na tela grande, a segunda linha inteira é placeholder) | Seção Projetos | baixa (depende das fotos do Lucas) |
| 4 | Foto da fábrica: nenhuma marca legível (ok), mas a área quadriculada/pixelada no cabeçote da máquina parece uma marca "censurada". O cliente pode estranhar | `assets/fabrica.webp`, seção Sobre | baixa |
| 5 | Endereço da política escrito direto no HTML (não vem do `config.js`, ao contrário da página inicial) e sem o selo "a confirmar". Se o endereço mudar, ficam dois lugares diferentes | `politica-de-privacidade.html`, item 1 | baixa |
| 6 | "Pular para o conteúdo": vai para `#conteudo`, mas o foco fica no `BODY` (o `<main>` não tem `tabindex="-1"`). No Chrome o próximo Tab segue do lugar certo, mas leitores de tela podem não anunciar o salto | `index.html`, `<main id="conteudo">` | baixa |
| 7 | Link "@spazio.61" dentro da frase da seção Projetos sem o aviso "(abre em nova aba)" para leitor de tela, que os outros links externos têm | `index.html`, `.projetos-topo .lead a` | baixa |
| 8 | No celular, espaço vazio grande entre o botão do topo e o "spazio 61" gigante (390 × 844): o topo parece meio vazio no primeiro olhar | Topo, 390 px | baixa |
| 9 | Legenda "A loja, na Asa Sul" afirma o bairro como fato, enquanto o endereço está "a confirmar" | Sobre, legenda da foto da loja | baixa |
| 10 | Áreas de toque menores que 44 px: "@spazio.61" (22 px de altura) e "Política de privacidade" no aviso do formulário (17 px). São links dentro de frase (exceção "inline" da WCAG 2.5.8); registro só para ciência | Projetos e formulário | baixa |
| 11 | Se o `boot.js` carregar e o `main.js` falhar, o botão do menu aparece no celular mas não abre (o painel fica escondido). Caso raro | `js/boot.js` + CSS `.has-js` | baixa |

Nenhum problema de gravidade **alta**.

## O que foi conferido e passou

**Rede e console**
- Todas as requisições (HTML, CSS, JS, `config.js`, fonte, 5 imagens) foram ao `127.0.0.1`. **Nenhum domínio externo.** Links externos (WhatsApp, Instagram, Google Maps) são só `<a>`, sem iframe.
- Console: **0 erros e 0 avisos do site** com a CSP do `_headers` ativa, nas 4 larguras (os únicos avisos foram do meu script de medição com canvas).
- Cabeçalhos do `_headers` presentes na resposta: CSP `'self'`, `X-Robots-Tag: noindex, nofollow`, nosniff, DENY, Referrer-Policy, Permissions-Policy, COOP. Nenhum `style=""`, `on*=` ou `<script>` inline.

**Layout**
- Sem rolagem horizontal em 390, 768, 1280 e 1440 px (`scrollWidth` = `clientWidth`). Política também.
- Grade de cartões: 3 × 3 com a diagonal vazia em ≥ 1024 px, 2 colunas no tablet, 1 no celular. Revelação no conteúdo do cartão, não no cartão.
- Prints: `C:\Users\boani\AppData\Local\Temp\claude\67facc89d050d7e4\5faaba9e-a36a-4401-9903-d54d121a55fa\scratchpad\qa-*.png`.

**Contraste (WCAG AA)**
- Texto principal `#1A1712` / `#F4F1EC` 15,86:1; texto suave `#5A5248` / `#F4F1EC` 6,81:1 (no painel do contato 6,17:1).
- Selos "a confirmar" sobre claro 6,81:1; nos cartões de vidro, medido nos pixels, de 6,06 a 7,40:1. Só o selo do endereço reprova (problema 1).
- Rótulos do formulário e campos 14,37:1; erro `#B42318` ok; aviso de demonstração 13,30:1; texto LGPD 6,17:1.
- Botões: branco sobre `#0E0C09` 19,53:1; botão claro 15,86:1. Não há texto branco sobre `#00973A` (só a seta, elemento gráfico, ≥ 3:1).
- Palavra-chave verde: `#00742C` sobre claro 5,27:1; `#5CD46C` sobre escuro 9,44:1 (sobre o halo verde da seção Linhas, 6,48:1).
- Topo: título atenuado 5,81:1, legenda e subtítulo 8,25:1, "como você merece" 17,87:1.
- Nav de vidro sobre escuro ≈ 15:1; sobre claro reprova (problema 2).

**Teclado**
- Ordem de Tab: pular → logo → menu → CTA do topo → CTA do Sobre → … → formulário (nome, telefone, e-mail, link da política, Enviar). Coerente com a leitura.
- Foco visível em tudo: contorno de 2 px verde-escuro no claro e verde-claro no escuro; no painel claro do contato, verde-escuro.
- Menu do celular (390 e 768 px): fechado com `inert` (fora da tabulação), Enter abre (`aria-expanded="true"`), Tab entra em "Sobre", Escape fecha e devolve o foco ao botão. Em 1280 px o hambúrguer some e os links ficam acessíveis.
- Formulário só com teclado: Enter em "Enviar" com campos vazios → `aria-invalid` + `aria-describedby` nos 3 campos, mensagens claras e foco no primeiro erro. Telefone curto → foco vai para o telefone. Dados válidos → mensagem em `role="status"`.

**Movimento reduzido** (`emulateMedia reducedMotion: reduce`)
- Sem pré-carregador, tudo visível de imediato (0 elementos com opacidade < 1, inclusive depois de rolar), letras do topo paradas.
- `requestAnimationFrame` instrumentado: **0 chamadas** com a página parada (1,5 s) e 0 depois de rolar. Sem reduced-motion, com a página parada também 0 (o rAF só roda quando há scroll).

**Formulário**
- Nenhuma requisição ao enviar; URL não muda; `localStorage`, `sessionStorage` e cookies vazios; campos limpos depois do sucesso.
- Texto honesto: aviso "Demonstração: este formulário não envia nem guarda nenhum dado", texto LGPD com link para a política e mensagem de sucesso dizendo que nada foi enviado nem guardado. A política diz a mesma coisa (sem cookies, sem medição).

**file://**
- `index.html` por `file://`: fonte Outfit, 6/6 imagens, `config.js` e link do WhatsApp (`https://wa.me/5561900000000?text=Teste%20da%20demonstra%C3%A7%C3%A3o%20Spazio%2061`) funcionam; grade de projetos montada (6 itens). Política também funciona por `file://`.
- 404 sem estilo por `file://` é esperado (caminhos absolutos a partir de `/`). Pelo servidor, `/x/y/z` devolve a 404 com o estilo do site.

**Conteúdo e escopo**
- Só textos permitidos (bio, frases públicas, rótulos funcionais e descrições neutras marcadas "a confirmar"). Nada de números, depoimentos, clientes, prêmios, prazos ou promessas. Nenhuma ocorrência de Morbidelli, SCM, Manhattan, Casa Cor ou "hotelaria".
- Imagens conferidas com a ferramenta Read: lavabo **sem** a seta e os pontinhos do Instagram; fábrica **sem** marca legível (ver problema 4); sem pessoas; nenhum slide de carrossel nem nada de `referencias/`.
- "Vellora" não aparece no site, nem identidade da Vellora (sem `#06121F`, ciano ou Inter).
- "TROCAR" só em `site/config.js`. `noindex, nofollow` nas 3 páginas e no `_headers`. Nenhuma referência a `projeto/`; nenhum arquivo interno em `site/`.
- Escopo: 5 seções (Topo, Sobre/como funciona, Linhas, Projetos, Contato) + política + 404. Dentro do limite.

## Avaliação para mostrar ao cliente
O visual está premium, quente e coerente com a marca: verde da Spazio usado com parcimônia, alternância off-white/escuro com bom ritmo, "spazio 61" gigante e fino no topo bem resolvido, cartões de vidro com halos verde e madeira ficam elegantes, e o contato é claro. A tipografia fina (Outfit) funciona. Os pontos fracos são a grade de projetos com 4 placeholders (problema 3) e a nav cinza sobre as seções claras (problema 2), que aparecem logo na primeira rolagem.

## Conclusões

**(a) Demonstração: pode mostrar ao cliente**, de preferência depois de corrigir os dois itens de gravidade média (selo do endereço e nav sobre fundo claro), que são acertos pequenos de CSS. Se der, trocar alguns placeholders de Projetos por fotos antes da apresentação.

**(b) Publicação real: BLOQUEADO** (esperado nesta etapa). Motivos:
1. 13 itens "TROCAR" em `site/config.js` (WhatsApp provisório e inválido, razão social, CNPJ, e-mail, data da política, `demonstracao: true`, 4 placeholders de projeto).
2. `noindex, nofollow` ativo nas 3 páginas e `X-Robots-Tag` no `_headers`.
3. Formulário simulado: falta o `/api/lead` real (Turnstile, limite por IP, planilha privada) e a política atualizada com para onde vão os dados.
4. Avisos de "Demonstração" no formulário, na política e no rodapé.
5. Dados "a confirmar" (endereço, etapas, descrições das 6 linhas, Mesas e Poltronas) sem confirmação por escrito.
6. Imagens sem autorização do cliente (`origem-imagens.md`).
7. Licença do template AERRA não verificada.
8. Sem contrato, pagamento nem ok do cliente; parecer da segurança pendente.
9. Problemas 1 e 2 (contraste) ainda abertos.

## Reteste 16/11/2026

Reteste rápido depois das correções do construtor (`notas-construcao.md`, seção 12). Servidor Python com os cabeçalhos do `_headers` (CSP ativa) na porta 8792, Playwright em 390 e 1440 px. Contraste medido nos pixels do print, com a cor do texto lida na hora (a nav agora troca de tema). Sem prints de página inteira.

| # | Item | Resultado |
|---|---|---|
| 1 | Selo "a confirmar" do endereço | **Resolvido.** `#5A5248` sobre o painel: **6,17:1** em 390 e 1440 px. Sem caixa-alta, igual aos outros selos |
| 2 | Nav de vidro sobre fundo claro | **Resolvido.** A nav fica clara (`.nav-clara`, texto `#1A1712`) sobre as seções claras. Links em 1440 px: Sobre 15,86:1, Projetos 15,43:1. Sobre escuro: topo 15,3 a 15,5:1, Linhas 14,9 a 15,2:1. "Spazio 61" em 390 px (mediana do fundo): topo 15,3:1, Sobre 15,7:1, Projetos 12,8:1, Linhas 14,6:1. A barra clara sobre as fotos de Projetos ficou limpa (sem o cinza "sujo") |
| 3 | Pular para o conteúdo | **Resolvido.** Foco vai para o `MAIN#conteudo` (`tabindex="-1"`) em 390 e 1440 px e na política |
| 4 | Aviso "(abre em nova aba)" | **Resolvido.** No @spazio.61 de Projetos e nos 3 botões de WhatsApp (acrescentado pelo JS) |
| 5 | Legenda da loja | **Resolvido.** Agora "A loja Spazio 61" |
| 6 | Endereço da política | **Resolvido.** Vem do `config.js` (`endereco.busca`), com reserva no HTML e selo "a confirmar" |
| 7 | Vão no topo do celular | **Resolvido.** Em 390 px a marca "spazio 61" vem logo depois do botão |

- Console: **0 erros e 0 avisos** com a CSP ativa.
- Rede: **nenhuma requisição externa**.
- Sem rolagem horizontal em 390 px.
- Seguem abertos, todos de gravidade baixa e não pedidos nesta rodada: 3 (4 placeholders em Projetos), 4 (quadriculado na foto da fábrica), 10 (dois links dentro de frase menores que 44 px, exceção da WCAG) e 11 (menu do celular se o `main.js` falhar).

### Conclusões atualizadas

**(a) Demonstração: pode mostrar ao cliente.** Não há mais problema de gravidade alta nem média. Recomendado, se possível, trocar alguns placeholders de Projetos por fotos antes da apresentação.

**(b) Publicação real: BLOQUEADO** (esperado nesta etapa). Motivos:
1. 13 itens "TROCAR" em `site/config.js` (WhatsApp provisório e inválido, razão social, CNPJ, e-mail, data da política, `demonstracao: true`, 4 placeholders de projeto).
2. `noindex, nofollow` ativo nas 3 páginas e `X-Robots-Tag` no `_headers`.
3. Formulário simulado: falta o `/api/lead` real (Turnstile, limite por IP, planilha privada) e a política atualizada com para onde vão os dados.
4. Avisos de "Demonstração" no formulário, na política e no rodapé.
5. Dados "a confirmar" (endereço, etapas, descrições das 6 linhas, Mesas e Poltronas) sem confirmação por escrito.
6. Imagens sem autorização do cliente (`origem-imagens.md`).
7. Licença do template AERRA não verificada.
8. Sem contrato, pagamento nem ok do cliente; parecer da segurança pendente.

Os dois problemas de contraste (1 e 2) estão resolvidos e saíram dos motivos.
