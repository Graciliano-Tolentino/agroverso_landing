// ===========================================================================================
// 📜 scripts/carrossel.js — Carrossel Inteligente Agroverso
// 🌱 Transição automática, acessibilidade refinada, experiência regenerativa completa
// ===========================================================================================

(() => {
  document.addEventListener('DOMContentLoaded', () => {
    const carrosseis = document.querySelectorAll('.carrossel');

    if (!carrosseis.length) return;

    carrosseis.forEach((carrossel, indice) => {
      const slides = carrossel.querySelectorAll('img');
      if (slides.length <= 1) return;

      let indiceAtual = 0;
      const idCarrossel = `carrossel-${indice}`;
      let intervaloAuto = null;

      // 🔖 Garante ID exclusivo
      if (!carrossel.id) carrossel.id = idCarrossel;

      // ========================================================================
      // Parte 2 será enviada a seguir: geração dinâmica de botões com acessibilidade
      // ========================================================================

      // 🎛️ Botão "Anterior"
      const btnAnterior = document.createElement('button');
      btnAnterior.className = 'carrossel-controle carrossel-prev';
      btnAnterior.setAttribute('aria-label', 'Imagem anterior');
      btnAnterior.setAttribute('aria-controls', idCarrossel);
      btnAnterior.textContent = '‹';

      // 🎛️ Botão "Próximo"
      const btnProximo = document.createElement('button');
      btnProximo.className = 'carrossel-controle carrossel-next';
      btnProximo.setAttribute('aria-label', 'Próxima imagem');
      btnProximo.setAttribute('aria-controls', idCarrossel);
      btnProximo.textContent = '›';

      // 📎 Inserção dos controles no DOM
      carrossel.append(btnAnterior, btnProximo);

      // 🧠 Função para mostrar o slide atual com acessibilidade e beleza
      function mostrarSlide(indice) {
        slides.forEach((slide, i) => {
          const estaAtivo = i === indice;
          slide.classList.toggle('ativo', estaAtivo);
          slide.style.display = estaAtivo ? 'block' : 'none';
          slide.setAttribute('aria-hidden', !estaAtivo);
          slide.setAttribute('tabindex', estaAtivo ? '0' : '-1');
          slide.setAttribute('role', 'tabpanel');
          slide.setAttribute('aria-label', `Slide ${i + 1} de ${slides.length}`);
        });

        // 🔍 Move o foco para o slide atual se possível
        slides[indice]?.focus?.();
      }
