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
        
        const pageMap = {
            'home.html': 'home',
            'learn.html': 'learn',
            'chatAI.html': 'chat',
            'crop-calendar.html': 'calendar',
            'sell.html': 'sell',
            'alerts.html': 'alerts',
            'alert.html': 'alerts'
        };
        
        return pageMap[filename] || 'home';
    }
};

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Navigation system initialized');
    initializeNavigation();
});

function initializeNavigation() {
    setupNavigationListeners();
    
    setActiveNavigation();
    
    console.log('Navigation setup complete');
}

function setupNavigationListeners() {
    const navItems = document.querySelectorAll('.nav-item[data-page]');
    
    if (navItems.length === 0) {
        console.warn('No navigation items found');
        return;
    }
    
    navItems.forEach(item => {
        item.removeEventListener('click', handleNavigationClick);
        
        item.addEventListener('click', handleNavigationClick);
        
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

function handleNavigationClick(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const clickedItem = this;
    const targetPage = clickedItem.getAttribute('data-page');
    const currentPage = NAVIGATION_CONFIG.getCurrentPage();
    
    console.log(`Navigation clicked: ${targetPage} (current: ${currentPage})`);
    
    if (targetPage === currentPage) {
        console.log('Already on target page, no navigation needed');
        return;
    }
    
    if (!NAVIGATION_CONFIG.pages[targetPage]) {
        console.error(`Unknown page: ${targetPage}`);
        return;
    }
    
    updateActiveNavigation(targetPage);
    
    const targetUrl = NAVIGATION_CONFIG.pages[targetPage];
    console.log(`Navigating to: ${targetUrl}`);
    
    setTimeout(() => {
        window.location.href = targetUrl;
    }, 100);
}

function setActiveNavigation() {
    const currentPage = NAVIGATION_CONFIG.getCurrentPage();
    updateActiveNavigation(currentPage);
}

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

function showPageTransition() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.8);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    overlay.innerHTML = `
        <div class="text-center">
            <div class="animate-spin inline-block w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full mb-4"></div>
            <p class="text-gray-600">Loading...</p>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    setTimeout(() => {
        overlay.style.opacity = '1';
    }, 10);
    
    return overlay;
}

function hidePageTransition(overlay) {
    if (!overlay) return;
    
    overlay.style.opacity = '0';
    setTimeout(() => {
        if (overlay.parentNode) {
            overlay.parentNode.removeChild(overlay);
        }
    }, 300);
}

if (typeof window !== 'undefined') {
    window.NAVIGATION = {
        navigateToPage,
        showPageTransition,
        hidePageTransition,
        getCurrentPage: NAVIGATION_CONFIG.getCurrentPage
    };
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