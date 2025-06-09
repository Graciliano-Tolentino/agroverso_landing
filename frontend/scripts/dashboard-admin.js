// ============================================================================================
// 📊 dashboard-admin.js – Painel de Orçamentos Dinâmico para Administradores • Agroverso
// ============================================================================================
// 🎯 Objetivo:
//   - Carregar orçamentos agrupados por status
//   - Exibir dinamicamente nas colunas do Kanban
//   - Permitir ações administrativas (ex: “Marcar como atendido”)
// 🔐 Protegido por JWT armazenado no localStorage
// ============================================================================================

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("agro_token");

  if (!token) {
    alert("⚠️ Sessão expirada. Faça login novamente.");
    window.location.href = "login.html";
    return;
  }

  carregarOrcamentos(token);
});

// ============================================================================================
// 🚀 Função principal: busca todos os orçamentos do backend
// ============================================================================================

async function carregarOrcamentos(token) {
  try {
    const resposta = await fetch("https://agroverso.vercel.app/api/dashboard/filtro", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!resposta.ok) throw new Error("Erro ao buscar orçamentos.");

    const orcamentos = await resposta.json();
    renderizarOrcamentos(orcamentos);

  } catch (erro) {
    alert("❌ Falha ao carregar orçamentos: " + erro.message);
  }
}

// ============================================================================================
// 🧩 Função para renderizar orçamentos dinamicamente nas colunas do Kanban
// ============================================================================================

function renderizarOrcamentos(lista) {
  // Limpa todos os painéis antes de preencher
  const statusList = ["pendente", "em-analise", "finalizado", "recusado"];
  statusList.forEach(status => {
    const container = document.getElementById(status);
    if (container) container.innerHTML = ""; // Limpa a coluna
  });

  lista.forEach((orcamento) => {
    const statusNormalizado = normalizarStatus(orcamento.status);
    const coluna = document.getElementById(statusNormalizado);

    if (coluna) {
      const card = criarCardOrcamento(orcamento);
      coluna.appendChild(card);
    }
  });
}

// ============================================================================================
// 🎨 Criação de card HTML para um orçamento
// ============================================================================================

function criarCardOrcamento(orc) {
  const card = document.createElement("div");
  card.className = "orcamento-card";

  card.innerHTML = `
    <h4>👤 ${orc.nome}</h4>
    <p>📧 <strong>Email:</strong> ${orc.email}</p>
    <p>📝 <strong>Mensagem:</strong> ${orc.mensagem}</p>
    <p>🏷️ <strong>Status atual:</strong> ${orc.status}</p>
  `;

  if (orc.status !== "finalizado") {
    const botao = document.createElement("button");
    botao.textContent = "✔️ Marcar como Atendido";
    botao.onclick = () => atualizarStatus(orc.id, "finalizado");
    card.appendChild(botao);
  }

  return card;
}

// ============================================================================================
// 🔄 Normaliza valores de status para corresponder ao ID das colunas HTML
// ============================================================================================

function normalizarStatus(status) {
  return status.toLowerCase().replace(" ", "-").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// ============================================================================================
// 🔧 Atualiza o status de um orçamento via PATCH
// ============================================================================================

async function atualizarStatus(id, novoStatus) {
  const token = localStorage.getItem("agro_token");

  if (!confirm(`Deseja realmente marcar o orçamento #${id} como "${novoStatus}"?`)) return;

  try {
    const resposta = await fetch(`https://agroverso.vercel.app/api/dashboard/orcamentos/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status: novoStatus })
    });

    if (!resposta.ok) {
      const erro = await resposta.json();
      throw new Error(erro.detail || "Erro desconhecido.");
    }

    alert(`✅ Orçamento #${id} atualizado para "${novoStatus}" com sucesso!`);
    carregarOrcamentos(token); // Recarrega o painel

  } catch (erro) {
    alert("❌ Falha ao atualizar status: " + erro.message);
  }
}
