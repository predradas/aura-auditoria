export type Status = "concluido" | "pendente" | "atraso";

export type Comment = {
  author: string;
  from: "aura" | "cliente";
  date: string;
  text: string;
};

export type DocFile = { name: string; size: string; url?: string };

export type Request = {
  id: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  status: Status;
  ownerEmail: string; // auditor responsável (Aura)
  requestedBy: string; // display name
  description: string;
  itemsRequested: string[];
  filesSent: DocFile[];
  comments: Comment[];
};

export type Auditor = {
  email: string;
  name: string;
  password: string;
  role: "master" | "auditor";
};

export const AUDITORS: Auditor[] = [
  { email: "pedro@auraauditoria.com.br", name: "Pedro Luca", password: "12345", role: "master" },
  { email: "juliana@auraauditoria.com.br", name: "Juliana Ribeiro", password: "12345", role: "auditor" },
  { email: "marcos@auraauditoria.com.br", name: "Marcos Andrade", password: "12345", role: "auditor" },
];

export const STORAGE_KEY = "aura_requests_v1";

const DEFAULT_REQUESTS: Request[] = [
  {
    id: "r3",
    title: "Documentação para conta clientes",
    date: "2026-05-28",
    status: "pendente",
    ownerEmail: "juliana@auraauditoria.com.br",
    requestedBy: "Juliana Ribeiro",
    description:
      "Para prosseguirmos com a análise da rubrica de Contas a Receber do exercício, solicitamos os documentos abaixo. Caso identifiquemos divergências, poderemos requerer informações de exercícios anteriores.",
    itemsRequested: [
      "Extratos bancários do ano (formatos OFX e Excel)",
      "Notas fiscais emitidas no exercício",
      "Notas fiscais de exercícios anteriores, caso necessário",
      "Controle interno de contas a receber",
    ],
    filesSent: [],
    comments: [
      {
        author: "Juliana Ribeiro",
        from: "aura",
        date: "28/05/2026 10:14",
        text: "Bom dia! Encaminho a lista de documentos necessários para a etapa de Contas a Receber. Qualquer dúvida estou à disposição.",
      },
    ],
  },
  {
    id: "r2",
    title: "Demonstrações financeiras",
    date: "2026-03-10",
    status: "pendente",
    ownerEmail: "juliana@auraauditoria.com.br",
    requestedBy: "Juliana Ribeiro",
    description:
      "Solicitamos o envio das demonstrações financeiras do exercício de 2025 para iniciarmos os procedimentos de auditoria.",
    itemsRequested: [
      "Balanço Patrimonial",
      "Demonstração do Resultado do Exercício (DRE)",
      "Demonstração dos Fluxos de Caixa (DFC)",
      "Notas explicativas",
    ],
    filesSent: [],
    comments: [
      {
        author: "Juliana Ribeiro",
        from: "aura",
        date: "10/03/2026 09:02",
        text: "Olá! Conforme combinado em reunião, seguimos aguardando as demonstrações financeiras encerradas em 31/12/2025.",
      },
    ],
  },
  {
    id: "r1",
    title: "Carta-proposta de auditoria",
    date: "2026-01-12",
    status: "concluido",
    ownerEmail: "pedro@auraauditoria.com.br",
    requestedBy: "Pedro Luca",
    description:
      "Envio da carta-proposta formal de prestação de serviços de auditoria independente para o exercício de 2025. Documento já anexado para apreciação e aceite.",
    itemsRequested: ["Leitura e aceite da carta-proposta"],
    filesSent: [
      { name: "carta-proposta-totvs.docx", size: "16 KB", url: "/documents/carta-proposta-totvs.docx" },
    ],
    comments: [
      {
        author: "Pedro Luca",
        from: "aura",
        date: "12/01/2026 14:30",
        text: "Prezados, segue em anexo a carta-proposta para os serviços de auditoria independente do exercício de 2025. Permaneço à disposição.",
      },
      {
        author: "Contabilidade TOTVS",
        from: "cliente",
        date: "15/01/2026 11:20",
        text: "Recebida e de acordo. Podemos seguir com o cronograma proposto.",
      },
    ],
  },
];

export const statusMeta: Record<Status, { label: string; color: string; ring: string }> = {
  concluido: { label: "Concluído", color: "bg-emerald-500", ring: "ring-emerald-500/30" },
  pendente: { label: "Pendente", color: "bg-amber-400", ring: "ring-amber-400/30" },
  atraso: { label: "Em atraso", color: "bg-red-500", ring: "ring-red-500/30" },
};

export function loadRequests(): Request[] {
  if (typeof window === "undefined") return DEFAULT_REQUESTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_REQUESTS));
      return DEFAULT_REQUESTS;
    }
    const parsed = JSON.parse(raw) as Request[];
    if (!Array.isArray(parsed)) return DEFAULT_REQUESTS;
    return parsed;
  } catch {
    return DEFAULT_REQUESTS;
  }
}

export function saveRequests(reqs: Request[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reqs));
}

export function sortByDateDesc(reqs: Request[]) {
  return [...reqs].sort((a, b) => (a.date < b.date ? 1 : -1));
}