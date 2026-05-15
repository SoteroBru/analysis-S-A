export const SectionEyebrow = ({ children, light = false, className = "" }) => (
  <div
    className={`inline-flex items-center gap-3 text-xs tracking-[0.28em] uppercase font-semibold ${
      light ? "text-gold" : "text-slate-500"
    } ${className}`}
  >
    <span className={`w-8 h-px ${light ? "bg-gold" : "bg-slate-400"}`} />
    {children}
  </div>
);
