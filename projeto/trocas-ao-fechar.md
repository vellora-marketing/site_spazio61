# Trocas ao fechar · Spazio 61

> Arquivo interno (`projeto/`), nunca compartilhado com o cliente.
> Use esta lista quando o cliente fechar. Nada vai ao ar enquanto houver "TROCAR" em `site/` ou noindex ativo (ver `projeto/escopo.md`, Regra de publicação).

## 1. Fechamento e checklist do cliente
- [ ] Serviço escolhido e marcado no Anexo A.
- [ ] Contrato assinado.
- [ ] Pagamento integral confirmado (Pix ou cartão em 1x).
- [ ] Anexo A preenchido: razão social e CNPJ, responsável pelas aprovações (nome, e-mail e WhatsApp), forma de pagamento, datas, uso no portfólio, assinatura "Site por Vellora" no rodapé.
- [ ] Data de Início e data prevista de publicação informadas por escrito.
- [ ] Domínio .com.br escolhido e registrado no Registro.br no nome e CPF/CNPJ do cliente.
- [ ] Repositório privado `vellora-marketing/site-spazio-61` criado (com o pedido do Lucas ou do Carlos).
- [ ] Retomar os itens adiados do checklist (tabela em `projeto/escopo.md`): conversa e estratégia, Etapas 1 a 3, publicação e transferência de acessos.

## 2. Dados provisórios
- [ ] Trocar **todos** os itens "TROCAR" do arquivo de configuração em `site/` por dados confirmados por escrito pelo cliente (número de WhatsApp, razão social, CNPJ, e-mail, horário e os demais).
- [ ] Atualizar a política de privacidade com os dados reais. O cliente revisa com o assessor jurídico dele.
- [ ] Buscar "TROCAR" em todo o `site/` e confirmar zero ocorrências.
- [ ] Revisar os textos: tudo que não é público precisa de confirmação por escrito do cliente, com a fonte anotada em `projeto/`.

## 3. Formulário
- [ ] Trocar o envio simulado pelo endpoint real `/api/lead` na Cloudflare, com Turnstile, limite por IP e regra de limite no firewall.
- [ ] Planilha e Apps Script de produção numa conta Google privada (da Vellora ou do cliente, conforme combinado). Testes com planilha e Apps Script de teste.
- [ ] URL do Apps Script e segredo só nas configurações da Cloudflare, nunca no repositório.
- [ ] Aprovação do Lucas ou do Carlos para os serviços que recebem os dados, registrada em `projeto/`. A política cita Google Planilhas (e Looker Studio, se usado).
- [ ] Texto do formulário dizendo a verdade sobre para onde vão os dados.
- [ ] Envio real de teste identificado.

## 4. Indexação
- [ ] Remover o meta `robots` noindex de todas as páginas.
- [ ] Remover o `X-Robots-Tag: noindex` do `_headers`.

## 5. Imagens
- [ ] Autorização por escrito do cliente para cada imagem usada.
- [ ] Atualizar `projeto/materiais/origem-imagens.md` com a autorização e a data.
- [ ] Trocar pelos originais em alta resolução, se o cliente enviar.

## 6. Antes de publicar
- [ ] Parecer do QA e da segurança sem BLOQUEADO para publicação real.
- [ ] Ok final do cliente por escrito e aprovação do Lucas ou do Carlos.
