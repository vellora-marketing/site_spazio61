/*
 * config.js · Spazio 61 (DEMONSTRAÇÃO)
 *
 * Único lugar com os dados provisórios e o conteúdo do site.
 * - "TROCAR": dado fictício. Substituir pelo dado confirmado por escrito pelo cliente antes de qualquer publicação real.
 * - "confirmar": dado público que ainda precisa da confirmação do cliente.
 * O HTML traz os mesmos textos como reserva (o site lê bem sem JS); o js/cfg.js e o js/main.js
 * sobrescrevem com os valores daqui. Se os dois divergirem, vale o que está aqui.
 * Textos: só a bio e as frases públicas do Instagram @spazio.61.
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
    busca: "SRTVS 701, Bloco B, Loja 02/03, Asa Sul, Brasília/DF, CEP 70340-000" // confirmar (texto do link do Google Maps)
  },

  instagram: { url: "https://www.instagram.com/spazio.61/", usuario: "@spazio.61" },

  empresa: {
    nome: "Spazio 61",
    nomeCompleto: "Spazio61 Home & Office",
    razaoSocial: "[Razão social da empresa]", // TROCAR
    cnpj: "00.000.000/0000-00", // TROCAR
    email: "contato@example.com", // TROCAR
    atualizacaoPolitica: "16/11/2026" // TROCAR: data da versão final revisada pelo cliente
  },

  // 1. Topo
  topo: {
    rotulo: "Home & Office · Brasília",
    tituloAtenuado: "Espaços dinâmicos e exclusivos",
    tituloDestaque: "como você merece.",
    subtitulo: "Marcenaria & móveis planejados de alto padrão.",
    cta: "Fale com a nossa equipe",
    // Faixa de módulos na base do topo: textos públicos, sem números.
    fatos: [
      { rotulo: "O que fazemos", valor: "Marcenaria" },
      { rotulo: "Home & Office", valor: "Casa e empresa" },
      { rotulo: "Onde", valor: "Brasília/DF" }
    ],
    atendimento: { rotulo: "Fale com a nossa equipe", valor: "WhatsApp" },
    placeholderMidia: "Foto ou vídeo do topo a confirmar" // TROCAR: foto/vídeo em alta resolução enviado pelo cliente
  },

  // 2. O que fazemos: uma frase em três linhas, cada uma com uma foto pequena.
  oQueFazemos: {
    rotulo: "O que fazemos",
    linhas: [
      { cabeca: "Marcenaria", foto: "sala", resto: "descomplicada," },
      { cabeca: "móveis planejados", foto: "lavabo", resto: "" },
      { cabeca: "para casa", foto: "loja", resto: "e empresa." }
    ],
    lead: "Espaços dinâmicos e exclusivos como você merece.",
    cta: "Fale com nossos consultores"
  },

  // 3. Como funciona: etapas a confirmar com o cliente (sem prazos, números ou garantias).
  comoFunciona: {
    rotulo: "Como funciona",
    titulo: "Marcenaria descomplicada, do atendimento à execução.",
    aviso: "Etapas a confirmar com a Spazio 61.",
    etapas: [
      { nome: "Atendimento", texto: "Conversa com a nossa equipe para entender o espaço e o que você procura.", placeholder: "Foto do atendimento a confirmar" }, // TROCAR: foto a enviar
      { nome: "Projeto", texto: "Desenho do ambiente e dos móveis planejados.", placeholder: "Foto do projeto a confirmar" }, // TROCAR: foto a enviar
      { nome: "Execução", texto: "Produção e instalação dos móveis no ambiente.", foto: "fabrica" }
    ]
  },

  // 4. Linhas e projetos
  linhasProjetos: {
    rotulo: "Linhas e projetos",
    titulo: "Móveis planejados de alto padrão.",
    linhasTitulo: "Nossas linhas.",
    linhasTexto: "Descrições a confirmar com a Spazio 61.",
    linhas: ["Marcenaria", "Cadeiras", "Sofás", "Mesas", "Poltronas", "Acessórios"],
    fonte: "Projetos publicados no Instagram @spazio.61."
  },

  // 5. Contato
  contato: {
    rotulo: "Contato",
    tituloLinha1: "Espaços dinâmicos e exclusivos?",
    tituloLinha2: "Fale com nossos consultores.",
    lead: "Deixe seu contato ou chame a nossa equipe no WhatsApp.",
    avisoDemo: "Demonstração: este formulário não envia nem guarda nenhum dado.", // TROCAR: remover quando o formulário real estiver ligado
    sucesso: "Recebemos o seu contato. Nesta demonstração, nada foi enviado."   // TROCAR: texto final quando o envio for real
  },

  /*
   * Fotos: públicas do Instagram @spazio.61, uso só em demonstração (sem autorização ainda).
   * Todas têm baixa resolução: exibir só em tamanhos pequenos (fotos inline, cards, menu).
   */
  fotos: {
    sala: { src: "assets/sala-de-jantar.webp", largura: 694, altura: 862, alt: "Sala de jantar com mesa redonda de madeira, cadeiras de couro preto e espelho redondo", legenda: "Sala de jantar" },
    lavabo: { src: "assets/lavabo.webp", largura: 622, altura: 812, alt: "Lavabo com parede ripada de madeira, espelho redondo iluminado e bancada de pedra", legenda: "Lavabo" },
    loja: { src: "assets/loja-spazio-61.webp", largura: 696, altura: 865, alt: "Placa da loja Spazio 61 Home & Office em parede de metal enferrujado com samambaias", legenda: "A loja Spazio 61" },
    fabrica: { src: "assets/fabrica.webp", largura: 568, altura: 552, alt: "Máquina de corte em galpão de marcenaria com dutos de exaustão", legenda: "Produção" }
  }
};
