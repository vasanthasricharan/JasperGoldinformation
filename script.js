function navigateTo(id) {
    // 1. Hide the dots background
    document.body.classList.add('dots-hidden');

    document.documentElement.style.scrollSnapType = 'none';
    document.getElementById('main-view').style.display = 'none';

    const allPages = document.querySelectorAll('.page');
    allPages.forEach(p => p.style.display = 'none');

    const target = document.getElementById('page-' + id);
    if (target) {
        target.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'instant' });
    }
}

function goHome() {
    // 2. Show the dots background again
    document.body.classList.remove('dots-hidden');

    const allPages = document.querySelectorAll('.page');
    allPages.forEach(p => p.style.display = 'none');

    document.getElementById('main-view').style.display = 'block';
    document.documentElement.style.scrollSnapType = 'y mandatory';

    const gridSection = document.querySelector('.grid-section');
    if (gridSection) {
        gridSection.scrollIntoView({ behavior: 'instant' });
    }
}

// Handle Escape key to return home
window.addEventListener('keydown', (e) => {
    if (e.key === "Escape") goHome();
});

// HERO BACKGROUND ANIMATION
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 60;

function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        ctx.fillStyle = 'rgba(0, 242, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function createParticles() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', initCanvas);
initCanvas();
createParticles();
animate();

// SECTION REVEAL OBSERVER
const observerOptions = {
    threshold: 0.2 // Trigger when 20% of the section is visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Only apply to sections that are NOT inside a sub-page
        if (entry.isIntersecting && !entry.target.closest('.page')) {
            entry.target.classList.add('is-visible');
        }
    });
}, observerOptions);

// Target all snap sections
document.querySelectorAll('.snap-section').forEach(section => {
    observer.observe(section);
});

// Update navigateTo to handle visibility for sub-pages
const originalNavigateTo = navigateTo;
navigateTo = function (id) {
    // Call the original function
    originalNavigateTo(id);

    // Ensure the sub-page is immediately visible without waiting for observer
    const targetPage = document.getElementById('page-' + id);
    if (targetPage) {
        targetPage.classList.add('is-visible');
    }
};
