import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Lock, Mail, LogOut, ArrowLeft, Plus, Pencil, Trash2, ShieldCheck, X, Save,
  User as UserIcon, Building2, MessageCircle, FileText, Send, CalendarClock,
} from "lucide-react";
import logoAura from "@/assets/logo-aura.png";
import SiteFooter from "@/components/SiteFooter";
import {
  AUDITORS, loadRequests, saveRequests, sortByDateDesc, statusMeta,
  loadCompanies, saveCompanies, loadChats, saveChats,
  type Auditor, type Request, type Status, type Company, type ChatMsg,
} from "@/lib/auraConnectStore";

const SESSION_KEY = "aura_admin_session";

const Login = ({ onSuccess }: { onSuccess: (a: Auditor) => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = AUDITORS.find(
      (a) => a.email.toLowerCase() === email.trim().toLowerCase() && a.password === password,
    );
    if (!found) { setError("Credenciais inválidas."); return; }
    localStorage.setItem(SESSION_KEY, found.email);
    onSuccess(found);
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
              <ShieldCheck className="text-primary" size={28} />
            </div>
            <h1 className="text-2xl font-semibold gold-gradient-text" style={{ fontFamily: "'Playfair Display', serif" }}>
              Painel AURA
            </h1>
            <p className="text-xs text-muted-foreground mt-1">Acesso exclusivo dos auditores</p>
          </div>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">E-mail corporativo</label>
              <div className="mt-1 flex items-center gap-2 bg-secondary/60 border border-border rounded-xl px-3">
                <Mail size={16} className="text-muted-foreground" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="seunome@auraauditoria.com.br"
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
        </div>
      </div>
    </div>
  );
};

type EditingState = { mode: "create" } | { mode: "edit"; id: string } | null;

const emptyDraft = (auditor: Auditor, companyId: string): Request => ({
  id: `r_${Date.now()}`,
  companyId,
  title: "",
  date: new Date().toISOString().slice(0, 10),
  dueDate: "",
  status: "pendente",
  ownerEmail: auditor.email,
  requestedBy: auditor.name,
  description: "",
  itemsRequested: [""],
  filesSent: [],
  comments: [],
});

const Dashboard = ({ auditor, onLogout }: { auditor: Auditor; onLogout: () => void }) => {
  const [companies, setCompanies] = useState<Company[]>(() => loadCompanies());
  const [activeCompanyId, setActiveCompanyId] = useState<string>(() => loadCompanies()[0]?.id ?? "totvs");
  const [requests, setRequests] = useState<Request[]>(() => loadRequests());
  const [chats, setChats] = useState<Record<string, ChatMsg[]>>(() => loadChats());
  const [editing, setEditing] = useState<EditingState>(null);
  const [draft, setDraft] = useState<Request | null>(null);
  const [tab, setTab] = useState<"docs" | "chat">("docs");
  const [chatInput, setChatInput] = useState("");
  const [showNewCompany, setShowNewCompany] = useState(false);
  const [newCompany, setNewCompany] = useState<Company>({ id: "", name: "", contactEmail: "" });

  const activeCompany = companies.find((c) => c.id === activeCompanyId) ?? companies[0];

  const persist = (next: Request[]) => {
    setRequests(next);
    saveRequests(next);
  };
  const persistChats = (next: Record<string, ChatMsg[]>) => {
    setChats(next);
    saveChats(next);
  };

  const canManage = (r: Request) => auditor.role === "master" || r.ownerEmail === auditor.email;

  const companyRequests = useMemo(
    () => requests.filter((r) => r.companyId === activeCompanyId),
    [requests, activeCompanyId],
  );
  const sorted = useMemo(() => sortByDateDesc(companyRequests), [companyRequests]);
  const companyChat = chats[activeCompanyId] ?? [];

  const startCreate = () => {
    setDraft(emptyDraft(auditor, activeCompanyId));
    setEditing({ mode: "create" });
  };
  const startEdit = (r: Request) => {
    setDraft({ ...r, itemsRequested: r.itemsRequested.length ? r.itemsRequested : [""] });
    setEditing({ mode: "edit", id: r.id });
  };
  const cancel = () => { setEditing(null); setDraft(null); };

  const save = () => {
    if (!draft) return;
    const cleaned: Request = {
      ...draft,
      title: draft.title.trim(),
      description: draft.description.trim(),
      itemsRequested: draft.itemsRequested.map((s) => s.trim()).filter(Boolean),
      dueDate: draft.dueDate?.trim() ? draft.dueDate : undefined,
    };
    if (!cleaned.title) return;
    if (editing?.mode === "create") {
      persist([cleaned, ...requests]);
    } else if (editing?.mode === "edit") {
      persist(requests.map((r) => (r.id === editing.id ? cleaned : r)));
    }
    cancel();
  };

  const remove = (id: string) => {
    if (!confirm("Excluir esta solicitação? Esta ação não pode ser desfeita.")) return;
    persist(requests.filter((r) => r.id !== id));
  };

  const sendChat = (e: React.FormEvent) => {
    e.preventDefault();
    const t = chatInput.trim();
    if (!t) return;
    const now = new Date();
    const time = `${String(now.getDate()).padStart(2, "0")}/${String(now.getMonth() + 1).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    const msg: ChatMsg = { from: "aura", author: auditor.name, text: t, time };
    persistChats({ ...chats, [activeCompanyId]: [...companyChat, msg] });
    setChatInput("");
  };

  const addCompany = () => {
    const name = newCompany.name.trim();
    if (!name) return;
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || `c_${Date.now()}`;
    if (companies.some((c) => c.id === id)) { alert("Já existe uma empresa com nome semelhante."); return; }
    const next = [...companies, { id, name, contactEmail: newCompany.contactEmail.trim() }];
    setCompanies(next);
    saveCompanies(next);
    persistChats({ ...chats, [id]: [] });
    setActiveCompanyId(id);
    setNewCompany({ id: "", name: "", contactEmail: "" });
    setShowNewCompany(false);
  };

  return (
    <div className="min-h-screen bg-background hero-pattern relative overflow-hidden flex flex-col">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <header className="relative z-10 sticky top-0 glass border-b border-border/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-3">
          <a href="/" className="flex items-center gap-3">
            <img src={logoAura} alt="AURA" className="w-9 h-9 object-contain" />
            <div className="leading-tight">
              <p className="text-lg font-semibold gold-gradient-text" style={{ fontFamily: "'Playfair Display', serif" }}>Painel AURA</p>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Gestão · Connect</p>
            </div>
          </a>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs">
              <UserIcon size={12} /> {auditor.name}
              {auditor.role === "master" && (
                <span className="text-[10px] uppercase tracking-wider bg-primary text-primary-foreground px-1.5 py-0.5 rounded">master</span>
              )}
            </div>
            <button onClick={onLogout}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-xs hover:border-primary/40 hover:text-primary transition-colors">
              <LogOut size={14} /> Sair
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-6 w-full flex-1">
        {/* Client selector + actions */}
        <div className="glass rounded-2xl p-4 md:p-5 mb-6 flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
            <Building2 size={14} className="text-primary" /> Cliente
          </div>
          <select
            value={activeCompanyId}
            onChange={(e) => { setActiveCompanyId(e.target.value); cancel(); setTab("docs"); }}
            className="bg-secondary/60 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary md:min-w-[260px]"
          >
            {companies.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          {auditor.role === "master" && (
            <button onClick={() => setShowNewCompany((v) => !v)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-primary/40 text-primary text-xs font-semibold hover:bg-primary/10 transition-colors">
              <Plus size={14} /> Nova empresa
            </button>
          )}
          <div className="md:ml-auto flex items-center gap-2">
            <button onClick={() => setTab("docs")}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                tab === "docs" ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:text-primary"
              }`}>
              <FileText size={14} /> Solicitações
            </button>
            <button onClick={() => setTab("chat")}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                tab === "chat" ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:text-primary"
              }`}>
              <MessageCircle size={14} /> Chat
            </button>
          </div>
        </div>

        {showNewCompany && auditor.role === "master" && (
          <div className="glass rounded-2xl p-5 mb-6 border border-primary/30">
            <p className="text-sm font-semibold uppercase tracking-wider text-foreground/80 mb-3">Cadastrar novo cliente</p>
            <div className="grid md:grid-cols-2 gap-3">
              <input value={newCompany.name} onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                placeholder="Razão social"
                className="bg-secondary/60 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary" />
              <input value={newCompany.contactEmail} onChange={(e) => setNewCompany({ ...newCompany, contactEmail: e.target.value })}
                placeholder="E-mail de contato"
                className="bg-secondary/60 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary" />
            </div>
            <div className="mt-3 flex items-center gap-2">
              <button onClick={addCompany}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold">
                <Save size={14} /> Cadastrar
              </button>
              <button onClick={() => setShowNewCompany(false)}
                className="px-4 py-2 rounded-lg border border-border text-xs hover:border-primary/40">Cancelar</button>
            </div>
          </div>
        )}

        {tab === "docs" && (
        <>
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
              Solicitações <span className="text-muted-foreground text-base">· {activeCompany?.name}</span>
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              {auditor.role === "master"
                ? "Como master, você pode editar e excluir qualquer solicitação."
                : "Você pode editar e excluir apenas as solicitações de sua autoria."}
            </p>
          </div>
          <button onClick={startCreate}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
            <Plus size={16} /> Nova solicitação
          </button>
        </div>

        <div className="grid lg:grid-cols-[1fr_420px] gap-6 items-start">
          <div className="glass rounded-2xl p-5">
            {sorted.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-10">Nenhuma solicitação cadastrada para este cliente.</p>
            )}
            <ul className="space-y-3">
              {sorted.map((r) => {
                const s = statusMeta[r.status];
                const mine = canManage(r);
                const ownerName = AUDITORS.find((a) => a.email === r.ownerEmail)?.name ?? r.requestedBy;
                return (
                  <li key={r.id} className="rounded-xl border border-border p-4 hover:border-primary/30 transition-colors">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`w-2.5 h-2.5 rounded-full ${s.color} ring-4 ${s.ring}`} />
                          <p className="text-sm font-semibold">{r.title}</p>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-1">
                          {new Date(r.date).toLocaleDateString("pt-BR")} · {s.label} · responsável: <span className="text-primary">{ownerName}</span>
                        </p>
                        {r.dueDate && (
                          <p className="text-[11px] text-amber-300/90 mt-1 inline-flex items-center gap-1">
                            <CalendarClock size={11} /> prazo: {new Date(r.dueDate).toLocaleDateString("pt-BR")}
                          </p>
                        )}
                        {r.description && (
                          <p className="text-xs text-foreground/70 mt-2 line-clamp-2">{r.description}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => startEdit(r)}
                          disabled={!mine}
                          title={mine ? "Editar" : "Sem permissão"}
                          className="p-2 rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/40 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => remove(r.id)}
                          disabled={!mine}
                          title={mine ? "Excluir" : "Sem permissão"}
                          className="p-2 rounded-lg border border-border text-muted-foreground hover:text-red-400 hover:border-red-400/40 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="glass rounded-2xl p-5 sticky top-20">
            {!draft || !editing ? (
              <div className="text-center py-10">
                <ShieldCheck className="mx-auto text-primary/60 mb-3" size={28} />
                <p className="text-sm text-muted-foreground">
                  Selecione uma solicitação para editar ou clique em <span className="text-primary">Nova solicitação</span> para criar.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold uppercase tracking-wider text-foreground/80">
                    {editing.mode === "create" ? "Nova solicitação" : "Editar solicitação"}
                  </p>
                  <button onClick={cancel} className="p-1 text-muted-foreground hover:text-primary">
                    <X size={16} />
                  </button>
                </div>
                <Field label="Título">
                  <input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                    className="w-full bg-secondary/60 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary" />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Data">
                    <input type="date" value={draft.date} onChange={(e) => setDraft({ ...draft, date: e.target.value })}
                      className="w-full bg-secondary/60 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary" />
                  </Field>
                  <Field label="Status">
                    <select value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value as Status })}
                      className="w-full bg-secondary/60 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary">
                      <option value="pendente">Pendente</option>
                      <option value="concluido">Concluído</option>
                      <option value="atraso">Em atraso</option>
                    </select>
                  </Field>
                </div>
                <Field label="Prazo (opcional)">
                  <input type="date" value={draft.dueDate ?? ""} onChange={(e) => setDraft({ ...draft, dueDate: e.target.value })}
                    className="w-full bg-secondary/60 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary" />
                </Field>
                <Field label="Responsável (Aura)">
                  <select
                    value={draft.ownerEmail}
                    onChange={(e) => {
                      const a = AUDITORS.find((x) => x.email === e.target.value)!;
                      setDraft({ ...draft, ownerEmail: a.email, requestedBy: a.name });
                    }}
                    disabled={auditor.role !== "master"}
                    className="w-full bg-secondary/60 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary disabled:opacity-60"
                  >
                    {AUDITORS.map((a) => (
                      <option key={a.email} value={a.email}>{a.name} · {a.email}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Descrição / motivo">
                  <textarea value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                    rows={4}
                    className="w-full bg-secondary/60 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary resize-none" />
                </Field>
                <Field label="Itens solicitados">
                  <div className="space-y-2">
                    {draft.itemsRequested.map((it, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-primary text-sm">›</span>
                        <input value={it}
                          onChange={(e) => {
                            const arr = [...draft.itemsRequested];
                            arr[i] = e.target.value;
                            setDraft({ ...draft, itemsRequested: arr });
                          }}
                          className="flex-1 bg-secondary/60 border border-border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-primary" />
                        <button onClick={() => setDraft({ ...draft, itemsRequested: draft.itemsRequested.filter((_, idx) => idx !== i) })}
                          className="p-1.5 text-muted-foreground hover:text-red-400">
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                    <button onClick={() => setDraft({ ...draft, itemsRequested: [...draft.itemsRequested, ""] })}
                      className="text-xs text-primary hover:underline">+ adicionar item</button>
                  </div>
                </Field>
                <div className="flex items-center gap-2 pt-2">
                  <button onClick={save}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
                    <Save size={14} /> Salvar
                  </button>
                  <button onClick={cancel}
                    className="px-4 py-2.5 rounded-xl border border-border text-sm hover:border-primary/40">
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        </>
        )}

        {tab === "chat" && (
          <div className="glass rounded-2xl flex flex-col h-[70vh] overflow-hidden">
            <div className="px-5 py-4 border-b border-border/50 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
                <Building2 size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold">{activeCompany?.name}</p>
                <p className="text-[11px] text-muted-foreground">{activeCompany?.contactEmail}</p>
              </div>
              <span className="ml-auto text-[11px] text-muted-foreground">
                escrevendo como <span className="text-primary">{auditor.name}</span>
              </span>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {companyChat.length === 0 && (
                <p className="text-center text-xs text-muted-foreground py-10">Nenhuma mensagem ainda com este cliente.</p>
              )}
              {companyChat.map((m, i) => (
                <div key={i} className={`flex ${m.from === "aura" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${
                    m.from === "aura" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
                  }`}>
                    <p className="text-[11px] opacity-80 mb-0.5">{m.author} · {m.time}</p>
                    <p className="leading-relaxed">{m.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={sendChat} className="border-t border-border/50 p-3 flex gap-2">
              <input value={chatInput} onChange={(e) => setChatInput(e.target.value)}
                placeholder={`Mensagem para ${activeCompany?.name}…`}
                className="flex-1 bg-secondary/60 border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary" />
              <button type="submit" disabled={!chatInput.trim()}
                className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-50">
                <Send size={16} />
              </button>
            </form>
          </div>
        )}
      </div>

      <SiteFooter variant="admin" />
    </div>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</label>
    <div className="mt-1">{children}</div>
  </div>
);

const Admin = () => {
  const [auditor, setAuditor] = useState<Auditor | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem(SESSION_KEY);
    if (email) {
      const found = AUDITORS.find((a) => a.email === email);
      if (found) setAuditor(found);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setAuditor(null);
    navigate("/admin");
  };

  return auditor ? <Dashboard auditor={auditor} onLogout={logout} /> : <Login onSuccess={setAuditor} />;
};

export default Admin;