// scripts/carrossel.js
// 🌿 Agroverso | Carrossel regenerativo com sabedoria, força e beleza

(() => {
  document.addEventListener('DOMContentLoaded', () => {
    const carrosseis = document.querySelectorAll('.carrossel');

    if (!carrosseis.length) return;

    carrosseis.forEach((carrossel, carrosselIndex) => {
      const slides = carrossel.querySelectorAll('img');
      if (slides.length <= 1) return;

      let indexAtual = 0;
      const idBase = `carrossel-${carrosselIndex}`;
      let intervalo; // Para controle refinado da rotação automática

      // 🎛️ Botão Anterior
      const btnPrev = document.createElement('button');
      btnPrev.className = 'carrossel-prev';
      btnPrev.setAttribute('aria-label', 'Imagem anterior');
      btnPrev.setAttribute('aria-controls', idBase);
      btnPrev.innerText = '‹';

      // 🎛️ Botão Próximo
      const btnNext = document.createElement('button');
      btnNext.className = 'carrossel-next';
      btnNext.setAttribute('aria-label', 'Próxima imagem');
      btnNext.setAttribute('aria-controls', idBase);
      btnNext.innerText = '›';

      // 📎 Inserir botões e definir ID do carrossel
      carrossel.append(btnPrev, btnNext);
      if (!carrossel.id) {
        carrossel.id = idBase;
      }

      // 🧠 Atualiza visibilidade e acessibilidade
      function mostrarSlide(index) {
        slides.forEach((slide, i) => {
          const ativo = i === index;
          slide.classList.toggle('ativo', ativo);
          slide.setAttribute('aria-hidden', !ativo);
          slide.setAttribute('tabindex', ativo ? '0' : '-1');
          slide.setAttribute('role', 'tabpanel');
          slide.setAttribute('aria-label', `Slide ${i + 1} de ${slides.length}`);
        });

        // 🧭 Foco para acessibilidade
        slides[index].focus?.();
      }

      // 🔁 Funções de navegação
      function proximoSlide() {
        indexAtual = (indexAtual + 1) % slides.length;
        mostrarSlide(indexAtual);
      }

      function slideAnterior() {
        indexAtual = (indexAtual - 1 + slides.length) % slides.length;
        mostrarSlide(indexAtual);
      }

      // 🖱️ Controles por clique
      btnNext.addEventListener('click', proximoSlide);
      btnPrev.addEventListener('click', slideAnterior);

      // ⌨️ Acessibilidade por teclado (setas ← →)
      carrossel.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
          proximoSlide();
        } else if (event.key === 'ArrowLeft') {
          slideAnterior();
        }
      });

      // ⏱️ Controle de rotação automática com inteligência
      function iniciarRotacao() {
        if (!intervalo) {
          intervalo = setInterval(proximoSlide, 5000);
        }
      }

      function pausarRotacao() {
        clearInterval(intervalo);
        intervalo = null;
      }

      // 🛡️ Pausar em foco ou interação do usuário
      [btnPrev, btnNext, ...slides].forEach(el => {
        el.addEventListener('mouseenter', pausarRotacao);
        el.addEventListener('mouseleave', iniciarRotacao);
        el.addEventListener('focusin', pausarRotacao);
        el.addEventListener('focusout', iniciarRotacao);
      });

      // 🚀 Inicializa carrossel ao carregar a página
      mostrarSlide(indexAtual);
      iniciarRotacao();
    });
  });
})();
