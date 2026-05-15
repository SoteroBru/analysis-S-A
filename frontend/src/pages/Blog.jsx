import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { POSTS } from "../data/site";
import { SectionEyebrow } from "../components/SectionEyebrow";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Blog() {
  const [featured, ...rest] = POSTS;

  return (
    <div data-testid="blog-page">
      <section className="bg-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-20" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
          <SectionEyebrow light>Blog & Notícias</SectionEyebrow>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl leading-[1.05] mt-6 max-w-4xl">
            Inteligência aplicada ao mercado de
            <span className="text-gold italic"> garantias</span>.
          </h1>
          <p className="mt-8 text-lg lg:text-xl text-white/70 max-w-3xl leading-relaxed">
            Análises técnicas, mudanças regulatórias e estratégias práticas para empresas que
            operam com licitações, contratos públicos e judicial.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Featured */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Link
              to={`/blog/${featured.slug}`}
              className="group grid lg:grid-cols-12 gap-10 items-center mb-24"
              data-testid={`blog-featured-${featured.slug}`}
            >
              <div className="lg:col-span-7 aspect-[16/10] overflow-hidden">
                <img
                  src={featured.cover}
                  alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="lg:col-span-5">
                <div className="flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase text-slate-500 mb-4">
                  <span className="text-gold font-semibold">{featured.category}</span>
                  <span>•</span>
                  <span>{featured.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" strokeWidth={1.5} />
                    {featured.readTime}
                  </span>
                </div>
                <h2 className="font-serif text-3xl lg:text-5xl text-navy group-hover:text-gold transition-colors leading-tight">
                  {featured.title}
                </h2>
                <p className="mt-6 text-lg text-slate-600 leading-relaxed">{featured.excerpt}</p>
                <span className="inline-flex items-center gap-2 mt-8 text-sm font-semibold text-navy group-hover:text-gold transition-colors">
                  Ler artigo completo
                  <ArrowUpRight
                    className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    strokeWidth={1.75}
                  />
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Grid */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {rest.map((p, i) => (
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
                  className="group block"
                  data-testid={`blog-card-${p.slug}`}
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
