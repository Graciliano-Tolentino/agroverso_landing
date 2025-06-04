// ======================================================================================
// 🟢 scripts/login.js – Autenticação Simulada Agroverso
// 💡 Refinado com sabedoria, força e beleza
// ======================================================================================

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-login");
  const emailInput = document.getElementById("email");
  const senhaInput = document.getElementById("senha");
  const perfilInput = document.getElementById("perfil");
  const erroMsg = document.getElementById("erro-login");

  // 🧠 Mensagem clara e acessível de erro
  const mostrarErro = (mensagem) => {
    erroMsg.textContent = mensagem;
    erroMsg.hidden = false;
    erroMsg.focus?.(); // foco compatível com leitores de tela
  };

  // 🔍 Validação dos campos do formulário
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

  // ✅ Redirecionamento inteligente por perfil
  const redirecionarPorPerfil = (perfil) => {
    if (!perfil || typeof perfil !== "string") {
      window.location.href = "dashboard.html";
      return;
    }

    const caminhos = {
      administrador: "dashboard-admin.html",
      gerente: "dashboard-gerente.html",
      lider: "dashboard-lider.html",
      tecnico: "dashboard-tecnico.html"
    };

    const destino = caminhos[perfil.toLowerCase()] || "dashboard.html";
    console.info(`[Agroverso] Redirecionando para: ${destino}`);
    window.location.href = destino;
  };

  // 🚀 Evento de envio do formulário
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    erroMsg.hidden = true;

    const dados = validarCampos();
    if (!dados) return;

    sessionStorage.setItem("usuario_email", dados.email);
    sessionStorage.setItem("usuario_perfil", dados.perfil);

    redirecionarPorPerfil(dados.perfil);
  });
});
