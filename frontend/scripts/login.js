// ============================================================================================
// 🔐 scripts/login.js — Autenticação JWT Real Agroverso
// ============================================================================================
// 🌿 MVP regenerativo autenticado via API REST com segurança de nível elevado
// 📡 Integração direta com FastAPI, tokens JWT assinados, controle de perfil e expiração
// 🧠 Proteção contra falhas comuns, modularização limpa, feedbacks visuais e semântica pura
// 💡 Refatorado com clareza e poder, pronto para produção e escalabilidade progressiva
// ============================================================================================

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-login");
  if (!form) return console.error("❌ Formulário de login não encontrado no DOM.");

  const emailInput = document.getElementById("email");
  const senhaInput = document.getElementById("senha");
  const erroMsg = document.getElementById("erro-login");

  // 🎯 Função auxiliar para exibir mensagens de erro ao usuário
  const mostrarErro = (mensagem) => {
    if (!erroMsg) return;
    erroMsg.textContent = mensagem;
    erroMsg.hidden = false;
    erroMsg.focus?.();
  };

  // ✅ Validação dos campos de entrada antes do envio ao backend
  const validarCampos = () => {
    const email = emailInput?.value.trim();
    const senha = senhaInput?.value;

    if (!email || !senha) {
      mostrarErro("Todos os campos são obrigatórios.");
      return null;
    }

    if (!email.includes("@") || senha.length < 6) {
      mostrarErro("Formato de e-mail ou senha inválido.");
      return null;
    }

    return { email, senha };
  };

  // ============================================================================================
  // 🚀 Envio dos dados de login para o backend FastAPI com autenticação JWT
  // ============================================================================================
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    erroMsg.hidden = true;

    const dados = validarCampos();
    if (!dados) return;

    const { email, senha } = dados;

    try {
      const resposta = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, senha })
      });

      if (!resposta.ok) {
        if (resposta.status === 401) {
          mostrarErro("Credenciais inválidas. Verifique e tente novamente.");
        } else if (resposta.status >= 500) {
          mostrarErro("Erro no servidor. Tente novamente em alguns instantes.");
        } else {
          mostrarErro(`Erro inesperado [${resposta.status}].`);
        }
        return;
      }

      const dadosAutenticados = await resposta.json();

      // 🔐 Armazenamento seguro do token e metadados de sessão
      localStorage.setItem("agro_token", dadosAutenticados.access_token);
      localStorage.setItem("agro_email", dadosAutenticados.email);
      localStorage.setItem("agro_perfil", dadosAutenticados.perfil);
      localStorage.setItem("agro_nome", dadosAutenticados.nome);

      // 🕒 Expiração local temporária (client-side) para consistência de logout automático
      const expiraEm = Date.now() + 60 * 60 * 1000; // 1 hora
      localStorage.setItem("agro_expira", expiraEm.toString());

      console.info("✅ Login realizado com sucesso. Perfil:", dadosAutenticados.perfil);

      // ========================================================================================
      // 🧭 Redirecionamento automático conforme o perfil recebido do backend
      // ========================================================================================
      const rotasPorPerfil = {
        admin: "dashboard-admin.html",
        administrador: "dashboard-admin.html",  // suporte a nomenclaturas alternativas
        gerente: "dashboard-gerente.html",
        lider: "dashboard-lider.html",
        tecnico: "dashboard-tecnico.html"
      };

      const rotaDestino = rotasPorPerfil[dadosAutenticados.perfil];

      if (!rotaDestino) {
        mostrarErro("Perfil não reconhecido pelo sistema. Contate o suporte.");
        console.warn("⚠️ Perfil desconhecido recebido:", dadosAutenticados.perfil);
        return;
      }

      // 🌐 Redirecionamento efetivo
      window.location.href = rotaDestino;

    } catch (erro) {
      console.error("❌ Erro ao tentar autenticar usuário:", erro);
      mostrarErro("Erro de conexão. Verifique sua internet ou tente mais tarde.");
    }
  });
});
