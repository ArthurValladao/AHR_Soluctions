requireLogin();
renderShell("dashboard");

const statOpen = document.getElementById("statOpen");
const statProgress = document.getElementById("statProgress");
const statWaiting = document.getElementById("statWaiting");
const statResolved = document.getElementById("statResolved");
const recentTickets = document.getElementById("recentTickets");

function formatStatus(value) {
  const statuses = {
    ABERTO: "Aberto",
    EM_ANALISE: "Em análise",
    EM_ANDAMENTO: "Em andamento",
    RESOLVIDO: "Resolvido",
    FECHADO: "Fechado"
  };

  return statuses[value] || value;
}

function formatPriority(value) {
  const priorities = {
    BAIXA: "Baixa",
    MEDIA: "Média",
    ALTA: "Alta",
    URGENTE: "Urgente"
  };

  return priorities[value] || value;
}

function formatDate(value) {
  if (!value) {
    return "-";
  }

  return new Date(value).toLocaleDateString("pt-BR");
}

async function carregarDashboard() {
  try {
    const response = await fetch(
      `${API_URL}/tickets`
    );

    const resultado = await response.json();

    if (!response.ok) {
      throw new Error(
        resultado.message ||
        "Erro ao carregar dashboard"
      );
    }

    const tickets = resultado.data || [];

    const abertos = tickets.filter(
      ticket => ticket.status === "ABERTO"
    ).length;

    const andamento = tickets.filter(
      ticket =>
        ticket.status === "EM_ANALISE" ||
        ticket.status === "EM_ANDAMENTO"
    ).length;

    const aguardando = tickets.filter(
      ticket =>
        ticket.assignedAgent == null &&
        ticket.status !== "RESOLVIDO" &&
        ticket.status !== "FECHADO"
    ).length;

    const resolvidos = tickets.filter(
      ticket =>
        ticket.status === "RESOLVIDO" ||
        ticket.status === "FECHADO"
    ).length;

    statOpen.textContent = abertos;
    statProgress.textContent = andamento;
    statWaiting.textContent = aguardando;
    statResolved.textContent = resolvidos;

    const recentes = [...tickets]
      .sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      )
      .slice(0, 5);

    if (recentes.length === 0) {
      recentTickets.innerHTML = `
        <tr>
          <td colspan="6">
            Nenhum chamado encontrado.
          </td>
        </tr>
      `;

      return;
    }

    recentTickets.innerHTML = recentes
      .map(ticket => {

        const category =
          ticket.category?.name || "-";

        return `
          <tr>

            <td>
              <a href="chamado.html?id=${ticket.id}">
                #${ticket.id}
              </a>
            </td>

            <td>
              ${ticket.title}
            </td>

            <td>
              ${category}
            </td>

            <td>
              ${formatPriority(ticket.priority)}
            </td>

            <td>
              ${formatStatus(ticket.status)}
            </td>

            <td>
              ${formatDate(ticket.createdAt)}
            </td>

          </tr>
        `;
      })
      .join("");

  } catch (erro) {
    console.error(
      "Erro ao carregar dashboard:",
      erro
    );

    recentTickets.innerHTML = `
      <tr>
        <td colspan="6">
          Não foi possível carregar os dados.
        </td>
      </tr>
    `;
  }
}

carregarDashboard();