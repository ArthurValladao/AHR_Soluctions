// Controle da tela de login.
const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

togglePassword.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
  togglePassword.textContent = isPassword ? "🙈" : "👁";
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = passwordInput.value;

  // Demonstração local. Depois será substituído pela chamada ao backend.
  const user = demoUsers[email];

  if (user && password === "123456") {
    saveUser(user);

    if (user.role === "Admin") {
      window.location.href = "admin.html";
    } else if (user.role === "Agente") {
      window.location.href = "fila.html";
    } else {
      window.location.href = "dashboard.html";
    }
  } else {
    loginError.classList.remove("hidden");
  }
});
