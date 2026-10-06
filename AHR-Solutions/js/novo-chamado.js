requireLogin();
renderShell("new");

document
  .getElementById("newTicketForm")
  .addEventListener("submit", async (event) => {

    event.preventDefault();

    const ticket = {
      title: document.getElementById("title").value.trim(),

      description:
        document.getElementById("description").value.trim(),

      priority:
        document.getElementById("priority").value,

      categoryId: Number(
        document.getElementById("category").value
      ),

      requesterId: 1
    };

    try {

      const response = await fetch(
        `${API_URL}/tickets`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(ticket)
        }
      );

      const resultado =
        await response.json();

      if (!response.ok) {
        throw new Error(
          resultado.message ||
          "Erro ao criar chamado"
        );
      }

      console.log(
        "Chamado criado:",
        resultado.data
      );

      document
        .getElementById("ticketSuccess")
        .classList.remove("hidden");

      event.target.reset();

      setTimeout(() => {
        window.location.href =
          "chamados.html";
      }, 1200);

    } catch (erro) {

      console.error(
        "Erro ao criar chamado:",
        erro
      );

      alert(erro.message);
    }
  });