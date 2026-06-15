// ---------- Intersection Observer for scroll reveal animations ----------
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2, rootMargin: "0px 0px -30px 0px" });
sections.forEach(sec => observer.observe(sec));

// navbar background on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    // active link highlight by scrollspy
    let scrollPos = window.scrollY + 120;
    document.querySelectorAll('.nav-link').forEach(link => {
        let targetId = link.getAttribute('href').substring(1);
        let targetEl = document.getElementById(targetId);
        if (targetEl) {
            let offsetTop = targetEl.offsetTop;
            let offsetBottom = offsetTop + targetEl.offsetHeight;
            if (scrollPos >= offsetTop && scrollPos < offsetBottom) {
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
});

// mobile menu toggle
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// form submission alert (demo)
const form = document.getElementById('requestForm');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    if(!name || !phone) {
        alert('Пожалуйста, заполните имя и телефон для связи');
        return;
    }
    alert(`Спасибо, ${name}! Мы свяжемся с вами по номеру ${phone} в ближайшее время.`);
    form.reset();
});

// ---------- dynamic floating particles animation (modern effect) ----------
function createParticles() {
    const container = document.getElementById('particlesContainer');
    if(!container) return;
    container.innerHTML = '';
    const particleCount = 35;
    for(let i=0; i<particleCount; i++) {
        let particle = document.createElement('div');
        particle.classList.add('particle');
        let size = Math.random() * 8 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = Math.random() * 8 + 8 + 's';
        particle.style.background = `rgba(211, 63, 43, ${Math.random() * 0.5 + 0.2})`;
        container.appendChild(particle);
    }
}
createParticles();

// For numbers increment effect on stats when in view
const statNumbers = document.querySelectorAll('.stat-number');
let counted = false;
const statsObserver = new IntersectionObserver((entries) => {
    if(entries[0].isIntersecting && !counted) {
        counted = true;
        statNumbers.forEach(el => {
            let finalText = el.innerText;
            let finalVal = parseInt(finalText);
            if(isNaN(finalVal)) return;
            let start = 0;
            let duration = 1000;
            let step = Math.ceil(finalVal / (duration / 30));
            let interval = setInterval(() => {
                start += step;
                if(start >= finalVal) {
                    el.innerText = finalText;
                    clearInterval(interval);
                } else {
                    el.innerText = start + '+';
                }
            }, 30);
        });
    }
}, { threshold: 0.4 });
const heroStatsBlock = document.querySelector('.hero-stats');
if(heroStatsBlock) statsObserver.observe(heroStatsBlock);

// Небольшая доработка: если видео не загружается
const heroVideo = document.querySelector('.hero-video');
if(heroVideo) {
    heroVideo.addEventListener('error', () => {
        console.log('Видео не загрузилось, но оверлей и градиент остаются активными');
    });
}