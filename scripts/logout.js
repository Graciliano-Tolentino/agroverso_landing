// ============================================================================================
// 🚪 scripts/logout.js – Encerramento de Sessão Agroverso
// 🌱 Clareza emocional, segurança ética, transição regenerativa e empatia institucional
// ============================================================================================

(function logoutAgroversoModule() {
  'use strict'; // 🔒 Modo seguro para evitar erros silenciosos

  // 🎯 Define o destino padrão após logout
  const URL_DESTINO = "login.html";

  // 🔍 Busca refinada por todos os botões com atributo universal de logout
  document.addEventListener("DOMContentLoaded", () => {
    const botoesLogout = document.querySelectorAll('[data-logout], [onclick="logout()"]');

    if (botoesLogout.length === 0) {
      console.warn("[Agroverso] ⚠️ Nenhum botão de logout encontrado na página.");
      return;
    }

    // ♿ Adiciona acessibilidade e dica de título
    botoesLogout.forEach((botao) => {
      botao.setAttribute("aria-label", "Encerrar sessão Agroverso com segurança");
      botao.setAttribute("title", "Clique para sair da plataforma Agroverso");
    });
  });

  /**
   * 🔚 Função global – Logout regenerativo e institucional
   * Exposta globalmente como `window.logout` para fácil chamada em qualquer contexto
   */
  window.logout = function () {
    // 🛡️ Confirmação empática antes de encerrar sessão
    const confirmarSaida = confirm(
      "Tem certeza que deseja encerrar sua sessão no Agroverso?\n\nVocê poderá fazer login novamente a qualquer momento."
    );

    if (!confirmarSaida) {
      console.info("[Agroverso] 🚫 Saída cancelada pelo usuário.");
      return;
    }

    // 🧼 Limpeza ética e criteriosa da sessão
    const chavesParaLimpar = [
      "agro_token",           // Token de autenticação
      "usuario_perfil",       // Perfil RBAC
      "usuario_email"         // E-mail institucional
    ];

    chavesParaLimpar.forEach((chave) => {
      localStorage.removeItem(chave);
      sessionStorage.removeItem(chave); // Caso existam dados em ambos os escopos
    });

    // 📢 Mensagem de encerramento com tom humano e regenerativo
    alert(
      "🌿 Sessão encerrada com sucesso.\n\n" +
      "Agradecemos pela sua presença no Agroverso.\n" +
      "Continue cultivando tecnologia com sabedoria, força e beleza."
    );

    // ⏳ Delay para garantir leitura e respiro do usuário
    setTimeout(() => {
      window.location.href = URL_DESTINO;
    }, 1200); // Tempo ideal para absorver a mensagem
  };

})(); // 🔚 Encerramento do módulo logoutAgroversoModule
