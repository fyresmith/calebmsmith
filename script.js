// Linktree Landing Page - Enhanced Interactions
// Lightweight script for performance and user experience

(function() {
    'use strict';
    
    // Performance optimization: Run after DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        // Initialize features
        setupLinkTracking();
        setupKeyboardNavigation();
        setupPerformanceOptimizations();
        setupAccessibility();
    
        
        // Add loaded class for any additional styling
        document.body.classList.add('js-loaded');
    }
    

    
    // Track link clicks for analytics (optional)
    function setupLinkTracking() {
        const links = document.querySelectorAll('.link-item');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const linkText = this.querySelector('.link-text, .card-title')?.textContent || 'Unknown Link';
                const linkUrl = this.href;
                const isImageCard = this.classList.contains('image-card');
                
                // Track with Google Analytics if available
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'link_click', {
                        'event_category': 'engagement',
                        'event_label': linkText,
                        'custom_parameters': {
                            'link_type': isImageCard ? 'image_card' : 'text_link',
                            'link_url': linkUrl
                        },
                        'value': 1
                    });
                }
                
                // Track with custom analytics if needed
                if (typeof analytics !== 'undefined') {
                    analytics.track('Link Clicked', {
                        link: linkText,
                        url: linkUrl,
                        type: isImageCard ? 'image_card' : 'text_link'
                    });
                }
                
                // For debugging (remove in production)
                console.log('Link clicked:', linkText, linkUrl);
            });
        });
    }
    
    // Enhanced keyboard navigation
    function setupKeyboardNavigation() {
        const links = document.querySelectorAll('.link-item');
        
        // Create array of focusable elements
        const focusableElements = [
            ...document.querySelectorAll('.social-icon'),
            ...links
        ].filter(Boolean);
        
        // Add tabindex to ensure proper tab order
        focusableElements.forEach((element, index) => {
            element.tabIndex = index + 1;
        });
        
        // Add keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            // Press number keys 1-3 to activate main links
            if (e.key >= '1' && e.key <= '3') {
                const linkIndex = parseInt(e.key) - 1;
                if (links[linkIndex]) {
                    e.preventDefault();
                    links[linkIndex].click();
                }
            }
            
            // Press 'h' to scroll to top (home)
            if (e.key === 'h' || e.key === 'H') {
                if (!e.ctrlKey && !e.metaKey) {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }
        });
    }
    
    // Performance optimizations
    function setupPerformanceOptimizations() {
        // Preload important resources on hover
        const links = document.querySelectorAll('.link-item[href^="http"]');
        
        links.forEach(link => {
            link.addEventListener('mouseenter', function() {
                const url = this.href;
                if (url && !url.includes('mailto:')) {
                    // Preload the page on hover for faster navigation
                    const linkEl = document.createElement('link');
                    linkEl.rel = 'prefetch';
                    linkEl.href = url;
                    document.head.appendChild(linkEl);
                }
            }, { once: true });
        });
        
        // Lazy load any future images
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            observer.unobserve(img);
                        }
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
        
        // Optimize image cards
        const imageCards = document.querySelectorAll('.link-item.image-card img');
        imageCards.forEach(img => {
            img.addEventListener('load', function() {
                this.style.opacity = '1';
                this.style.transform = 'scale(1)';
            });
            
            img.addEventListener('error', function() {
                // Hide parent container if image fails to load
                const cardImage = this.closest('.card-image');
                if (cardImage) {
                    cardImage.style.display = 'none';
                }
            });
        });
    }
    
    // Enhanced accessibility features
    function setupAccessibility() {
        // Add aria-labels for better screen reader support
        const links = document.querySelectorAll('.link-item');
        
        links.forEach(link => {
            const linkText = link.querySelector('.link-text, .card-title')?.textContent || '';
            const linkDescription = link.querySelector('.link-description, .card-description')?.textContent || '';
            const isExternal = link.hasAttribute('target') && link.getAttribute('target') === '_blank';
            const isImageCard = link.classList.contains('image-card');
            
            let ariaLabel = linkText;
            if (linkDescription) {
                ariaLabel += ` - ${linkDescription}`;
            }
            if (isExternal) {
                ariaLabel += ' (opens in new tab)';
            }
            if (isImageCard) {
                ariaLabel += ' (image link)';
            }
            
            link.setAttribute('aria-label', ariaLabel);
        });
        

        
        // Announce page changes to screen readers
        const announcer = document.createElement('div');
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.style.cssText = `
            position: absolute;
            left: -10000px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `;
        document.body.appendChild(announcer);
        
        // Store announcer for potential use
        window.announceToScreenReader = function(message) {
            announcer.textContent = message;
            setTimeout(() => {
                announcer.textContent = '';
            }, 1000);
        };
    }
    
    // Add smooth scroll behavior for any internal links
    function setupSmoothScroll() {
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
    }
    
    // Add visual feedback for offline status
    function setupOfflineDetection() {
        function updateOnlineStatus() {
            const status = navigator.onLine ? 'online' : 'offline';
            document.body.setAttribute('data-connection', status);
            
            if (!navigator.onLine && window.announceToScreenReader) {
                window.announceToScreenReader('You are currently offline. Some links may not work.');
            }
        }
        
        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);
        updateOnlineStatus();
    }
    
    // Initialize additional features
    setupSmoothScroll();
    setupOfflineDetection();
    
    // Performance monitoring (optional)
    if ('performance' in window && 'measure' in window.performance) {
        window.addEventListener('load', function() {
            // Measure page load performance
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
                    
                    if (loadTime > 0) {
                        console.log(`Page loaded in ${loadTime}ms`);
                        
                        // Track performance with analytics if available
                        if (typeof gtag !== 'undefined') {
                            gtag('event', 'page_load_time', {
                                'event_category': 'performance',
                                'value': Math.round(loadTime)
                            });
                        }
                    }
                }
            }, 0);
        });
    }
    
    // Add intersection observer for animation triggers
    if ('IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, { threshold: 0.1 });
        
        // Observe elements for animation
        document.querySelectorAll('.link-item, .social-icon').forEach(el => {
            animationObserver.observe(el);
        });
    }
    
})(); 