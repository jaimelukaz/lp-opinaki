// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navMobile = document.getElementById('navMobile');

menuToggle?.addEventListener('click', () => {
    navMobile.classList.toggle('open');
});

navMobile?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navMobile.classList.remove('open'));
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-desktop .nav-link');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
        }
    });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach((section) => observer.observe(section));

// Signup form
const SHEETS_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwVAjcSGEujE0C03WapdzhhKi7otuKW2VbwKb1ls7PFdNAE0hzPei2lPSCk6wzGT0fSPQ/exec';
const REDIRECT_URL = 'https://opinaki.com';

const form = document.getElementById('signupForm');
const feedback = document.getElementById('formFeedback');

form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    feedback.classList.remove('error');

    const data = Object.fromEntries(new FormData(form));

    if (!data.nome.trim() || !data.numero.trim() || !data.email.trim()) {
        feedback.textContent = 'Preencha todos os campos para continuar.';
        feedback.classList.add('error');
        return;
    }

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
    if (!emailValid) {
        feedback.textContent = 'Informe um e-mail válido.';
        feedback.classList.add('error');
        return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalLabel = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';
    feedback.textContent = '';

    try {
        await fetch(SHEETS_ENDPOINT, {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify(data),
        });

        feedback.textContent = 'Tudo certo! Redirecionando...';
        form.reset();
        setTimeout(() => {
            window.location.href = REDIRECT_URL;
        }, 800);
    } catch (error) {
        feedback.textContent = 'Não foi possível enviar agora. Tente novamente.';
        feedback.classList.add('error');
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
    }
});
