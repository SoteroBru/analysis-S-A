import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import { POSTS } from "../data/site";
import { SectionEyebrow } from "../components/SectionEyebrow";
import { Button } from "../components/ui/button";

export default function BlogPost() {
  const { slug } = useParams();
  const post = POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-32 text-center" data-testid="blog-post-notfound">
        <h1 className="font-serif text-4xl text-navy mb-4">Artigo não encontrado</h1>
        <Link to="/blog">
          <Button className="bg-navy text-white">Voltar ao Blog</Button>
        </Link>
      </div>
    );
  }

  return (
    <div data-testid="blog-post-page">
      <section className="bg-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-20" />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-10 py-24 lg:py-28">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-gold mb-8"
            data-testid="back-to-blog"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
            Todos os artigos
          </Link>
          <SectionEyebrow light>{post.category}</SectionEyebrow>
          <h1 className="font-serif text-4xl lg:text-6xl leading-tight mt-6">{post.title}</h1>
          <div className="flex items-center gap-4 mt-8 text-sm text-white/60">
            <span>{post.date}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" strokeWidth={1.5} />
              {post.readTime}
            </span>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div className="aspect-[16/9] overflow-hidden mb-12">
            <img src={post.cover} alt={post.title} className="w-full h-full object-cover" />
          </div>

          <article className="prose prose-lg max-w-none text-slate-700 space-y-6">
            <p className="text-xl leading-relaxed text-slate-600 font-light">{post.excerpt}</p>
            <p>
              No mercado brasileiro de garantias, escolher entre Carta de Fiança e Seguro Garantia
              vai muito além de preço. Os dois instrumentos atendem ao mesmo objetivo —
              assegurar o cumprimento de uma obrigação — mas têm regimes jurídicos, custos
              operacionais e estruturas de aceite distintas.
            </p>
            <h2 className="font-serif text-3xl text-navy">Cenário regulatório</h2>
            <p>
              A nova Lei de Licitações (14.133/21) consolidou exigências mais rigorosas sobre as
              modalidades aceitas em contratos da administração pública direta e indireta.
              Empresas que operam com órgãos públicos devem dominar não apenas a estrutura
              financeira, mas também os requisitos de habilitação técnica.
            </p>
            <h2 className="font-serif text-3xl text-navy">Quando faz sentido cada modalidade?</h2>
            <p>
              Em contratos de longa duração com valores expressivos, o Seguro Garantia costuma
              apresentar custo total menor. Já em operações pontuais e de curto prazo, a Carta de
              Fiança pode oferecer agilidade e simplicidade superiores.
            </p>
            <blockquote className="border-l-4 border-gold pl-6 italic text-2xl text-navy font-serif">
              "Ao estruturar uma garantia, o cliente deve avaliar três variáveis críticas: prazo,
              valor e perfil de risco do tomador."
            </blockquote>
            <p>
              Para discutir o melhor caminho para o seu contrato, entre em contato com nossos
              especialistas. Cada caso recebe análise técnica dedicada.
            </p>
          </article>

          <div className="mt-16 p-8 lg:p-10 bg-navy text-white">
            <h3 className="font-serif text-3xl">Precisa estruturar uma garantia?</h3>
            <p className="mt-4 text-white/70">
              Receba uma proposta sob medida em até 48 horas.
            </p>
            <Link to="/contato" className="inline-block mt-6">
              <Button
                data-testid="blog-post-cta"
                className="bg-gold hover:bg-white text-navy h-12 px-6 rounded-sm font-semibold"
              >
                Solicitar Cotação
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
