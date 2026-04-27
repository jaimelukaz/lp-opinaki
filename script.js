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
const form = document.getElementById('signupForm');
const feedback = document.getElementById('formFeedback');

form?.addEventListener('submit', (event) => {
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

    feedback.textContent = 'Tudo certo! Em breve você recebe seu convite.';
    form.reset();
});
