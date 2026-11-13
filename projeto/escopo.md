# Escopo · Spazio 61

> Arquivo interno (`projeto/`), nunca publicado nem compartilhado com o cliente.
> A fonte de cada informação fica anotada. Nada daqui vai ao site como fato sem confirmação por escrito do cliente.

## Tipo do projeto
**Site de abordagem (demonstração)**, feito antes de qualquer contato com o cliente (decisão do Lucas, 13/11/2026).
- Sem contrato, sem pagamento, sem domínio e sem publicação pública.
- Se o cliente fechar, seguir `projeto/trocas-ao-fechar.md` antes de qualquer publicação real.

## Dados públicos do cliente
| Item | Valor | Fonte |
|---|---|---|
| Nome do negócio | Spazio 61 (no Instagram: "Spazio61 Home & Office") | Lucas, 13/11/2026; Instagram |
| Segmento | Marcenaria & Móveis planejados | Lucas, 13/11/2026; bio do Instagram |
| Cidade | Brasília (DF) | Lucas, 13/11/2026 |
| Endereço | SRTVS 701, Bl. B, Loja 02/03, Asa Sul, Brasília/DF, CEP 70340-000 | Lucas, 13/11/2026 |
| Instagram | [@spazio.61](https://www.instagram.com/spazio.61/) | Lucas, 13/11/2026 |
| Link na bio | linktr.ee/spazio61 | Instagram (consulta em 13/11/2026) |
| Razão social / CNPJ | não usar; dado provisório "TROCAR" | só o cliente sabe |
| Responsável pelas aprovações | não se aplica até o fechamento | — |

## Regras deste projeto
- **Só informações públicas** do perfil @spazio.61. O que só o cliente sabe (razão social, CNPJ, anos de mercado, números, depoimentos) não é apresentado como fato: usar dado provisório marcado "TROCAR" ou deixar de fora.
- **O site é completo**, como seria normalmente: botão de WhatsApp, formulário completo, página de política de privacidade, página 404 e demais páginas.
- **Dados fictícios num único arquivo, `site/config.js`**, cada item marcado com "TROCAR". Nenhum dado fictício espalhado pelas páginas.
- **WhatsApp provisório:** número inválido `(61) 90000-0000`, marcado "TROCAR" no `config.js`. Mensagem pré-preenchida: "Teste da demonstração Spazio 61" (decisão do Lucas, 13/11/2026).
- **Formulário com envio simulado:** campos, validação e mensagem de sucesso iguais aos do site final, mas não envia nem coleta dado nenhum, não grava nada no navegador e não usa `/api/lead`.
- **Política de privacidade** com os dados provisórios marcados "TROCAR".
- **Sem analytics e sem cookies de medição.** Sem aviso de cookies enquanto não houver medição.
- **noindex:** meta `robots` com `noindex, nofollow` em todas as páginas e cabeçalho `X-Robots-Tag: noindex, nofollow` em `site/_headers`, para não aparecer no Google.
- **Imagens:** do Instagram da empresa, salvas pelo Lucas, registradas em `projeto/materiais/origem-imagens.md` como "uso apenas em proposta de demonstração, sem autorização ainda".
- **Identidade própria do cliente**, nunca a da Vellora.

## Regra de publicação
Enquanto houver "TROCAR" em qualquer arquivo de `site/` ou o noindex estiver ativo, **o QA e a segurança dão parecer BLOQUEADO para publicação real**. A prévia de demonstração (abaixo) não é publicação real.

## Como será mostrado ao cliente
- Por prévia na Cloudflare (`*.pages.dev`) com noindex, **ou** por vídeo e prints.
- A prévia só é publicada se o Lucas pedir explicitamente.
- O repositório continua privado. A pasta `projeto/` nunca é compartilhada com o cliente.

## Formato do site
Decisões do Lucas, 13/11/2026:
- **Formato:** uma página só, com até 5 seções (definidas depois da análise dos materiais), mais uma página separada de política de privacidade. A página 404 própria também entra, por regra da Vellora.
- **Contato:** botão de WhatsApp e formulário (envio simulado).
- **Tecnologia:** HTML, CSS e JavaScript puros, sem Vite.
- **Cabeçalhos:** em `site/_headers` (segurança e noindex).
- **Dados provisórios:** num único `site/config.js`, cada item marcado "TROCAR".

## Direção visual
- Identidade própria do cliente (nunca a da Vellora).
- Referências: o Lucas vai colocar prints do Instagram e, se houver, um template do GetLayers em `projeto/materiais/referencias/`.
- Template do GetLayers: se usado, conferir a licença e registrar em `vellora-time/templates/` antes de adotar.

## Observações do Instagram (consulta em 13/11/2026, só texto)
- Bio: "Espaços dinâmicos e exclusivos como você merece" · "Marcenaria & Móveis planejados" · "Fale com nossos consultores".
- Destaques: Marcenaria, Cadeiras, Visitas, Sofás, Acessórios, Espreguiçadeira, Mesas, Poltronas.
- Não foi possível ver as imagens nem as legendas. As referências visuais dependem dos prints do Lucas.

## Checklist do cliente (`vellora-time/docs/checklist-cliente.md`)
Os itens abaixo ficam **adiados** até o fechamento e estão em `projeto/trocas-ao-fechar.md`.

| Seção do checklist | Situação |
|---|---|
| 0. Fechamento: serviço no Anexo A, contrato, pagamento, repositório na `vellora-marketing` | adiado |
| 0. Dados do Anexo A (cliente, CPF/CNPJ, responsável, domínio, pagamento, datas, portfólio, assinatura no rodapé) | adiado |
| 0. Material mínimo enviado pelo cliente | adiado (usamos só o que é público) |
| 1. Conversa e estratégia com o cliente | adiado (estratégia preliminar feita pela Vellora) |
| 2. Direção visual: identidade própria; licença do template conferida | vale agora |
| 2. Envio, resposta em 2 dias e aprovação por escrito | adiado |
| 3. Criação: textos sem nada inventado, responsivo, WhatsApp e formulário, política, WCAG AA | vale agora |
| 3. Formulário sem envio para terceiros | vale agora (envio simulado) |
| 3. Aviso de cookies | não se aplica (sem medição) |
| 3. Envio para aprovação | adiado |
| 4. Revisões com o cliente | adiado |
| 5. Publicação, domínio, Cloudflare em produção, transferência de acessos, Anexo B, suporte, portfólio | adiado |
| 5. Prévia `*.pages.dev`: `projeto/` não exposto e parecer da segurança | vale se o Lucas pedir a prévia |

## Fora do escopo
Se aparecer pedido de catálogo/loja virtual, páginas além do limite, anúncios, fotos, SEO avançado, analytics etc.: não executar e avisar Lucas ou Carlos (aditivo).
