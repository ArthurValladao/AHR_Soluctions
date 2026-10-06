const user =
  requireLogin();

renderShell("new");

document
  .getElementById("newTicketForm")
  .addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();

      const ticket = {

        title:
          document
            .getElementById("title")
            .value
            .trim(),

        description:
          document
            .getElementById("description")
            .value
            .trim(),

        priority:
          document
            .getElementById("priority")
            .value,

        categoryId:
          Number(
            document
              .getElementById("category")
              .value
          ),

        requesterId:
          user.id
      };

      try {

        const response =
          await fetch(
            `${API_URL}/tickets`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body:
                JSON.stringify(ticket)
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

        document
          .getElementById(
            "ticketSuccess"
          )
          .classList
          .remove("hidden");

        event.target.reset();

        setTimeout(() => {

          window.location.href =
            "chamados.html";

        }, 1200);

      } catch (erro) {

        alert(erro.message);
      }
    }
  );