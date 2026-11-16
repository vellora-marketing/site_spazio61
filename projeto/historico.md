# Histórico · Spazio 61

> Arquivo interno (`projeto/`). Entradas mais novas no topo.

## 16/11/2026 · Lucas (com o time de agentes)

**Feito**
- Análise dos materiais (`projeto/materiais-analise.md`): paleta medida, tipografia, tom e o que não pode ser usado.
- Briefing da demonstração (`projeto/briefing.md`) e registro das imagens aprovadas (`projeto/materiais/origem-imagens.md`).
- 1ª versão do site (referência AERRA), revisada por QA e segurança. Commit 3c01366.
- Repositório ligado ao GitHub privado `vellora-marketing/site_spazio61`.
- 2ª versão, refeita com o template Leeward e adaptada à Spazio, com as correções do QA. Commit 92896d7, enviada ao GitHub.

**Decisões**
- Leeward: GSAP 3.15.0 + ScrollTrigger + Lenis 1.3.26 hospedados em `site/js/vendor/`; CSP só `'self'`; 5 seções; topo escuro sem foto (as fotos são de baixa resolução).
- "Mesas" e "Poltronas" entram nas linhas (decisão do Lucas, embora não apareçam nos prints dos destaques).
- Imagens e prints de `projeto/materiais/` ficam fora do git (os prints mostram perfis de terceiros).

**Pareceres**
- Demonstração: QA "pode mostrar ao cliente"; segurança LIBERADO COM RESSALVAS (só para o próprio cliente).
- Publicação real: BLOQUEADO (esperado). Ver `projeto/qa.md` e `projeto/seguranca.md`.

**Pendências**
- Lucas: conferir a licença do Leeward no GetLayers (uso comercial e custo) e registrar em `vellora-time/templates/leeward/TEMPLATE.txt`.
- Lucas: salvar fotos limpas em alta (para a grade, o topo e "Como funciona") e anotar os links dos posts em `origem-imagens.md`.
- Lucas: decidir sobre os 5 benefícios dos carrosséis e sobre a caixa de "Como funciona", grande e vazia com movimento reduzido.
- Incluir `projeto/materiais/imagens/` e `projeto/materiais/referencias/` no `.gitignore` (aguarda ok).
- Carlos vai fazer alterações: rodar `git pull` antes de mexer.
- Ao fechar com o cliente: seguir `projeto/trocas-ao-fechar.md`.

**Para ver o site:** `python -m http.server 8080 --directory site` e abrir `http://localhost:8080`. Por `file://` a fonte não carrega.
