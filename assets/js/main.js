/**
 * iGreen Telecom - Landing Page de Portabilidade
 * Lógica de Conversão, Máscaras, WhatsApp & Interações
 */

// ==========================================================================
// CONFIGURAÇÃO DO WHATSAPP DO LICENCIADO / ATENDIMENTO
// ==========================================================================
// Você pode alterar o número padrão abaixo (com 55 + DDD + 9 dígitos sem espaços/traços)
// OU passar na URL do anúncio: exemplo.com.br/?tel=5511999999999
const CONFIG = {
  DEFAULT_WHATSAPP: '553598754516', // Número de WhatsApp do Licenciado
  VIDEO_URL: 'https://imagenscarregadas.cloudmindsapp.com/wp-content/uploads/2026/09/videoplayback.mp4',
  VIDEO_LOCAL: 'assets/images/videoplayback.mp4'
};

document.addEventListener('DOMContentLoaded', () => {
  initUrlParams();
  initFormMasks();
  initCepLookup();
  initFormSubmit();
  initVideoPlayer();
  initFaqAccordion();
  initStickyCta();
  initModals();
});

// 1. Obter número de WhatsApp pela URL (ideal para múltiplos afiliados/licenciados)
function getTargetWhatsAppNumber() {
  const urlParams = new URLSearchParams(window.location.search);
  const paramNumber = urlParams.get('tel') || urlParams.get('whatsapp') || urlParams.get('wa') || urlParams.get('ref');
  
  if (paramNumber) {
    // Limpar tudo que não for dígito
    const cleaned = paramNumber.replace(/\D/g, '');
    if (cleaned.length >= 10) {
      // Se não tiver 55 no início, adiciona
      return cleaned.startsWith('55') ? cleaned : '55' + cleaned;
    }
  }
  return CONFIG.DEFAULT_WHATSAPP;
}

function initUrlParams() {
  const activeWa = getTargetWhatsAppNumber();
  const badgeElement = document.getElementById('whatsapp-config-indicator');
  if (badgeElement && window.location.search.includes('tel=')) {
    badgeElement.textContent = `Atendimento Licenciado: +${activeWa}`;
    badgeElement.classList.remove('hidden');
  }
}

// 2. Máscaras de Telefone e CEP
function formatPhone(value) {
  let cleaned = value.replace(/\D/g, '');
  if (cleaned.length > 11) cleaned = cleaned.slice(0, 11);

  if (cleaned.length <= 2) {
    return cleaned.length ? `(${cleaned}` : '';
  } else if (cleaned.length <= 6) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
  } else if (cleaned.length <= 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
  } else {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
  }
}

function formatCep(value) {
  let cleaned = value.replace(/\D/g, '');
  if (cleaned.length > 8) cleaned = cleaned.slice(0, 8);

  if (cleaned.length <= 5) {
    return cleaned;
  } else {
    return `${cleaned.slice(0, 5)}-${cleaned.slice(5, 8)}`;
  }
}

function initFormMasks() {
  const portNumberInput = document.getElementById('field-port-number');
  const cepInput = document.getElementById('field-cep');

  if (portNumberInput) {
    portNumberInput.addEventListener('input', (e) => {
      e.target.value = formatPhone(e.target.value);
    });
  }

  if (cepInput) {
    cepInput.addEventListener('input', (e) => {
      e.target.value = formatCep(e.target.value);
    });
  }
}

// 3. Busca automática do CEP via ViaCEP
let cepAddressInfo = '';
function initCepLookup() {
  const cepInput = document.getElementById('field-cep');
  const cepInfoContainer = document.getElementById('cep-address-preview');

  if (!cepInput || !cepInfoContainer) return;

  cepInput.addEventListener('keyup', async () => {
    const rawCep = cepInput.value.replace(/\D/g, '');
    if (rawCep.length === 8) {
      cepInfoContainer.innerHTML = `
        <span class="inline-flex items-center text-xs text-gray-400">
          <svg class="animate-spin -ml-1 mr-2 h-3.5 w-3.5 text-[#00E676]" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          Buscando localidade...
        </span>`;
      cepInfoContainer.classList.remove('hidden');

      try {
        const response = await fetch(`https://viacep.com.br/ws/${rawCep}/json/`);
        const data = await response.json();

        if (data.erro) {
          cepInfoContainer.innerHTML = `<span class="text-xs text-amber-400">CEP não encontrado, mas seu pedido será aceito!</span>`;
          cepAddressInfo = '';
        } else {
          cepAddressInfo = `${data.localidade}/${data.uf}`;
          cepInfoContainer.innerHTML = `
            <span class="inline-flex items-center gap-1.5 text-xs text-[#00E676] bg-[#00E676]/10 px-2 py-0.5 rounded border border-[#00E676]/30">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              ${data.bairro ? data.bairro + ' - ' : ''}${data.localidade} - ${data.uf}
            </span>`;
        }
      } catch (err) {
        cepInfoContainer.innerHTML = '';
        cepAddressInfo = '';
      }
    } else {
      cepInfoContainer.classList.add('hidden');
      cepInfoContainer.innerHTML = '';
      cepAddressInfo = '';
    }
  });
}

// 4. Envio do Formulário e Abertura do WhatsApp
function initFormSubmit() {
  const form = document.getElementById('form-portabilidade');
  const submitBtn = document.getElementById('btn-submit-port');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('field-name').value.trim();
    const portNumber = document.getElementById('field-port-number').value.trim();
    const operator = document.getElementById('field-operator').value.trim();
    const chipTypeRadio = document.querySelector('input[name="chip_type"]:checked');
    const chipType = chipTypeRadio ? chipTypeRadio.value : 'Chip físico';
    const cep = document.getElementById('field-cep').value.trim();

    // Validação básica
    if (!name || !portNumber || !operator || !cep) {
      alert('Por favor, preencha todos os campos obrigatórios para prosseguir com sua portabilidade.');
      return;
    }

    if (portNumber.replace(/\D/g, '').length < 10) {
      alert('Por favor, digite o número que deseja manter com DDD.');
      document.getElementById('field-port-number').focus();
      return;
    }

    // Efeito visual de carregamento no botão
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <span class="inline-flex items-center gap-2">
        <svg class="animate-spin h-5 w-5 text-[#031A0D]" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
        Gerando Solicitação e Abrindo WhatsApp...
      </span>`;
    submitBtn.disabled = true;

    // Mensagem formatada para o WhatsApp
    const fullCepText = cepAddressInfo ? `${cep} (${cepAddressInfo})` : cep;
    const message = 
`Olá, quero fazer minha portabilidade.

Nome: ${name}
Número atual: ${portNumber}
Operadora atual: ${operator}
Tipo de chip: ${chipType}
CEP: ${fullCepText}

Aguardo a confirmação para concluir minha ativação.`;

    const targetNumber = getTargetWhatsAppNumber();
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${targetNumber}?text=${encodedMessage}`;

    // Disparar evento se existir Meta Pixel / GTM
    if (typeof fbq === 'function') {
      fbq('track', 'Lead', {
        content_name: 'Portabilidade iGreen',
        chip_type: chipType,
        operator: operator
      });
    }

    // Redirecionamento após micro delay para garantir transição suave
    setTimeout(() => {
      window.open(whatsappUrl, '_blank') || (window.location.href = whatsappUrl);
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
    }, 600);
  });
}

// 6. Player de Vídeo (VSL Márcio Garcia)
function initVideoPlayer() {
  const videoWrapper = document.getElementById('video-vsl-container');
  const playBtn = document.getElementById('btn-play-vsl');

  if (!videoWrapper) return;

  const playVideo = () => {
    videoWrapper.innerHTML = `
      <video 
        class="w-full h-full rounded-2xl aspect-9-16 aspect-[9/16] object-cover shadow-2xl"
        controls 
        autoplay 
        playsinline
        preload="auto"
      >
        <source src="${CONFIG.VIDEO_URL}" type="video/mp4">
        <source src="${CONFIG.VIDEO_LOCAL}" type="video/mp4">
        Seu navegador não suporta a reprodução deste vídeo.
      </video>`;
    const video = videoWrapper.querySelector('video');
    if (video) {
      video.play().catch(() => {});
    }
  };

  if (playBtn) {
    playBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      playVideo();
    });
  }
  videoWrapper.addEventListener('click', playVideo);
}

// 7. FAQ Accordion
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const isOpen = !answer.classList.contains('hidden');

      // Fechar outros
      faqItems.forEach(other => {
        const otherAnswer = other.querySelector('.faq-answer');
        const otherIcon = other.querySelector('.faq-icon');
        if (otherAnswer && otherAnswer !== answer) {
          otherAnswer.classList.add('hidden');
          if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
        }
      });

      if (isOpen) {
        answer.classList.add('hidden');
        if (icon) icon.style.transform = 'rotate(0deg)';
      } else {
        answer.classList.remove('hidden');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });
}

// 8. Sticky CTA no Mobile
function initStickyCta() {
  const stickyBar = document.getElementById('mobile-sticky-bar');
  const heroSection = document.getElementById('hero');
  const formSection = document.getElementById('formulario');

  if (!stickyBar || !heroSection || !formSection) return;

  const handleScroll = () => {
    const heroBottom = heroSection.getBoundingClientRect().bottom;
    const formRect = formSection.getBoundingClientRect();

    // Mostrar sticky se rolou além da hero e não está dentro do próprio formulário
    const isPastHero = heroBottom < 100;
    const isInsideForm = formRect.top < window.innerHeight && formRect.bottom > 100;

    if (isPastHero && !isInsideForm) {
      stickyBar.classList.remove('translate-y-full', 'opacity-0');
      stickyBar.classList.add('translate-y-0', 'opacity-100');
    } else {
      stickyBar.classList.add('translate-y-full', 'opacity-0');
      stickyBar.classList.remove('translate-y-0', 'opacity-100');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
}


// 10. Modais de Termos e Privacidade
function initModals() {
  const modalPrivacy = document.getElementById('modal-privacy');
  const modalTerms = document.getElementById('modal-terms');

  window.openModal = function(id) {
    const el = document.getElementById(id);
    if (el) {
      el.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeModal = function(id) {
    const el = document.getElementById(id);
    if (el) {
      el.classList.add('hidden');
      document.body.style.overflow = '';
    }
  };

  // Fechar ao clicar fora
  [modalPrivacy, modalTerms].forEach(modal => {
    if (!modal) return;
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
      }
    });
  });
}

