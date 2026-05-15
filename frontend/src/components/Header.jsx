import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { NAV, CONTACT } from "../data/site";
import { Button } from "./ui/button";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-slate-200/70"
          : "bg-white/40 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
        <Link to="/" data-testid="logo-link" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-navy text-white flex items-center justify-center font-serif text-lg group-hover:bg-gold transition-colors">
            A
          </div>
          <div className="leading-none">
            <div className="font-serif text-xl text-navy tracking-tight">Analysis</div>
            <div className="text-[10px] uppercase tracking-[0.32em] text-slate-500 mt-1">
              S.A. • Garantias
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              data-testid={`nav-link-${item.to.replace("/", "") || "home"}`}
              className={({ isActive }) =>
                `text-sm font-medium tracking-wide transition-colors hover:text-navy ${
                  isActive ? "text-navy" : "text-slate-600"
                }`
              }
              end={item.to === "/"}
            >
              {({ isActive }) => (
                <span className="relative">
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gold" />
                  )}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`tel:+${CONTACT.phoneRaw}`}
            data-testid="header-phone-link"
            className="flex items-center gap-2 text-sm text-slate-600 hover:text-navy transition-colors"
          >
            <Phone className="w-4 h-4" strokeWidth={1.5} />
            {CONTACT.phone}
          </a>
          <Link to="/contato">
            <Button
              data-testid="header-cta-quote"
              className="bg-navy hover:bg-gold text-white rounded-sm h-10 px-5 font-medium tracking-wide"
            >
              Solicitar Cotação
            </Button>
          </Link>
        </div>

        <button
          data-testid="mobile-menu-toggle"
          className="lg:hidden p-2 text-navy"
          onClick={() => setOpen((s) => !s)}
          aria-label="Menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div data-testid="mobile-menu" className="lg:hidden bg-white border-t border-slate-200">
          <div className="px-6 py-6 flex flex-col gap-4">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                data-testid={`mobile-nav-${item.to.replace("/", "") || "home"}`}
                className={({ isActive }) =>
                  `text-base font-medium py-2 border-b border-slate-100 ${
                    isActive ? "text-navy" : "text-slate-700"
                  }`
                }
                end={item.to === "/"}
              >
                {item.label}
              </NavLink>
            ))}
            <Link to="/contato" className="mt-2">
              <Button
                data-testid="mobile-cta-quote"
                className="w-full bg-navy hover:bg-gold text-white rounded-sm h-12 font-medium"
              >
                Solicitar Cotação
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
