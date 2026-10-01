requireLogin();
renderShell("new");

document.getElementById("newTicketForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const ticket = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    priority: document.getElementById("priority").value,

    categoryId: Number(document.getElementById("category").value),

    // temporário enquanto ainda não ligamos o login real ao backend
    requesterId: 1
  };

  try {

    const response = await fetch("http://localhost:8080/api/tickets", {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(ticket)
    });

    if (!response.ok) {
      throw new Error("Erro ao criar chamado");
    }

    const chamadoCriado = await response.json();

    console.log("Chamado criado:", chamadoCriado);

    document
      .getElementById("ticketSuccess")
      .classList.remove("hidden");

    event.target.reset();

    setTimeout(() => {
      window.location.href = "chamados.html";
    }, 1200);

  } catch (erro) {

    console.error("Erro:", erro);

    alert("Não foi possível criar o chamado.");
  }
});