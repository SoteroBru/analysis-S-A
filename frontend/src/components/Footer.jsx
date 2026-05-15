import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Linkedin, Instagram, Facebook } from "lucide-react";
import { CONTACT, NAV, GUARANTEES } from "../data/site";

export const Footer = () => {
  return (
    <footer data-testid="site-footer" className="bg-navy-deep text-slate-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gold text-navy flex items-center justify-center font-serif text-lg">
              A
            </div>
            <div>
              <div className="font-serif text-xl text-white tracking-tight">Analysis S.A.</div>
              <div className="text-[10px] uppercase tracking-[0.32em] text-gold mt-1">
                Garantias estruturadas
              </div>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
            Há mais de uma década estruturando soluções em Carta de Fiança e Seguro Garantia para
            empresas dos setores público e privado em todo o Brasil.
          </p>
          <div className="flex gap-3 mt-6">
            {[
              { Icon: Linkedin, label: "linkedin" },
              { Icon: Instagram, label: "instagram" },
              { Icon: Facebook, label: "facebook" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                data-testid={`social-${label}`}
                className="w-10 h-10 border border-slate-700 flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
                aria-label={label}
              >
                <Icon className="w-4 h-4" strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="text-xs uppercase tracking-[0.25em] text-gold mb-5">Navegação</div>
          <ul className="space-y-3 text-sm">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  data-testid={`footer-nav-${n.to.replace("/", "") || "home"}`}
                  className="hover:text-white transition-colors"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <div className="text-xs uppercase tracking-[0.25em] text-gold mb-5">Modalidades</div>
          <ul className="space-y-3 text-sm">
            {GUARANTEES.slice(0, 6).map((g) => (
              <li key={g.slug}>
                <Link
                  to={`/garantias#${g.slug}`}
                  className="hover:text-white transition-colors"
                  data-testid={`footer-guarantee-${g.slug}`}
                >
                  {g.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <div className="text-xs uppercase tracking-[0.25em] text-gold mb-5">Contato</div>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <Phone className="w-4 h-4 mt-1 text-gold" strokeWidth={1.5} />
              <a href={`tel:+${CONTACT.phoneRaw}`} className="hover:text-white">
                {CONTACT.phone}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="w-4 h-4 mt-1 text-gold" strokeWidth={1.5} />
              <a href={`mailto:${CONTACT.email}`} className="hover:text-white break-all">
                {CONTACT.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 mt-1 text-gold" strokeWidth={1.5} />
              <span className="text-slate-400 leading-relaxed">{CONTACT.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>© {new Date().getFullYear()} Analysis S.A. — Todos os direitos reservados.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">
              Política de Privacidade
            </a>
            <a href="#" className="hover:text-white">
              Termos de Uso
            </a>
            <a href="#" className="hover:text-white">
              LGPD
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
