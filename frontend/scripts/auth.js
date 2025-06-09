// ============================================================================================
// 🛡️ scripts/auth.js — Proteção de Páginas Privadas Agroverso com Validação Real
// ============================================================================================
// 🔐 Validação JWT com backend FastAPI (via /api/auth/verify)
// 🌿 Segurança regenerativa, baseada em tokens assinados, com controle RBAC e expiração real
// 💡 Refatorado para impedir falsificações de sessão e garantir acesso apenas autorizado
// ============================================================================================

(() => {
  'use strict'; // 🔐 Restringe o escopo e previne falhas silenciosas

  const loginPage = "login.html";

  // 🔁 Função de fallback segura para redirecionar usuários inválidos
  const redirecionarParaLogin = (mensagem = "Sessão inválida. Faça login novamente.") => {
    alert(`⚠️ ${mensagem}`);
    window.location.href = loginPage;
  };

  // 🔐 Recupera o token JWT armazenado localmente
  const token = localStorage.getItem("agro_token");

  if (!token) {
    console.warn("🔐 [Agroverso] Token ausente. Redirecionando para login.");
    return redirecionarParaLogin();
  }

  // 🛡️ Requisição ao backend para validar o token de forma segura
  fetch("/api/auth/verify", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })

    .then(async (resposta) => {
      if (!resposta.ok) {
        if (resposta.status === 401) {
          console.warn("🚫 [Agroverso] Token inválido ou expirado.");
          return redirecionarParaLogin("Sessão expirada. Faça login novamente.");
        }
        console.error(`❌ Erro inesperado na verificação do token [${resposta.status}]`);
        return redirecionarParaLogin("Erro interno ao validar a sessão.");
      }

      const dados = await resposta.json();

      const { perfil, email } = dados;
      if (!perfil || !email) {
        console.error("❌ [Agroverso] Resposta do backend incompleta ou inválida.");
        return redirecionarParaLogin("Resposta inválida do servidor.");
      }

      // 🗺️ Mapeamento de páginas por perfil
      const rotasPermitidas = {
        admin: "dashboard-admin.html",
        administrador: "dashboard-admin.html",
        gerente: "dashboard-gerente.html",
        lider: "dashboard-lider.html",
        tecnico: "dashboard-tecnico.html"
      };

      const rotaEsperada = rotasPermitidas[perfil];
      if (!rotaEsperada) {
        console.error(`❌ [Agroverso] Perfil '${perfil}' não mapeado para rota autorizada.`);
        return redirecionarParaLogin("Acesso negado. Perfil não reconhecido.");
      }

      // 🌐 Página atual sanitizada (sem diretórios)
      const paginaAtual = window.location.pathname.split("/").pop();

      if (paginaAtual !== rotaEsperada) {
        console.warn(`🚫 [Agroverso] Perfil '${perfil}' tentou acessar '${paginaAtual}', mas deveria estar em '${rotaEsperada}'.`);
        return redirecionarParaLogin("Acesso restrito. Perfil não autorizado para esta página.");
      }

      // ✅ Acesso autorizado — sessão validada com backend e perfil permitido
      console.info(`✅ [Agroverso] Sessão autenticada: ${perfil.toUpperCase()} (${email})`);
      console.info(`📄 Página atual: ${paginaAtual} | Rota autorizada: ${rotaEsperada}`);

      // 🔄 Torna os dados disponíveis globalmente (se necessário)
      window.usuarioAgroverso = { perfil, email };

    })
    .catch((erro) => {
      console.error("❌ [Agroverso] Erro de rede ao validar sessão:", erro);
      redirecionarParaLogin("Falha na comunicação com o servidor. Faça login novamente.");
    });

})();
