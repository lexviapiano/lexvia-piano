// LEXVIA PIANO - Bright & Cute Interactive Features
// ===================================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        offset: 100,
        easing: 'ease-out-cubic',
        once: true,
        mirror: false
    });

    // Initialize all interactive features
    initSmoothScrolling();
    initContactFeatures();
    initFloatingCallButton();
    initHeroAnimations();
    initCardHoverEffects();
    initScrollProgress();
    initImageLazyLoad();
    initCuteAnimations();
});

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Handle anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Contact functionality with cute feedback
function initContactFeatures() {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add cute bounce effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Show cute notification
            showCuteNotification('전화 연결 중... 💕');
        });
    });

    // Add click tracking for contact buttons
    const contactButtons = document.querySelectorAll('.btn[href^="tel:"]');
    contactButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Contact button clicked:', this.textContent);
            // Add sparkle effect
            createSparkleEffect(this);
        });
    });
}

// Enhanced floating call button with cute animations
function initFloatingCallButton() {
    const floatingCall = document.querySelector('.floating-call');
    if (!floatingCall) return;

    // Show/hide based on scroll position with cute transition
    let lastScrollY = 0;
    const showThreshold = 300;
    
    window.addEventListener('scroll', throttle(() => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > showThreshold) {
            floatingCall.style.opacity = '1';
            floatingCall.style.transform = 'translateY(0) scale(1)';
        } else {
            floatingCall.style.opacity = '0.8';
            floatingCall.style.transform = 'translateY(10px) scale(0.9)';
        }
        
        lastScrollY = currentScrollY;
    }, 100));

    // Add periodic cute pulse animation
    setInterval(() => {
        if (window.scrollY > showThreshold) {
            floatingCall.style.animation = 'pulse 1.5s ease-in-out';
            setTimeout(() => {
                floatingCall.style.animation = 'float 3s ease-in-out infinite';
            }, 1500);
        }
    }, 10000);

    // Click feedback with heart animation
    floatingCall.addEventListener('click', function() {
        this.style.transform = 'scale(0.85)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        // Create heart particles
        createHeartParticles(this);
    });
}

// Hero section animations with staggered cute effects
function initHeroAnimations() {
    const heroTitle = document.querySelector('.hero__title');
    const heroSubtitle = document.querySelector('.hero__subtitle');
    const heroTagline = document.querySelector('.hero__tagline');
    const heroCta = document.querySelector('.hero__cta');
    
    if (!heroTitle) return;

    // Initial hidden state
    const heroElements = [heroTitle, heroSubtitle, heroTagline, heroCta];
    heroElements.forEach(el => {
        if (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }
    });

    // Stagger the hero animations with cute timing
    const delays = [200, 400, 600, 800];
    heroElements.forEach((el, index) => {
        if (el) {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, delays[index]);
        }
    });

    // Add typing effect to title
    if (heroTitle && heroTitle.textContent === '렉스비아 피아노') {
        setTimeout(() => {
            startTypingEffect(heroTitle, '렉스비아 피아노', 120);
        }, 1000);
    }
}

// Enhanced card hover effects with cute animations
function initCardHoverEffects() {
    const featureCards = document.querySelectorAll('.feature-card');
    const programImages = document.querySelectorAll('.program-img');
    
    // Feature cards with bouncy hover effect
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.feature-card__icon');
            if (icon) {
                icon.style.transform = 'scale(1.3) rotate(10deg)';
                icon.style.transition = 'transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            }
            
            // Add cute glow effect
            this.style.boxShadow = '0 8px 30px rgba(255, 107, 107, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.feature-card__icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
            this.style.boxShadow = '';
        });
    });

    // Program images with cute zoom effect
    programImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(1deg)';
            this.style.filter = 'brightness(1.1)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.filter = 'brightness(1)';
        });
    });
}

// Cute scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #FF6B6B, #4ECDC4, #A8E6CF);
        z-index: 9999;
        transition: width 0.1s ease;
        border-radius: 0 0 2px 2px;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', throttle(() => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = Math.min(scrollPercent, 100) + '%';
    }, 10));
}

// Lazy loading for images with cute loading effect
function initImageLazyLoad() {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Add loading animation
                img.style.opacity = '0';
                img.style.transform = 'scale(0.8)';
                img.style.transition = 'all 0.5s ease';
                
                // Simulate loading complete
                setTimeout(() => {
                    img.style.opacity = '1';
                    img.style.transform = 'scale(1)';
                }, 200);
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Cute animations and effects
function initCuteAnimations() {
    // Add floating emojis periodically
    setInterval(() => {
        createFloatingEmoji();
    }, 15000);
    
    // Add cute hover effects to all buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add cute click effects to contact info cards
    const contactCards = document.querySelectorAll('.contact__info');
    contactCards.forEach(card => {
        card.addEventListener('click', function() {
            createRippleEffect(this);
        });
    });
}

// Typing effect for hero title
function startTypingEffect(element, text, speed) {
    const originalText = element.textContent;
    element.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            // Add cursor blink effect
            element.style.borderRight = '3px solid #FF6B6B';
            element.style.animation = 'blink 1s infinite';
            setTimeout(() => {
                element.style.borderRight = 'none';
                element.style.animation = 'none';
            }, 3000);
        }
    }
    
    typeWriter();
}

// Create sparkle effect
function createSparkleEffect(element) {
    const rect = element.getBoundingClientRect();
    const sparkles = ['✨', '⭐', '💫', '🌟'];
    
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.style.cssText = `
            position: fixed;
            left: ${rect.left + Math.random() * rect.width}px;
            top: ${rect.top + Math.random() * rect.height}px;
            font-size: 1.2rem;
            pointer-events: none;
            z-index: 10000;
            animation: sparkle-float 2s ease-out forwards;
        `;
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 2000);
    }
}

// Create heart particles
function createHeartParticles(element) {
    const rect = element.getBoundingClientRect();
    const hearts = ['💕', '💖', '💗', '💝'];
    
    for (let i = 0; i < 6; i++) {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            font-size: 1rem;
            pointer-events: none;
            z-index: 10000;
            animation: heart-float 3s ease-out forwards;
        `;
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 3000);
    }
}

// Create floating emoji
function createFloatingEmoji() {
    const emojis = ['🎹', '🎵', '🎶', '🌟', '💫', '✨'];
    const emoji = document.createElement('div');
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.cssText = `
        position: fixed;
        right: -50px;
        top: ${Math.random() * (window.innerHeight - 100)}px;
        font-size: 2rem;
        pointer-events: none;
        z-index: 1000;
        animation: float-across 15s linear forwards;
    `;
    document.body.appendChild(emoji);
    
    setTimeout(() => {
        emoji.remove();
    }, 15000);
}

// Create ripple effect
function createRippleEffect(element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, rgba(255, 107, 107, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) scale(0);
        animation: ripple 0.8s ease-out;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 800);
}

// Show cute notification
function showCuteNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #FF6B6B, #4ECDC4);
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        font-weight: 700;
        z-index: 10000;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        animation: slide-in 0.5s ease-out;
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slide-out 0.5s ease-out forwards';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// Utility: Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add CSS animations via JavaScript
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes blink {
        0%, 50% { border-color: #FF6B6B; }
        51%, 100% { border-color: transparent; }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    @keyframes sparkle-float {
        0% { 
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% { 
            opacity: 0;
            transform: translateY(-50px) scale(0.5);
        }
    }
    
    @keyframes heart-float {
        0% { 
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        100% { 
            opacity: 0;
            transform: translate(calc(-50% + ${Math.random() * 200 - 100}px), calc(-50% - 100px)) scale(0.3);
        }
    }
    
    @keyframes float-across {
        0% { 
            transform: translateX(0) rotate(0deg);
            opacity: 0.8;
        }
        50% { 
            opacity: 1;
        }
        100% { 
            transform: translateX(-${window.innerWidth + 100}px) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes ripple {
        0% { 
            transform: translate(-50%, -50%) scale(0);
            opacity: 0.5;
        }
        100% { 
            transform: translate(-50%, -50%) scale(1);
            opacity: 0;
        }
    }
    
    @keyframes slide-in {
        0% { 
            transform: translateX(100%);
            opacity: 0;
        }
        100% { 
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slide-out {
        0% { 
            transform: translateX(0);
            opacity: 1;
        }
        100% { 
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    /* Cute hover effects */
    .btn:hover {
        filter: brightness(1.1);
    }
    
    .feature-card:hover {
        background: linear-gradient(135deg, #FFF0F5, #F0FFFF);
    }
    
    .contact__info:hover {
        background: linear-gradient(135deg, #FFF0F5, #F8F8FF);
    }
    
    /* Responsive adjustments */
    @media (max-width: 768px) {
        .floating-call {
            bottom: 20px;
            right: 20px;
        }
        
        .scroll-progress {
            height: 3px;
        }
    }
`;

document.head.appendChild(animationStyles);

// Initialize performance monitoring
function initPerformanceMonitoring() {
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log('🎹 Lexvia Piano loaded in:', loadTime, 'ms');
    });
}

// Initialize performance monitoring
initPerformanceMonitoring();

// Export functions for potential external use
window.LexviaApp = {
    initSmoothScrolling,
    initContactFeatures,
    initFloatingCallButton,
    createSparkleEffect,
    createHeartParticles,
    throttle
};