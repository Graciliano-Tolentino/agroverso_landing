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

      // 🎛️ Botão Anterior
      const btnPrev = document.createElement('button');
      btnPrev.className = 'carrossel-prev';
      btnPrev.setAttribute('type', 'button');
      btnPrev.setAttribute('aria-label', 'Imagem anterior');
      btnPrev.setAttribute('aria-controls', idBase);
      btnPrev.setAttribute('tabindex', '0');
      btnPrev.id = `${idBase}-prev`;
      btnPrev.innerText = '‹';

      // 🎛️ Botão Próximo
      const btnNext = document.createElement('button');
      btnNext.className = 'carrossel-next';
      btnNext.setAttribute('type', 'button');
      btnNext.setAttribute('aria-label', 'Próxima imagem');
      btnNext.setAttribute('aria-controls', idBase);
      btnNext.setAttribute('tabindex', '0');
      btnNext.id = `${idBase}-next`;
      btnNext.innerText = '›';

      // 🎯 Inserir botões no DOM
      carrossel.appendChild(btnPrev);
      carrossel.appendChild(btnNext);

      // 🆔 Definir ID no container se ainda não existir
      if (!carrossel.id) {
        carrossel.id = idBase;
      }

      // 🧠 Atualiza visibilidade, acessibilidade e foco semântico
      function mostrarSlide(index) {
        slides.forEach((slide, i) => {
          const ativo = i === index;
          slide.classList.toggle('ativo', ativo);
          slide.setAttribute('aria-hidden', !ativo);
          slide.setAttribute('tabindex', ativo ? '0' : '-1');

          // Atualiza papel para leitores de tela
          slide.setAttribute('role', 'tabpanel');
          slide.setAttribute('aria-label', `Slide ${i + 1} de ${slides.length}`);
        });

        // 🧭 Atualiza o foco acessível se o slide estiver visível
        slides[index].focus?.();
      }

      // 🔁 Avançar e retroceder
      function proximoSlide() {
        indexAtual = (indexAtual + 1) % slides.length;
        mostrarSlide(indexAtual);
      }

      function slideAnterior() {
        indexAtual = (indexAtual - 1 + slides.length) % slides.length;
        mostrarSlide(indexAtual);
      }

      // 🖱️ Eventos dos botões
      btnNext.addEventListener('click', proximoSlide);
      btnPrev.addEventListener('click', slideAnterior);

      // ⏱️ Rotação automática com pausa ao interagir
      let intervalo = setInterval(proximoSlide, 5000);

      const pausar = () => clearInterval(intervalo);
      const retomar = () => intervalo = setInterval(proximoSlide, 5000);

      [btnPrev, btnNext, ...slides].forEach(el => {
        el.addEventListener('mouseenter', pausar);
        el.addEventListener('mouseleave', retomar);
        el.addEventListener('focusin', pausar);
        el.addEventListener('focusout', retomar);
      });

      // 🚀 Inicialização do primeiro slide
      mostrarSlide(indexAtual);
    });
  });
})();
