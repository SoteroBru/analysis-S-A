import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  FileSearch,
  HandCoins,
  ShieldCheck,
  ArrowRight,
  Phone,
} from "lucide-react";
import { SectionEyebrow } from "../components/SectionEyebrow";
import { Button } from "../components/ui/button";
import { CONTACT, IMAGES, GUARANTEES } from "../data/site";

const STEPS = [
  {
    icon: FileSearch,
    title: "Análise do edital ou contrato",
    text: "Recebemos o documento, identificamos a modalidade ideal e levantamos as exigências regulatórias.",
  },
  {
    icon: HandCoins,
    title: "Estruturação e proposta",
    text: "Estruturamos a operação junto às seguradoras parceiras e apresentamos a melhor proposta financeira.",
  },
  {
    icon: ShieldCheck,
    title: "Emissão da garantia",
    text: "Após aprovação, emitimos a Carta de Fiança ou Seguro Garantia no prazo necessário para sua operação.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function CartaDeFianca() {
  return (
    <div data-testid="carta-page">
      {/* HEADER */}
      <section className="bg-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-20" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-32 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <SectionEyebrow light>Serviço principal</SectionEyebrow>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl leading-[1.05] mt-6">
              Carta de Fiança & <span className="text-gold italic">Seguro Garantia</span>
            </h1>
            <p className="mt-8 text-lg lg:text-xl text-white/70 max-w-3xl leading-relaxed">
              Substitua depósitos em dinheiro e fianças bancárias por uma estrutura mais
              inteligente, sem comprometer o capital de giro nem o limite de crédito da sua
              empresa.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT IS */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-16 items-start">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-5"
          >
            <SectionEyebrow>O que é</SectionEyebrow>
            <h2 className="font-serif text-3xl lg:text-5xl text-navy leading-tight mt-5">
              A garantia que destrava contratos.
            </h2>
          </motion.div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            custom={1}
            className="lg:col-span-7 space-y-5 text-lg text-slate-600 leading-relaxed"
          >
            <p>
              A <strong className="text-navy">Carta de Fiança</strong> e o{" "}
              <strong className="text-navy">Seguro Garantia</strong> são instrumentos que asseguram
              o cumprimento de uma obrigação contratual: caso o tomador não cumpra com o que foi
              acordado, o segurador indeniza o beneficiário.
            </p>
            <p>
              Esses produtos são amplamente aceitos em licitações públicas, contratos privados,
              processos judiciais, concessões e operações imobiliárias — e na maioria dos casos
              substituem com vantagem o depósito em dinheiro ou a fiança bancária tradicional.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 pt-4">
              {[
                "Sem uso do limite bancário",
                "Custo reduzido vs. fiança bancária",
                "Emissão em prazos curtos",
                "Aceito em editais públicos",
              ].map((t) => (
                <div key={t} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold mt-0.5 shrink-0" strokeWidth={1.5} />
                  <span className="text-base text-slate-700">{t}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* IMAGE BAND */}
      <section className="relative h-[40vh] lg:h-[60vh] overflow-hidden">
        <img src={IMAGES.service} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
            <div className="max-w-2xl text-white">
              <SectionEyebrow light>Mercado</SectionEyebrow>
              <p className="font-serif text-2xl lg:text-4xl mt-4 leading-tight">
                Lei 14.133/21, decisões do CARF e contratos privados sofisticados exigem garantias
                estruturadas com técnica.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-3xl mb-14">
            <SectionEyebrow>Como funciona</SectionEyebrow>
            <h2 className="font-serif text-3xl lg:text-5xl text-navy leading-tight mt-5">
              Do edital à emissão em 3 etapas
              <span className="italic text-gold"> objetivas</span>.
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  className="relative border border-slate-200 p-10 hover:border-gold transition-colors"
                  data-testid={`step-card-${i}`}
                >
                  <div className="absolute -top-5 left-10 bg-navy text-gold font-serif text-3xl w-12 h-12 flex items-center justify-center">
                    {i + 1}
                  </div>
                  <Icon className="w-7 h-7 text-navy mt-3" strokeWidth={1.25} />
                  <h3 className="mt-6 font-serif text-2xl text-navy leading-tight">{s.title}</h3>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">{s.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MODALIDADES MINI */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-2xl mb-12">
            <SectionEyebrow>Modalidades cobertas</SectionEyebrow>
            <h2 className="font-serif text-3xl lg:text-5xl text-navy leading-tight mt-5">
              Atendemos 8 frentes de garantia.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 border border-slate-200">
            {GUARANTEES.map((g) => {
              const Icon = g.icon;
              return (
                <Link
                  key={g.slug}
                  to={`/garantias#${g.slug}`}
                  className="bg-white p-6 hover:bg-navy hover:text-white transition-colors group flex items-center gap-4"
                  data-testid={`carta-modality-${g.slug}`}
                >
                  <Icon
                    className="w-5 h-5 text-navy group-hover:text-gold transition-colors"
                    strokeWidth={1.5}
                  />
                  <span className="font-medium">{g.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-navy text-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl lg:text-5xl leading-tight">
            Pronto para estruturar sua garantia?
          </h2>
          <p className="mt-6 text-white/70 text-lg">
            Envie o edital ou contrato — devolvemos uma proposta personalizada em até 48 horas.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/contato">
              <Button
                data-testid="carta-cta-quote"
                className="bg-gold hover:bg-white text-navy h-14 px-8 rounded-sm font-semibold tracking-wide"
              >
                Solicitar Cotação
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <a href={`tel:+${CONTACT.phoneRaw}`}>
              <Button
                variant="outline"
                data-testid="carta-cta-phone"
                className="h-14 px-8 rounded-sm bg-transparent border-white/30 text-white hover:bg-white hover:text-navy"
              >
                <Phone className="mr-2 w-4 h-4" strokeWidth={1.5} />
                {CONTACT.phone}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
