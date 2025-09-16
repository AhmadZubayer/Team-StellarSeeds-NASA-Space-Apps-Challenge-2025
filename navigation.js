/**
 * Universal Navigation System for GeoGuardian Farming App
 * This file handles navigation across all pages consistently
 */

// Navigation configuration
const NAVIGATION_CONFIG = {
    pages: {
        home: 'home.html',
        learn: 'learn.html',
        chat: 'chatAI.html',
        calendar: 'crop-calendar.html',
        sell: 'sell.html',
        alerts: 'alerts.html'
    },
    getCurrentPage: function() {
        const path = window.location.pathname;
        const filename = path.split('/').pop() || 'home.html';
        
        // Map filenames to page keys
        const pageMap = {
            'home.html': 'home',
            'learn.html': 'learn',
            'chatAI.html': 'chat',
            'crop-calendar.html': 'calendar',
            'sell.html': 'sell',
            'alerts.html': 'alerts',
            'alert.html': 'alerts' // Handle both alert.html and alerts.html
        };
        
        return pageMap[filename] || 'home';
    }
};

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Navigation system initialized');
    initializeNavigation();
});

/**
 * Initialize the navigation system
 */
function initializeNavigation() {
    // Set up navigation event listeners
    setupNavigationListeners();
    
    // Set active navigation state
    setActiveNavigation();
    
    console.log('Navigation setup complete');
}

/**
 * Set up event listeners for all navigation items
 */
function setupNavigationListeners() {
    const navItems = document.querySelectorAll('.nav-item[data-page]');
    
    if (navItems.length === 0) {
        console.warn('No navigation items found');
        return;
    }
    
    navItems.forEach(item => {
        // Remove any existing event listeners
        item.removeEventListener('click', handleNavigationClick);
        
        // Add new event listener
        item.addEventListener('click', handleNavigationClick);
        
        // Add hover effects
        item.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-2px)';
                this.style.background = 'rgba(34, 197, 94, 0.1)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0)';
                this.style.background = '';
            }
        });
    });
    
    console.log(`Set up navigation listeners for ${navItems.length} items`);
}

/**
 * Handle navigation item clicks
 */
function handleNavigationClick(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const clickedItem = this;
    const targetPage = clickedItem.getAttribute('data-page');
    const currentPage = NAVIGATION_CONFIG.getCurrentPage();
    
    console.log(`Navigation clicked: ${targetPage} (current: ${currentPage})`);
    
    // Don't navigate if we're already on the target page
    if (targetPage === currentPage) {
        console.log('Already on target page, no navigation needed');
        return;
    }
    
    // Validate target page
    if (!NAVIGATION_CONFIG.pages[targetPage]) {
        console.error(`Unknown page: ${targetPage}`);
        return;
    }
    
    // Update active states before navigation
    updateActiveNavigation(targetPage);
    
    // Navigate to the target page
    const targetUrl = NAVIGATION_CONFIG.pages[targetPage];
    console.log(`Navigating to: ${targetUrl}`);
    
    // Use timeout to allow visual feedback before navigation
    setTimeout(() => {
        window.location.href = targetUrl;
    }, 100);
}

/**
 * Set the active navigation state based on current page
 */
function setActiveNavigation() {
    const currentPage = NAVIGATION_CONFIG.getCurrentPage();
    updateActiveNavigation(currentPage);
}

/**
 * Update active navigation state
 */
function updateActiveNavigation(activePage) {
    const navItems = document.querySelectorAll('.nav-item[data-page]');
    
    navItems.forEach(item => {
        const itemPage = item.getAttribute('data-page');
        
        if (itemPage === activePage) {
            item.classList.add('active');
            item.style.background = 'rgba(34, 197, 94, 0.2)';
            item.style.transform = 'translateY(-2px)';
        } else {
            item.classList.remove('active');
            item.style.background = '';
            item.style.transform = '';
        }
    });
    
    console.log(`Active navigation set to: ${activePage}`);
}

/**
 * Programmatic navigation function
 */
function navigateToPage(pageName) {
    if (!NAVIGATION_CONFIG.pages[pageName]) {
        console.error(`Cannot navigate to unknown page: ${pageName}`);
        return false;
    }
    
    const targetUrl = NAVIGATION_CONFIG.pages[pageName];
    console.log(`Programmatic navigation to: ${targetUrl}`);
    
    window.location.href = targetUrl;
    return true;
}

/**
 * Get navigation state information
 */
function getNavigationState() {
    return {
        currentPage: NAVIGATION_CONFIG.getCurrentPage(),
        availablePages: Object.keys(NAVIGATION_CONFIG.pages),
        navigationItems: document.querySelectorAll('.nav-item[data-page]').length
    };
}

// Export functions for global use
window.GeoGuardianNavigation = {
    navigateToPage,
    getNavigationState,
    getCurrentPage: NAVIGATION_CONFIG.getCurrentPage,
    reinitialize: initializeNavigation
};

// Debug information
console.log('GeoGuardian Navigation System Loaded', {
    currentPage: NAVIGATION_CONFIG.getCurrentPage(),
    availablePages: Object.keys(NAVIGATION_CONFIG.pages)
});