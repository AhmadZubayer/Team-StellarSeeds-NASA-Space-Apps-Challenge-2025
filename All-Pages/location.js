document.addEventListener('DOMContentLoaded', function() {
    console.log('Location.js loaded and ready');

    requestUserLocation();

    initializeLocationPage();
});

function initializeLocationPage() {
    const continueBtn = document.getElementById('continueBtn');

    if (continueBtn) {
        continueBtn.addEventListener('click', function(event) {
            event.preventDefault();
            console.log('Continue button clicked');

            showButtonFeedback(continueBtn);

            setTimeout(() => {
                navigateToHome();
            }, 300);
        });

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

    enhanceUserInterface();
    
    ensureContinueButtonVisible();
}

// Ensure continue button is always visible
function ensureContinueButtonVisible() {
    const continueBtn = document.getElementById('continueBtn');
    if (continueBtn) {
        continueBtn.classList.add('show');
        continueBtn.style.opacity = '1';
    }
}

function requestUserLocation() {
    const locationStatus = document.getElementById('locationStatus');
    if (locationStatus) {
        locationStatus.innerText = 'Requesting location...';
    }

    if (!navigator.geolocation) {
        showMessage('Geolocation not supported on this device', 'error');
        if (locationStatus) locationStatus.innerText = 'Geolocation not supported.';
        return;
    }

    navigator.geolocation.getCurrentPosition(
        function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            window.userLocation = [latitude, longitude];
            localStorage.setItem('geoguardian_location', JSON.stringify({
                latitude,
                longitude,
                timestamp: new Date().toISOString(),
                page: 'location'
            }));
            showMessage('Location detected!', 'success');
            if (locationStatus) locationStatus.innerText = `Location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
            
            hideLoadingSpinner();
        },
        function(error) {
            let errorMessage = 'Location unavailable';
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage = 'Location access denied. Tap to retry.';
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = 'Location unavailable.';
                    break;
                case error.TIMEOUT:
                    errorMessage = 'Location request timed out.';
                    break;
            }
            showMessage(errorMessage, 'error');
            if (locationStatus) {
                locationStatus.innerHTML = `<span style="color:#ef4444;cursor:pointer;" onclick="requestUserLocation()">${errorMessage}</span>`;
            }
        },
        {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 300000
        }
    );
}

function hideLoadingSpinner() {
    const loadingSpinner = document.getElementById('loadingSpinner');
    if (loadingSpinner) {
        loadingSpinner.classList.add('hide');
        setTimeout(() => {
            loadingSpinner.style.display = 'none';
        }, 300);
    }
}

function navigateToHome() {
    console.log('Navigating to home.html...');

    storeLocationData();

    window.location.href = 'home.html';
}

function showButtonFeedback(button) {
    button.style.transform = 'scale(0.95)';
    button.style.opacity = '0.8';

    const originalContent = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Loading...';
    button.disabled = true;

    setTimeout(() => {
        button.innerHTML = originalContent;
        button.disabled = false;
        button.style.transform = 'scale(1)';
        button.style.opacity = '1';
    }, 250);
}

function storeLocationData() {
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
    const continueBtn = document.getElementById('continueBtn');

    if (continueBtn) {
        continueBtn.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });

        continueBtn.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    }

    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
}

function showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `alert alert-${type} fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300`;
    messageDiv.textContent = message;

    document.body.appendChild(messageDiv);

    setTimeout(() => {
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translate(-50%, 0)';
    }, 100);

    setTimeout(() => {
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translate(-50%, -20px)';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 300);
    }, 3000);
}

window.LocationPageManager = {
    navigateToHome,
    showButtonFeedback,
    storeLocationData,
    showMessage
};
