// =========================================================
// AHR SOLUTIONS - FUNÇÕES GERAIS
// Este arquivo concentra funções usadas por várias páginas.
// =========================================================

// Usuário fictício para a versão de demonstração.
// Mais tarde, o backend substituirá isso por uma sessão real.
const demoUsers = {
  "funcionario@ahr.com": { name: "João Silva", role: "Funcionário" },
  "agente@ahr.com": { name: "Carlos Mendes", role: "Agente" },
  "admin@ahr.com": { name: "Maria Souza", role: "Admin" }
};

function saveUser(user) {
  localStorage.setItem("ahrUser", JSON.stringify(user));
}

function getUser() {
  return JSON.parse(localStorage.getItem("ahrUser") || "null");
}

function requireLogin() {
  if (!getUser()) {
    window.location.href = "index.html";
  }
}

function logout() {
  localStorage.removeItem("ahrUser");
  window.location.href = "index.html";
}

// Monta o menu lateral automaticamente nas páginas internas.
function renderShell(activePage) {
  const shell = document.getElementById("appShell");
  if (!shell) return;

  const user = getUser();
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  shell.innerHTML = `
    <aside class="sidebar">
      <div class="sidebar-brand">
        <strong>AHR SOLUTIONS</strong>
        <span>Central de Atendimento e Suporte Interno</span>
      </div>

      <nav class="nav">
        <a href="dashboard.html" class="${activePage === "dashboard" ? "active" : ""}">📊 Dashboard</a>
        <a href="chamados.html" class="${activePage === "tickets" ? "active" : ""}">📋 Meus Chamados</a>
        <a href="novo-chamado.html" class="${activePage === "new" ? "active" : ""}">➕ Novo Chamado</a>
        <a href="fila.html" class="${activePage === "queue" ? "active" : ""}">🛠 Fila do Time</a>
        <a href="admin.html" class="${activePage === "admin" ? "active" : ""}">⚙ Administração</a>
      </nav>

      <div class="sidebar-bottom">
        <div class="user-box">
          <strong>${user.name}</strong>
          <small>${user.role}</small>
        </div>
        <button class="logout" onclick="logout()">Sair</button>
      </div>
    </aside>
  `;
}

function statusBadge(status) {
  const classes = {
    "Aberto": "badge-open",
    "Em análise": "badge-progress",
    "Em andamento": "badge-progress",
    "Aguardando solicitante": "badge-waiting",
    "Resolvido": "badge-success",
    "Fechado": "badge-success"
  };
  return `<span class="badge ${classes[status] || "badge-open"}">${status}</span>`;
}

function priorityClass(priority) {
  return {
    "Baixa": "priority-low",
    "Média": "priority-medium",
    "Alta": "priority-high",
    "Urgente": "priority-urgent"
  }[priority] || "";
}

// =========================================================
// DADOS FICTÍCIOS
// Servem apenas para a interface funcionar antes do backend.
// =========================================================
const demoTickets = [
  { id: 1042, title: "Computador não liga", category: "TI", priority: "Alta", status: "Em andamento", date: "16/09/2026", requester: "João Silva" },
  { id: 1041, title: "Acesso ao sistema de RH", category: "RH", priority: "Média", status: "Aguardando solicitante", date: "16/09/2026", requester: "Ana Lima" },
  { id: 1040, title: "Problema com impressora", category: "TI", priority: "Baixa", status: "Aberto", date: "15/09/2026", requester: "Pedro Alves" },
  { id: 1039, title: "Solicitação de material", category: "Facilities", priority: "Média", status: "Resolvido", date: "15/09/2026", requester: "Julia Costa" },
  { id: 1038, title: "Erro no lançamento financeiro", category: "Financeiro", priority: "Urgente", status: "Em análise", date: "14/09/2026", requester: "Lucas Rocha" }
];
