// ==========================================================================================
// 🔐 scripts/auth.js – Autorização e Proteção de Páginas Privadas • Agroverso
// 🌱 Refatorado com sabedoria, força e beleza para segurança comportamental e clareza ética
// ==========================================================================================

(() => {
  // 🔒 Escopo isolado para não poluir o escopo global

  /**
   * ✅ protegerPagina – Verifica se o usuário está logado e autorizado para acessar a página.
   * @param {Array<string>} perfisPermitidos – Lista de perfis autorizados (ex: ['administrador', 'gerente'])
   */
  window.protegerPagina = function (perfisPermitidos = []) {
    const perfil = sessionStorage.getItem("usuario_perfil");
    const email = sessionStorage.getItem("usuario_email");

    if (!perfil || !email || !perfisPermitidos.includes(perfil)) {
      console.warn(`[Agroverso] Acesso negado para perfil '${perfil}' ou sessão inválida.`);
      alert("🚫 Acesso restrito. Por favor, faça login com um perfil autorizado.");
      window.location.href = "login.html";
    } else {
      console.info(`[Agroverso] Acesso autorizado para '${perfil}' (${email}).`);
    }
  };

  /**
   * 🔚 logout – Finaliza a sessão com clareza e empatia
   */
  window.logout = function () {
    const confirmar = confirm("Tem certeza que deseja sair da sua sessão atual?");
    if (!confirmar) return;

    sessionStorage.removeItem("usuario_perfil");
    sessionStorage.removeItem("usuario_email");

    alert("Sessão finalizada com sucesso.\nEsperamos te ver novamente em breve!");
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1000);
  };
})();

// ==========================================================================================
// 📋 Exibição condicional do menu lateral com base no perfil autenticado
// ==========================================================================================

document.addEventListener("DOMContentLoaded", () => {
  const menuPrivado = document.getElementById("menuPrivado");
  const perfil = sessionStorage.getItem("usuario_perfil");

  if (perfil && menuPrivado) {
    menuPrivado.hidden = false;

    // 🧠 Opcional: destacar o painel correto no menu
    const linkPainel = document.querySelector(`a[href="dashboard-${perfil}.html"]`);
    if (linkPainel) {
      linkPainel.style.fontWeight = "bold";
      linkPainel.style.textDecoration = "underline";
    }
  }
});
