import logoAura from "@/assets/logo-aura.png";

type Props = { variant?: "site" | "connect" | "admin" };

const SiteFooter = ({ variant = "site" }: Props) => {
  const isInternal = variant === "connect" || variant === "admin";

  if (isInternal) {
    return (
      <footer className="relative z-10 border-t border-border/50 bg-background mt-10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left text-xs text-muted-foreground/70">
          <span>© 2026 AURA — Todos os direitos reservados</span>
          <span>Empresa fictícia criada para fins acadêmicos.</span>
        </div>
      </footer>
    );
  }

  return (
    <footer className="relative z-10 border-t border-border/50 bg-background mt-10">
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8 text-sm">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <img src={logoAura} alt="Aura" className="w-8 h-8 object-contain" />
            <span
              className="text-lg font-semibold gold-gradient-text"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              AURA
            </span>
          </div>
          <p className="text-muted-foreground max-w-sm leading-relaxed">
            Auditoria &amp; Consultoria. Transparência, integridade e excelência a serviço do seu negócio.
          </p>
        </div>
        <div>
          <p className="text-foreground font-semibold mb-3 uppercase text-xs tracking-wider">Navegação</p>
          <ul className="space-y-2 text-muted-foreground">
            <li><a href="/" className="hover:text-primary transition-colors">Site institucional</a></li>
            <li><a href="/#servicos" className="hover:text-primary transition-colors">Serviços</a></li>
            <li><a href="/#equipe" className="hover:text-primary transition-colors">Equipe</a></li>
            <li><a href="/#contato" className="hover:text-primary transition-colors">Contato</a></li>
          </ul>
        </div>
        <div>
          <p className="text-foreground font-semibold mb-3 uppercase text-xs tracking-wider">Contato</p>
          <ul className="space-y-2 text-muted-foreground">
            <li>contato@auraauditoria.com.br</li>
            <li>+55 (71) 94002-8922</li>
            <li>Salvador · BA</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/40">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-muted-foreground/70 text-center md:text-left">
          <span>© 2026 AURA — Todos os direitos reservados</span>
          <span>Empresa fictícia criada para fins acadêmicos.</span>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;