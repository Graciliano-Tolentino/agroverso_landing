// ============================================================================================
// 📝 scripts/formulario.js — Integração Real com API de Orçamentos Agroverso
// ============================================================================================
// 🌱 Coleta dados do formulário institucional
// 📡 Envia via POST para /api/orcamentos
// ✅ Feedback ao usuário: sucesso ou erro
// ============================================================================================

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-orcamento");
  if (!form) return console.error("❌ Formulário de orçamento não encontrado.");

  const nomeInput = document.getElementById("nome");
  const emailInput = document.getElementById("email");
  const mensagemInput = document.getElementById("mensagem");
  const resultado = document.getElementById("mensagem-sucesso");

  // 🧠 Função de validação básica
  const validarCampos = () => {
    const nome = nomeInput?.value.trim();
    const email = emailInput?.value.trim();
    const mensagem = mensagemInput?.value.trim();

    if (!nome || !email || !mensagem) {
      alert("⚠️ Preencha todos os campos antes de enviar.");
      return null;
    }

    if (!email.includes("@") || nome.length < 3) {
      alert("⚠️ Insira um nome e e-mail válidos.");
      return null;
    }

    return { nome, email, mensagem };
  };

  // 📨 Submissão do formulário
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const dados = validarCampos();
    if (!dados) return;

    try {
      const resposta = await fetch("/api/orcamentos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
      });

      if (!resposta.ok) {
        if (resposta.status === 422) {
          alert("❌ Dados inválidos. Verifique os campos e tente novamente.");
        } else {
          alert("❌ Erro ao enviar. Tente novamente em alguns minutos.");
        }
        return;
      }

      const orcamento = await resposta.json();

      // ✅ Mensagem de sucesso ao usuário
      if (resultado) {
        resultado.textContent = `✅ Obrigado, ${orcamento.nome}. Sua solicitação foi recebida!`;
        resultado.hidden = false;
      }

      form.reset();

    } catch (erro) {
      console.error("❌ Erro ao enviar orçamento:", erro);
      alert("🚫 Não foi possível enviar sua solicitação. Verifique sua conexão.");
    }
  });
});
