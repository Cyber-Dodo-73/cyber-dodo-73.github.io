// Init AOS (Animations on Scroll)
AOS.init({
    duration: 800,
    once: true,
    offset: 50
});

// Menu Mobile Toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');
const menuIcon = menuBtn.querySelector('i');

// Ouvrir/Fermer le menu
menuBtn.addEventListener('click', () => {
    const isClosed = mobileMenu.classList.contains('translate-x-full');
    
    if (isClosed) {
        mobileMenu.classList.remove('translate-x-full');
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-xmark');
        document.body.style.overflow = 'hidden'; // Empêche le scroll
    } else {
        mobileMenu.classList.add('translate-x-full');
        menuIcon.classList.remove('fa-xmark');
        menuIcon.classList.add('fa-bars');
        document.body.style.overflow = 'auto';
    }
});

// Fermer le menu quand on clique sur un lien
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('translate-x-full');
        menuIcon.classList.remove('fa-xmark');
        menuIcon.classList.add('fa-bars');
        document.body.style.overflow = 'auto';
    });
});

// Navbar effet verre au scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-lg');
        navbar.style.background = 'rgba(10, 15, 28, 0.95)';
    } else {
        navbar.classList.remove('shadow-lg');
        navbar.style.background = 'rgba(10, 15, 28, 0.7)';
    }
});
