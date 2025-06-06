// ==========================================================================================
// 🔄 includes.js – Inclusão dinâmica de componentes HTML parciais (Agroverso)
// 🌱 Agora com suporte a reinicialização de scripts como menu-lateral.js após incluir HTML
// ==========================================================================================

document.addEventListener("DOMContentLoaded", () => {
  const elementos = document.querySelectorAll("[data-include]");

  const includesPromises = Array.from(elementos).map(async (elemento) => {
    const caminho = elemento.getAttribute("data-include");
    if (!caminho) return;

    try {
      const resposta = await fetch(caminho);
      if (!resposta.ok) throw new Error(`Erro ${resposta.status} – ${resposta.statusText}`);

      const conteudo = await resposta.text();
      elemento.innerHTML = conteudo;

      console.info(`[includes.js] ✅ Include carregado com sucesso: ${caminho}`);
    } catch (erro) {
      console.error(`[includes.js] ⚠️ Falha ao carregar: ${caminho}`, erro);
      elemento.innerHTML = `<!-- erro ao incluir ${caminho} -->`;
    }
  });

  // ✅ Após todos os includes, reexecutar o menu se necessário
  Promise.all(includesPromises).then(() => {
    if (typeof initMenuLateral === "function") {
      initMenuLateral();
      console.info("[includes.js] 🔁 Menu lateral reinicializado após include.");
    }
  });
});
