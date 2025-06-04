// scripts/utils.js
// 🌱 Agroverso | Utilitários universais com sabedoria, força e beleza

const AgroUtils = (() => {
  'use strict';

  // 📧 Validação básica de e-mail
  const validarEmail = (email = '') => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email.trim());
  };

  // 🧾 Valida campo de nome (mínimo 2 caracteres, sem números)
  const validarNome = (nome = '') => {
    return /^[a-zA-ZÀ-ú\s]{2,}$/.test(nome.trim());
  };

  // 🎯 Verifica se valor não está vazio ou nulo
  const naoVazio = (valor = '') => {
    return String(valor).trim() !== '';
  };

  // 🔔 Alerta acessível com fallback para alert()
  const exibirAlerta = (mensagem = 'Mensagem não definida', tipo = 'info') => {
    if (typeof Toastify !== 'undefined') {
      Toastify({
        text: mensagem,
        duration: 5000,
        gravity: 'top',
        position: 'center',
        backgroundColor: tipo === 'erro' ? '#d92f2f' : '#004225',
        stopOnFocus: true
      }).showToast();
    } else {
      alert(mensagem);
    }
  };

  // ✨ Capitaliza nomes próprios (ex: joão da silva → João da Silva)
  const formatarNome = (nome = '') => {
    return nome
      .toLowerCase()
      .split(' ')
      .map(palavra =>
        ['da', 'de', 'do', 'dos', 'das'].includes(palavra)
          ? palavra
          : palavra.charAt(0).toUpperCase() + palavra.slice(1)
      )
      .join(' ');
  };

  // 🧠 Exporta funções úteis em um objeto único
  return {
    validarEmail,
    validarNome,
    naoVazio,
    exibirAlerta,
    formatarNome
  };
})();
