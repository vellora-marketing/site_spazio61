/*
 * config.js · Spazio 61 (DEMONSTRAÇÃO)
 *
 * Único lugar com os dados provisórios e o conteúdo variável do site.
 * - "TROCAR": dado fictício. Substituir pelo dado confirmado por escrito pelo cliente antes de qualquer publicação real.
 * - "confirmar": dado público que ainda precisa da confirmação do cliente.
 * O HTML já traz o texto público como reserva (o site lê bem sem JS); o js/main.js sobrescreve com os valores daqui.
 */
window.SPAZIO_CONFIG = {
  demonstracao: true, // TROCAR: false quando o formulário real (/api/lead) estiver ligado

  whatsapp: {
    numero: "5561900000000", // TROCAR: número provisório e inválido (61) 90000-0000
    exibicao: "(61) 90000-0000", // TROCAR
    mensagem: "Teste da demonstração Spazio 61" // TROCAR: mensagem pré-preenchida da demonstração
  },

  endereco: {
    linha1: "SRTVS 701, Bloco B, Loja 02/03", // confirmar
    linha2: "Asa Sul, Brasília/DF", // confirmar
    cep: "CEP 70340-000", // confirmar
    busca: "SRTVS 701, Bloco B, Loja 02/03, Asa Sul, Brasília/DF, CEP 70340-000" // confirmar (texto usado no link do Google Maps)
  },

  instagram: "https://www.instagram.com/spazio.61/",

  empresa: {
    nome: "Spazio 61",
    razaoSocial: "[Razão social da empresa]", // TROCAR
    cnpj: "00.000.000/0000-00", // TROCAR
    email: "contato@example.com", // TROCAR
    atualizacaoPolitica: "16/11/2026" // TROCAR: data da versão final revisada pelo cliente
  },

  /*
   * Projetos: fotos públicas do Instagram @spazio.61, uso só em demonstração (sem autorização ainda).
   * Todas têm baixa resolução: exibir pequenas (no máximo ≈ largura nativa / 1,5).
   * Para trocar um placeholder por foto: substituir o item { placeholder: true } por
   * { src, largura, altura, alt, legenda }. Imagem em WebP, até 1080 px de largura, em assets/.
   */
  projetos: [
    {
      src: "assets/sala-de-jantar.webp",
      largura: 694,
      altura: 862,
      alt: "Sala de jantar com mesa redonda de madeira, cadeiras de couro preto, painel de portas de madeira e espelho redondo sobre aparador suspenso",
      legenda: "Sala de jantar"
    },
    {
      src: "assets/lavabo.webp",
      largura: 622,
      altura: 812,
      alt: "Lavabo com parede ripada de madeira, espelho redondo com luz de fundo e bancada de pedra iluminada",
      legenda: "Lavabo"
    },
    { placeholder: true, legenda: "Projeto a confirmar" }, // TROCAR: foto a enviar
    { placeholder: true, legenda: "Projeto a confirmar" }, // TROCAR: foto a enviar
    { placeholder: true, legenda: "Projeto a confirmar" }, // TROCAR: foto a enviar
    { placeholder: true, legenda: "Projeto a confirmar" }  // TROCAR: foto a enviar
  ]
};
