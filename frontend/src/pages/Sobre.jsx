import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Award, Target, Compass, Eye, ArrowRight } from "lucide-react";
import { SectionEyebrow } from "../components/SectionEyebrow";
import { Button } from "../components/ui/button";
import { STATS, IMAGES } from "../data/site";

const VALUES = [
  {
    icon: Compass,
    title: "Missão",
    text: "Viabilizar o crescimento de empresas brasileiras por meio de soluções de garantia confiáveis, ágeis e estruturadas com profundidade técnica.",
  },
  {
    icon: Eye,
    title: "Visão",
    text: "Ser a consultoria de garantias de referência no Brasil, reconhecida pela flexibilidade na análise e pela proximidade com nossos clientes.",
  },
  {
    icon: Award,
    title: "Valores",
    text: "Ética em cada transação, transparência com clientes e parceiros, agilidade operacional e compromisso com o resultado final do cliente.",
  },
  {
    icon: Target,
    title: "Compromisso",
    text: "Cada operação é tratada como crítica. Atendimento consultivo de ponta a ponta, sem terceirização do relacionamento.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Sobre() {
  return (
    <div data-testid="sobre-page">
      {/* PAGE HEADER */}
      <section className="bg-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-20" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-32 grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <SectionEyebrow light>Sobre nós</SectionEyebrow>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl leading-[1.05] mt-6">
              Uma década estruturando
              <span className="text-gold italic"> garantias</span> que importam.
            </h1>
          </div>
          <div className="lg:col-span-5">
            <p className="text-lg text-white/70 leading-relaxed">
              A Analysis S.A. nasceu para preencher uma lacuna no mercado brasileiro de garantias:
              unir análise técnica criteriosa com a agilidade que empresas exigem para fechar
              contratos relevantes.
            </p>
          </div>
        </div>
      </section>

      {/* IMAGE + STORY */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-16 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-6"
          >
            <img
              src={IMAGES.about}
              alt="Equipe Analysis S.A."
              className="w-full aspect-[4/5] object-cover"
            />
          </motion.div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            custom={1}
            className="lg:col-span-6"
          >
            <SectionEyebrow>Nossa história</SectionEyebrow>
            <h2 className="font-serif text-3xl lg:text-5xl text-navy leading-tight mt-5">
              Especialistas. Consultivos. Ao seu lado.
            </h2>
            <div className="mt-8 space-y-5 text-lg text-slate-600 leading-relaxed">
              <p>
                Há mais de 10 anos atuando no mercado de garantias, a Analysis S.A. possui um
                amplo portfólio de serviços relacionados à Carta de Fiança e ao Seguro Garantia,
                com foco em viabilizar operações que outras consultorias rejeitariam.
              </p>
              <p>
                Atuamos com empresas do setor Privado e Público em todo o Brasil — de
                construtoras e empresas de tecnologia a importadoras, escritórios de advocacia e
                empresas de energia.
              </p>
              <p>
                Nossa diferença está no <strong className="text-navy">olhar técnico flexível</strong>:
                muitas das propostas recusadas por seguradoras tradicionais encontram aqui o
                caminho para serem estruturadas com sucesso.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS DARK BAND */}
      <section className="bg-navy text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              custom={i}
              className="py-12 px-8 first:pl-0 text-center lg:text-left"
            >
              <div className="font-serif text-5xl lg:text-6xl text-gold">{s.value}</div>
              <div className="mt-3 text-xs tracking-[0.22em] uppercase text-white/60">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* MVV */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-3xl mb-14">
            <SectionEyebrow>Princípios</SectionEyebrow>
            <h2 className="font-serif text-3xl lg:text-5xl text-navy leading-tight mt-5">
              Os fundamentos que guiam <span className="italic text-gold">cada decisão</span>.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-px bg-slate-200 border border-slate-200">
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  className="bg-white p-10 lg:p-12 group hover:bg-navy transition-colors duration-500"
                  data-testid={`value-card-${i}`}
                >
                  <div className="w-12 h-12 border border-slate-300 group-hover:border-gold flex items-center justify-center text-navy group-hover:text-gold transition-colors">
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-6 font-serif text-3xl text-navy group-hover:text-white transition-colors">
                    {v.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-slate-600 group-hover:text-white/70 transition-colors">
                    {v.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl lg:text-5xl text-navy leading-tight">
            Vamos estruturar a sua próxima garantia?
          </h2>
          <p className="mt-6 text-lg text-slate-600">
            Conte com nossa equipe especialista para transformar exigências contratuais em
            oportunidades.
          </p>
          <Link to="/contato" className="inline-block mt-10">
            <Button
              data-testid="sobre-cta-btn"
              className="bg-navy hover:bg-gold text-white h-14 px-10 rounded-sm font-semibold tracking-wide"
            >
              Falar com um especialista
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
