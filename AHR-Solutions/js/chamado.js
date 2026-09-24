requireLogin();
renderShell("tickets");

document.getElementById("saveStatus").addEventListener("click", () => {
  // Futuramente: PATCH /api/tickets/:id
  document.getElementById("statusMessage").classList.remove("hidden");
});

document.getElementById("commentForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const comment = document.getElementById("comment");
  if (!comment.value.trim()) return;

  // Futuramente: POST /api/tickets/:id/comments
  alert("Comentário registrado na demonstração.");
  comment.value = "";
});
