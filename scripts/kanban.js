// ==========================================================================================
// 🧠 kanban.js – Painel de Tarefas com Drag & Drop Agroverso
// ==========================================================================================

document.addEventListener("DOMContentLoaded", () => {
  const tarefas = [
    {
      id: "T001",
      titulo: "Atualizar sensores da zona norte",
      descricao: "Verificar calibração e registrar no sistema",
      prioridade: "alta",
      status: "a-fazer"
    },
    {
      id: "T002",
      titulo: "Analisar relatório mensal",
      descricao: "Conferir indicadores de desempenho",
      prioridade: "media",
      status: "em-execucao"
    },
    {
      id: "T003",
      titulo: "Revisar permissões de usuários",
      descricao: "Validar perfis e funções",
      prioridade: "baixa",
      status: "concluidas"
    },
    {
      id: "T004",
      titulo: "Corrigir falha no módulo de irrigação",
      descricao: "Erro intermitente no campo 12",
      prioridade: "alta",
      status: "pendencias"
    }
  ];

  const colunas = {
    "a-fazer": document.getElementById("a-fazer"),
    "em-execucao": document.getElementById("em-execucao"),
    "concluidas": document.getElementById("concluidas"),
    "pendencias": document.getElementById("pendencias")
  };

  tarefas.forEach(tarefa => {
    const card = document.createElement("div");
    card.classList.add("kanban-card");
    card.setAttribute("draggable", "true");
    card.setAttribute("data-id", tarefa.id);
    card.setAttribute("data-prioridade", tarefa.prioridade);
    card.innerHTML = `
      <strong>${tarefa.titulo}</strong>
      <p>${tarefa.descricao}</p>
    `;
    colunas[tarefa.status].appendChild(card);

    // 🟢 Drag events
    card.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", tarefa.id);
      card.classList.add("dragging");
    });

    card.addEventListener("dragend", () => {
      card.classList.remove("dragging");
    });
  });

  // 🔁 Permitir soltura em colunas
  Object.values(colunas).forEach(coluna => {
    coluna.addEventListener("dragover", (e) => {
      e.preventDefault();
      coluna.classList.add("kanban-over");
    });

    coluna.addEventListener("dragleave", () => {
      coluna.classList.remove("kanban-over");
    });

    coluna.addEventListener("drop", (e) => {
      e.preventDefault();
      const id = e.dataTransfer.getData("text/plain");
      const card = document.querySelector(`[data-id="${id}"]`);
      if (card) {
        coluna.appendChild(card);
      }
      coluna.classList.remove("kanban-over");
    });
  });
});
