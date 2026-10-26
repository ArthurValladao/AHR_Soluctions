// Localiza os elementos da página.
const formulario = document.getElementById("formCadastro");
const campoNome = document.getElementById("nome");
const campoEmail = document.getElementById("email");
const campoTelefone = document.getElementById("telefone");
const campoSetor = document.getElementById("setor");
const campoSenha = document.getElementById("senha");
const campoConfirmacao = document.getElementById("confirmarSenha");
const mensagem = document.getElementById("mensagem");

// Exibe mensagens sem inserir conteúdo HTML fornecido pelo usuário.
function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = `mensagem ${tipo}`;
    mensagem.hidden = false;
}

// Esconde a mensagem anterior ao iniciar uma nova tentativa.
function limparMensagem() {
    mensagem.textContent = "";
    mensagem.className = "mensagem";
    mensagem.hidden = true;
}

// Verifica novamente a confirmação quando a senha muda.
campoSenha.addEventListener("input", () => {
    campoConfirmacao.setCustomValidity("");
});

// Confere se as duas senhas são iguais.
campoConfirmacao.addEventListener("input", () => {
    if (campoConfirmacao.value !== campoSenha.value) {
        campoConfirmacao.setCustomValidity("As senhas não coincidem.");
    } else {
        campoConfirmacao.setCustomValidity("");
    }
});

// Limita a quantidade de caracteres no telefone.
// A máscara visual poderá ser aprimorada posteriormente.
campoTelefone.addEventListener("input", () => {
    campoTelefone.value = campoTelefone.value.slice(0, 20);
});

// Executa as validações ao enviar o formulário.
formulario.addEventListener("submit", (evento) => {
    // Impede o recarregamento da página.
    evento.preventDefault();

    limparMensagem();

    // Validação dos campos obrigatórios e dos formatos HTML.
    if (!formulario.checkValidity()) {
        formulario.reportValidity();
        return;
    }

    // Evita espaços acidentais antes ou depois do nome.
    const nome = campoNome.value.trim();
    const email = campoEmail.value.trim();

    if (nome.length < 3) {
        mostrarMensagem(
            "Digite o nome completo com pelo menos 3 caracteres.",
            "erro"
        );
        campoNome.focus();
        return;
    }

    // Validação básica do telefone brasileiro.
    const digitosTelefone = campoTelefone.value.replace(/\D/g, "");

    if (digitosTelefone.length < 10 || digitosTelefone.length > 11) {
        mostrarMensagem(
            "Confira o telefone. Informe o DDD e o número.",
            "erro"
        );
        campoTelefone.focus();
        return;
    }

    // Confere se as senhas coincidem.
    if (campoSenha.value !== campoConfirmacao.value) {
        mostrarMensagem(
            "As senhas informadas são diferentes.",
            "erro"
        );
        campoConfirmacao.focus();
        return;
    }

    console.log("Cadastro validado:", {
        nome: nome,
        email: email,
        telefone: campoTelefone.value,
        setor: campoSetor.value
    });

    mostrarMensagem(
        "Validação concluída! A interface está pronta, mas a conta ainda não foi criada. É necessário conectar o formulário ao servidor.",
        "sucesso"
    );
});
