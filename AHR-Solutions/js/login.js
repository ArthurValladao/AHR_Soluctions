const form =
  document.getElementById("loginForm");

const errorMessage =
  document.getElementById("loginError");

form.addEventListener(
  "submit",
  async (event) => {

    event.preventDefault();

    const email =
      document
        .getElementById("email")
        .value
        .trim();

    const password =
      document
        .getElementById("password")
        .value;

    try {

      errorMessage.textContent = "";
      errorMessage.classList.add("hidden");

      const response =
        await fetch(
          `${API_URL}/auth/login`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({
              email,
              password
            })
          }
        );

      const resultado =
        await response.json();

      if (!response.ok) {
        throw new Error(
          resultado.message ||
          "E-mail ou senha incorretos"
        );
      }

      localStorage.setItem(
        "ahrUser",
        JSON.stringify(
          resultado.data
        )
      );

      window.location.href =
        "dashboard.html";

    } catch (erro) {

      console.error(erro);

      errorMessage.textContent =
        erro.message;

      errorMessage.classList.remove(
        "hidden"
      );
    }
  }
);