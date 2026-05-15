import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  Phone,
  Sparkles,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { SectionEyebrow } from "../components/SectionEyebrow";
import {
  GUARANTEES,
  ADVANTAGES,
  STATS,
  POSTS,
  IMAGES,
  CONTACT,
} from "../data/site";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Home() {
  return (
    <div data-testid="home-page">
      {/* HERO */}
      <section
        data-testid="hero-section"
        className="relative -mt-20 pt-32 lg:pt-40 pb-24 lg:pb-32 bg-navy text-white overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src={IMAGES.hero}
            alt="Skyline corporativo"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/95 to-navy-deep" />
          <div className="absolute inset-0 hero-grid opacity-30" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0}
              className="inline-flex items-center gap-3 px-3 py-1 border border-white/20 rounded-full text-[11px] tracking-[0.25em] uppercase text-white/80 mb-8"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold" strokeWidth={1.5} />
              Mais de 10 anos especializados em garantias
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={1}
              className="font-serif text-4xl sm:text-5xl lg:text-7xl leading-[1.05] text-balance"
            >
              Garantias que <span className="text-gold italic">destravam</span>
              <br />o crescimento da sua empresa.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={2}
              className="mt-8 text-lg lg:text-xl text-white/70 max-w-2xl leading-relaxed"
            >
              Cartas de Fiança e Seguros Garantia estruturados para empresas que precisam de
              agilidade em licitações, contratos públicos, privados e processos judiciais — sem
              comprometer o capital de giro.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={3}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link to="/contato">
                <Button
                  data-testid="hero-cta-primary"
                  className="relative overflow-hidden btn-shimmer bg-gold hover:bg-[#b48857] text-navy h-14 px-8 rounded-sm font-semibold tracking-wide text-base"
                >
                  Solicitar Cotação
                  <ArrowRight className="ml-2 w-4 h-4" strokeWidth={2} />
                </Button>
              </Link>
              <a href={`tel:+${CONTACT.phoneRaw}`}>
                <Button
                  variant="outline"
                  data-testid="hero-cta-secondary"
                  className="h-14 px-8 rounded-sm font-semibold tracking-wide text-base bg-transparent border-white/30 text-white hover:bg-white hover:text-navy"
                >
                  <Phone className="mr-2 w-4 h-4" strokeWidth={1.5} />
                  Falar com Especialista
                </Button>
              </a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={4}
              className="mt-12 flex flex-wrap items-center gap-6 text-sm text-white/70"
            >
              {[
                "Resposta em 48h",
                "Análise flexível de risco",
                "Sem comprometer crédito bancário",
              ].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold" strokeWidth={1.5} />
                  {t}
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={5}
            className="lg:col-span-5"
          >
            <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="w-5 h-5 text-gold" strokeWidth={1.5} />
                <span className="text-xs tracking-[0.25em] uppercase text-gold">
                  Cotação Expressa
                </span>
              </div>
              <h3 className="font-serif text-3xl text-white leading-tight mb-3">
                Receba sua análise <em className="text-gold not-italic">em 48 horas</em>.
              </h3>
              <p className="text-white/70 text-sm mb-8 leading-relaxed">
                Envie o edital ou contrato e nosso time estrutura a melhor garantia para o seu
                caso, com flexibilidade que outras seguradoras não oferecem.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Atendimento humano e consultivo",
                  "Aceitamos propostas recusadas",
                  "Time experiente em licitações e judicial",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm text-white/80">
                    <span className="mt-1 w-1.5 h-1.5 bg-gold rounded-full shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
              <Link to="/contato">
                <Button
                  data-testid="hero-card-cta"
                  className="w-full bg-white text-navy hover:bg-gold hover:text-white h-12 rounded-sm font-semibold tracking-wide"
                >
                  Quero uma cotação
                  <ArrowUpRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <div className="relative mt-20 lg:mt-28 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                custom={i}
                className="py-8 px-6 first:pl-0 text-center lg:text-left"
              >
                <div className="font-serif text-4xl lg:text-5xl text-gold">{s.value}</div>
                <div className="mt-2 text-xs tracking-[0.22em] uppercase text-white/60">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-16 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-5"
          >
            <div className="relative aspect-[4/5]">
              <img
                src={IMAGES.about}
                alt="Reunião corporativa"
                className="w-full h-full object-cover"
              />
              <div className="absolute -bottom-6 -right-6 hidden lg:block bg-navy text-white p-6 max-w-[240px]">
                <div className="font-serif text-4xl text-gold">10+</div>
                <div className="mt-2 text-xs tracking-[0.22em] uppercase">
                  Anos preservando ética em cada transação
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            custom={1}
            className="lg:col-span-7"
          >
            <SectionEyebrow>Sobre a Analysis S.A.</SectionEyebrow>
            <h2 className="font-serif text-3xl lg:text-5xl text-navy leading-tight mt-5">
              Especialistas em garantias, para que você só tenha
              <span className="text-gold"> um foco</span>: crescer.
            </h2>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              Há mais de uma década atuando no mercado de garantias, a Analysis S.A. mantém um
              portfólio amplo e estruturado de soluções em Carta de Fiança e Seguro Garantia para
              empresas dos setores público e privado.
            </p>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Combinamos análise técnica rigorosa, agilidade operacional e flexibilidade na
              avaliação de riscos — viabilizando operações que outras seguradoras costumam
              recusar.
            </p>

            <div className="mt-10 grid sm:grid-cols-2 gap-4">
              {[
                "Estrutura de risco flexível",
                "Resposta de cadastro ágil",
                "Atendimento consultivo dedicado",
                "Cobertura nacional",
              ].map((t) => (
                <div
                  key={t}
                  className="flex items-center gap-3 px-4 py-3 border border-slate-200 bg-white"
                >
                  <CheckCircle2 className="w-4 h-4 text-gold" strokeWidth={1.5} />
                  <span className="text-sm text-slate-700">{t}</span>
                </div>
              ))}
            </div>

            <Link
              to="/sobre"
              data-testid="about-teaser-link"
              className="inline-flex items-center gap-2 mt-10 text-sm font-semibold text-navy hover:text-gold transition-colors group"
            >
              Conheça nossa história
              <ArrowUpRight
                className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                strokeWidth={1.75}
              />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section className="py-24 lg:py-32 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-3xl">
            <SectionEyebrow>Por que escolher a Analysis</SectionEyebrow>
            <h2 className="font-serif text-3xl lg:text-5xl text-navy leading-tight mt-5">
              Vantagens competitivas em <span className="italic text-gold">cada operação</span>.
            </h2>
          </div>

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 border border-slate-200">
            {ADVANTAGES.map((a, i) => {
              const Icon = a.icon;
              return (
                <motion.div
                  key={a.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  className="group bg-white p-10 hover:bg-navy transition-colors duration-500"
                  data-testid={`advantage-card-${i}`}
                >
                  <div className="w-12 h-12 border border-slate-300 group-hover:border-gold flex items-center justify-center text-navy group-hover:text-gold transition-colors">
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div className="mt-6 text-[10px] tracking-[0.3em] uppercase text-slate-400 group-hover:text-gold transition-colors">
                    0{i + 1}
                  </div>
                  <h3 className="mt-3 font-serif text-2xl text-navy group-hover:text-white transition-colors">
                    {a.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 group-hover:text-white/70 transition-colors">
                    {a.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* GUARANTEES BENTO */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row justify-between gap-8 lg:items-end mb-14">
            <div className="max-w-2xl">
              <SectionEyebrow>Modalidades de garantia</SectionEyebrow>
              <h2 className="font-serif text-3xl lg:text-5xl text-navy leading-tight mt-5">
                Cobertura para os contratos
                <span className="italic text-gold"> mais exigentes</span>.
              </h2>
            </div>
            <Link to="/garantias">
              <Button
                variant="outline"
                data-testid="garantias-explore-btn"
                className="border-navy text-navy hover:bg-navy hover:text-white rounded-sm h-12 px-6 font-medium"
              >
                Ver todas as modalidades
                <ArrowUpRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {GUARANTEES.map((g, i) => {
              const Icon = g.icon;
              return (
                <motion.div
                  key={g.slug}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.15 }}
                  custom={i % 4}
                  className="group bg-white border border-slate-200 p-8 hover:-translate-y-1 hover:shadow-xl hover:border-gold transition-all duration-300"
                  data-testid={`guarantee-card-${g.slug}`}
                >
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-11 h-11 bg-navy text-white flex items-center justify-center group-hover:bg-gold transition-colors">
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <span className="text-[10px] tracking-[0.3em] uppercase text-slate-400">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl text-navy leading-tight">{g.title}</h3>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {g.short}
                  </p>
                  <Link
                    to={`/garantias#${g.slug}`}
                    className="mt-6 inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-semibold text-navy group-hover:text-gold transition-colors"
                  >
                    Saiba mais
                    <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HIGH CONTRAST CTA */}
      <section className="relative py-24 lg:py-32 bg-navy text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={IMAGES.cta}
            alt=""
            className="w-full h-full object-cover opacity-15"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <SectionEyebrow light>Pronto para começar?</SectionEyebrow>
            <h2 className="font-serif text-3xl lg:text-6xl leading-tight mt-5">
              Confie em quem mais entende de
              <span className="text-gold italic"> garantias</span> no mercado.
            </h2>
            <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">
              Mais de 850 empresas já estruturaram suas garantias com a Analysis S.A. Receba uma
              proposta personalizada e descubra como podemos viabilizar sua próxima operação.
            </p>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-4">
            <Link to="/contato">
              <Button
                data-testid="cta-section-primary"
                className="w-full bg-gold hover:bg-white text-navy hover:text-navy h-14 rounded-sm font-semibold tracking-wide text-base"
              >
                Solicitar Cotação Agora
                <ArrowRight className="ml-2 w-4 h-4" strokeWidth={2} />
              </Button>
            </Link>
            <a href={`tel:+${CONTACT.phoneRaw}`}>
              <Button
                variant="outline"
                data-testid="cta-section-secondary"
                className="w-full bg-transparent border-white/30 text-white hover:bg-white hover:text-navy h-14 rounded-sm font-semibold tracking-wide text-base"
              >
                <Phone className="mr-2 w-4 h-4" strokeWidth={1.5} />
                {CONTACT.phone}
              </Button>
            </a>
            <div className="text-xs text-white/50 text-center mt-2">
              Atendimento {CONTACT.hours}
            </div>
          </div>
        </div>
      </section>

      {/* BLOG TEASER */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
            <div className="max-w-2xl">
              <SectionEyebrow>Conhecimento</SectionEyebrow>
              <h2 className="font-serif text-3xl lg:text-5xl text-navy leading-tight mt-5">
                Inteligência de mercado para
                <span className="italic text-gold"> decisões melhores</span>.
              </h2>
            </div>
            <Link to="/blog">
              <Button
                variant="outline"
                data-testid="blog-teaser-cta"
                className="border-navy text-navy hover:bg-navy hover:text-white rounded-sm h-12 px-6"
              >
                Ver todos os artigos
                <ArrowUpRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {POSTS.slice(0, 3).map((p, i) => (
              <motion.div
                key={p.slug}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                custom={i}
              >
                <Link
                  to={`/blog/${p.slug}`}
                  data-testid={`blog-teaser-card-${p.slug}`}
                  className="group block"
                >
                  <div className="aspect-[4/3] overflow-hidden mb-5">
                    <img
                      src={p.cover}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase text-slate-500 mb-3">
                    <span className="text-gold font-semibold">{p.category}</span>
                    <span>•</span>
                    <span>{p.date}</span>
                  </div>
                  <h3 className="font-serif text-xl text-navy group-hover:text-gold transition-colors leading-tight">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">{p.excerpt}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
