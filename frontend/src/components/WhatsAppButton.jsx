import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { CONTACT } from "../data/site";

export const WhatsAppButton = () => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 800);
    return () => clearTimeout(t);
  }, []);

  const message = encodeURIComponent(
    "Olá! Gostaria de uma cotação de Carta de Fiança / Seguro Garantia."
  );
  const href = `https://wa.me/${CONTACT.whatsapp}?text=${message}`;

  return (
    <div
      className={`fixed bottom-6 left-6 z-40 flex flex-col items-start gap-3 transition-all duration-500 ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {open && (
        <div
          data-testid="whatsapp-card"
          className="bg-white shadow-2xl border border-slate-200 w-72 p-5 rounded-sm relative"
        >
          <button
            onClick={() => setOpen(false)}
            className="absolute top-3 right-3 text-slate-400 hover:text-navy"
            aria-label="Fechar"
            data-testid="whatsapp-card-close"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-[#25D366] text-white rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <div>
              <div className="font-serif text-navy text-lg leading-tight">Atendimento</div>
              <div className="text-xs text-slate-500">Responde em minutos</div>
            </div>
          </div>
          <p className="text-sm text-slate-600 mb-4 leading-relaxed">
            Fale agora com um consultor especialista e receba uma cotação personalizada para sua
            empresa.
          </p>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="whatsapp-card-cta"
            className="block text-center bg-[#25D366] hover:bg-[#1ebe57] text-white text-sm font-medium py-3 rounded-sm transition-colors"
          >
            Iniciar Conversa
          </a>
        </div>
      )}

      <button
        data-testid="whatsapp-float-btn"
        onClick={() => setOpen((s) => !s)}
        className="group relative w-16 h-16 bg-[#25D366] hover:bg-[#1ebe57] text-white rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-105"
        aria-label="WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-40 -z-10" />
        <MessageCircle className="w-7 h-7" strokeWidth={1.5} />
      </button>
    </div>
  );
};
