// Linktree Landing Page - Enhanced Interactions
// Lightweight script for performance and user experience

(function() {
    'use strict';
    
    // Force scroll to top immediately, before anything else
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Disable browser scroll restoration
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    
    // Performance optimization: Run after DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
        function init() {
        // Force scroll to top on page load/refresh
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        
        // Initialize features
        setupLinkTracking();
        setupKeyboardNavigation();
        setupPerformanceOptimizations();
        setupAccessibility();
        setupModalSystem();
        setupScrollToTop();
        setupURLRouting();

        
        // Add loaded class for any additional styling
        document.body.classList.add('js-loaded');
    }
    
    // Ensure page always starts at top
    function setupScrollToTop() {
        // Force scroll to top on page show (handles back/forward navigation)
        window.addEventListener('pageshow', function() {
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        });
        
        // Additional safety for load event
        window.addEventListener('load', function() {
            setTimeout(function() {
                window.scrollTo(0, 0);
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
            }, 0);
        });
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
    
    // Modal System - iOS-style animations
    function setupModalSystem() {
        const modalTriggers = document.querySelectorAll('.menu-item[data-modal]');
        const modalSystem = document.querySelector('.modal-system');
        const modalOverlay = document.getElementById('modal-overlay');
        let activeModal = null;
        let isAnimating = false;
        
        // Add click listeners to modal triggers
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                if (isAnimating) return;
                
                const modalId = this.getAttribute('data-modal');
                const modal = document.getElementById(`modal-${modalId}`);
                
                if (modal) {
                    openModal(modal, this);
                }
            }, { passive: false });
        });
        
        // Add click listeners to close buttons
        const closeButtons = document.querySelectorAll('.modal-close');
        closeButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                if (isAnimating) return;
                
                const modal = this.closest('.modal');
                if (modal) {
                    closeModal(modal);
                }
            }, { passive: false });
        });
        
        // Close modal when clicking overlay
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay && activeModal) {
                closeModal(activeModal);
            }
        }, { passive: false });
        
        // Close modal with escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && activeModal && !isAnimating) {
                closeModal(activeModal);
            }
        });
        
        function openModal(modal, trigger) {
            if (isAnimating) return;
            isAnimating = true;
            activeModal = modal;
            
            // Add opening class to trigger for content fade
            trigger.classList.add('modal-opening');
            
            // Show modal system and start animations immediately
            modalSystem.classList.add('active');
            modalOverlay.classList.add('active');
            modal.classList.add('active');
            
            // Clean up after animation completes
            setTimeout(() => {
                isAnimating = false;
                trigger.classList.remove('modal-opening');
            }, 150);
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
            
            // Focus management
            setTimeout(() => {
                const closeButton = modal.querySelector('.modal-close');
                if (closeButton) {
                    closeButton.focus();
                }
            }, 50);
            
            // Track modal open event
            if (typeof gtag !== 'undefined') {
                gtag('event', 'modal_open', {
                    'event_category': 'engagement',
                    'event_label': modal.id,
                    'value': 1
                });
            }
        }
        
        function closeModal(modal) {
            if (isAnimating) return;
            isAnimating = true;
            
            // Remove active class to start closing animation
            modal.classList.remove('active');
            
            // Start overlay fade out
            modalOverlay.classList.remove('active');
            
            // Clean up after animation completes
            setTimeout(() => {
                // Hide modal system
                modalSystem.classList.remove('active');
                
                // Re-enable body scroll
                document.body.style.overflow = '';
                
                // Clear active modal
                activeModal = null;
                isAnimating = false;
            }, 200);
            
            // Track modal close event
            if (typeof gtag !== 'undefined') {
                gtag('event', 'modal_close', {
                    'event_category': 'engagement',
                    'event_label': modal.id,
                    'value': 1
                });
            }
        }
        
        // Handle window resize during modal open
        window.addEventListener('resize', function() {
            if (activeModal && activeModal.classList.contains('active')) {
                // Modal is already fullscreen via CSS, no inline styles needed
            }
        });
        
        // Improved accessibility - trap focus within modal
        function trapFocus(modal) {
            const focusableElements = modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            
            if (focusableElements.length === 0) return;
            
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            modal.addEventListener('keydown', function(e) {
                if (e.key === 'Tab') {
                    if (e.shiftKey) {
                        if (document.activeElement === firstElement) {
                            e.preventDefault();
                            lastElement.focus();
                        }
                    } else {
                        if (document.activeElement === lastElement) {
                            e.preventDefault();
                            firstElement.focus();
                        }
                    }
                }
            });
        }
        
        // Set up focus trapping for all modals
        document.querySelectorAll('.modal').forEach(modal => {
            trapFocus(modal);
        });
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