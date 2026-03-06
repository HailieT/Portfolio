/* ============================================
   COMMON JAVASCRIPT FOR ALL PAGES
   This file handles shared functionality across the website
   ============================================ */

// === DARK MODE FUNCTIONALITY ===
// Handles theme switching and persistence
function initDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const mobileDarkModeToggle = document.getElementById('mobile-dark-mode-toggle');
    const body = document.body;
    
    // Load saved preference from localStorage
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        if (darkModeToggle) darkModeToggle.textContent = '☀️';
        if (mobileDarkModeToggle) mobileDarkModeToggle.textContent = '☀️';
    }
    
    // Desktop toggle handler
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => toggleDarkMode());
    }
    
    // Mobile toggle handler
    if (mobileDarkModeToggle) {
        mobileDarkModeToggle.addEventListener('click', () => toggleDarkMode());
    }
    
    function toggleDarkMode() {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        
        // Update both toggles
        const icon = isDark ? '☀️' : '🌙';
        if (darkModeToggle) darkModeToggle.textContent = icon;
        if (mobileDarkModeToggle) mobileDarkModeToggle.textContent = icon;
        
        // Save preference
        localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    }
}

// === ACTIVE PAGE INDICATOR ===
// Highlights current page in navigation
function setActivePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// === MOBILE MENU FUNCTIONALITY ===
// Handles mobile menu open/close and overlay
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

    if (!mobileMenuButton || !mobileMenu || !mobileMenuOverlay) return;

    // Toggle menu on button click
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenuOverlay.classList.toggle('show');
    });

    // Close menu when clicking overlay
    mobileMenuOverlay.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuOverlay.classList.remove('show');
    });

    // Close menu when clicking any link
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenuOverlay.classList.remove('show');
        });
    });
}

// === SCROLL TO TOP BUTTON ===
// Shows/hides button based on scroll position
// To change when button appears, modify the threshold value (currently 300px)
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    if (!scrollToTopBtn) return;
    
    // Show button after scrolling 300px
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    // Smooth scroll to top on click
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// === REVEAL ANIMATION ON SCROLL ===
// Animates elements as they come into view
function initRevealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    if (reveals.length === 0) return;
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(reveal => revealObserver.observe(reveal));
}

// === FLOATING HEARTS ANIMATION ===
// Creates animated hearts in background
// To change heart frequency, modify the interval (currently 3000ms)
function initFloatingHearts() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.textContent = '💖';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
        heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
        document.body.appendChild(heart);
        
        // Remove heart after animation completes
        setTimeout(() => heart.remove(), 20000);
    }, 3000);
}

// === SPARKLE CURSOR EFFECT ===
// Creates heart sparkles that follow mouse movement
// To change heart frequency, modify the timing check
let lastSparkleTime = 0;
function initSparkleEffect() {
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        // Create heart every 100ms
        if (now - lastSparkleTime > 100) {
            createSparkle(e.pageX, e.pageY);
            lastSparkleTime = now;
        }
    });
}

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    // Add heart SVG instead of just a dot
    sparkle.innerHTML = '<svg viewBox="0 0 32 29.6"><path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/></svg>';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    document.body.appendChild(sparkle);
    
    // Remove sparkle after animation
    setTimeout(() => sparkle.remove(), 600);
}

// === INITIALIZE ALL FEATURES ===
// Called when page loads
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    setActivePage();
    initMobileMenu();
    initScrollToTop();
    initRevealOnScroll();
    initFloatingHearts();
    initSparkleEffect();
});

