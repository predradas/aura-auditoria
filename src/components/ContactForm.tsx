import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(2, "Informe seu nome").max(100),
  email: z.string().trim().email("Email inválido").max(255),
  company: z.string().trim().max(150).optional().or(z.literal("")),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  subject: z.string().trim().min(2, "Informe um assunto").max(200),
  message: z.string().trim().min(10, "Mensagem muito curta").max(2000),
});

const ContactForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", company: "", phone: "", subject: "", message: "",
  });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast({ title: "Verifique os campos", description: parsed.error.issues[0].message, variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("contact_messages").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      company: parsed.data.company || null,
      phone: parsed.data.phone || null,
      subject: parsed.data.subject,
      message: parsed.data.message,
    });
    setLoading(false);
    if (error) {
      toast({ title: "Erro ao enviar", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Mensagem enviada!", description: "Em breve nossa equipe entrará em contato." });
    setForm({ name: "", email: "", company: "", phone: "", subject: "", message: "" });
  };

  const inputCls = "w-full bg-secondary/40 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors";

  return (
    <form onSubmit={onSubmit} className="glass-gold rounded-2xl p-6 md:p-8 space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <input className={inputCls} placeholder="Nome completo *" value={form.name} onChange={update("name")} maxLength={100} required />
        <input className={inputCls} type="email" placeholder="Email *" value={form.email} onChange={update("email")} maxLength={255} required />
        <input className={inputCls} placeholder="Empresa" value={form.company} onChange={update("company")} maxLength={150} />
        <input className={inputCls} placeholder="Telefone" value={form.phone} onChange={update("phone")} maxLength={30} />
      </div>
      <input className={inputCls} placeholder="Assunto *" value={form.subject} onChange={update("subject")} maxLength={200} required />
      <textarea
        className={inputCls + " min-h-[140px] resize-y"}
        placeholder="Como podemos ajudar? *"
        value={form.message}
        onChange={update("message")}
        maxLength={2000}
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity text-sm tracking-wide uppercase disabled:opacity-60"
      >
        {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
        {loading ? "Enviando…" : "Enviar mensagem"}
      </button>
    </form>
  );
};

export default ContactForm;