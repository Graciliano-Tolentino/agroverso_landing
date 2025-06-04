// ======================================================================================
// 🛡️ scripts/protect-dashboard.js – Proteção Avançada do Painel Agroverso
// 🎯 Garante acesso apenas a sessões válidas via sessionStorage
// ======================================================================================

(() => {
  try {
    const perfil = sessionStorage.getItem("usuario_perfil");
    const email = sessionStorage.getItem("usuario_email");

    // 🔐 Verificação de sessão
    const sessaoValida = perfil && email;

    // ⛔ Acesso negado: redireciona silenciosamente
    if (!sessaoValida) {
      console.warn("[Agroverso] Acesso não autorizado ou sessão encerrada.");
      alert("Sessão expirada ou acesso inválido. Faça login novamente.");
      window.location.href = "login.html";
    }

    // 🧩 Preparado para futuros tokens JWT ou validação por tempo
    // Exemplo (futuro):
    // const expira = sessionStorage.getItem("expira");
    // if (Date.now() > parseInt(expira)) { ... }

  } catch (erro) {
    // 🧯 Fallback absoluto para qualquer falha
    console.error("[Agroverso] Erro na verificação de sessão:", erro);
    alert("Erro de segurança. Redirecionando para login.");
    window.location.href = "login.html";
  }
})();

