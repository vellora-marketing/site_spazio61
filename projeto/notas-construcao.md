# Notas de construção · Spazio 61 (demonstração)

> Arquivo interno (`projeto/`), nunca publicado nem compartilhado com o cliente.
> Construído em 16/11/2026 pelo `construtor-de-site`, seguindo o contexto do time versão 2 (template AERRA como referência, sans fina, 6 linhas de produto).
> Sem commit e sem push. Parecer BLOQUEADO para publicação real é o esperado enquanto houver TROCAR e noindex.

## 1. Páginas
| Página | Arquivo | Observação |
|---|---|---|
| Página única com 5 seções | `site/index.html` | Topo · Sobre/como funciona · Linhas · Projetos · Contato, mais o rodapé |
| Política de privacidade | `site/politica-de-privacidade.html` | Dados provisórios vindos do `config.js` (TROCAR). Diz a verdade: o formulário não envia nem guarda nada, sem cookies, sem medição |
| 404 | `site/404.html` | Estilo do site, link para `/` |

Seções do `index.html`:
1. **Topo** (escuro `#1A1712`, tela cheia): legenda "Home & Office · Brasília", título "Espaços dinâmicos e exclusivos" (atenuado) + "como você merece" (branco), subtítulo "Marcenaria & móveis planejados de alto padrão", botão "Fale com a nossa equipe" (WhatsApp), "spazio 61" gigante em peso 100 com gradiente que some.
2. **Sobre / como funciona** (off-white): "Marcenaria **descomplicada**, da concepção à execução", fotos pequenas da loja e da produção, destaques Atendimento, Projeto e Execução com o selo visível "a confirmar" e a nota "Etapas a confirmar com a Spazio 61".
3. **Linhas** (escuro): "Móveis planejados **de alto padrão**", 6 cartões de vidro (Marcenaria, Cadeiras, Sofás, Mesas, Poltronas, Acessórios), cada um com descrição neutra e o selo "a confirmar".
4. **Projetos** (off-white): "Espaços **exclusivos**", grade de 6 posições: sala de jantar, lavabo e 4 placeholders.
5. **Contato** (escuro com painel fosco claro): formulário simulado (nome, telefone, e-mail), WhatsApp, endereço ("a confirmar"), link do mapa e Instagram.

Todos os títulos e chamadas vêm da bio e das frases públicas da marca. As descrições curtas (destaques e cartões) são da Vellora, neutras e marcadas "a confirmar". Não há números, depoimentos, clientes, prazos nem promessas. Os 5 benefícios dos carrosséis **não** entraram.

## 2. Estrutura de arquivos
```
site/
  index.html
  politica-de-privacidade.html
  404.html
  config.js                 dados provisórios e conteúdo variável (TROCAR / confirmar)
  _headers                  CSP e cabeçalhos de segurança, noindex
  css/style.css             folha única, mobile primeiro
  js/boot.js                no <head>: classe .has-js + pré-carregador (no máximo 1,5 s)
  js/main.js                config → página, menu, revelações, letras do topo, formulário
  fontes/outfit-variable-latin.woff2
  fontes/OFL-Outfit.txt
  assets/                   imagens WebP e favicons
```
- Sem bibliotecas, sem npm e sem Vite. Scripts clássicos (sem `type="module"`, que quebra em `file://`).
- Nenhum `style=""`, `<script>` inline nem `on*=` (conferido com grep). O JS só altera custom properties (`--lift`, `--py`) via `element.style.setProperty`, o que a CSP `style-src 'self'` aceita porque é CSSOM.
- `site/.gitkeep` foi apagado (a pasta agora tem conteúdo).

## 3. Caminhos
- `index.html` e `politica-de-privacidade.html` usam **caminhos relativos** (`css/style.css`, `assets/...`), para abrir por duplo clique (`file://`) e também na raiz do domínio.
- `404.html` usa **caminhos absolutos a partir de `/`** (`/css/style.css`, `/assets/...`), porque a Cloudflare a serve em qualquer profundidade de URL. Por isso ela **não** fica com estilo quando aberta por `file://` (é o esperado).
- A fonte é chamada no CSS por `../fontes/...`, relativo ao próprio CSS, e funciona nos dois casos.
- O HTML nunca referencia `projeto/`.

## 4. Fonte
| Item | Valor |
|---|---|
| Nome | **Outfit** (variável, eixo `wght` de 100 a 900, peso 100 real) |
| Versão | 1.100 (`Version 1.100;gftools[0.9.27]`), pacote `@fontsource-variable/outfit@5.3.0`, subconjunto latin |
| Origem | https://cdn.jsdelivr.net/npm/@fontsource-variable/outfit@5.3.0/files/outfit-latin-wght-normal.woff2 (o mesmo arquivo do `fontsource/fonts/outfit:vf@latest`). SHA-256 `6c18d579fd87c3776be068b762cbc83fde3acb543d49eabd3ade842eb987e887` |
| Licença | SIL Open Font License 1.1, que permite uso comercial. Texto em `site/fontes/OFL-Outfit.txt` (do github google/fonts, `ofl/outfit/OFL.txt`) |
| Validação | Cabeçalho `wOF2`, aberto com fontTools: eixo `wght` 100–900, todos os acentos do português presentes. Não tem o glifo "→", por isso as setas são SVG |
| Uso | Peso 100 só no "spazio 61" gigante, no 404 e no contador do pré-carregador. Títulos em 200/300, texto corrido em 300 (≥ 17 px), rótulos e botões em 400/500, palavra-chave em 600 verde |

Fraunces e Manrope (do construtor anterior) foram **removidas** de `site/fontes/`, junto com os OFL delas.

## 5. Imagens
Todas são do Instagram @spazio.61, para uso só em demonstração e sem autorização (ver `projeto/materiais/origem-imagens.md`). Reaproveitei os WebP do construtor anterior depois de conferir cada uma visualmente.

| Origem (`projeto/materiais/imagens/`) | Arquivo em `site/assets/` | Tamanho | Recorte / conferência | Onde e quanto é exibida |
|---|---|---|---|---|
| `logo spazio.jpg` | `logo-spazio-61.webp` | 360 × 360 | reduzida, sem ampliar | nav 40 px, rodapé 36 px |
| `logo spazio.jpg` | `favicon.ico` (48), `favicon-32.png`, `apple-touch-icon.png` (180) | — | — | favicons |
| `130557.png` (placa da loja) | `loja-spazio-61.webp` | 696 × 865 | sem recorte, sem interface | Sobre, até 440 px de largura (696 / 1,5 = 464) |
| `130815.png` (sala de jantar) | `sala-de-jantar.webp` | 694 × 862 | sem recorte | Projetos, até ~390 px (máximo de 420 px) |
| `130909.png` (lavabo) | `lavabo.webp` | 622 × 812 | recortado: **sem** a seta ">" e **sem** os pontinhos (conferido com zoom) | Projetos, até ~390 px (622 / 1,5 = 415) |
| `130957.png` (fábrica) | `fabrica.webp` | 568 × 552 | recortado de y 0 a 552: a placa "morbidelli" (y ≈ 600–660) ficou **fora**. Conferido com zoom: nenhuma marca legível. A área quadriculada no cabeçote é o reflexo do vidro, que já existe no original | Sobre, até 360 px (568 / 1,5 = 378) |

- Todas têm `width`/`height` declarados, `loading="lazy"`, `decoding="async"` e alt descritivo em português.
- Nenhuma foto no topo, em tela cheia ou com parallax.
- Não usadas: slides de carrossel, tudo de `referencias/`, fotos com pessoas, Manhattan Shopping, Casa Cor Goiás e marcas de máquinas.

## 6. Placeholders
- Projetos: 4 posições `data-placeholder` com o rótulo visível "Foto a confirmar" e a legenda "Projeto a confirmar". Para trocar, basta substituir `{ placeholder: true }` em `config.js → projetos` por `{ src, largura, altura, alt, legenda }`. O layout não muda.
- O HTML tem a mesma grade como reserva sem JS. Com JS, ela é reconstruída a partir do `config.js` (fonte única).

## 7. `config.js`: TROCAR e confirmar
| Chave | Valor atual | Marca |
|---|---|---|
| `demonstracao` | `true` | TROCAR |
| `whatsapp.numero` | `5561900000000` | TROCAR |
| `whatsapp.exibicao` | `(61) 90000-0000` | TROCAR |
| `whatsapp.mensagem` | "Teste da demonstração Spazio 61" | TROCAR |
| `endereco.linha1/linha2/cep/busca` | SRTVS 701, Bloco B, Loja 02/03 · Asa Sul, Brasília/DF · CEP 70340-000 | confirmar |
| `empresa.razaoSocial` | `[Razão social da empresa]` | TROCAR |
| `empresa.cnpj` | `00.000.000/0000-00` | TROCAR |
| `empresa.email` | `contato@example.com` | TROCAR |
| `empresa.atualizacaoPolitica` | `16/11/2026` | TROCAR |
| `projetos[2..5]` | placeholders | TROCAR |

Total: 13 ocorrências de "TROCAR", todas em `site/config.js`. Nas páginas não há dado fictício: os campos da política mostram "a informar" sem JS, e os botões de WhatsApp apontam para `#contato` até o JS montar o link `wa.me` a partir do `config.js`. O endereço (público) aparece no HTML como reserva e na página com o selo "a confirmar".

## 8. Segurança e privacidade
- `_headers` (aplicado a `/*`): `Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'none'; manifest-src 'self'; form-action 'self'; frame-ancestors 'none'; base-uri 'self'; object-src 'none'; upgrade-insecure-requests`, além de `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Strict-Transport-Security: max-age=31536000; includeSubDomains`, `Permissions-Policy` (câmera, microfone, localização etc. desligados), `Cross-Origin-Opener-Policy: same-origin` e `X-Robots-Tag: noindex, nofollow`.
- `<meta name="robots" content="noindex, nofollow">` nas 3 páginas.
- O formulário usa `method="dialog"`: sem JS, enviar não faz nada (não há navegação nem requisição). Com JS, o `submit` é interceptado e só valida e mostra a mensagem. Nenhum fetch, nenhum localStorage, sessionStorage ou cookie (conferido no teste).
- Links externos (WhatsApp, Instagram, Google Maps em busca, sem iframe) com `target="_blank" rel="noopener noreferrer"`.

## 9. Uso do template AERRA (GetLayers)
- **Licença NÃO verificada.** Antes de adotar de fato (ao fechar), conferir a licença e registrar em `vellora-time/templates/` com `TEMPLATE.txt`, conforme as REGRAS.
- **A pasta `projeto/materiais/referencias/layout/` (referencias.md e aerra-getlayers.md) não existe.** A única referência usada foi a descrição do pedido do Lucas no contexto do time (v2). Não vi o template.
- **Aproveitado (só estrutura, ritmo e movimento, com código próprio):** nav fixa de vidro com botão de contato e menu hambúrguer; topo escuro com a marca gigante e fina em gradiente, com letras em velocidades diferentes; título em duas partes (atenuado + branco) e palavra por palavra em ≥ 1280 px; entrada em sequência de legenda, subtítulo e CTA; revelações de entrada; divisor fino com rótulo e número; destaques com ícone em bloco cinza; grade 3×3 de cartões de vidro com a diagonal vazia; CTA preto com seta que troca e brilho; painel de contato fosco com campos sublinhados; pré-carregador com contador e janela que abre; alternância off-white/escuro.
- **Não aproveitado:** textos, logo, SVGs, fotos, vídeo, nomes, código, URLs de assets, three.js, marca 3D, giro 360°, revelação por pixels, seção de números e depoimento. Nada de coordenadas absolutas: grid/flex fluido, mobile primeiro.

## 10. Movimento
- **Letras do topo:** listener de scroll `passive`. O `requestAnimationFrame` só é pedido quando houve scroll. O cálculo para quando o topo sai da tela (IntersectionObserver) e o recurso é desligado com `prefers-reduced-motion` (inclusive se a preferência mudar com a página aberta). Teste: com a página parada, nenhum rAF novo em 1,5 s.
- **Parallax de foto: mecanismo pronto e DESLIGADO.** Só atua em `img[data-parallax]` com `naturalWidth ≥ 1600 px` (constante `LARGURA_MIN_PARALLAX` em `js/main.js`, classe `.parallax-ativo` no CSS). Hoje nenhuma imagem tem o atributo e nenhuma teria resolução: todas têm 568 a 696 px. Ampliar foto de baixa resolução em parallax ficaria borrado. Para ligar quando chegarem originais em alta, pôr `parallax: true` no item do `config.js` (ou `data-parallax` na `<img>`).
- **Revelações:** IntersectionObserver, fade + subida de 24 px, uma vez só (unobserve). Só escondem o conteúdo depois que o JS adiciona `.reveal-ready`: sem JS, tudo fica visível. Nos cartões de vidro, a revelação está no conteúdo (`.cartao-conteudo`), nunca no cartão.
- **Pré-carregador:** só aparece porque o `js/boot.js` adiciona `.preloading`. Tem limite rígido (abre em 1 s, some em 1,5 s) independente do `main.js`. O scroll é liberado quando a janela começa a abrir. Não roda com reduced-motion, e a entrada do topo espera ele abrir.
- **Reduced-motion:** tudo começa visível, sem letras se movendo, sem pré-carregador e sem transições (conferido com `emulateMedia`).

## 11. Testes (16/11/2026, Playwright)
- Servidor local `python -m http.server 8765` e um segundo servidor de teste (script no scratchpad) que aplica os cabeçalhos do `_headers`, para testar a CSP de verdade: **0 erros e 0 avisos no console** com a CSP ativa.
- Prints da página inteira em 390, 768, 1280 e 1440 px, sem rolagem horizontal (`scrollWidth` igual à largura em todas).
- Rede: todas as requisições foram ao `127.0.0.1` (HTML, CSS, JS, config, fonte, imagens). Nenhum domínio externo. Nenhuma requisição ao enviar o formulário.
- Menu do celular: fechado com `inert` (o Tab pula os links), abre por Enter, o Tab entra no menu, o Escape fecha e devolve o foco ao botão.
- Formulário: com erro, `aria-invalid` + `aria-describedby` nos 3 campos e foco no primeiro erro. Com sucesso, a mensagem aparece em `role="status"`, o formulário é limpo, a URL não muda e nada é gravado no navegador.
- `file:///.../site/index.html`: a fonte, as 6 imagens, o config e os links `wa.me` funcionam. A política também.
- Contraste (calculado): texto suave `#5A5248` em `#F4F1EC` = 6,81:1; verde-escuro `#00742C` em `#F4F1EC` = 5,27:1; `#9A9286` (título atenuado) em `#1A1712` = 5,81:1; `#B8AFA3` em `#1A1712` = 8,25:1; `#5CD46C` em `#1A1712` = 9,44:1. Não há texto branco sobre `#00973A` (só o ícone da seta, 3,8:1, como elemento gráfico).
- Áreas de toque ≥ 44 px, exceto dois links dentro de frases (exceção "inline" da WCAG).
- Nota de teste: o print de página inteira do Playwright em ≥ 1280 px reinicia a animação palavra por palavra, porque a captura reaplica a media query. Os prints finais foram tirados com as animações congeladas. Não é defeito do site.

## 12. Rodada de correções do QA (16/11/2026, ver `projeto/qa.md`)
| # | Problema do QA | Correção | Medição depois (Playwright, CSP ativa, porta 8791) |
|---|---|---|---|
| 1 (média) | Selo "a confirmar" do endereço com 1,74:1 (herdava `.escuro .selo`) e em caixa-alta | O `.painel` (claro dentro de seção `.escuro`) redefine `.selo`, `.rotulo`, `.chave` e `.lead` para as cores do tema claro. Selo com `text-transform: none`, igual aos outros | **6,17:1** (`#5A5248` sobre o painel `#E9E6E1`, medido nos pixels) em 390 e 1440 px |
| 2 (média) | Nav de vidro sobre fundo claro com 3,8 a 4,2:1, cinza "sujo" | **Nav clara sobre seção clara:** um IntersectionObserver (linha de 1 px na altura do meio da nav, sem listener de scroll) adiciona `.nav-clara` quando a nav está sobre `main .claro` ou sobre o painel do contato. Fica off-white a 80 % com blur e texto `#1A1712`, e o botão "Contato" fica escuro. Sobre fundo escuro, o vidro escuro passou de 55 % para 78 %, para que mesmo sem JS ou na transição o texto claro fique ≥ 6,7:1 sobre o off-white. O painel do menu do celular continua escuro | Links e "Spazio 61" (mediana do fundo nos pixels): **1440 px**: topo 15,4 a 15,9:1, Sobre 14,1 a 14,3:1, fotos do Sobre 11,9 a 15,9:1, Linhas 13,1 a 13,9:1, Projetos 13,8 a 14,1:1, fotos de Projetos 13,7 a 15,5:1, Contato 12,9 a 13,5:1. **390 px** ("Spazio 61"): 11,5 a 15,3:1. Cálculo teórico no pior caso: vidro claro sobre escuro 10,4:1; vidro escuro sobre off-white 8,2:1 |
| 3 | "Pular para o conteúdo" não levava o foco | `tabindex="-1"` no `<main>` das 3 páginas (sem contorno no foco programático) | O foco vai para `#conteudo` |
| 4 | Links que abrem em nova aba sem aviso | Span `.sr-only` "(abre em nova aba)" no @spazio.61 da frase de Projetos. O JS também acrescenta o aviso nos botões de WhatsApp quando põe `target="_blank"` | Conferido |
| 5 | Legenda "A loja, na Asa Sul" | Agora é "A loja Spazio 61" | — |
| 6 | Endereço da política escrito direto no HTML | Vem de `config.js → endereco.busca`, com o mesmo texto como reserva no HTML e o selo "a confirmar" | Conferido |
| 7 | Vão vazio no topo no celular | Abaixo de 640 px o topo deixa de ter altura de tela cheia e a marca "spazio 61" vem logo depois do botão (margem de 56 a 104 px) | Print em `scratchpad/qa2/topo-390.png` |

Console sem erros nem avisos com a CSP do `_headers`. Nenhuma requisição externa. Reduced-motion continua funcionando, e a troca da nav não depende de animação. O item 11 do QA (`boot.js` carrega e o `main.js` falha) não foi alterado (caso raro, não pedido nesta rodada).

## 13. Pendências
**Do Lucas**
- [ ] Fotos: salvar de 6 a 8 fotos limpas (sem texto, pessoas ou marcas) para os 4 placeholders de Projetos. De preferência originais em alta, o que também permitiria ligar o parallax.
- [ ] Anotar o link do post de origem de cada imagem em `origem-imagens.md`.
- [ ] Referências: a pasta `projeto/materiais/referencias/layout/` não existe. Se houver as anotações do AERRA, colocar lá.
- [ ] Licença do AERRA: conferir e registrar em `vellora-time/templates/` antes de adotar.
- [ ] Decidir se os 5 benefícios dos carrosséis entram no texto (hoje não entram).
- [ ] Avaliar a sans fina (Outfit). Se preferir serifada nos títulos (como nos carrosséis), avisar: a troca é só de `@font-face` e pesos no CSS.
- [ ] Confirmar se "Mesas" e "Poltronas" existem nos destaques (não aparecem nos prints).

**Do cliente (ao fechar, ver `trocas-ao-fechar.md`)**
- [ ] Todos os itens TROCAR do `config.js` (WhatsApp, razão social, CNPJ, e-mail, data da política, fotos).
- [ ] Confirmar o endereço, as etapas de Atendimento/Projeto/Execução e as descrições das 6 linhas (todos com "a confirmar").
- [ ] Autorização das imagens.
- [ ] Formulário real (`/api/lead`), remover o noindex e remover os avisos de "Demonstração".
