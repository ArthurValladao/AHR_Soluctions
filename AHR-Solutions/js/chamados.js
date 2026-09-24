requireLogin();
renderShell("tickets");

const table = document.getElementById("ticketsTable");
const search = document.getElementById("searchTickets");
const status = document.getElementById("statusFilter");
const priority = document.getElementById("priorityFilter");

function renderTickets() {
  const text = search.value.toLowerCase();
  const filtered = demoTickets.filter(ticket =>
    (!text || ticket.title.toLowerCase().includes(text) || String(ticket.id).includes(text)) &&
    (!status.value || ticket.status === status.value) &&
    (!priority.value || ticket.priority === priority.value)
  );

  table.innerHTML = filtered.map(ticket => `
    <tr>
      <td><a href="chamado.html?id=${ticket.id}">#${ticket.id}</a></td>
      <td>${ticket.title}</td>
      <td>${ticket.category}</td>
      <td class="${priorityClass(ticket.priority)}">${ticket.priority}</td>
      <td>${statusBadge(ticket.status)}</td>
      <td>${ticket.date}</td>
    </tr>
  `).join("") || `<tr><td colspan="6">Nenhum chamado encontrado.</td></tr>`;
}

[search, status, priority].forEach(element => element.addEventListener("input", renderTickets));
renderTickets();
