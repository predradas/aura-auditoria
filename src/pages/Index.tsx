import logoAura from "@/assets/logo-aura.png";
import {
  Scale, Eye, Heart, ChevronDown,
  ShieldCheck, FileSearch, Calculator, Gavel, Briefcase, TrendingUp,
  Mail, Phone, MapPin, Linkedin, CheckCircle2, Users, Award, Building2,
  ClipboardList, Search, BarChart3, Handshake,
} from "lucide-react";
import ChatWidget from "@/components/ChatWidget";
import ContactForm from "@/components/ContactForm";

const Index = () => {
  const services = [
    { icon: FileSearch, title: "Auditoria Independente", desc: "Análise das demonstrações financeiras com emissão de parecer conforme normas brasileiras e internacionais (NBC TA / ISA)." },
    { icon: ShieldCheck, title: "Auditoria Interna", desc: "Avaliação contínua de controles internos, processos e conformidade para fortalecer a governança da sua organização." },
    { icon: Calculator, title: "Consultoria Tributária", desc: "Planejamento fiscal, revisão tributária e identificação de oportunidades de eficiência dentro da legislação vigente." },
    { icon: Gavel, title: "Compliance & LGPD", desc: "Implantação de programas de integridade, anticorrupção e adequação à Lei Geral de Proteção de Dados." },
    { icon: Briefcase, title: "Governança Corporativa", desc: "Estruturação de conselhos, comitês e políticas que elevam a maturidade e a confiança no seu negócio." },
    { icon: TrendingUp, title: "Due Diligence", desc: "Análise detalhada para fusões, aquisições e captação de investimentos com mitigação de riscos." },
  ];

  const stats = [
    { value: "15+", label: "Anos de experiência" },
    { value: "120", label: "Clientes atendidos" },
    { value: "R$ 4,2bi", label: "Patrimônio auditado" },
    { value: "98%", label: "Retenção de clientes" },
  ];

  const process = [
    { icon: Handshake, title: "Diagnóstico", desc: "Reunião inicial para entender o contexto, objetivos e desafios da sua organização." },
    { icon: ClipboardList, title: "Planejamento", desc: "Desenho de escopo, cronograma e equipe técnica especializada para o seu setor." },
    { icon: Search, title: "Execução", desc: "Trabalho de campo com metodologia rigorosa, evidências documentadas e total transparência." },
    { icon: BarChart3, title: "Relatório & Acompanhamento", desc: "Entrega de pareceres, recomendações práticas e suporte na implementação das melhorias." },
  ];

  const team = [
    { name: "Pedro Luca", role: "Sócio-fundador · CRC-BA 123456/O-7", bio: "Auditor independente à frente da AURA, com atuação em companhias abertas, fundos de investimento e empresas de médio e grande porte em todo o Brasil.", linkedin: "https://www.linkedin.com/in/pedrolucarp" },
    { name: "Marcos Andrade", role: "Sócio · Compliance & Riscos", bio: "Especialista em programas de integridade, LGPD e governança corporativa para empresas de médio e grande porte.", linkedin: "#" },
    { name: "Juliana Ribeiro", role: "Diretora Técnica", bio: "Mestre em Controladoria, conduz auditorias em demonstrações financeiras sob padrões IFRS e USGAAP.", linkedin: "#" },
  ];

  const faqs = [
    { q: "Qual a diferença entre auditoria independente e auditoria interna?", a: "A auditoria independente é executada por uma empresa externa e resulta em um parecer público sobre as demonstrações financeiras. A auditoria interna é um processo contínuo, focado em avaliar controles e mitigar riscos operacionais." },
    { q: "Minha empresa precisa de auditoria obrigatória?", a: "Companhias abertas, sociedades de grande porte (faturamento acima de R$ 300 milhões), instituições financeiras e algumas entidades reguladas têm auditoria obrigatória. Avaliamos seu caso sem custo." },
    { q: "Como é definido o investimento?", a: "Cada proposta é personalizada conforme porte, complexidade e escopo. Após uma reunião de diagnóstico, enviamos um orçamento detalhado e transparente." },
    { q: "Vocês atendem fora do estado da Bahia?", a: "Sim. Com sede em Salvador, atendemos clientes em todo o território nacional, com modelo híbrido (presencial e remoto) e equipes locais quando necessário." },
    { q: "Como é garantida a confidencialidade?", a: "Todos os profissionais assinam termos de sigilo, seguimos normas profissionais do CFC e adotamos controles técnicos rigorosos de segurança da informação." },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden hero-pattern">
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-accent/5 blur-[100px]" />
      </div>

      {/* Nav */}
      <nav className="sticky top-0 z-40 glass border-b border-border/50 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3">
            <img src={logoAura} alt="Aura Logo" className="w-10 h-10 object-contain" />
            <span className="text-xl font-semibold gold-gradient-text" style={{ fontFamily: "'Playfair Display', serif" }}>
              AURA
            </span>
          </a>
          <div className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            <a href="#servicos" className="hover:text-primary transition-colors">Serviços</a>
            <a href="#sobre" className="hover:text-primary transition-colors">Sobre</a>
            <a href="#processo" className="hover:text-primary transition-colors">Processo</a>
            <a href="#equipe" className="hover:text-primary transition-colors">Equipe</a>
            <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
            <a href="#contato" className="hover:text-primary transition-colors">Contato</a>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <a href="/restrito" className="inline-flex px-4 py-2 rounded-lg border border-primary/40 text-primary text-xs font-semibold uppercase tracking-wide hover:bg-primary/10 transition-colors">
              Restrito
            </a>
            <a href="#contato" className="inline-flex px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wide hover:opacity-90 transition-opacity">
              Fale conosco
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="top" className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] px-6 text-center">
        <div className="gold-glow rounded-full p-1 mb-8 bg-background">
          <img src={logoAura} alt="Aura Auditoria" className="w-32 h-32 md:w-40 md:h-40 object-contain" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold gold-gradient-text mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
          AURA
        </h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mb-2" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>
          Auditoria & Consultoria
        </p>
        <p className="text-sm md:text-base text-muted-foreground/70 max-w-xl mb-10">
          Transparência, integridade e excelência a serviço do seu negócio.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mb-12">
          <a href="#contato" className="px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm uppercase tracking-wide hover:opacity-90 transition-opacity">
            Solicite uma proposta
          </a>
          <a href="#servicos" className="px-7 py-3.5 rounded-xl border border-primary/40 text-primary font-semibold text-sm uppercase tracking-wide hover:bg-primary/10 transition-colors">
            Nossos serviços
          </a>
        </div>
        <a href="#stats" className="animate-bounce text-primary/60">
          <ChevronDown size={32} />
        </a>
      </section>

      {/* Stats */}
      <section id="stats" className="relative z-10 py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div key={i} className="glass rounded-2xl p-6 text-center">
              <p className="text-3xl md:text-4xl font-bold gold-gradient-text mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{s.value}</p>
              <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">O que fazemos</p>
            <h2 className="text-3xl md:text-4xl font-bold gold-gradient-text mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Serviços</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Soluções completas em auditoria, consultoria e governança para fortalecer a confiança no seu negócio.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div key={i} className="glass-gold rounded-2xl p-6 hover:scale-[1.02] hover:gold-glow transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <s.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>{s.title}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sobre + Missão / Visão */}
      <section id="sobre" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Quem somos</p>
            <h2 className="text-3xl md:text-4xl font-bold gold-gradient-text mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Sobre a AURA</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Somos uma firma de auditoria e consultoria dedicada a elevar a maturidade contábil, fiscal e de governança das organizações brasileiras. Combinamos rigor técnico, postura ética e tecnologia para entregar pareceres que geram confiança real para sócios, investidores e órgãos reguladores.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="glass-gold rounded-2xl p-8 gold-glow">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center"><Scale className="w-6 h-6 text-primary" /></div>
                <h3 className="text-2xl font-bold gold-gradient-text">Missão</h3>
              </div>
              <p className="text-foreground/80 leading-relaxed text-sm">
                Oferecer serviços de auditoria e consultoria de excelência, promovendo transparência e conformidade. Atuamos com rigor técnico e ético, garantindo que nossos clientes tomem decisões seguras e fundamentadas.
              </p>
            </div>
            <div className="glass-gold rounded-2xl p-8 gold-glow">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center"><Eye className="w-6 h-6 text-primary" /></div>
                <h3 className="text-2xl font-bold gold-gradient-text">Visão</h3>
              </div>
              <p className="text-foreground/80 leading-relaxed text-sm">
                Ser reconhecida como referência nacional em auditoria independente, destacando-nos por inovação, qualidade e compromisso com a verdade — a primeira escolha de empresas que valorizam governança e prestação de contas transparente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section id="valores" className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">No que acreditamos</p>
            <h2 className="text-3xl md:text-4xl font-bold gold-gradient-text" style={{ fontFamily: "'Playfair Display', serif" }}>Nossos Valores</h2>
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
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-primary" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>
                    {valor.title}
                  </h3>
                </div>
                <p className="text-foreground/70 text-sm leading-relaxed">{valor.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Processo */}
      <section id="processo" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Como trabalhamos</p>
            <h2 className="text-3xl md:text-4xl font-bold gold-gradient-text mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Nosso processo</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Uma metodologia clara, em quatro etapas, para entregar resultados consistentes e seguros.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((p, i) => (
              <div key={i} className="relative glass rounded-2xl p-6">
                <span className="absolute -top-4 -left-2 text-5xl font-bold gold-gradient-text opacity-30" style={{ fontFamily: "'Playfair Display', serif" }}>
                  0{i + 1}
                </span>
                <div className="relative">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <p.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-2" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>{p.title}</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipe */}
      <section id="equipe" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Liderança</p>
            <h2 className="text-3xl md:text-4xl font-bold gold-gradient-text mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Nossa equipe</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Profissionais com sólida formação técnica e décadas de experiência em auditoria, contabilidade e governança.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {team.map((m, i) => (
              <div key={i} className="glass-gold rounded-2xl p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-4 gold-glow">
                  <Users className="w-9 h-9 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>{m.name}</h3>
                <p className="text-xs text-primary uppercase tracking-wider mt-1 mb-3">{m.role}</p>
                <p className="text-sm text-foreground/70 leading-relaxed">{m.bio}</p>
                <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary mt-4 transition-colors">
                  <Linkedin size={14} /> LinkedIn
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto glass-gold rounded-3xl p-8 md:p-12 gold-glow">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <Award className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>Registro CRC & CVM</h3>
              <p className="text-sm text-foreground/70">Habilitação para auditar companhias abertas e fundos.</p>
            </div>
            <div>
              <Building2 className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>Atuação nacional</h3>
              <p className="text-sm text-foreground/70">Clientes em todas as regiões do Brasil, com agilidade.</p>
            </div>
            <div>
              <ShieldCheck className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>Sigilo absoluto</h3>
              <p className="text-sm text-foreground/70">Controles e termos de confidencialidade rigorosos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative z-10 py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Dúvidas frequentes</p>
            <h2 className="text-3xl md:text-4xl font-bold gold-gradient-text mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>FAQ</h2>
            <p className="text-muted-foreground text-sm">Não encontrou sua resposta? Fale com nossa assistente virtual no canto da tela.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details key={i} className="glass rounded-xl p-5 group">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 text-foreground font-medium">
                  <span>{f.q}</span>
                  <ChevronDown size={18} className="text-primary group-open:rotate-180 transition-transform shrink-0" />
                </summary>
                <p className="text-sm text-foreground/70 mt-3 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Fale conosco</p>
            <h2 className="text-3xl md:text-4xl font-bold gold-gradient-text mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Vamos conversar sobre o seu negócio
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Envie sua mensagem e nossa equipe retornará em até 1 dia útil com uma análise inicial e os próximos passos.
            </p>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-foreground/80">
                <Mail className="w-5 h-5 text-primary mt-0.5" />
                <a href="mailto:contato@auraauditoria.com.br" className="hover:text-primary transition-colors">contato@auraauditoria.com.br</a>
              </li>
              <li className="flex items-start gap-3 text-foreground/80">
                <Phone className="w-5 h-5 text-primary mt-0.5" />
                <a href="tel:+5571940028922" className="hover:text-primary transition-colors">+55 (71) 94002-8922</a>
              </li>
              <li className="flex items-start gap-3 text-foreground/80">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <span>Salvador · BA</span>
              </li>
            </ul>
            <div className="mt-8 p-5 glass rounded-xl">
              <p className="text-xs uppercase tracking-wider text-primary mb-2">Horário de atendimento</p>
              <p className="text-sm text-foreground/80">Segunda a sexta, das 9h às 18h (BRT)</p>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 bg-background">
        <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8 text-sm">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={logoAura} alt="Aura" className="w-8 h-8 object-contain" />
              <span className="text-lg font-semibold gold-gradient-text" style={{ fontFamily: "'Playfair Display', serif" }}>AURA</span>
            </div>
            <p className="text-muted-foreground max-w-sm leading-relaxed">
              Auditoria & Consultoria. Transparência, integridade e excelência a serviço do seu negócio.
            </p>
          </div>
          <div>
            <p className="text-foreground font-semibold mb-3 uppercase text-xs tracking-wider">Navegação</p>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#servicos" className="hover:text-primary transition-colors">Serviços</a></li>
              <li><a href="#sobre" className="hover:text-primary transition-colors">Sobre</a></li>
              <li><a href="#equipe" className="hover:text-primary transition-colors">Equipe</a></li>
              <li><a href="#faq" className="hover:text-primary transition-colors">FAQ</a></li>
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
          <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground/70">
            <span>© 2026 AURA — Todos os direitos reservados</span>
            <span>Empresa fictícia criada para fins acadêmicos.</span>
            <span className="font-mono text-primary/70">&lt;/&gt; by Ana</span>
          </div>
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
};

export default Index;
