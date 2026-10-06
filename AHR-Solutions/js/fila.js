requireLogin();
renderShell("queue");

const queueStatus =
  document.getElementById("queueStatus");

const queuePriority =
  document.getElementById("queuePriority");

const queueTable =
  document.getElementById("queueTable");

let tickets = [];

function formatStatus(value) {
  const statuses = {
    ABERTO: "Aberto",
    EM_ANALISE: "Em análise",
    EM_ANDAMENTO: "Em andamento",
    AGUARDANDO_SOLICITANTE: "Aguardando solicitante",
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

async function carregarFila() {
  try {
    const response = await fetch(
      `${API_URL}/tickets`
    );

    const resultado =
      await response.json();

    if (!response.ok) {
      throw new Error(
        resultado.message ||
        "Erro ao carregar fila"
      );
    }

    tickets =
      resultado.data || [];

    renderQueue();

  } catch (erro) {
    console.error(
      "Erro ao carregar fila:",
      erro
    );

    queueTable.innerHTML = `
      <tr>
        <td colspan="6">
          Não foi possível carregar a fila.
        </td>
      </tr>
    `;
  }
}

function renderQueue() {
  const selectedStatus =
    queueStatus.value;

  const selectedPriority =
    queuePriority.value;

  const filtered =
    tickets.filter((ticket) => {

      const statusName =
        formatStatus(ticket.status);

      const priorityName =
        formatPriority(ticket.priority);

      const matchesStatus =
        !selectedStatus ||
        ticket.status === selectedStatus ||
        statusName === selectedStatus;

      const matchesPriority =
        !selectedPriority ||
        ticket.priority === selectedPriority ||
        priorityName === selectedPriority;

      return (
        matchesStatus &&
        matchesPriority
      );
    });

  if (filtered.length === 0) {
    queueTable.innerHTML = `
      <tr>
        <td colspan="6">
          Nenhum chamado encontrado.
        </td>
      </tr>
    `;

    return;
  }

  queueTable.innerHTML =
    filtered
      .map((ticket) => {

        const requester =
          ticket.requester?.name ||
          "-";

        const priorityName =
          formatPriority(
            ticket.priority
          );

        const statusName =
          formatStatus(
            ticket.status
          );

        return `
          <tr>

            <td>
              #${ticket.id}
            </td>

            <td>
              ${requester}
            </td>

            <td>
              ${ticket.title}
            </td>

            <td class="${priorityClass(priorityName)}">
              ${priorityName}
            </td>

            <td>
              ${statusBadge(statusName)}
            </td>

            <td>

              <a
                href="chamado.html?id=${ticket.id}"
                class="btn btn-secondary"
              >
                Ver
              </a>

              <button
                type="button"
                class="btn btn-primary"
                onclick="assumeTicket(${ticket.id})"
              >
                Assumir
              </button>

            </td>

          </tr>
        `;
      })
      .join("");
}

function assumeTicket(id) {
  alert(
    `Chamado #${id} assumido na demonstração.`
  );
}

queueStatus.addEventListener(
  "change",
  renderQueue
);

queuePriority.addEventListener(
  "change",
  renderQueue
);

carregarFila();