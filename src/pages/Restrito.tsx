import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Lock, Mail, LogOut, FileText, MessageCircle, ArrowLeft,
  Paperclip, Send, Download, User, CalendarClock,
} from "lucide-react";
import logoAura from "@/assets/logo-aura.png";
import SiteFooter from "@/components/SiteFooter";
import {
  loadRequests, sortByDateDesc, statusMeta,
  loadChats, saveChats,
  type Request, type Status, type ChatMsg,
} from "@/lib/auraConnectStore";

const COMPANY_ID = "totvs";

const VALID_EMAIL = "contabilidade@totvs.com.br";
const VALID_PASSWORD = "12345";
const SESSION_KEY = "aura_connect_session";

const StatusPill = ({ status }: { status: Status }) => {
  const s = statusMeta[status];
  return (
    <span className="inline-flex items-center gap-2 text-xs">
      <span className={`w-2.5 h-2.5 rounded-full ${s.color} ring-4 ${s.ring}`} />
      <span className="text-foreground/80">{s.label}</span>
    </span>
  );
};

const Login = ({ onSuccess }: { onSuccess: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().toLowerCase() === VALID_EMAIL && password === VALID_PASSWORD) {
      localStorage.setItem(SESSION_KEY, "1");
      onSuccess();
    } else {
      setError("Credenciais inválidas. Verifique e tente novamente.");
    }
  };

  return (
    <div className="min-h-screen bg-background hero-pattern flex items-center justify-center px-6 relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-accent/5 blur-[100px]" />
      </div>
      <div className="relative z-10 w-full max-w-md">
        <a href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft size={16} /> Voltar ao site
        </a>
        <div className="glass rounded-2xl p-8 border border-primary/20">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center mb-4">
              <img src={logoAura} alt="AURA" className="w-10 h-10 object-contain" />
            </div>
            <h1 className="text-2xl font-semibold gold-gradient-text" style={{ fontFamily: "'Playfair Display', serif" }}>
              AURA Connect
            </h1>
            <p className="text-xs text-muted-foreground mt-1">Área restrita do cliente</p>
          </div>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">E-mail</label>
              <div className="mt-1 flex items-center gap-2 bg-secondary/60 border border-border rounded-xl px-3">
                <Mail size={16} className="text-muted-foreground" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="seuemail@empresa.com"
                  className="flex-1 bg-transparent py-2.5 text-sm focus:outline-none" required />
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Senha</label>
              <div className="mt-1 flex items-center gap-2 bg-secondary/60 border border-border rounded-xl px-3">
                <Lock size={16} className="text-muted-foreground" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••"
                  className="flex-1 bg-transparent py-2.5 text-sm focus:outline-none" required />
              </div>
            </div>
            {error && <p className="text-xs text-red-400">{error}</p>}
            <button type="submit"
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm uppercase tracking-wide hover:opacity-90 transition-opacity">
              Entrar
            </button>
          </form>
          <p className="text-[11px] text-muted-foreground/70 text-center mt-6">
            Acesso exclusivo para clientes AURA. Em caso de dúvida, contate seu auditor responsável.
          </p>
        </div>
      </div>
    </div>
  );
};

const Connect = ({ onLogout }: { onLogout: () => void }) => {
  const [tab, setTab] = useState<"docs" | "chat">("docs");
  const requests = sortByDateDesc(loadRequests().filter((r) => r.companyId === COMPANY_ID));
  const [selected, setSelected] = useState<string | null>(requests[0]?.id ?? null);
  const [chatInput, setChatInput] = useState("");
  const [chats, setChats] = useState<Record<string, ChatMsg[]>>(() => loadChats());
  const chat = chats[COMPANY_ID] ?? [];

  const current = requests.find((r) => r.id === selected) ?? null;

  const sendChat = (e: React.FormEvent) => {
    e.preventDefault();
    const t = chatInput.trim();
    if (!t) return;
    const now = new Date();
    const time = `${String(now.getDate()).padStart(2, "0")}/${String(now.getMonth() + 1).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    const next = { ...chats, [COMPANY_ID]: [...chat, { from: "cliente" as const, author: "Contabilidade TOTVS", text: t, time }] };
    setChats(next);
    saveChats(next);
    setChatInput("");
  };

  return (
    <div className="min-h-screen bg-background hero-pattern relative overflow-hidden flex flex-col">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <header className="relative z-10 sticky top-0 glass border-b border-border/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <img src={logoAura} alt="AURA" className="w-9 h-9 object-contain" />
            <div className="leading-tight">
              <p className="text-lg font-semibold gold-gradient-text" style={{ fontFamily: "'Playfair Display', serif" }}>AURA Connect</p>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Área do cliente · TOTVS S.A.</p>
            </div>
          </a>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
              <User size={14} /> contabilidade@totvs.com.br
            </div>
            <button onClick={onLogout}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-xs hover:border-primary/40 hover:text-primary transition-colors">
              <LogOut size={14} /> Sair
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-6 w-full flex-1">
        <div className="flex items-center gap-2 mb-6">
          <button onClick={() => setTab("docs")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              tab === "docs" ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:text-primary"
            }`}>
            <FileText size={16} /> Documentos
          </button>
          <button onClick={() => setTab("chat")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              tab === "chat" ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:text-primary"
            }`}>
            <MessageCircle size={16} /> Chat
          </button>
          <div className="ml-auto hidden md:flex items-center gap-2 text-xs text-muted-foreground">
            <span>Auditora responsável:</span>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary">
              <span className="w-2 h-2 rounded-full bg-emerald-400" /> Juliana Ribeiro
            </span>
          </div>
        </div>

        {tab === "docs" && (
          <div className="grid lg:grid-cols-[420px_1fr] gap-6">
            {/* Timeline */}
            <div className="glass rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground/80">Solicitações</h2>
                <div className="flex items-center gap-3 text-[10px]">
                  <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" />Concluído</span>
                  <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400" />Pendente</span>
                  <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" />Em atraso</span>
                </div>
              </div>

              <ul className="space-y-3">
                {requests.map((r, idx) => {
                  const s = statusMeta[r.status];
                  const active = selected === r.id;
                  return (
                    <li key={r.id} className="relative flex items-stretch gap-4">
                      {/* Rail + centered dot */}
                      <div className="relative flex flex-col items-center w-3 shrink-0">
                        {/* line top */}
                        <span className={`w-px flex-1 ${idx === 0 ? "bg-transparent" : "bg-border"}`} />
                        {/* dot */}
                        <span className={`w-3 h-3 rounded-full ${s.color} ring-4 ${s.ring} my-1`} />
                        {/* line bottom */}
                        <span className={`w-px flex-1 ${idx === requests.length - 1 ? "bg-transparent" : "bg-border"}`} />
                      </div>
                      <button onClick={() => setSelected(r.id)}
                        className={`flex-1 text-left rounded-xl p-4 border transition-colors ${
                          active ? "border-primary/50 bg-primary/5" : "border-border hover:border-primary/30"
                        }`}>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-foreground">{r.title}</p>
                            <p className="text-[11px] text-muted-foreground mt-0.5">
                              {new Date(r.date).toLocaleDateString("pt-BR")} · solicitado por {r.requestedBy}
                            </p>
                            {r.dueDate && (
                              <p className="text-[11px] text-amber-300/90 mt-0.5 inline-flex items-center gap-1">
                                <CalendarClock size={11} /> prazo: {new Date(r.dueDate).toLocaleDateString("pt-BR")}
                              </p>
                            )}
                          </div>
                          <StatusPill status={r.status} />
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Detail panel */}
            <div className="glass rounded-2xl p-6 min-h-[60vh]">
              {!current ? (
                <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                  Selecione uma solicitação para visualizar os detalhes.
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {current.title}
                      </h2>
                      <p className="text-xs text-muted-foreground mt-1">
                        Solicitado em {new Date(current.date).toLocaleDateString("pt-BR")} por <span className="text-primary">{current.requestedBy}</span> (AURA)
                      </p>
                    </div>
                    <StatusPill status={current.status} />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Motivo da solicitação</p>
                    <p className="text-sm text-foreground/90 leading-relaxed">{current.description}</p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Itens solicitados</p>
                    <ul className="space-y-1.5">
                      {current.itemsRequested.map((it, i) => (
                        <li key={i} className="text-sm text-foreground/85 flex items-baseline gap-2">
                          <span className="text-primary leading-none">›</span>
                          <span className="flex-1">{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Documentos enviados</p>
                    {current.filesSent.length === 0 ? (
                      <p className="text-xs text-muted-foreground italic">Nenhum documento enviado até o momento.</p>
                    ) : (
                      <ul className="space-y-2">
                        {current.filesSent.map((f, i) => (
                          <li key={i} className="flex items-center justify-between gap-3 rounded-xl border border-border p-3">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <FileText size={16} className="text-primary" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm truncate">{f.name}</p>
                                <p className="text-[11px] text-muted-foreground">{f.size}</p>
                              </div>
                            </div>
                            {f.url && (
                              <a href={f.url} download
                                className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline">
                                <Download size={14} /> Baixar
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                    <label className="mt-3 flex items-center gap-2 text-xs text-muted-foreground border border-dashed border-border rounded-xl px-3 py-3 cursor-pointer hover:border-primary/40 hover:text-primary transition-colors">
                      <Paperclip size={14} /> Anexar novo documento (demonstração)
                      <input type="file" className="hidden" />
                    </label>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Comentários</p>
                    <div className="space-y-3">
                      {current.comments.map((c, i) => (
                        <div key={i} className={`flex ${c.from === "cliente" ? "justify-end" : "justify-start"}`}>
                          <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                            c.from === "cliente" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
                          }`}>
                            <p className="text-[11px] opacity-80 mb-0.5">{c.author} · {c.date}</p>
                            <p className="leading-relaxed">{c.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {tab === "chat" && (
          <div className="glass rounded-2xl flex flex-col h-[70vh] overflow-hidden">
            <div className="px-5 py-4 border-b border-border/50 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
                <User size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold">Juliana Ribeiro</p>
                <p className="text-[11px] text-muted-foreground">Auditora responsável · AURA Auditoria</p>
              </div>
              <span className="ml-auto inline-flex items-center gap-1.5 text-[11px] text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400" /> online
              </span>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {chat.map((m, i) => (
                <div key={i} className={`flex ${m.from === "cliente" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${
                    m.from === "cliente" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
                  }`}>
                    <p className="text-[11px] opacity-80 mb-0.5">{m.author} · {m.time}</p>
                    <p className="leading-relaxed">{m.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={sendChat} className="border-t border-border/50 p-3 flex gap-2">
              <input value={chatInput} onChange={(e) => setChatInput(e.target.value)}
                placeholder="Escreva uma mensagem para Juliana…"
                className="flex-1 bg-secondary/60 border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary" />
              <button type="submit" disabled={!chatInput.trim()}
                className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-50">
                <Send size={16} />
              </button>
            </form>
          </div>
        )}
      </div>

      <SiteFooter variant="connect" />
    </div>
  );
};

const Restrito = () => {
  const [authed, setAuthed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setAuthed(localStorage.getItem(SESSION_KEY) === "1");
  }, []);

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setAuthed(false);
    navigate("/restrito");
  };

  return authed ? <Connect onLogout={logout} /> : <Login onSuccess={() => setAuthed(true)} />;
};

export default Restrito;