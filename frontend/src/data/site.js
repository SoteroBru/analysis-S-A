import {
  Gavel,
  Scale,
  Building2,
  Hammer,
  Home as HomeIcon,
  Wallet,
  Zap,
  Trophy,
  ShieldCheck,
  CreditCard,
  Clock4,
  ShieldQuestion,
  FileCheck2,
  Users,
} from "lucide-react";

export const CONTACT = {
  phone: "(11) 3554-0537",
  phoneRaw: "551135540537",
  whatsapp: "5511999999999", // placeholder for floating button
  email: "atendimento@analysissa.com.br",
  address: "R. Augusta, 1939 - 6º andar - CJ. 61 - Cerqueira César, São Paulo - SP, 01413-100",
  cnpj: "00.000.000/0001-00",
  hours: "Seg a Sex • 9h às 18h",
};

export const NAV = [
  { label: "Início", to: "/" },
  { label: "Sobre", to: "/sobre" },
  { label: "Carta de Fiança", to: "/carta-de-fianca" },
  { label: "Garantias", to: "/garantias" },
  { label: "Blog", to: "/blog" },
  { label: "Contato", to: "/contato" },
];

export const GUARANTEES = [
  {
    slug: "licitacoes",
    title: "Licitações",
    icon: Gavel,
    short: "Mantém sua proposta firme em licitações públicas e privadas.",
    long: "Garante que, nas licitações públicas ou privadas, o tomador mantenha sua proposta e assine o contrato nas condições estipuladas e dentro do prazo do edital.",
  },
  {
    slug: "judicial",
    title: "Judicial",
    icon: Scale,
    short: "Substitui depósitos em dinheiro em processos judiciais.",
    long: "Garante o pagamento de valores que o tomador necessite realizar no trâmite de processos judiciais, preservando o capital de giro da empresa.",
  },
  {
    slug: "concessao",
    title: "Concessão",
    icon: Building2,
    short: "Cobertura para contratos de concessão pública ou privada.",
    long: "Garante o prejuízo causado pelo descumprimento de todas as obrigações assumidas no contrato de concessão para exploração de um bem ou serviço.",
  },
  {
    slug: "execucao",
    title: "Execução de Contrato",
    icon: Hammer,
    short: "Protege o contratante contra inadimplência do tomador.",
    long: "Garante o prejuízo causado pelo descumprimento das obrigações assumidas em contratos de fornecimento, prestação de serviços e construção.",
  },
  {
    slug: "imobiliaria",
    title: "Imobiliária",
    icon: HomeIcon,
    short: "Garante obras e entrega de imóveis em prazos contratuais.",
    long: "Garante a execução das obras de edificações comerciais e residenciais, bem como a entrega do imóvel nas condições fixadas em contrato.",
  },
  {
    slug: "adiantamento",
    title: "Adiantamento de Pagamento",
    icon: Wallet,
    short: "Devolução de valores antecipados em caso de inadimplência.",
    long: "Garante que os valores antecipados e previstos no contrato sejam devolvidos ao contratante no caso de inadimplência da etapa contratual a que ele se designa.",
  },
  {
    slug: "energia",
    title: "Compra e Venda de Energia",
    icon: Zap,
    short: "Cobertura para o mercado livre de energia (ACL).",
    long: "Garante o pagamento das faturas inadimplentes de acordo com as cláusulas firmadas no contrato de fornecimento de energia.",
  },
  {
    slug: "concorrencia",
    title: "Concorrência",
    icon: Trophy,
    short: "Assinatura do contrato após vitória em concorrência.",
    long: "Garante indenização se o tomador, após vencer a concorrência prevista em edital, deixar de assinar o contrato de execução ou de fornecimento previsto.",
  },
];

export const ADVANTAGES = [
  {
    icon: ShieldCheck,
    title: "Alternativa à fiança bancária",
    text: "Substitui depósitos em dinheiro e fianças bancárias com agilidade e menor custo financeiro.",
  },
  {
    icon: CreditCard,
    title: "Preserva seu crédito",
    text: "Não compromete o limite de crédito da sua empresa no banco — capital de giro intacto.",
  },
  {
    icon: Clock4,
    title: "Contratação ágil",
    text: "Processo rápido e descomplicado, com análise enxuta e respostas em até 48 horas úteis.",
  },
  {
    icon: ShieldQuestion,
    title: "Análise flexível de risco",
    text: "Aceitamos a maioria das propostas que são recusadas por seguradoras tradicionais.",
  },
  {
    icon: FileCheck2,
    title: "Agilidade no cadastro",
    text: "Resposta de cadastro em tempo curto para que sua empresa nunca perca os prazos do edital.",
  },
  {
    icon: Users,
    title: "+10 anos de mercado",
    text: "Uma década inteira de experiência em garantias, preservando ética em cada transação.",
  },
];

export const POSTS = [
  {
    slug: "carta-fianca-vs-seguro-garantia",
    category: "Guia",
    date: "12 Fev 2026",
    title: "Carta de Fiança ou Seguro Garantia: qual a melhor opção para sua empresa?",
    excerpt:
      "Entenda as diferenças jurídicas, custos e cenários onde cada modalidade se destaca em licitações e contratos privados.",
    cover:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80",
    readTime: "8 min",
  },
  {
    slug: "novas-regras-licitacoes-2026",
    category: "Mercado",
    date: "28 Jan 2026",
    title: "Nova Lei de Licitações: o que muda para empresas em 2026",
    excerpt:
      "Mapeamos os principais impactos da Lei 14.133/21 nos contratos públicos e nas exigências de garantia.",
    cover:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80",
    readTime: "6 min",
  },
  {
    slug: "como-reduzir-custo-garantia",
    category: "Estratégia",
    date: "10 Jan 2026",
    title: "Como reduzir o custo total das garantias contratuais",
    excerpt:
      "5 técnicas usadas por grandes empresas para otimizar o custo médio das garantias sem perder cobertura.",
    cover:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1600&q=80",
    readTime: "5 min",
  },
  {
    slug: "garantia-judicial-substitui-deposito",
    category: "Jurídico",
    date: "22 Dez 2025",
    title: "Garantia Judicial pode substituir depósito em dinheiro? Sim — e com vantagens",
    excerpt:
      "Veja os fundamentos legais que permitem usar seguro garantia para substituir dinheiro em juízo.",
    cover:
      "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1600&q=80",
    readTime: "7 min",
  },
];

export const STATS = [
  { value: "+10", label: "Anos de mercado" },
  { value: "R$ 1,2 Bi", label: "Em garantias estruturadas" },
  { value: "+850", label: "Empresas atendidas" },
  { value: "48h", label: "Resposta de cadastro" },
];

export const IMAGES = {
  hero:
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=80",
  about:
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1800&q=80",
  cta:
    "https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&w=2000&q=80",
  service:
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1800&q=80",
};
