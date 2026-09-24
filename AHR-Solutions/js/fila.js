requireLogin();
renderShell("queue");

const queueTable = document.getElementById("queueTable");
const queueStatus = document.getElementById("queueStatus");
const queuePriority = document.getElementById("queuePriority");

function renderQueue() {
  const filtered = demoTickets.filter(ticket =>
    (!queueStatus.value || ticket.status === queueStatus.value) &&
    (!queuePriority.value || ticket.priority === queuePriority.value)
  );

  queueTable.innerHTML = filtered.map(ticket => `
    <tr>
      <td><a href="chamado.html?id=${ticket.id}">#${ticket.id}</a></td>
      <td>${ticket.requester}</td>
      <td>${ticket.title}</td>
      <td class="${priorityClass(ticket.priority)}">${ticket.priority}</td>
      <td>${statusBadge(ticket.status)}</td>
      <td><button class="btn btn-secondary" onclick="assumeTicket(${ticket.id})">Assumir</button></td>
    </tr>
  `).join("");
}

function assumeTicket(id) {
  alert("Chamado #" + id + " assumido na demonstração.");
}

[queueStatus, queuePriority].forEach(el => el.addEventListener("change", renderQueue));
renderQueue();
