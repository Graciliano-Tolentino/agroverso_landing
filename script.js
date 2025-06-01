// ===============================================
// 📜 script.js – Lógica de envio de orçamento Agroverso
// 🔒 Desenvolvido com sabedoria, força e beleza
// ===============================================

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('orcamento-form');

  if (!form) {
    console.error('⚠️ Formulário não encontrado na página.');
    return;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Coleta segura dos campos
    const nome = form.nome?.value.trim();
    const email = form.email?.value.trim();
    const produto = form.produto?.value;

    // Validação mínima
    if (!nome || !email || !produto) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Formatação refinada da mensagem
    const produtoLabel = {
      irrigacao: "Irrigação Inteligente",
      hidroponia: "Hidroponia Inteligente",
      energia: "Energia Solar Inteligente"
    };

    const nomeProduto = produtoLabel[produto] || "Produto desconhecido";

    const mensagem = `
      Olá, equipe Agroverso! 🌱

      Meu nome é *${nome}* e tenho interesse no produto: *${nomeProduto}*.

      Meu e-mail para contato é: *${email}*.

      Aguardo retorno com orçamento personalizado.
      
      Gratidão!
    `.trim();

    // Codificação e redirecionamento
    const url = `https://wa.me/5511963372373?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
  });
});

    // Limpeza do formulário após envio
    form.reset();

    // Feedback simples (pode evoluir para toast futuramente)
    alert('✅ Sua solicitação foi encaminhada via WhatsApp! Abriremos uma nova aba para o envio.');

    // Verificação de fallback (ambiente sem suporte ao window.open)
    if (!window || typeof window.open !== 'function') {
      console.warn('⚠️ Seu navegador pode não suportar abertura automática do WhatsApp.');
      location.href = url; // Redirecionamento forçado
    }
  });
});

