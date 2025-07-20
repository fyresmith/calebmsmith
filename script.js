// Linktree Landing Page - Enhanced Interactions
// Lightweight script for performance and user experience

(function() {
    'use strict';
    
    // IMMEDIATE THEME DETECTION AND APPLICATION
    // Apply theme before anything else to prevent flash
    (function applyThemeImmediately() {
        const body = document.body;
        const html = document.documentElement;
        
        // Get theme preference - check localStorage first, then system preference
        function getInitialTheme() {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) return savedTheme;
            
            // Check system preference
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
                return 'light';
            }
            return 'dark'; // Default to dark
        }
        
        // Apply theme immediately
        function applyTheme(theme) {
            if (theme === 'light') {
                body.classList.add('light-mode');
                html.setAttribute('data-theme', 'light');
            } else {
                body.classList.remove('light-mode');
                html.setAttribute('data-theme', 'dark');
            }
            
            // Update profile picture based on theme (when DOM is ready)
            const updateAvatar = () => {
                const avatar = document.querySelector('.avatar');
                if (avatar) {
                    if (theme === 'light') {
                        avatar.src = 'pfp-main.webp';
                    } else {
                        avatar.src = 'pfp-main-dark.jpg';
                    }
                }
            };
            
            // Try to update immediately if DOM is ready, otherwise wait for DOMContentLoaded
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', updateAvatar);
            } else {
                updateAvatar();
            }
        }
        
        // Apply initial theme immediately
        const initialTheme = getInitialTheme();
        applyTheme(initialTheme);
        
        // Store theme for later use
        window.currentTheme = initialTheme;
    })();
    
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
        setupThemeToggle();
        setupURLRouting(); // Add URL routing setup

        
        // Add loaded class for any additional styling
        document.body.classList.add('js-loaded');
    }
    
    // URL Routing System
    function setupURLRouting() {
        const validRoutes = ['about', 'mission', 'contact'];
        
        // Handle initial page load routing
        function handleInitialRoute() {
            const path = window.location.pathname;
            const hash = window.location.hash.substring(1); // Remove leading #
            const route = path.substring(1); // Remove leading slash
            
            // Handle /connect redirect
            if (route === 'connect') {
                // Redirect to root
                window.history.replaceState(null, '', '/');
                return;
            }
            
            // Check for hash-based routes first (for redirected routes)
            if (hash && validRoutes.includes(hash)) {
                setTimeout(() => {
                    const modal = document.getElementById(`modal-${hash}`);
                    if (modal) {
                        openModalFromURL(modal, hash);
                        // Update URL to clean path-based route
                        window.history.replaceState({ modal: hash }, '', `/${hash}`);
                    }
                }, 100);
                return;
            }
            
            // Handle modal routes from direct path access
            if (validRoutes.includes(route)) {
                // Wait for modal system to be ready, then open the modal
                setTimeout(() => {
                    const modal = document.getElementById(`modal-${route}`);
                    if (modal) {
                        openModalFromURL(modal, route);
                    }
                }, 100);
            }
        }
        
        // Handle browser back/forward navigation
        window.addEventListener('popstate', function(e) {
            const path = window.location.pathname;
            const hash = window.location.hash.substring(1);
            const route = path.substring(1);
            
            // Close any open modal if we're going back to root
            if ((route === '' || route === '/') && !hash) {
                const activeModal = document.querySelector('.modal.active');
                if (activeModal) {
                    closeModalFromURL(activeModal);
                }
                return;
            }
            
            // Handle /connect redirect on back/forward
            if (route === 'connect') {
                window.history.replaceState(null, '', '/');
                return;
            }
            
            // Handle hash-based routes
            if (hash && validRoutes.includes(hash)) {
                const modal = document.getElementById(`modal-${hash}`);
                if (modal) {
                    const activeModal = document.querySelector('.modal.active');
                    if (activeModal && activeModal !== modal) {
                        closeModalFromURL(activeModal);
                        setTimeout(() => {
                            openModalFromURL(modal, hash);
                        }, 200);
                    } else if (!activeModal) {
                        openModalFromURL(modal, hash);
                    }
                }
                return;
            }
            
            // Open appropriate modal for valid routes
            if (validRoutes.includes(route)) {
                const modal = document.getElementById(`modal-${route}`);
                if (modal) {
                    // Close any currently open modal first
                    const activeModal = document.querySelector('.modal.active');
                    if (activeModal && activeModal !== modal) {
                        closeModalFromURL(activeModal);
                        setTimeout(() => {
                            openModalFromURL(modal, route);
                        }, 200);
                    } else if (!activeModal) {
                        openModalFromURL(modal, route);
                    }
                }
            }
        });
        
        // Handle hash changes (for direct hash navigation)
        window.addEventListener('hashchange', function(e) {
            const hash = window.location.hash.substring(1);
            
            if (hash && validRoutes.includes(hash)) {
                const modal = document.getElementById(`modal-${hash}`);
                if (modal) {
                    const activeModal = document.querySelector('.modal.active');
                    if (activeModal && activeModal !== modal) {
                        closeModalFromURL(activeModal);
                        setTimeout(() => {
                            openModalFromURL(modal, hash);
                            // Update to clean URL
                            window.history.replaceState({ modal: hash }, '', `/${hash}`);
                        }, 200);
                    } else if (!activeModal) {
                        openModalFromURL(modal, hash);
                        // Update to clean URL
                        window.history.replaceState({ modal: hash }, '', `/${hash}`);
                    }
                }
            } else if (!hash) {
                // Hash was removed, close any open modal
                const activeModal = document.querySelector('.modal.active');
                if (activeModal) {
                    closeModalFromURL(activeModal);
                }
            }
        });
        
        // Special modal functions for URL routing (avoid circular history updates)
        function openModalFromURL(modal, route) {
            const modalSystem = document.querySelector('.modal-system');
            const modalOverlay = document.getElementById('modal-overlay');
            
            // Show modal system and start animations
            modalSystem.classList.add('active');
            modalOverlay.classList.add('active');
            modal.classList.add('active');
            
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
                gtag('event', 'modal_open_url', {
                    'event_category': 'engagement',
                    'event_label': route,
                    'value': 1
                });
            }
        }
        
        function closeModalFromURL(modal) {
            const modalSystem = document.querySelector('.modal-system');
            const modalOverlay = document.getElementById('modal-overlay');
            
            // Remove active class to start closing animation
            modal.classList.remove('active');
            modalOverlay.classList.remove('active');
            
            // Clean up after animation completes
            setTimeout(() => {
                modalSystem.classList.remove('active');
                document.body.style.overflow = '';
            }, 200);
        }
        
        // Modify the existing modal system to update URLs
        function updateModalSystemForRouting() {
            const modalTriggers = document.querySelectorAll('.menu-item[data-modal]');
            const closeButtons = document.querySelectorAll('.modal-close');
            const modalOverlay = document.getElementById('modal-overlay');
            
            // Update modal triggers to push URL state
            modalTriggers.forEach(trigger => {
                const originalHandler = trigger.onclick;
                trigger.addEventListener('click', function(e) {
                    const modalId = this.getAttribute('data-modal');
                    if (modalId && validRoutes.includes(modalId)) {
                        // Update URL without triggering popstate
                        const newURL = `/${modalId}`;
                        window.history.pushState({ modal: modalId }, '', newURL);
                    }
                });
            });
            
            // Update close buttons to update URL
            closeButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    // Update URL back to root
                    window.history.pushState(null, '', '/');
                });
            });
            
            // Update overlay click to update URL
            modalOverlay.addEventListener('click', function(e) {
                if (e.target === modalOverlay) {
                    window.history.pushState(null, '', '/');
                }
            });
            
            // Update escape key handler to update URL
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    const activeModal = document.querySelector('.modal.active');
                    if (activeModal) {
                        window.history.pushState(null, '', '/');
                    }
                }
            });
        }
        
        // Initialize routing
        handleInitialRoute();
        updateModalSystemForRouting();
        
        // Expose functions for potential external use
        window.routingFunctions = {
            openModalFromURL,
            closeModalFromURL,
            validRoutes
        };
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
    
    // Theme Toggle System - Enhanced with immediate application
    function setupThemeToggle() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (!themeToggle) return;
        
        const html = document.documentElement;
        const body = document.body;
        
        // Get theme preference - check localStorage first, then system preference
        function getThemePreference() {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) return savedTheme;
            
            // Check system preference
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
                return 'light';
            }
            return 'dark'; // Default to dark
        }
        
        // Apply theme
        function applyTheme(theme) {
            if (theme === 'light') {
                body.classList.add('light-mode');
                html.setAttribute('data-theme', 'light');
            } else {
                body.classList.remove('light-mode');
                html.setAttribute('data-theme', 'dark');
            }
            
            // Update profile picture based on theme
            const avatar = document.querySelector('.avatar');
            if (avatar) {
                if (theme === 'light') {
                    avatar.src = 'pfp-main.webp';
                } else {
                    avatar.src = 'pfp-main-dark.jpg';
                }
            }
            
            // Update aria-label for accessibility
            themeToggle.setAttribute('aria-label', 
                theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
            );
            
            // Store current theme
            window.currentTheme = theme;
        }
        
        // Initialize with current theme (already applied)
        const currentTheme = window.currentTheme || getThemePreference();
        themeToggle.setAttribute('aria-label', 
            currentTheme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
        );
        
        // Handle toggle click
        themeToggle.addEventListener('click', function() {
            const currentTheme = body.classList.contains('light-mode') ? 'light' : 'dark';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            // Apply new theme
            applyTheme(newTheme);
            
            // Save preference
            localStorage.setItem('theme', newTheme);
            
            // Provide user feedback with simple scale animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Track theme change
            if (typeof gtag !== 'undefined') {
                gtag('event', 'theme_change', {
                    'event_category': 'user_preference',
                    'event_label': newTheme,
                    'value': 1
                });
            }
        });
        
        // Listen for system theme changes (only if user hasn't set a manual preference)
        const systemThemeQuery = window.matchMedia('(prefers-color-scheme: light)');
        systemThemeQuery.addEventListener('change', function(e) {
            // Only apply system theme if user hasn't manually set a preference
            if (!localStorage.getItem('theme')) {
                const systemTheme = e.matches ? 'light' : 'dark';
                applyTheme(systemTheme);
                
                // Track system theme change
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'system_theme_change', {
                        'event_category': 'system_preference',
                        'event_label': systemTheme,
                        'value': 1
                    });
                }
            }
        });
        
        // Keyboard shortcut: Ctrl/Cmd + Shift + L for Light/Dark toggle
        document.addEventListener('keydown', function(e) {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'L' || e.key === 'l')) {
                e.preventDefault();
                themeToggle.click();
            }
        });
        
        // Additional keyboard shortcut: Ctrl/Cmd + Shift + D for Dark mode
        document.addEventListener('keydown', function(e) {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'D' || e.key === 'd')) {
                e.preventDefault();
                if (body.classList.contains('light-mode')) {
                    themeToggle.click();
                }
            }
        });
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