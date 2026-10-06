requireLogin();
renderShell("tickets");

const params = new URLSearchParams(window.location.search);
const ticketId = Number(params.get("id"));

if (!ticketId) {
  window.location.href = "chamados.html";
}

function formatStatus(status) {
  const statuses = {
    ABERTO: "Aberto",
    EM_ANALISE: "Em análise",
    EM_ANDAMENTO: "Em andamento",
    RESOLVIDO: "Resolvido",
    FECHADO: "Fechado"
  };

  return statuses[status] || status;
}

function formatPriority(priority) {
  const priorities = {
    BAIXA: "Baixa",
    MEDIA: "Média",
    ALTA: "Alta",
    URGENTE: "Urgente"
  };

  return priorities[priority] || priority;
}

function formatDate(date) {
  if (!date) {
    return "-";
  }

  return new Date(date).toLocaleString("pt-BR");
}

async function carregarChamado() {
  try {
    const response = await fetch(
      `${API_URL}/tickets/${ticketId}`
    );

    const resultado = await response.json();

    if (!response.ok) {
      throw new Error(
        resultado.message || "Erro ao carregar chamado"
      );
    }

    const ticket = resultado.data;

    console.log("Chamado:", ticket);

    const title =
      document.getElementById("ticketTitle");

    const number =
      document.getElementById("ticketNumber");

    const description =
      document.getElementById("ticketDescription");

    const category =
      document.getElementById("ticketCategory");

    const priority =
      document.getElementById("ticketPriority");

    const status =
      document.getElementById("ticketStatus");

    const requester =
      document.getElementById("ticketRequester");

    const team =
      document.getElementById("ticketTeam");

    const createdAt =
      document.getElementById("ticketCreatedAt");


    if (title) {
      title.textContent = ticket.title;
    }

    if (number) {
      number.textContent = `Chamado #${ticket.id}`;
    }

    if (description) {
      description.textContent = ticket.description;
    }

    if (category) {
      category.textContent =
        ticket.category?.name || "-";
    }

    if (priority) {
      priority.textContent =
        formatPriority(ticket.priority);
    }

    if (status) {
      status.textContent =
        formatStatus(ticket.status);
    }

    if (requester) {
      requester.textContent =
        ticket.requester?.name || "-";
    }

    if (team) {
      team.textContent =
        ticket.team?.name || "-";
    }

    if (createdAt) {
      createdAt.textContent =
        formatDate(ticket.createdAt);
    }

  } catch (erro) {
    console.error(erro);

    alert(
      erro.message ||
      "Não foi possível carregar o chamado."
    );
  }
}

carregarChamado();