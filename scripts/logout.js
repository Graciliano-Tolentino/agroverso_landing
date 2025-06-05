// ========================================================================================
// 🚪 scripts/logout.js – Logout Institucional Agroverso
// 🌿 Simples, ético, funcional e emocional, com acessibilidade nativa e perfeição modular
// ========================================================================================

(function logoutAgroversoModule() {
  // 🔍 Busca inteligente por qualquer botão com atributo logout-action
  document.addEventListener("DOMContentLoaded", () => {
    const botoes = document.querySelectorAll('[data-logout], [onclick="logout()"]');

    botoes.forEach((btn) => {
      btn.setAttribute("aria-label", "Encerrar sessão e voltar à página de login");
      btn.setAttribute("title", "Clique aqui para sair do sistema com segurança");
    });
  });

  /**
   * 🔚 Função global de logout – ética, clara, emocional e acessível
   * Exposta como `window.logout` para uso universal
   */
  window.logout = function () {
    // 🛡️ Diálogo de confirmação
    const desejaSair = confirm("Tem certeza que deseja sair do sistema Agroverso?");

    if (!desejaSair) {
      console.info("[Agroverso] Saída cancelada com sabedoria pelo usuário.");
      return;
    }

    // 🧼 Limpeza criteriosa da sessão
    const dadosApagados = ["usuario_perfil", "usuario_email"];
    dadosApagados.forEach(chave => sessionStorage.removeItem(chave));

    // 📢 Mensagem afetiva e institucional
    alert("🟢 Sessão encerrada com sucesso.\n\nAgradecemos por fazer parte do Agroverso.");

    // 🕊️ Delay consciente para transição harmoniosa
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1000); // 1 segundo – tempo ideal para respiro mental
  };

})(); // 🔚 Encerramento do módulo logoutAgroversoModule
