# Análise dos materiais · Spazio 61

> Arquivo interno (`projeto/`), nunca compartilhado com o cliente.
> Análise feita em 16/11/2026 sobre os arquivos de `projeto/materiais/`. O site ainda não foi construído.
> Cores medidas por amostragem de pixels nos prints (JPG/PNG comprimidos), então são aproximadas.

## 1. Inventário

### `materiais/imagens/` (12 arquivos)
| Arquivo | Tamanho (px) | Conteúdo |
|---|---|---|
| `logo spazio.jpg` | 720 × 720 (31 KB) | Logo: quadrado verde, "spazio 61" em branco, sans-serif em negrito e caixa-baixa |
| `Captura de tela 2026-11-13 130557.png` | 696 × 865 | Placa da loja: círculo verde "spazio 61" + letras "HOME & OFFICE" em verde-água, sobre parede de metal enferrujado com samambaias. Sem interface do Instagram |
| `Captura de tela 2026-11-13 130815.png` | 694 × 862 | Sala de jantar residencial: mesa redonda de madeira, cadeiras de couro preto, painel de portas de madeira, espelho redondo, aparador suspenso. Sem interface |
| `Captura de tela 2026-11-13 130909.png` | 676 × 864 | Lavabo: ripado de madeira, espelho redondo com luz de fundo, bancada de pedra iluminada (ônix). **Com seta de carrossel e pontinhos do Instagram** |
| `Captura de tela 2026-11-13 130957.png` | 568 × 796 | Fábrica: CNC com marca **Morbidelli** visível, galpão metálico e dutos de exaustão. Sem interface |
| `Captura de tela 2026-11-13 131035.png` | 699 × 840 | Carrossel, slide 01: "Por que um ambiente planejado é tão importante?" sobre cozinha gourmet. **Texto e logo embutidos + interface** |
| `Captura de tela 2026-11-13 131041.png` | 703 × 855 | Carrossel, slide 02: "Aproveitamento inteligente do espaço" (armário vazio). **Texto + interface** |
| `Captura de tela 2026-11-13 131045.png` | 697 × 862 | **Duplicata** do slide 02 (mesmo slide, recorte um pouco diferente) |
| `Captura de tela 2026-11-13 131051.png` | 684 × 867 | Carrossel, slide 03: "Personalização que reflete sua identidade" (ripado + esculturas de madeira + planta). **Texto + interface** |
| `Captura de tela 2026-11-13 131057.png` | 703 × 871 | Carrossel, slide 04: "Mais praticidade para o dia a dia" (porta-temperos, painel vazado de madeira). **Texto + interface** |
| `Captura de tela 2026-11-13 131102.png` | 709 × 861 | Carrossel, slide 05: "Valorização do seu patrimônio" (mesma cozinha do slide 01). **Texto + interface** |
| `Captura de tela 2026-11-13 131109.png` | 706 × 856 | Carrossel, slide 06: "Mais do que planejar ambientes, projetamos experiências." + botão "Fale com a nossa equipe". **Texto + interface** |

### `materiais/referencias/` (7 arquivos)
Prints de tela do perfil @spazio.61 no Instagram (navegador, tema escuro), com 1280 × 575 a 631 px. Nomes `mcp-claude-in-chrome-blob-*.jpg`, ou seja, gerados pela ferramenta Claude in Chrome e não salvos à mão.
| Arquivo (sufixo) | Conteúdo |
|---|---|
| `…yu36fg…` | Cabeçalho do perfil: nome, bio, endereço, linktree, destaques |
| `…jhvb3s…` | Posts fixados: "Marcenaria descomplicada", placa da loja, "Móveis planejados de alto padrão" (poltrona de corda) |
| `…5685y8…` | Escritório corporativo (cabines de madeira, verde), post "Por que a Spazio 61 é a melhor escolha?", refeitório, Reel "CASE - HOTELARIA" (pessoa), cozinha |
| `…czg5k9…` | "O que diferencia um projeto comum de uma marcenaria de alto padrão?", Reel "Spazio61 é inovação" (pessoa), carrossel "Por que um ambiente planejado…" |
| `…oacd90…` | Fachada do **Manhattan Shopping**, fábrica (CNC Morbidelli e coladeira **SCM**) |
| `…378heg…` | Foto aérea de viaduto, ripado com esculturas, cristaleira com poltrona de couro |
| `…hu8s7e…` | **Manhattan Shopping**, "Acabamentos Spazio 61…", obra com teto iluminado, pessoa de capacete, ambiente com marca d'água **Casa Cor Goiás** |

### `materiais/textos/`
Vazia (só `.gitkeep`).

### `materiais/originais/`
Vazia (só `.gitkeep`). Não estava no inventário do escopo.

## 2. Pontos de atenção

### Baixa resolução
**Todas as imagens de `imagens/` são de baixa resolução para um site:**
- As 11 capturas têm entre 568 e 709 px de largura. Isso serve para miniaturas de grade (até uns 350 px exibidos), mas não para um topo de tela cheia nem para fotos grandes em telas retina.
- A pior é a `130957.png` (fábrica), com 568 × 796.
- O `logo spazio.jpg` tem 720 × 720 em JPG de 31 KB, com bordas comprimidas. No site, o logo precisa ser **redesenhado em SVG**. É viável, porque é só texto branco sobre verde, mas a fonte exata precisa ser identificada e o SVG fica marcado como "recriado para demonstração".
- Os originais em alta só virão do cliente (já previsto em `trocas-ao-fechar.md`, item 5).

### Prints com interface do Instagram (sugestão: mover para `referencias/`, **não movido**)
| Arquivo | Interface visível | Sugestão |
|---|---|---|
| `131035.png`, `131041.png`, `131045.png`, `131051.png`, `131057.png`, `131102.png`, `131109.png` | Setas de carrossel, pontinhos, e ainda o texto e o logo embutidos na arte | **Mover para `referencias/`.** Servem como referência de tipografia e tom, não como foto do site. `131045` é duplicata de `131041` e pode ser apagada |
| `130909.png` (lavabo) | Seta ">" à direita e pontinhos embaixo | Opção 1: mover para `referencias/`. Opção 2: manter e recortar (perde uns 60 px de largura e 40 px embaixo, ficando ainda menor). Melhor: salvar a foto do post sem a interface |

Sem interface: `130557.png`, `130815.png`, `130957.png` e o logo.

### Sem registro em `origem-imagens.md`
A tabela de `origem-imagens.md` está **vazia**, então **as 12 imagens de `imagens/` estão sem registro** (falta link do post e data). As 7 de `referencias/` também não estão registradas. Por serem só referência, basta uma linha geral ("prints do perfil, 13/11/2026").

Data provável de quando foram salvas, pelo nome do arquivo: 13/11/2026. Os links dos posts precisam ser anotados pelo Lucas.

## 3. Validação da análise anterior

Legenda: ✅ confere · ⚠️ confere em parte (corrigido) · ❌ não confere (corrigido)

### Dados do perfil
- ✅ Nome "Spazio61 Home & Office" e usuário `spazio.61` (`…yu36fg…`).
- ✅ Bio: "Espaços dinâmicos e exclusivos como você merece" · "Marcenaria & Móveis planejados" · "Fale com nossos consultores".
- ✅ Endereço: "SRTVS 701 BL B LOJA 02/03 Asa Sul, Brasília, Brazil 70340000".
- ⚠️ Destaques: os prints mostram **Marcenaria, Cadeiras, Visitas, Sofás, Acessórios, Espreguiçade(ira)** e um "Me…" cortado. **"Mesas" e "Poltronas" não aparecem nas imagens.** Vieram da consulta só de texto de 13/11, então ficam como "não confirmado por print".
- Não usar no site: contagem de posts e seguidores (343 / 1.160), "Seguido(a) por…" (dados de terceiros).

### Paleta
| Cor da análise | Medido | Veredito |
|---|---|---|
| Verde da logo `#00973A` | `#019B39` no fundo do logo | ✅ Mesma cor (diferença de compressão). Manter `#00973A` ou `#019B39` |
| Verde claro `#5CD68A` | `#5CD46C` nas palavras-chave dos títulos do carrossel | ❌ Corrigir para **`#5CD46C`**. O `#5CD68A` tem azul demais |
| Ciano neon `#2FD6C0` | `#00C89C` a `#2CD1D2` nas letras "HOME & OFFICE" da placa | ⚠️ É **verde-água/menta**, não ciano neon. Proposta: **`#00D09C`**. Só aparece na placa física, então usar no máximo como detalhe |
| Madeira e couro `#B06A35` a `#C58A52` | Ripado `#713E1A`, couro na sombra `#74370C`. Os tons claros aparecem nas partes iluminadas | ⚠️ Faixa real mais ampla: **`#713E1A` (sombra) a `#C58A52` (luz)** |
| Ferrugem `#C2651B` | Média da parede `#865135` a `#8A5231`, com picos alaranjados nos pontos de luz | ⚠️ `#C2651B` é só o brilho. A média é marrom-ferrugem `#8A5231`. Vale como acento, não como cor de área |
| Escuro `#161616` | Fundos dos carrosséis são fotos escuras e quentes (ex.: `#1F1E0B`), não preto chapado | ⚠️ Proposta melhor: escuro quente **`#1A1712`** |
| Off-white `#F4F1EC` | Não aparece como cor de marca. Os textos dos carrosséis são brancos puros | ⚠️ Fica como **proposta nossa**, não como cor medida |

**Acessibilidade:** texto branco sobre o verde do logo (`#00973A`) dá contraste ≈ 3,6:1. Passa no WCAG AA só para texto grande (≥ 24 px, ou 18,66 px em negrito). Em botão com texto pequeno, escurecer o verde (ex.: `#007A2F`) ou usar texto escuro. O `#5CD46C` sobre escuro passa bem.

### Estilo
- ❌ "Marcenaria premium **para ambientes corporativos e comerciais**": incompleto. As imagens mostram **residencial e corporativo/comercial**: sala de jantar, lavabo, closet e cozinha, além de escritórios, refeitório e lojas. O próprio nome é "Home & Office". Corrigir para: **marcenaria de alto padrão para casa e empresa**.
- ✅ Madeira ripada, couro, plantas (samambaias, pendentes de folhagem), luz quente embutida e fotos de fábrica (CNC, coladeira).
- Acrescentar: **metal enferrujado/corten** na fachada da loja, **pedra iluminada** (ônix no lavabo), **painéis vazados** de madeira e **espelhos redondos**. São marcas recorrentes.
- ⚠️ Tipografia: "serifada fina + sans em negrito, palavra-chave em verde" está **errado nos carrosséis**:
  - Carrosséis (`131035` a `131109` e `…czg5k9…`): título em **serifada de peso regular** (estilo display, parecida com Playfair/Fraunces) com a **palavra-chave na mesma serifada em negrito**, em verde `#5CD46C`. Abaixo, um fio verde curto e o texto de apoio em **sans leve**. Numeração "01…06" com linha fina.
  - Capas fixadas (`…jhvb3s…`): **sans leve + sans em negrito** ("Marcenaria **descomplicada**", "Móveis planejados **de alto padrão**"), em branco.
  - Logo: **sans grotesca em negrito, caixa-baixa** (tipo Helvetica).
  - Proposta para o site: serifada display (regular + negrito) nos títulos, com palavra-chave em verde; sans neutra no texto.

### Tom
- ⚠️ "Direto e profissional, frases curtas": vale para as capas ("Marcenaria descomplicada"). Nos carrosséis, o tom é **mais aspiracional e explicativo**: "Mais do que planejar ambientes, projetamos experiências.", "Cada centímetro é pensado para oferecer mais funcionalidade, organização e conforto…". Corrigir para: **profissional e aspiracional, com títulos curtos e texto de apoio de uma ou duas frases.**
- Chamada usada pela marca: **"Fale com a nossa equipe"** (carrossel) e "Fale com nossos consultores" (bio). Bom texto para o botão de WhatsApp.
- Textos públicos aproveitáveis (com a fonte anotada): os 5 benefícios do carrossel (ambiente planejado, aproveitamento do espaço, personalização, praticidade, valorização do patrimônio) servem quase prontos para a seção "o que fazemos".

### Seções sugeridas
- ✅ Página única com 5 seções + política de privacidade (+ 404, por regra da Vellora).
- ❌ "Projetos (grade de 8 a 9 fotos)": **com o material atual não dá.** Fotos limpas utilizáveis:
  1. `130815` sala de jantar
  2. `130909` lavabo (precisa recorte ou nova cópia sem interface)
  3. `130557` placa da loja (melhor para a seção "sobre/loja" que para a grade)
  4. `130957` fábrica (melhor para "como funciona/produção" que para a grade)

  Os slides do carrossel têm texto embutido e não servem. **Para a grade de 8 a 9, o Lucas precisa salvar mais fotos limpas** (sem texto, sem pessoas, sem marcas de terceiros). Candidatos vistos nas referências: escritório com cabines de madeira, refeitório com sofá de couro, cristaleira com poltrona, ripado com esculturas, cozinha gourmet (posts sem texto) e estante iluminada. Até lá: grade de 4 a 6 ou espaços marcados "TROCAR".
- ✅ "Como funciona" com etapas "a confirmar". Existe um post "4 diferenciais que elevam cada projeto do atendimento à entrega", mas o conteúdo dele não foi visto, então não usar.
- ✅ Contato: formulário simulado, endereço público, WhatsApp provisório.

### Cuidados
- ✅ Não usar **Manhattan Shopping** nem **Casa Cor Goiás** como clientes ou parceiros (aparecem em `…oacd90…` e `…hu8s7e…`).
- Acrescentar:
  - **"CASE - HOTELARIA"**: não citar cliente nem segmento como case sem confirmação.
  - **Marcas de máquinas** (Morbidelli na `130957`, SCM nas referências): não destacar como parceria. Se a foto da fábrica for usada, preferir recorte que não deixe o logo da máquina em destaque.
  - **Pessoas**: confirmadas nas referências (Reels com funcionário de camiseta, pessoa de capacete, homem no closet). Nenhuma das fotos de `imagens/` tem pessoas. ✅
  - **Foto aérea do viaduto** (`…378heg…`): provavelmente banco de imagens ou Brasília genérica. Não usar.
  - "Spazio61 é inovação", "a melhor escolha", "alto padrão": são frases da própria marca, públicas. Podem ser usadas como estão, sem acrescentar números ou provas que não existem.

## 4. Resumo do que fazer (Lucas)
1. Mover os 7 slides de carrossel (`131035` a `131109`) para `referencias/` e apagar a duplicata `131045`.
2. Salvar de novo o lavabo (`130909`) sem a interface, ou aceitar o recorte.
3. Salvar de 6 a 8 fotos limpas a mais para a grade de projetos (candidatos na seção 3).
4. Preencher `origem-imagens.md` com o link do post e a data de cada imagem que ficar em `imagens/`.
5. Confirmar se "Mesas" e "Poltronas" existem nos destaques (o print corta no 7º).
