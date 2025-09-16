// location.js - DOM manipulation for location page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Location.js loaded and ready');

    // Initialize DOM elements
    initializeLocationPage();
});

function initializeLocationPage() {
    // Get the Continue button element (previously Next button)
    const continueBtn = document.getElementById('continueBtn');

    if (continueBtn) {
        // Add click event listener to Continue button
        continueBtn.addEventListener('click', function(event) {
            event.preventDefault();
            console.log('Continue button clicked');

            // Add visual feedback
            showButtonFeedback(continueBtn);

            // Navigate to home.html after a short delay
            setTimeout(() => {
                navigateToHome();
            }, 300);
        });

        // Add hover effects
        continueBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.2s ease';
        });

        continueBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });

        console.log('Continue button event listeners added');
    } else {
        console.error('Continue button not found');
    }

    // Additional DOM manipulation
    enhanceUserInterface();
}

function navigateToHome() {
    console.log('Navigating to home.html...');

    // Store any location data if needed
    storeLocationData();

    // Navigate to home page
    window.location.href = 'home.html';
}

function showButtonFeedback(button) {
    // Add visual feedback when button is clicked
    button.style.transform = 'scale(0.95)';
    button.style.opacity = '0.8';

    // Add loading state
    const originalContent = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Loading...';
    button.disabled = true;

    // Reset after navigation
    setTimeout(() => {
        button.innerHTML = originalContent;
        button.disabled = false;
        button.style.transform = 'scale(1)';
        button.style.opacity = '1';
    }, 250);
}

function storeLocationData() {
    // Store current location data in localStorage for use in home.html
    if (typeof userLocation !== 'undefined' && userLocation) {
        const locationData = {
            latitude: userLocation[0],
            longitude: userLocation[1],
            timestamp: new Date().toISOString(),
            page: 'location'
        };

        localStorage.setItem('geoguardian_location', JSON.stringify(locationData));
        console.log('Location data stored:', locationData);
    }
}

function enhanceUserInterface() {
    // Add additional UI enhancements

    // Make the page more interactive
    addScrollEffects();

    // Add keyboard navigation
    addKeyboardNavigation();

    // Enhance mobile experience
    optimizeForMobile();
}

function addScrollEffects() {
    // Add scroll effects to elements
    const elements = document.querySelectorAll('.location-overlay, .continue-btn');

    elements.forEach(element => {
        if (element) {
            element.style.transition = 'all 0.3s ease';
        }
    });
}

function addKeyboardNavigation() {
    // Add keyboard support for accessibility
    document.addEventListener('keydown', function(event) {
        // Allow Enter key to trigger Continue button
        if (event.key === 'Enter' || event.key === ' ') {
            const continueBtn = document.getElementById('continueBtn');
            if (continueBtn && document.activeElement === continueBtn) {
                event.preventDefault();
                continueBtn.click();
            }
        }

        // Allow Escape key to go back
        if (event.key === 'Escape') {
            if (confirm('Do you want to go back to the register page?')) {
                window.location.href = 'register.html';
            }
        }
    });
}

function optimizeForMobile() {
    // Optimize touch interactions for mobile
    const continueBtn = document.getElementById('continueBtn');

    if (continueBtn) {
        // Add touch start effect
        continueBtn.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });

        // Add touch end effect
        continueBtn.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    }

    // Prevent zoom on double tap for better mobile experience
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
}

// Utility functions
function showMessage(message, type = 'info') {
    // Create and show temporary message
    const messageDiv = document.createElement('div');
    messageDiv.className = `alert alert-${type} fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300`;
    messageDiv.textContent = message;

    document.body.appendChild(messageDiv);

    // Animate in
    setTimeout(() => {
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translate(-50%, 0)';
    }, 100);

    // Remove after delay
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translate(-50%, -20px)';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 300);
    }, 3000);
}

// Export functions for potential use in other scripts
window.LocationPageManager = {
    navigateToHome,
    showButtonFeedback,
    storeLocationData,
    showMessage
};
