// ======================================================================================
// 🟢 scripts/login.js – Autenticação Simulada Agroverso
// 💡 Refatorado com clareza, acessibilidade, modularidade e prontidão para evolução
// ======================================================================================

document.addEventListener("DOMContentLoaded", () => {
  // 🎯 Seletores principais
  const form = document.getElementById("form-login");
  const emailInput = document.getElementById("email");
  const senhaInput = document.getElementById("senha");
  const perfilInput = document.getElementById("perfil");
  const erroMsg = document.getElementById("erro-login");

  // 🧠 Mensagem clara de erro
  const mostrarErro = (mensagem) => {
    erroMsg.textContent = mensagem;
    erroMsg.hidden = false;
    erroMsg.focus?.(); // Acessível para leitores de tela
  };

  // 🛡️ Validações básicas
  const validarCampos = () => {
    const email = emailInput.value.trim();
    const senha = senhaInput.value.trim();
    const perfil = perfilInput.value;

    if (!email || !senha || !perfil) {
      mostrarErro("Todos os campos são obrigatórios.");
      return false;
    }

    if (senha.length < 6) {
      mostrarErro("A senha deve conter no mínimo 6 caracteres.");
      return false;
    }

    return { email, senha, perfil };
  };

  // 🚀 Evento principal do formulário
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    erroMsg.hidden = true;

    const dados = validarCampos();
    if (!dados) return;

    // 💾 Simula autenticação e inicia sessão
    sessionStorage.setItem("usuario_email", dados.email);
    sessionStorage.setItem("usuario_perfil", dados.perfil);

    // 🔁 Redireciona para o painel
    window.location.href = "dashboard.html";
  });
});
