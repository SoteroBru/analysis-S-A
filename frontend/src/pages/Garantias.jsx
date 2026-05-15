import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { GUARANTEES, CONTACT } from "../data/site";
import { SectionEyebrow } from "../components/SectionEyebrow";
import { Button } from "../components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Garantias() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.replace("#", ""));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 200);
      }
    }
  }, [hash]);

  return (
    <div data-testid="garantias-page">
      <section className="bg-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-20" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
          <SectionEyebrow light>Modalidades</SectionEyebrow>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl leading-[1.05] mt-6 max-w-4xl">
            Garantias estruturadas para
            <span className="text-gold italic"> cada cenário</span>.
          </h1>
          <p className="mt-8 text-lg lg:text-xl text-white/70 max-w-3xl leading-relaxed">
            Cobrimos as 8 principais modalidades exigidas em contratos públicos, privados e
            judiciais no Brasil. Análise técnica, agilidade na emissão e flexibilidade na
            avaliação de risco.
          </p>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-24 lg:space-y-32">
          {GUARANTEES.map((g, i) => {
            const Icon = g.icon;
            const reversed = i % 2 === 1;
            return (
              <motion.div
                key={g.slug}
                id={g.slug}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className={`grid lg:grid-cols-12 gap-12 items-center scroll-mt-28 ${
                  reversed ? "lg:[direction:rtl]" : ""
                }`}
                data-testid={`garantia-section-${g.slug}`}
              >
                <div className="lg:col-span-5 lg:[direction:ltr]">
                  <div className="aspect-square bg-navy text-gold flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 hero-grid opacity-30" />
                    <Icon className="w-32 h-32 relative" strokeWidth={1} />
                    <div className="absolute top-6 left-6 font-mono-pro text-xs tracking-[0.25em] text-white/60">
                      0{i + 1} / 0{GUARANTEES.length}
                    </div>
                    <div className="absolute bottom-6 right-6 font-mono-pro text-xs tracking-[0.25em] text-gold uppercase">
                      Modalidade
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 lg:[direction:ltr]">
                  <SectionEyebrow>Modalidade 0{i + 1}</SectionEyebrow>
                  <h2 className="font-serif text-3xl lg:text-5xl text-navy leading-tight mt-5">
                    {g.title}
                  </h2>
                  <p className="mt-6 text-lg text-slate-600 leading-relaxed">{g.long}</p>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <Link to="/contato">
                      <Button
                        data-testid={`garantia-cta-${g.slug}`}
                        className="bg-navy hover:bg-gold text-white h-12 px-6 rounded-sm font-medium"
                      >
                        Solicitar cotação desta modalidade
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <SectionEyebrow>Não encontrou sua modalidade?</SectionEyebrow>
          <h2 className="font-serif text-3xl lg:text-5xl text-navy leading-tight mt-5">
            Estruturamos garantias sob medida.
          </h2>
          <p className="mt-6 text-lg text-slate-600">
            Fale com um especialista — temos histórico em operações fora do padrão.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href={`mailto:${CONTACT.email}`}>
              <Button
                data-testid="garantias-cta-email"
                variant="outline"
                className="border-navy text-navy hover:bg-navy hover:text-white h-12 px-6 rounded-sm"
              >
                <Mail className="mr-2 w-4 h-4" strokeWidth={1.5} />
                {CONTACT.email}
              </Button>
            </a>
            <a href={`tel:+${CONTACT.phoneRaw}`}>
              <Button
                data-testid="garantias-cta-phone"
                className="bg-navy hover:bg-gold text-white h-12 px-6 rounded-sm"
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
