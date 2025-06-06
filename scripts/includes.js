// ==========================================================================================
// 🔄 includes.js – Inclusão dinâmica de componentes HTML parciais (Agroverso)
// 🌱 Carrega automaticamente estruturas como menu.html, footer.html, etc.
// ==========================================================================================

document.addEventListener("DOMContentLoaded", () => {
  const elementos = document.querySelectorAll("[data-include]");

  elementos.forEach(async (elemento) => {
    const caminho = elemento.getAttribute("data-include");
    if (!caminho) return;

    try {
      const resposta = await fetch(caminho);

      if (!resposta.ok) {
        throw new Error(`Erro ${resposta.status} – ${resposta.statusText}`);
      }

      const conteudo = await resposta.text();
      elemento.innerHTML = conteudo;

      console.info(`[includes.js] ✅ Include carregado com sucesso: ${caminho}`);
    } catch (erro) {
      console.error(`[includes.js] ⚠️ Falha ao carregar: ${caminho}`, erro);
      elemento.innerHTML = `<!-- erro ao incluir ${caminho} -->`;
    }
  });
});
