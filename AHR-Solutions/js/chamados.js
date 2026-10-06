requireLogin();
renderShell("tickets");

const table =
  document.getElementById("ticketsTable");

const search =
  document.getElementById("searchTickets");

const status =
  document.getElementById("statusFilter");

const priority =
  document.getElementById("priorityFilter");

let tickets = [];

async function carregarChamados() {

  try {

    const response =
      await fetch(
        `${API_URL}/tickets`
      );

    const resultado =
      await response.json();

    if (!response.ok) {
      throw new Error(
        resultado.message ||
        "Erro ao buscar chamados"
      );
    }

    tickets =
      resultado.data || [];

    renderTickets();

  } catch (erro) {

    console.error(
      "Erro ao carregar chamados:",
      erro
    );

    table.innerHTML = `
      <tr>
        <td colspan="6">
          Não foi possível carregar os chamados.
        </td>
      </tr>
    `;
  }
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

function formatDate(value) {

  if (!value) {
    return "-";
  }

  return new Date(value)
    .toLocaleDateString("pt-BR");
}

function renderTickets() {

  const text =
    search.value
      .toLowerCase()
      .trim();

  const filtered =
    tickets.filter((ticket) => {

      const title =
        ticket.title
          ? ticket.title.toLowerCase()
          : "";

      const ticketId =
        String(ticket.id);

      const statusName =
        formatStatus(ticket.status);

      const priorityName =
        formatPriority(ticket.priority);

      const matchesSearch =
        !text ||
        title.includes(text) ||
        ticketId.includes(text);

      const matchesStatus =
        !status.value ||
        ticket.status === status.value ||
        statusName === status.value;

      const matchesPriority =
        !priority.value ||
        ticket.priority === priority.value ||
        priorityName === priority.value;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    });

  table.innerHTML =
    filtered.map((ticket) => {

      const priorityName =
        formatPriority(
          ticket.priority
        );

      const statusName =
        formatStatus(
          ticket.status
        );

      const categoryName =
        ticket.category
          ? ticket.category.name
          : "-";

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
            ${categoryName}
          </td>

          <td class="${priorityClass(priorityName)}">
            ${priorityName}
          </td>

          <td>
            ${statusBadge(statusName)}
          </td>

          <td>
            ${formatDate(ticket.createdAt)}
          </td>

        </tr>
      `;
    }).join("");

  if (filtered.length === 0) {

    table.innerHTML = `
      <tr>
        <td colspan="6">
          Nenhum chamado encontrado.
        </td>
      </tr>
    `;
  }
}

search.addEventListener(
  "input",
  renderTickets
);

status.addEventListener(
  "change",
  renderTickets
);

priority.addEventListener(
  "change",
  renderTickets
);

carregarChamados();