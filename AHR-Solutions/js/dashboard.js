requireLogin();
renderShell("dashboard");

const recentTickets = document.getElementById("recentTickets");

recentTickets.innerHTML = demoTickets.slice(0, 4).map(ticket => `
  <tr>
    <td><a href="chamado.html?id=${ticket.id}">#${ticket.id}</a></td>
    <td>${ticket.title}</td>
    <td>${ticket.category}</td>
    <td class="${priorityClass(ticket.priority)}">${ticket.priority}</td>
    <td>${statusBadge(ticket.status)}</td>
  </tr>
`).join("");
