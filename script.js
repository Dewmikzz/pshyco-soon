// Canvas particle system
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Particle class
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.decay = Math.random() * 0.01 + 0.005;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= this.decay;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = '#00d4ff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

let particles = [];

// Create particles on mouse movement
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.85) {
        for (let i = 0; i < 3; i++) {
            particles.push(new Particle(
                e.clientX + (Math.random() - 0.5) * 30,
                e.clientY + (Math.random() - 0.5) * 30
            ));
        }
    }
});

// Animation loop
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles = particles.filter(p => p.opacity > 0);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animateParticles);
}

animateParticles();

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Email subscription
const emailInput = document.getElementById('emailInput');
const subscribeBtn = document.querySelector('.subscribe-btn');
const toast = document.getElementById('toast');

subscribeBtn.addEventListener('click', () => {
    const email = emailInput.value.trim();

    if (!email) {
        showToast('Please enter your email address');
        return;
    }

    if (!isValidEmail(email)) {
        showToast('Please enter a valid email address');
        return;
    }

    // Simulate subscription (in production, send to backend)
    subscribeBtn.textContent = 'Subscribed!';
    subscribeBtn.style.opacity = '0.7';
    subscribeBtn.style.cursor = 'not-allowed';
    
    showToast(`✓ Thanks for subscribing! Check ${email} for updates`);
    
    emailInput.value = '';

    setTimeout(() => {
        subscribeBtn.textContent = 'Notify Me';
        subscribeBtn.style.opacity = '1';
        subscribeBtn.style.cursor = 'pointer';
    }, 3000);
});

// Email validation
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Enter key to submit
emailInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        subscribeBtn.click();
    }
});

// Toast notification
function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// Social link interactions
const socialLinks = document.querySelectorAll('.social-icon');
socialLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('Follow us when we launch!');
    });
});

// Add loading animation
window.addEventListener('load', () => {
    console.log('Psyco Lab Coming Soon - Ready to innovate!');
});

// Keyboard shortcuts for fun
document.addEventListener('keypress', (e) => {
    if (e.key === 'p' || e.key === 'P') {
        // Easter egg: spawn particles
        for (let i = 0; i < 20; i++) {
            particles.push(new Particle(
                window.innerWidth / 2 + (Math.random() - 0.5) * 100,
                window.innerHeight / 2 + (Math.random() - 0.5) * 100
            ));
        }
    }
});

// Smooth scroll for any internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add focus styles for accessibility
document.querySelectorAll('button, a, input').forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid #00d4ff';
        this.style.outlineOffset = '2px';
    });

    element.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

// Performance: Throttle particle creation based on device capability
let particleThrottle = 0;
document.addEventListener('mousemove', () => {
    particleThrottle = (particleThrottle + 1) % 2;
}, { passive: true });
