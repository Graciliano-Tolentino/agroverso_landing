// ==========================================================================================
// 🔐 scripts/auth.js – Autorização e Proteção de Páginas Privadas • Agroverso
// 🌱 Refatorado com sabedoria, força e beleza para segurança comportamental e clareza ética
// ==========================================================================================

(() => {
  // 🔒 Escopo protegido via IIFE para evitar conflitos globais

  /**
   * ✅ protegerPagina – Verifica se o usuário está logado e autorizado para acessar a página.
   * @param {Array<string>} perfisPermitidos – Lista de perfis autorizados (ex: ['administrador', 'gerente'])
   */
  window.protegerPagina = function (perfisPermitidos = []) {
    const perfil = sessionStorage.getItem("usuario_perfil");
    const email = sessionStorage.getItem("usuario_email");

    // 🧠 Lógica de acesso
    if (!perfil || !email || !perfisPermitidos.includes(perfil)) {
      console.warn(`[Agroverso] Acesso negado para perfil '${perfil}' ou sessão inválida.`);
      alert("🚫 Acesso restrito. Por favor, faça login com um perfil autorizado.");
      window.location.href = "login.html";
    } else {
      console.info(`[Agroverso] Acesso autorizado para '${perfil}' (${email}).`);
    }
  };

  /**
   * 🔚 logout – Limpa a sessão do usuário e redireciona para a tela de login com elegância.
   * Pode ser sobrescrita por contextos específicos ou centralizada em logout.js.
   */
  window.logout = function () {
    const confirmar = confirm("Tem certeza que deseja sair da sua sessão atual?");

    if (!confirmar) {
      console.info("[Agroverso] Logout cancelado pelo usuário.");
      return;
    }

    // 🔄 Limpeza cuidadosa da sessão
    sessionStorage.removeItem("usuario_perfil");
    sessionStorage.removeItem("usuario_email");

    // 💬 Mensagem clara de saída
    alert("Sessão finalizada com sucesso.\nEsperamos te ver novamente em breve!");

    // 🌐 Redirecionamento suave
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1000);
  };

})(); // 🔚 Fim do escopo protegido
