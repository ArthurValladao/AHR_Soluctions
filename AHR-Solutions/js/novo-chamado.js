requireLogin();
renderShell("new");

document.getElementById("newTicketForm").addEventListener("submit", (event) => {
  event.preventDefault();

  // Na versão final com backend, aqui faremos POST /api/tickets.
  const ticket = {
    title: document.getElementById("title").value,
    category: document.getElementById("category").value,
    priority: document.getElementById("priority").value,
    description: document.getElementById("description").value
  };

  console.log("Novo chamado (demonstração):", ticket);

  document.getElementById("ticketSuccess").classList.remove("hidden");
  event.target.reset();

  setTimeout(() => {
    window.location.href = "chamados.html";
  }, 1200);
});
