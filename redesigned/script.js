// Professional Law Firm Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });

    // Smooth scrolling for anchor links
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

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animations
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });

    // Counter animation for statistics
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 20);
    }

    // Observe stat numbers for counter animation
    const statObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber && !statNumber.classList.contains('animated')) {
                    statNumber.classList.add('animated');
                    animateCounter(statNumber);
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.stat-item').forEach(stat => {
        statObserver.observe(stat);
    });

    // Practice area hover effects
    document.querySelectorAll('.practice-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Leadership card interactions
    document.querySelectorAll('.leadership-card').forEach(card => {
        const avatar = card.querySelector('.leadership-avatar');
        const name = card.querySelector('.leadership-name');
        
        card.addEventListener('mouseenter', function() {
            if (avatar) {
                avatar.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (avatar) {
                avatar.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Parallax effect for hero sections
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-section');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Text typing animation
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Initialize typing animation for hero titles
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && !heroTitle.classList.contains('typed')) {
        const originalText = heroTitle.textContent;
        heroTitle.classList.add('typed');
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 30);
        }, 1000);
    }

    // Quote carousel functionality
    const quotes = document.querySelectorAll('.quote-carousel .quote-item');
    let currentQuote = 0;
    
    function showNextQuote() {
        if (quotes.length > 1) {
            quotes[currentQuote].classList.remove('active');
            currentQuote = (currentQuote + 1) % quotes.length;
            quotes[currentQuote].classList.add('active');
        }
    }
    
    if (quotes.length > 0) {
        quotes[0].classList.add('active');
        setInterval(showNextQuote, 5000); // Change quote every 5 seconds
    }

    // Form validation and submission
    const contactForms = document.querySelectorAll('form');
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const inputs = form.querySelectorAll('input, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Show success message
                showNotification('Thank you for your message. We will get back to you soon!', 'success');
                form.reset();
            } else {
                showNotification('Please fill in all required fields.', 'error');
            }
        });
    });

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 10001;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }

    // Loading animation
    function showLoader() {
        const loader = document.createElement('div');
        loader.id = 'page-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-spinner"></div>
                <p>Loading...</p>
            </div>
        `;
        
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(26, 35, 126, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10002;
            backdrop-filter: blur(5px);
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            .loader-content {
                text-align: center;
                color: white;
            }
            .loader-spinner {
                width: 50px;
                height: 50px;
                border: 4px solid rgba(255,255,255,0.3);
                border-top: 4px solid #ff8f00;
                border-radius: 50%;
                margin: 0 auto 1rem;
                animation: spin 1s linear infinite;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(loader);
        
        return loader;
    }

    function hideLoader() {
        const loader = document.getElementById('page-loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(loader);
            }, 500);
        }
    }

    // Page transition effects
    function initPageTransitions() {
        const links = document.querySelectorAll('a[href]:not([href^="#"]):not([href^="mailto:"]):not([href^="tel:"])');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Check if it's an internal link
                if (href.startsWith('./') || href.includes(window.location.hostname) || !href.includes('://')) {
                    e.preventDefault();
                    
                    const loader = showLoader();
                    
                    setTimeout(() => {
                        window.location.href = href;
                    }, 500);
                }
            });
        });
    }

    // Initialize page transitions
    initPageTransitions();

    // Performance optimization: Lazy load images
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }

    lazyLoadImages();

    // Easter egg: Konami code
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            showNotification('🎉 Justice League Mode Activated! 🎉', 'success');
            document.body.style.filter = 'hue-rotate(180deg)';
            setTimeout(() => {
                document.body.style.filter = 'none';
            }, 3000);
            konamiCode = [];
        }
    });

    // Initialize disclaimer
    checkDisclaimer();
});

// Mobile menu functionality using event delegation
document.addEventListener('click', function(e) {
    // Handle navbar toggler clicks
    if (e.target.closest('.navbar-toggler')) {
        e.preventDefault();
        const toggler = e.target.closest('.navbar-toggler');
        const collapse = document.querySelector('.navbar-collapse');
        
        if (toggler && collapse) {
            toggler.classList.toggle('active');
            collapse.classList.toggle('show');
            
            // Prevent body scroll when menu is open
            if (collapse.classList.contains('show')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }
    }
    
    // Close menu when clicking nav links on mobile
    if (e.target.closest('.nav-link') && window.innerWidth <= 768) {
        const collapse = document.querySelector('.navbar-collapse');
        const toggler = document.querySelector('.navbar-toggler');
        
        if (collapse && toggler) {
            collapse.classList.remove('show');
            toggler.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Close menu when clicking outside
    if (!e.target.closest('.navbar') && document.querySelector('.navbar-collapse.show')) {
        const collapse = document.querySelector('.navbar-collapse');
        const toggler = document.querySelector('.navbar-toggler');
        
        if (collapse && toggler) {
            collapse.classList.remove('show');
            toggler.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Function to initialize mobile menu after header is loaded
function initializeMobileMenu() {
    console.log('Mobile menu initialized');
    
    // Make sure elements exist
    const toggler = document.querySelector('.navbar-toggler');
    const collapse = document.querySelector('.navbar-collapse');
    
    if (toggler && collapse) {
        console.log('Mobile menu elements found and ready');
    } else {
        console.log('Mobile menu elements not found');
    }
}

// Disclaimer functionality
function acceptDisclaimer() {
    localStorage.setItem('disclaimerAccepted', 'true');
    const overlay = document.getElementById('disclaimerOverlay');
    if (overlay) {
        overlay.classList.add('hidden');
    }
}

function checkDisclaimer() {
    const disclaimerAccepted = localStorage.getItem('disclaimerAccepted');
    if (disclaimerAccepted === 'true') {
        const overlay = document.getElementById('disclaimerOverlay');
        if (overlay) {
            overlay.classList.add('hidden');
        }
    }
}

// Include loading functionality
function loadInclude(id, file, callback) {
    fetch(file)
        .then(response => response.text())
        .then(html => {
            document.getElementById(id).innerHTML = html;
            if (callback) callback();
            
            // Initialize mobile menu after header is loaded
            if (id === 'header-include') {
                setTimeout(initializeMobileMenu, 100);
            }
        })
        .catch(error => {
            console.error('Error loading include:', error);
        });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

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
    }
}

// Export functions for global use
window.acceptDisclaimer = acceptDisclaimer;
window.loadInclude = loadInclude; 