import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Building2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { SectionEyebrow } from "../components/SectionEyebrow";
import { CONTACT, GUARANTEES } from "../data/site";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export default function Contato() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    modality: "",
    value: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Preencha nome, e-mail e mensagem.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Solicitação enviada!", {
        description: "Nosso time entrará em contato em até 1 dia útil.",
      });
      setForm({
        name: "",
        company: "",
        email: "",
        phone: "",
        modality: "",
        value: "",
        message: "",
      });
    }, 900);
  };

  return (
    <div data-testid="contato-page">
      <section className="bg-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-20" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
          <SectionEyebrow light>Fale Conosco</SectionEyebrow>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl leading-[1.05] mt-6 max-w-4xl">
            Receba uma proposta em
            <span className="text-gold italic"> 48 horas</span>.
          </h1>
          <p className="mt-8 text-lg lg:text-xl text-white/70 max-w-3xl leading-relaxed">
            Preencha o formulário ao lado ou utilize um dos canais diretos. Garantimos retorno
            consultivo de um especialista — não um atendimento robotizado.
          </p>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12 items-start">
          {/* FORM */}
          <motion.form
            onSubmit={submit}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-span-7 bg-white border border-slate-200 p-8 lg:p-12 shadow-sm"
            data-testid="contact-form"
          >
            <div className="flex items-center gap-3 mb-2">
              <Building2 className="w-5 h-5 text-gold" strokeWidth={1.5} />
              <span className="text-xs tracking-[0.25em] uppercase text-slate-500 font-semibold">
                Cotação corporativa
              </span>
            </div>
            <h2 className="font-serif text-3xl lg:text-4xl text-navy leading-tight">
              Conte-nos sobre sua operação
            </h2>

            <div className="mt-10 grid sm:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="name" className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Nome completo *
                </Label>
                <Input
                  id="name"
                  data-testid="form-name"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="mt-2 h-12 rounded-sm border-slate-300 focus:border-navy"
                  required
                />
              </div>
              <div>
                <Label htmlFor="company" className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Empresa
                </Label>
                <Input
                  id="company"
                  data-testid="form-company"
                  value={form.company}
                  onChange={(e) => handleChange("company", e.target.value)}
                  className="mt-2 h-12 rounded-sm border-slate-300 focus:border-navy"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  E-mail corporativo *
                </Label>
                <Input
                  id="email"
                  type="email"
                  data-testid="form-email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="mt-2 h-12 rounded-sm border-slate-300 focus:border-navy"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Telefone
                </Label>
                <Input
                  id="phone"
                  data-testid="form-phone"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="mt-2 h-12 rounded-sm border-slate-300 focus:border-navy"
                />
              </div>
              <div>
                <Label className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Modalidade de interesse
                </Label>
                <Select
                  value={form.modality}
                  onValueChange={(v) => handleChange("modality", v)}
                >
                  <SelectTrigger
                    data-testid="form-modality"
                    className="mt-2 h-12 rounded-sm border-slate-300"
                  >
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {GUARANTEES.map((g) => (
                      <SelectItem key={g.slug} value={g.slug}>
                        {g.title}
                      </SelectItem>
                    ))}
                    <SelectItem value="outra">Outra modalidade</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="value" className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Valor estimado da garantia
                </Label>
                <Input
                  id="value"
                  data-testid="form-value"
                  placeholder="R$ 0,00"
                  value={form.value}
                  onChange={(e) => handleChange("value", e.target.value)}
                  className="mt-2 h-12 rounded-sm border-slate-300 focus:border-navy"
                />
              </div>
            </div>

            <div className="mt-5">
              <Label htmlFor="message" className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Mensagem *
              </Label>
              <Textarea
                id="message"
                data-testid="form-message"
                value={form.message}
                onChange={(e) => handleChange("message", e.target.value)}
                rows={5}
                className="mt-2 rounded-sm border-slate-300 focus:border-navy resize-none"
                placeholder="Descreva o contrato, edital ou processo que demanda a garantia."
                required
              />
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-xs text-slate-500 max-w-sm">
                Ao enviar, você concorda com nossa Política de Privacidade. Seus dados serão
                tratados conforme a LGPD.
              </p>
              <Button
                type="submit"
                disabled={submitting}
                data-testid="form-submit"
                className="bg-navy hover:bg-gold text-white h-14 px-8 rounded-sm font-semibold tracking-wide w-full sm:w-auto"
              >
                {submitting ? "Enviando..." : "Enviar solicitação"}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </motion.form>

          {/* CONTACT INFO */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-span-5 lg:sticky lg:top-28 space-y-4"
          >
            <div className="bg-navy text-white p-8">
              <SectionEyebrow light>Canais diretos</SectionEyebrow>
              <h3 className="font-serif text-3xl mt-4">Nós ligamos para você.</h3>
              <p className="mt-3 text-white/70 text-sm leading-relaxed">
                Prefere falar agora? Use um dos canais abaixo e ative o atendimento imediato.
              </p>
              <ul className="mt-8 space-y-6">
                <li>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-1">
                    Telefone
                  </div>
                  <a
                    href={`tel:+${CONTACT.phoneRaw}`}
                    data-testid="contact-phone"
                    className="flex items-center gap-3 text-lg hover:text-gold transition-colors"
                  >
                    <Phone className="w-4 h-4" strokeWidth={1.5} />
                    {CONTACT.phone}
                  </a>
                </li>
                <li>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-1">
                    E-mail
                  </div>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    data-testid="contact-email"
                    className="flex items-center gap-3 text-lg hover:text-gold transition-colors break-all"
                  >
                    <Mail className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                    {CONTACT.email}
                  </a>
                </li>
                <li>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-1">
                    Endereço
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 mt-1 shrink-0" strokeWidth={1.5} />
                    <span className="text-sm leading-relaxed text-white/80">
                      {CONTACT.address}
                    </span>
                  </div>
                </li>
                <li>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-1">
                    Horário
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/80">
                    <Clock className="w-4 h-4" strokeWidth={1.5} />
                    {CONTACT.hours}
                  </div>
                </li>
              </ul>
            </div>

            <div className="aspect-[4/3] border border-slate-200 overflow-hidden">
              <iframe
                title="Mapa Analysis S.A."
                src="https://www.google.com/maps?q=R.%20Augusta%2C%201939%20-%20Cerqueira%20C%C3%A9sar%2C%20S%C3%A3o%20Paulo&output=embed"
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
