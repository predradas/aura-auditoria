import logoAura from "@/assets/logo-aura.png";
import { Scale, Eye, Heart, ChevronDown } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-accent/5 blur-[100px]" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 glass border-b border-border/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoAura} alt="Aura Logo" className="w-10 h-10 object-contain" />
            <span className="text-xl font-semibold gold-gradient-text" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>
              AURA
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#missao" className="hover:text-primary transition-colors">Missão</a>
            <a href="#visao" className="hover:text-primary transition-colors">Visão</a>
            <a href="#valores" className="hover:text-primary transition-colors">Valores</a>
            <a href="#contato" className="hover:text-primary transition-colors">Contato</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] px-6 text-center">
        <div className="gold-glow rounded-full p-1 mb-8">
          <img src={logoAura} alt="Aura Auditoria" className="w-32 h-32 md:w-40 md:h-40 object-contain" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold gold-gradient-text mb-6 leading-tight">
          AURA
        </h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mb-2" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>
          Auditoria & Consultoria
        </p>
        <p className="text-sm md:text-base text-muted-foreground/70 max-w-xl mb-12">
          Transparência, integridade e excelência a serviço do seu negócio.
        </p>
        <a href="#missao" className="animate-bounce text-primary/60">
          <ChevronDown size={32} />
        </a>
      </section>

      {/* Missão */}
      <section id="missao" className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="glass-gold rounded-2xl p-8 md:p-12 gold-glow">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Scale className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold gold-gradient-text">Missão</h2>
            </div>
            <p className="text-foreground/80 text-base leading-relaxed">
              Oferecer serviços de auditoria e consultoria de excelência, promovendo a transparência 
              e a conformidade das organizações. Atuamos com rigor técnico e ético, garantindo que 
              nossos clientes possam tomar decisões seguras e fundamentadas, fortalecendo a confiança 
              de seus stakeholders e contribuindo para um ambiente empresarial mais íntegro.
            </p>
          </div>
        </div>
      </section>

      {/* Visão */}
      <section id="visao" className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="glass-gold rounded-2xl p-8 md:p-12 gold-glow">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Eye className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold gold-gradient-text">Visão</h2>
            </div>
            <p className="text-foreground/80 text-base leading-relaxed">
              Ser reconhecida como referência nacional em auditoria independente, destacando-nos pela 
              inovação, qualidade e compromisso com a verdade. Buscamos ser a primeira escolha de 
              empresas que valorizam a governança corporativa e a prestação de contas transparente, 
              expandindo nossa atuação com responsabilidade e excelência.
            </p>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section id="valores" className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold gold-gradient-text">Valores</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Integridade", desc: "Atuamos com honestidade e ética em todas as nossas relações, mantendo a imparcialidade como pilar fundamental." },
              { title: "Excelência", desc: "Buscamos continuamente a melhoria dos nossos processos e entregas, superando expectativas com qualidade técnica." },
              { title: "Transparência", desc: "Comunicamos de forma clara e objetiva, promovendo a confiança entre todas as partes envolvidas." },
              { title: "Responsabilidade", desc: "Assumimos o compromisso com o impacto das nossas ações na sociedade e no mercado." },
              { title: "Inovação", desc: "Incorporamos tecnologias e metodologias modernas para entregar resultados cada vez mais precisos." },
              { title: "Confidencialidade", desc: "Protegemos as informações dos nossos clientes com os mais altos padrões de segurança e sigilo." },
            ].map((valor, i) => (
              <div key={i} className="glass-gold rounded-xl p-6 hover:scale-[1.02] transition-transform duration-300">
                <h3 className="text-lg font-semibold text-primary mb-3" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>
                  {valor.title}
                </h3>
                <p className="text-foreground/70 text-sm leading-relaxed">{valor.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clientes / CTA */}
      <section id="contato" className="relative z-10 py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold gold-gradient-text mb-6">
            Pronto para elevar sua governança?
          </h2>
          <p className="text-muted-foreground mb-10">
            Entre em contato conosco e descubra como a Aura pode transformar a gestão da sua empresa.
          </p>
          <a
            href="mailto:contato@auraauditoria.com.br"
            className="inline-block px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity text-sm tracking-wide uppercase"
          >
            Fale Conosco
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <img src={logoAura} alt="Aura" className="w-6 h-6 object-contain" />
            <span className="gold-gradient-text font-semibold">AURA</span>
            <span>© 2026 — Todos os direitos reservados</span>
          </div>
          <p className="text-xs text-muted-foreground/50">Empresa fictícia criada para fins acadêmicos.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
