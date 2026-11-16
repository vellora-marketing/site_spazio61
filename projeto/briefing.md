# Briefing · Spazio 61 (demonstração) · versão 2

> Arquivo interno (`projeto/`), nunca publicado nem compartilhado com o cliente.
> v1 em 16/11/2026; **v2 em 16/11/2026**, após revisão do Lucas: referência AERRA, sans fina, novos textos das 5 seções, Mesas e Poltronas, fotos só em tamanho pequeno e endereço "confirmar".
> Site de abordagem, sem contrato. Regras do projeto: `projeto/escopo.md`. Análise das imagens: `projeto/materiais-analise.md`.
> Nada aqui foi conversado com o cliente. A fonte de cada informação está anotada.

## 1. Estratégia (estratégia preliminar, a confirmar com o cliente)
| Item | Hipótese da Vellora | Base |
|---|---|---|
| Público provável | Quem procura marcenaria e móveis planejados para **casa e empresa** em Brasília: quem está reformando ou mobiliando a casa e empresas montando escritório, loja ou refeitório | Nome "Home & Office", bio e fotos do Instagram (`materiais-analise.md`, seção 3) |
| Mensagem | Marcenaria e móveis planejados de alto padrão, para espaços exclusivos, com atendimento direto pela equipe | Frases públicas da marca (seção 4) |
| Tom | Profissional e aspiracional: títulos curtos, texto de apoio de uma ou duas frases | `materiais-analise.md`, Tom |
| Objetivo do site | Gerar contato (WhatsApp e formulário) | Escopo |
| Setor regulado | **Não** | — |

## 2. Canais de contato
- **WhatsApp provisório:** `(61) 90000-0000` → `https://wa.me/5561900000000?text=` + "Teste da demonstração Spazio 61" (URL-encoded). Fica em `site/config.js`, marcado TROCAR.
- **Formulário com envio simulado:** 3 campos (nome, telefone, e-mail), validação acessível e mensagem de sucesso, sem requisição de rede e sem gravar nada no navegador. Tem aviso LGPD com link para a política e o aviso honesto de que nesta demonstração nada é enviado.
- **Instagram:** https://www.instagram.com/spazio.61/ · **Mapa:** link do Google Maps com busca do endereço, abrindo em nova aba, sem iframe.
- Sem analytics, sem cookies, sem aviso de cookies, sem `/api/lead`. noindex em todas as páginas e no `_headers`.

## 3. Referência de layout: template AERRA (GetLayers)
- Serve **só de referência** de estrutura, ritmo e movimento (decisão do Lucas, 16/11/2026). **Licença não verificada.** Antes de qualquer uso comercial, conferir a licença e registrar em `vellora-time/templates/` (REGRAS).
- **Não copiar:** textos, logo, SVGs, fotos, vídeo, nomes, código, URLs de assets, 3D/three.js, seção de números, depoimentos.
- A pasta `projeto/materiais/referencias/layout/` (com `referencias.md` e `aerra-getlayers.md`) que o Lucas citou **não existe**. A única referência disponível é a descrição que está no pedido do Lucas.

## 4. Seções (página única) e conteúdo permitido
| # | Seção | Conteúdo permitido | Imagem |
|---|---|---|---|
| 1 | Topo (escuro quente, sans fina gigante "spazio 61") | Título "Espaços dinâmicos e exclusivos" (atenuado) + "como você merece"; subtítulo "Marcenaria & móveis planejados de alto padrão"; botão "Fale com a nossa equipe" (WhatsApp); legenda "Home & Office · Brasília" | **Nenhuma foto** (baixa resolução) |
| 2 | Sobre / como funciona | "Marcenaria descomplicada, da concepção à execução"; três destaques: Atendimento, Projeto e Execução, marcados visivelmente "a confirmar", com descrições curtas e neutras, sem prazos, números ou garantias | ícones SVG próprios |
| 3 | Linhas de produto | 6 cartões: Marcenaria, Cadeiras, Sofás, Mesas, Poltronas, Acessórios. Descrição curta e neutra em cada um, marcada "a confirmar" | — |
| 4 | Projetos | Grade com as fotos aprovadas, só em tamanho pequeno, e placeholders (`data-placeholder` + "Foto a confirmar") nas posições que faltam. Lista de fotos (caminho, alt, legenda descritiva) no `config.js`. Sem cliente, local ou data nas legendas | sala de jantar, lavabo, loja, fábrica (se aprovada) + placeholders |
| 5 | Contato | Formulário simulado, endereço (marcado "confirmar" no `config.js`), botão de WhatsApp, link do mapa, link do Instagram | — |

Rodapé: nome, link da política, aviso "Demonstração".
Páginas extras:
- `politica-de-privacidade.html`: dados provisórios do `config.js` (razão social, CNPJ e e-mail = TROCAR). Diz a verdade: nesta demonstração não há envio, armazenamento, cookies nem medição.
- `404.html`: estilo do site, link para a página inicial, caminhos absolutos a partir de `/`.

## 5. Textos públicos permitidos
| Texto | Fonte |
|---|---|
| "Spazio 61" / "Spazio61 Home & Office" | Instagram @spazio.61, nome do perfil (print `…yu36fg…`, 13/11/2026) |
| "Espaços dinâmicos e exclusivos como você merece" · "Marcenaria & Móveis planejados" · "Fale com nossos consultores" | Bio do Instagram (print `…yu36fg…`) |
| "Marcenaria descomplicada", "Móveis planejados de alto padrão" | Posts fixados (print `…jhvb3s…`) |
| "Fale com a nossa equipe" | Carrossel, slide 06 (`131109`) |
| "Marcenaria & móveis planejados de alto padrão", "Marcenaria descomplicada, da concepção à execução", "Home & Office · Brasília" | Combinação das frases públicas acima, definida pelo Lucas em 16/11/2026 (contexto v2) |
| Linhas: Marcenaria, Cadeiras, Sofás, Acessórios | Destaques do perfil (print `…yu36fg…`) |
| Linhas: Mesas, Poltronas | Consulta só de texto, 13/11/2026; **não confirmadas por print**; incluídas por decisão do Lucas, 16/11/2026 |
| SRTVS 701, Bloco B, Loja 02/03, Asa Sul, Brasília/DF, CEP 70340-000 (**confirmar**) | Instagram e Lucas, 13/11/2026 |
| https://www.instagram.com/spazio.61/ | Lucas, 13/11/2026 |

Fora: os 5 benefícios dos carrosséis (sugestão pendente para o Lucas). Proibido: depoimentos, anos de mercado, números (inclusive seguidores e posts), prêmios, clientes, cases, certificações, promessas, Manhattan Shopping, Casa Cor Goiás, "CASE - HOTELARIA" e marcas de máquinas (Morbidelli, SCM). As descrições escritas pela Vellora são neutras e marcadas "a confirmar".

## 6. Direção visual (resumo)
- Premium, quente e editorial. Seções alternam off-white #F4F1EC e escuro quente #1A1712.
- Cores:
  - verde da marca #00973A (branco sobre ele só em texto grande);
  - #5CD46C só sobre escuro;
  - sobre fundo claro, a palavra-chave usa verde escuro que passe no AA;
  - madeira #713E1A a #C58A52.
- **Tipografia: sans fina** (pesos 100/300/500, OFL, ex.: Outfit, Hanken Grotesk ou Urbanist), com a palavra-chave em verde e negrito. Peso 100 só no display, texto corrido ≥ 300. Não usar Inter. Serifada só se o Lucas pedir depois.
- Identidade da Spazio 61, nunca a da Vellora.

## 7. Imagens
**Aprovadas** (de `projeto/materiais/imagens/`, em WebP em `site/assets/`, **só em tamanho pequeno**: cards e miniaturas com no máximo ~largura nativa / 1,5; nunca em tela cheia, no topo ou com parallax):
- `logo spazio.jpg` → logo e favicon.
- `130557` → placa da loja.
- `130815` → sala de jantar.
- `130909` → lavabo, **só recortado** (sem a seta ">" e sem os pontinhos do Instagram).
- `130957` → fábrica, **só se o recorte não mostrar "morbidelli"**. Se mostrar, não usar.

**Proibidas:** slides de carrossel `131035`, `131041`, `131045`, `131051`, `131057`, `131102`, `131109`; tudo de `referencias/`; qualquer foto com pessoas. Origem e autorização: `projeto/materiais/origem-imagens.md` (uso só em demonstração).

## 8. A confirmar
- **Com o cliente (ao fechar):**
  - estratégia (público e mensagem);
  - etapas reais do "como funciona" e descrições das 6 linhas;
  - Mesas e Poltronas;
  - endereço;
  - WhatsApp, e-mail, razão social e CNPJ (TROCAR);
  - autorização de cada imagem e originais em alta resolução.
- **Com o Lucas:**
  - links dos posts de origem das imagens;
  - mais 6 a 8 fotos limpas para a grade;
  - os 5 benefícios dos carrosséis;
  - a pasta `referencias/layout/`, que está ausente;
  - a licença do AERRA.
