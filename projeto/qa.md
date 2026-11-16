# QA · Spazio 61

> Arquivo interno (`projeto/`), nunca publicado nem compartilhado com o cliente.

- **Data:** 16/11/2026
- **Etapa:** demonstração (site de abordagem, sem contrato), **versão 3, template Leeward** (substitui o relatório da versão AERRA, que fica no histórico do git)
- **Revisado:** `site/index.html`, `site/politica-de-privacidade.html`, `site/404.html`, `site/config.js`, `site/_headers`, `site/css/style.css`, `site/js/` (`vw.js`, `preloader.js`, `cfg.js`, `main.js`, `vendor/`), `site/assets/`, `site/fontes/`
- **Como:** servidor Python local na porta 8790 (script no scratchpad) aplicando os cabeçalhos de `site/_headers` (CSP de verdade) e servindo a `404.html` com status 404. Playwright (Chromium) em 1440, 768 e 390 px, com e sem `prefers-reduced-motion`. Contraste medido de dois jeitos: (1) cor do texto contra o fundo efetivo (composição das camadas) e (2) nos fundos com gradiente, foto ou vidro, contra os pixels reais da tela (pior caso = percentil 95 dos pixels de fundo). O site não foi editado.

## Problemas encontrados

| # | O quê | Onde | Gravidade |
|---|---|---|---|
| 1 | **Contraste reprovado na etapa "Projeto".** O texto claro fica sobre a prancheta bege com sombra, e o fundo real é médio. Medido nos pixels: nome "Projeto" (22 px, peso 500, branco) **3,5 a 3,9:1** em 390 px e 3,9 a 4,2:1 em 1440 px (exigido 4,5:1, porque 22 px/500 não conta como texto grande); descrição "Desenho do ambiente…" (17 px, `#E6DED3`) **3,9 a 4,4:1** em 390 px; selo "a confirmar" (12 px) **2,8 a 3,0:1**. As etapas Atendimento (≈ 13:1) e Execução (≈ 10:1) passam com folga | `index.html`, Como funciona, `.proc-palco-1` + `.proc-sombra` (`css/style.css`) | **média** |
| 2 | **Etapas escondidas para leitor de tela.** Só a etapa ativa fica visível; as outras ficam com `visibility: hidden` (saem também da árvore de acessibilidade). Quem usa leitor de tela e lê a página em sequência ouve só uma das três etapas, conforme a posição da rolagem. Com movimento reduzido, as etapas viram "abas" (botões da linha do tempo, que funcionam pelo teclado e marcam `aria-current="step"`), mas a regra do contexto pede "tudo visível" no movimento reduzido. Os botões também não têm `aria-controls` | Como funciona, `[data-stage-text]` e `.lt-etapas` | **média** |
| 3 | **Frase inventada com número e promessa: "Seis linhas para cada ambiente."** Não está entre os textos públicos. "Seis" é contagem (a regra é "nada de números") e "para cada ambiente" é promessa que o cliente não fez. Sugestão: "Linhas" ou "Nossas linhas", ou outra frase pública | Linhas e projetos, card verde (`config.js`, `linhasProjetos.linhasTitulo`) | **média** |
| 4 | **Nome do template em arquivo publicado.** Os comentários do topo de `css/style.css` e `js/main.js` citam "Leeward" e "GetLayers; licença não verificada". Qualquer pessoa vê isso no código-fonte, e a regra é "nada do Leeward em nome". Não aparece na tela. Mover essa nota para `projeto/notas-construcao.md` | `css/style.css` (linhas 3–4), `js/main.js` (linha 4) | **média** (baixa para a demonstração; obrigatório tirar antes de publicar) |
| 5 | "Projetos publicados no Instagram @spazio.61." é verdade (as fotos vêm de lá), mas soa como nota de fonte e aparece igual nos dois cards. Aceitável; se quiser, deixar só em um card ou trocar por um texto público | Linhas e projetos, `linhasProjetos.fonte` | baixa |
| 6 | Textos das etapas ("Conversa com a nossa equipe…", "Desenho do ambiente…", "Produção e instalação…") e o título "Marcenaria descomplicada, do atendimento à execução." não são textos públicos. Estão marcados "a confirmar" e são neutros; "instalação" é um serviço que o cliente ainda não confirmou | Como funciona (`config.js`, `comoFunciona`) | baixa |
| 7 | Contorno de foco do botão "Projeto" (linha do tempo) passa por cima do texto "Etapas a confirmar com a Spazio 61." em 1440 px | `.lt-e button:focus-visible` e `.proc-aviso` | baixa |
| 8 | Link "Política de privacidade" no aviso do formulário com 36 px de altura (abaixo de 44 px). É link dentro de frase (exceção da WCAG 2.5.8); o mesmo link no rodapé tem 44 px | `.ft-lgpd a` | baixa |
| 9 | Marquee com os nomes das linhas em cinza claro de baixo contraste. É decorativo (`aria-hidden`) e repete o conteúdo do card verde, então não reprova; registro para ciência | `.marquee` | baixa |
| 10 | A palavra grande da etapa ("Execução", "Projeto") encosta na base da caixa em 390 px e a descida do "ç"/"j" fica cortada | `.proc-palavra`, 390 px | baixa |
| 11 | Topo sem foto: o fundo escuro com módulos e o rótulo "Foto ou vídeo do topo a confirmar" funcionam, mas o primeiro olhar depende de uma foto em alta que ainda não existe | Topo | baixa (depende das fotos do cliente) |

Nenhum problema de gravidade **alta**.

## O que foi conferido e passou

**Rede, console e CSP**
- Nenhuma requisição externa nas 3 páginas, em 1440, 768 e 390 px, rolando a página inteira (18 requisições, todas para o próprio servidor). Nada de `storage.getlayers.ai`, CDN ou fonte externa.
- Console sem erros nem violações de CSP nas páginas (a CSP bloqueou um script de teste injetado pelo próprio QA, o que confirma que está ativa). Na 404, o único erro é o próprio status 404 do documento, esperado.
- `.map` não é pedido (`sourceMappingURL` removido do GSAP, ScrollTrigger e Lenis).

**Contraste (AA)**
- Textos principais sobre `#F4F1EC`: tinta 15,9:1; texto suave `#5E554B` 6,5:1; sobre branco 7,3:1.
- Topo: título atenuado `#A89E92` 6,8:1 (texto grande), destaque branco 17,9:1, subtítulo 13,4:1, rótulo do placeholder 6,8:1.
- Tiles do topo: rótulos 6,5:1 e valores 15,9:1 nos claros; tile do WhatsApp com rótulo 12,6:1 e "WhatsApp" em verde claro `#5CD46C` 8,9:1 sobre `#241C15`.
- Selos "a confirmar": etapas Atendimento e Execução ≥ 9,7:1, endereço no rodapé 11,9:1, menu 6,5:1, política presente. **Falha só na etapa Projeto (item 1).**
- Botões: claros 15,9:1; escuro ("Fale com nossos consultores") 15,9:1; hover em `#00702B` com branco 6,3:1.
- Formulário (vidro escuro, medido em pixels): rótulos 12,2:1, aviso de demonstração 10:1, texto da LGPD 12,7:1, rótulos "Endereço"/"Instagram" 6,1:1, mensagens de erro `#FFB4A6` com folga.
- Cabeçalho: sobre o topo escuro, texto branco 17,9:1; ao voltar a subir sobre as seções claras ele fica sólido `#F4F1EC` com tinta 15,9:1 (medido em O que fazemos, Como funciona e Projetos).
- Textos em verde: `#5CD46C` só sobre escuro ("Fale com nossos consultores." 9,4:1, 404 e tile); card verde `#0B5A2D` com branco 8,4:1 e texto suave 6,8:1. Nenhum verde `#00973A` usado em texto pequeno.
- Card da sala de jantar (texto sobre foto com sombra, em pixels): título ≥ 10,8:1, texto ≥ 9,6:1.
- Contorno de foco `#00973A` 2 px: 3,4:1 sobre o claro e 4,7:1 sobre o escuro (mínimo 3:1).

**Teclado**
- "Pular para o conteúdo" aparece no primeiro Tab (48 px de altura, visível) e leva o foco ao `<main id="conteudo" tabindex="-1">`.
- Foco visível em links, botões e campos.
- Menu móvel (390 e 768 px): abre por Enter, o foco vai para "Fechar menu", o Tab fica preso no menu (volta ao início depois do último item), Esc fecha e devolve o foco ao botão, `aria-expanded` acompanha, o menu fica `inert` quando fechado. Clicar em "Contato" fecha o menu, desliza até o rodapé e leva o foco ao destino.
- Formulário só com teclado: Tab pela ordem nome → telefone → e-mail → link da política → Enviar; Enter envia.

**Movimento reduzido**
- Sem Lenis (sem classe `lenis`), sem pin (nenhum `pin-spacer`), pré-carregamento desligado, 0 `requestAnimationFrame` em 1 s parado, títulos e palavras visíveis, nenhuma opacidade 0 nos textos (exceto as etapas inativas, item 2). Console limpo.

**Formulário**
- Vazio: os três erros aparecem nos campos, `aria-invalid="true"`, `aria-describedby` ligado ao erro, foco no primeiro campo com erro.
- Dados inválidos: erro só nos campos errados, foco no primeiro deles.
- Válido: mensagem "Recebemos o seu contato. Nesta demonstração, nada foi enviado." em `role="status"`/`aria-live`, campos limpos, URL inalterada.
- Nenhuma requisição, nada em localStorage, sessionStorage ou cookies. Texto honesto ("Demonstração: este formulário não envia nem guarda nenhum dado.") e link para a política.

**Conteúdo**
- Textos públicos usados: bio, "Marcenaria descomplicada", "Móveis planejados de alto padrão", "Fale com a nossa equipe", "Fale com nossos consultores", "Home & Office", "Brasília", endereço com "a confirmar", @spazio.61, as 6 linhas e as 3 etapas "a confirmar". Exceções nos itens 3, 5 e 6.
- Nenhum depoimento, cliente, prêmio, prazo ou número inventado na tela; os 5 benefícios dos carrosséis estão fora.
- Nada do Leeward na tela: sem textos, nomes, wordmark, cata-vento, turbinas, logos de parceiros, vento ou MW. O único resíduo é o comentário no código (item 4).
- Imagens: só as 4 fotos da Spazio + logo, todas pequenas (nenhuma no topo, em tela cheia, em fundo ou na caixa larga do pin). Textos alternativos presentes nas fotos com conteúdo; as decorativas com `alt=""`.
- "Vellora" não aparece no site.

**Estrutura e dados**
- `TROCAR` só em `config.js` (nenhum no HTML, CSS ou JS). A política mostra os dados provisórios vindos do `config.js` e avisa que são provisórios.
- WhatsApp provisório `wa.me/5561900000000` com "Teste da demonstração Spazio 61" (montado pelo `cfg.js`).
- `noindex, nofollow` no meta das 3 páginas e `X-Robots-Tag: noindex, nofollow` no `_headers` (conferido também na resposta da 404).
- 5 seções (Topo, O que fazemos, Como funciona, Linhas e projetos, Contato) + política + 404 (status 404 em qualquer profundidade de URL, com estilo).
- Áreas de toque ≥ 44 px em todos os controles (menu 52 × 52, botões da linha do tempo 44 px), exceto o link dentro de frase (item 8).
- Sem rolagem horizontal em 390, 768 e 1440 px (index, política e 404).
- Nenhum arquivo interno dentro de `site/`. Licenças junto: `LICENSE-gsap.txt`, `LICENSE-lenis.txt`, `OFL-Archivo.txt`.

## Conclusões

**(a) Demonstração ao cliente: pode enviar, depois de corrigir os itens 1 e 3** (contraste da etapa Projeto e a frase "Seis linhas para cada ambiente."). São correções pequenas de CSS e de texto no `config.js`. O item 2 e o item 4 também devem ser corrigidos agora, se o `construtor-de-site` tiver tempo; não impedem mostrar. O site está bonito, rápido, sem rede externa e honesto sobre ser demonstração; a seção mais fraca continua sendo a falta de fotos em alta (topo e etapas).

**(b) Publicação real: BLOQUEADO (esperado).** Motivos:
1. Licença do template Leeward **não verificada**; precisa ser conferida no GetLayers e registrada em `vellora-time/templates/` antes de qualquer uso comercial.
2. 13 dados `TROCAR` no `config.js` (WhatsApp, razão social, CNPJ, e-mail, data da política, avisos de demonstração, placeholders de foto).
3. Endereço, etapas e descrições das linhas "a confirmar" com o cliente.
4. Imagens sem autorização do cliente (uso só em demonstração) e fotos em alta ainda faltando.
5. Formulário simulado: falta o envio real (`/api/lead` + Turnstile), com a CSP e a política atualizadas.
6. `noindex` e avisos de demonstração precisam sair só na publicação final.
7. Itens 1 a 4 desta lista corrigidos (o item 4, comentário com o nome do template, é obrigatório antes de publicar).
