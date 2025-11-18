// main.js

document.addEventListener('DOMContentLoaded', () => {
  // === MENU RESPONSIVO ===
  const nav = document.querySelector('nav');
  const container = document.querySelector('.site-header .container');

  // Cria o botão hambúrguer
  const toggle = document.createElement('button');
  toggle.classList.add('menu-toggle');
  toggle.setAttribute('aria-label', 'Abrir menu');
  toggle.innerHTML = '☰';
  container.prepend(toggle);

  // Abre/fecha menu principal no mobile
  toggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', !expanded);
  });

  // Submenu no mobile
  const submenuParents = document.querySelectorAll('.has-submenu > a');
  submenuParents.forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        link.parentElement.classList.toggle('open');
      }
    });
  });

  // === FORMULÁRIO DE CADASTRO ===
  const cpfInput = document.getElementById('cpf');
  const telefoneInput = document.getElementById('telefone');
  const cepInput = document.getElementById('cep');
  const form = document.getElementById('cadastroForm');
  const messages = document.getElementById('formMessages');

  function setCaretToEnd(el) {
    if (typeof el.selectionStart === "number") {
      el.selectionStart = el.selectionEnd = el.value.length;
    }
  }

  function maskCPF(value) {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1-$2')
      .slice(0, 14);
  }

  function maskPhone(value) {
    value = value.replace(/\D/g, '');
    if (value.length > 10) {
      return value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3').slice(0, 15);
    }
    return value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3').slice(0, 14);
  }

  function maskCEP(value) {
    return value.replace(/\D/g, '').replace(/^(\d{5})(\d)/, '$1-$2').slice(0, 9);
  }

  // Aplica máscaras dinamicamente
  if (cpfInput) {
    cpfInput.addEventListener('input', function () {
      this.value = maskCPF(this.value);
      setCaretToEnd(this);
    });
  }

  if (telefoneInput) {
    telefoneInput.addEventListener('input', function () {
      this.value = maskPhone(this.value);
      setCaretToEnd(this);
    });
  }

  if (cepInput) {
    cepInput.addEventListener('input', function () {
      this.value = maskCEP(this.value);
      setCaretToEnd(this);
    });
  }

  // === VALIDAÇÃO DO FORMULÁRIO ===
  if (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      messages.textContent = '';
      messages.className = ''; // limpa classe anterior

      if (!form.checkValidity()) {
        const invalid = form.querySelectorAll(':invalid');
        const first = invalid[0];
        first.focus();
        messages.textContent = 'Por favor, corrija os campos destacados antes de enviar.';
        messages.className = 'error';
        return;
      }

      messages.textContent = 'Cadastro enviado com sucesso (simulação).';
      messages.className = 'success';
      form.reset();
    });
  }
});
