// =======================================================================================
// 📂 menu-lateral.js – Comportamento do menu lateral Agroverso
// 🧠 Compatível com includes.js e carregamento dinâmico do menu hamburguer
// =======================================================================================

function initMenuLateral() {
  const botaoToggle = document.querySelector(".menu-toggle");
  const menuLateral = document.getElementById("menuLateral");

  if (!botaoToggle || !menuLateral) return;

  const classeAtivo = "menu-lateral-ativo";

  const abrirMenu = () => {
    menuLateral.classList.add(classeAtivo);
    botaoToggle.setAttribute("aria-expanded", "true");
    menuLateral.setAttribute("aria-hidden", "false");
    menuLateral.focus();
  };

  const fecharMenu = () => {
    menuLateral.classList.remove(classeAtivo);
    botaoToggle.setAttribute("aria-expanded", "false");
    menuLateral.setAttribute("aria-hidden", "true");
    botaoToggle.focus();
  };

  const alternarMenu = () => {
    const estaAberto = menuLateral.classList.contains(classeAtivo);
    estaAberto ? fecharMenu() : abrirMenu();
  };

  botaoToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    alternarMenu();
  });

  document.addEventListener("click", (e) => {
    const clicouFora = !menuLateral.contains(e.target) && !botaoToggle.contains(e.target);
    if (menuLateral.classList.contains(classeAtivo) && clicouFora) {
      fecharMenu();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menuLateral.classList.contains(classeAtivo)) {
      fecharMenu();
    }
  });
}
