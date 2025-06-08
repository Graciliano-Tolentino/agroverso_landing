// ===========================================================================================
// 📜 scripts/carrossel.js — Carrossel Inteligente Agroverso (v12)
// 🌿 Múltiplas instâncias, acessibilidade total, animação, lazy loading e controle externo
// ===========================================================================================

(() => {
  document.addEventListener('DOMContentLoaded', () => {
    const carrosseis = document.querySelectorAll('.carrossel');

    if (!carrosseis.length) return;

    carrosseis.forEach((carrossel, indice) => {
      const slides = carrossel.querySelectorAll('img');
      if (slides.length <= 1) return;

      let indiceAtual = 0;
      const idCarrossel = carrossel.id || `carrossel-${indice}`;
      carrossel.id = idCarrossel;

      // 🔘 Criação dos botões
      const btnAnterior = document.createElement('button');
      btnAnterior.className = 'carrossel-controle carrossel-prev';
      btnAnterior.setAttribute('aria-label', 'Imagem anterior');
      btnAnterior.setAttribute('aria-controls', idCarrossel);
      btnAnterior.textContent = '‹';

      const btnProximo = document.createElement('button');
      btnProximo.className = 'carrossel-controle carrossel-next';
      btnProximo.setAttribute('aria-label', 'Próxima imagem');
      btnProximo.setAttribute('aria-controls', idCarrossel);
      btnProximo.textContent = '›';

      carrossel.append(btnAnterior, btnProximo);

      // 🎙️ Elemento oculto para leitores de tela (aria-live)
      const announcer = document.createElement('div');
      announcer.id = `announce-${idCarrossel}`;
      announcer.className = 'sr-only';
      announcer.setAttribute('aria-live', 'polite');
      carrossel.appendChild(announcer);

      // 🌀 Transição suave entre slides
      slides.forEach((slide) => {
        slide.classList.add('transicao');
        slide.setAttribute('loading', 'lazy');
      });

      // 🧠 Função principal de exibição
      const mostrarSlide = (indice) => {
        slides.forEach((slide, i) => {
          const ativo = i === indice;
          slide.classList.toggle('ativo', ativo);
          slide.classList.toggle('inativo', !ativo);
          slide.setAttribute('aria-hidden', !ativo);
          slide.setAttribute('tabindex', ativo ? '0' : '-1');
          slide.setAttribute('role', 'tabpanel');
          slide.setAttribute('aria-label', `Slide ${i + 1} de ${slides.length}`);
          slide.style.display = ativo ? 'block' : 'none';
        });

        const announcerEl = document.getElementById(`announce-${idCarrossel}`);
        if (announcerEl) announcerEl.textContent = `Slide ${indice + 1} de ${slides.length}`;
        slides[indice]?.focus?.();
      };

      // 🔁 Eventos de navegação
      btnAnterior.addEventListener('click', () => {
        indiceAtual = (indiceAtual - 1 + slides.length) % slides.length;
        mostrarSlide(indiceAtual);
      });

      btnProximo.addEventListener('click', () => {
        indiceAtual = (indiceAtual + 1) % slides.length;
        mostrarSlide(indiceAtual);
      });

      mostrarSlide(indiceAtual);

      // 📲 Suporte a swipe (mobile)
      let touchStartX = 0;
      let touchEndX = 0;

      carrossel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      });

      carrossel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchEndX < touchStartX - 30) btnProximo.click();
        if (touchEndX > touchStartX + 30) btnAnterior.click();
      });
    });
  });
})();

// ===========================================================================================
// 🖥️ Modo fullscreen — Galeria Expandida Agroverso (v12)
// 🔐 Animação, acessibilidade total, teclado, reversibilidade e foco restaurado
// ===========================================================================================

(() => {
  let carrosselAtivo = null;
  let focoAnterior = null;

  window.abrirCarrosselFullscreen = function (container) {
    const carrossel = container.querySelector('.carrossel');
    if (!carrossel || carrossel.classList.contains('fullscreen')) return;

    focoAnterior = document.activeElement;
    carrossel.classList.add('fullscreen', 'transicao');

    // 🔀 Força reflow para garantir transição
    void carrossel.offsetWidth;

    requestAnimationFrame(() => {
      carrossel.classList.add('ativo');
    });

    carrosselAtivo = carrossel;

    const botaoFechar = document.getElementById('fecharFullscreen');
    if (botaoFechar) {
      botaoFechar.hidden = false;
      botaoFechar.setAttribute('aria-hidden', 'false');
      setTimeout(() => botaoFechar.focus(), 150);
    }

    document.body.style.overflow = 'hidden';
  };

  window.fecharCarrosselFullscreen = function () {
    if (!carrosselAtivo) return;

    const carrossel = carrosselAtivo;
    carrossel.classList.remove('ativo');

    setTimeout(() => {
      carrossel.classList.remove('fullscreen');
      carrosselAtivo = null;

      const botaoFechar = document.getElementById('fecharFullscreen');
      if (botaoFechar) {
        botaoFechar.hidden = true;
        botaoFechar.setAttribute('aria-hidden', 'true');
      }

      document.body.style.overflow = '';
      focoAnterior?.focus?.();
    }, 250); // Tempo igual à duração da transição
  };

  // 🎹 Navegação por teclado no modo fullscreen
  document.addEventListener('keydown', (event) => {
    if (!carrosselAtivo) return;

    switch (event.key) {
      case 'Escape':
        fecharCarrosselFullscreen();
        break;
      case 'ArrowRight':
        carrosselAtivo.querySelector('.carrossel-next')?.click();
        break;
      case 'ArrowLeft':
        carrosselAtivo.querySelector('.carrossel-prev')?.click();
        break;
    }
  });
})();

// ===========================================================================================
// 🔁 API Pública – Controle Programático de Carrosseis Agroverso
// 🧩 Ideal para CMSs, integrações com frameworks ou automação frontend
// ===========================================================================================

window.AgroversoCarrossel = {
  next(id) {
    document.querySelector(`#${id} .carrossel-next`)?.click();
  },
  prev(id) {
    document.querySelector(`#${id} .carrossel-prev`)?.click();
  },
  goTo(id, index) {
    const carrossel = document.getElementById(id);
    if (!carrossel) return;

    const slides = carrossel.querySelectorAll('img');
    if (!slides.length || index < 0 || index >= slides.length) return;

    const btnAnterior = carrossel.querySelector('.carrossel-prev');
    const btnProximo = carrossel.querySelector('.carrossel-next');

    let contador = 0;
    const intervalo = setInterval(() => {
      const atual = Array.from(slides).findIndex((el) => el.classList.contains('ativo'));
      if (atual === index) return clearInterval(intervalo);

      if (index > atual) btnProximo?.click();
      else btnAnterior?.click();

      if (++contador > slides.length * 2) clearInterval(intervalo); // trava de segurança
    }, 100);
  },
  openFullscreen(id) {
    const container = document.querySelector(`#${id}`)?.closest('.carrossel-container');
    if (container) abrirCarrosselFullscreen(container);
  },
  closeFullscreen() {
    fecharCarrosselFullscreen();
  }
};
