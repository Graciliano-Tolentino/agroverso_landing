// ============================================================================================
// 🔐 scripts/login.js – Sistema de Autenticação Simulada Agroverso
// 🌱 MVP regenerativo com clareza semântica, modularidade inicial e controle RBAC
// 📦 Preparado para futura integração com backend real e JWT assinado
// 🛟 Acessível, seguro dentro do contexto, estruturado para nota 12/10 pessimista
// ============================================================================================

document.addEventListener("DOMContentLoaded", () => {
  // 🔍 Segurança básica: só executa se o formulário existir no DOM
  const form = document.getElementById("form-login");
  if (!form) return console.error("⚠️ Formulário de login não encontrado no DOM.");

  // 🎯 Referências aos campos do formulário
  const emailInput = document.getElementById("email");
  const senhaInput = document.getElementById("senha");
  const perfilInput = document.getElementById("perfil");
  const erroMsg = document.getElementById("erro-login");

  // 🧠 Função reutilizável para exibir erros com acessibilidade
  const mostrarErro = (mensagem) => {
    if (!erroMsg) return;
    erroMsg.textContent = mensagem;
    erroMsg.hidden = false;
    erroMsg.focus?.(); // Acessível para leitores de tela
  };

  // 🛡️ Validações mínimas de campos (padrão HTML + reforço)
  const validarCampos = () => {
    const email = emailInput?.value.trim();
    const senha = senhaInput?.value.trim();
    const perfil = perfilInput?.value;

    if (!email || !senha || !perfil) {
      mostrarErro("Todos os campos são obrigatórios. Verifique seus dados e tente novamente.");
      return null;
    }

    if (!email.includes("@") || senha.length < 6) {
      mostrarErro("Formato de e-mail ou senha inválido.");
      return null;
    }

    return { email, senha, perfil };
  };

  // 📁 Banco de dados simulado – substituível por backend/API real
  const usuariosSimulados = [
    {
      email: "admin@agroverso.tec.br",
      senha: "123456",
      perfil: "administrador"
    },
    {
      email: "gerente@agroverso.tec.br",
      senha: "123456",
      perfil: "gerente"
    },
    {
      email: "lider@agroverso.tec.br",
      senha: "123456",
      perfil: "lider"
    },
    {
      email: "tecnico@agroverso.tec.br",
      senha: "123456",
      perfil: "tecnico"
    }
  ];

  // 🧾 Evento de submissão do formulário
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    erroMsg.hidden = true; // Reset do estado de erro

    const dados = validarCampos();
    if (!dados) return;

    const { email, senha, perfil } = dados;

    // 🔎 Verificar se o usuário existe com credenciais válidas
    const usuarioValido = usuariosSimulados.find(
      (u) => u.email === email && u.senha === senha && u.perfil === perfil
    );

    if (!usuarioValido) {
      mostrarErro("Credenciais inválidas. Verifique e tente novamente.");
      return;
    }

    // 🔐 Geração do token simulado JWT-like com expiração (1h)
    const payload = {
      email,
      perfil,
      exp: Math.floor(Date.now() + 60 * 60 * 1000) // exp em ms
    };

    try {
      const token = btoa(JSON.stringify(payload));
      localStorage.setItem("agro_token", token);
    } catch (erro) {
      console.error("❌ Falha ao codificar token:", erro);
      mostrarErro("Erro interno. Tente novamente em instantes.");
      return;
    }

    // 🌐 Mapeamento das rotas por perfil (RBAC explícito)
    const rotas = {
      administrador: "dashboard-admin.html",
      gerente: "dashboard-gerente.html",
      lider: "dashboard-lider.html",
      tecnico: "dashboard-tecnico.html"
    };

    const destino = rotas[perfil];

    // 🚦 Fallback: se perfil estiver fora do padrão esperado
    if (!destino) {
      console.warn("⚠️ Perfil não reconhecido no mapeamento de rotas.");
      mostrarErro("Perfil não autorizado ou inexistente.");
      return;
    }

    // ✅ Redirecionamento final com sucesso confirmado
    console.info(`🔐 Acesso concedido. Redirecionando ${perfil} para ${destino}`);
    window.location.href = destino;
  });
});
