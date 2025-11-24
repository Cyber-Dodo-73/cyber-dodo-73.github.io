// Initialisation AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Menu Mobile Toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

menuBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.style.transform === 'translateX(0%)';
    
    if (isOpen) {
        mobileMenu.style.transform = 'translateX(100%)';
        menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    } else {
        mobileMenu.style.transform = 'translateX(0%)';
        menuBtn.innerHTML = '<i class="fa-solid fa-times"></i>';
    }
});

// Fermer le menu mobile au clic sur un lien
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.style.transform = 'translateX(100%)';
        menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
});

// Navbar transparente au scroll
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 15, 28, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 15, 28, 0.7)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Smooth Scroll pour les ancres
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
