// home.js - DOM manipulation for home page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Home.js loaded and ready');

    // Initialize the home page
    initializeHomePage();
});

function initializeHomePage() {
    // Set the user name using DOM manipulation
    setUserName();

    // Load and display city name from location data
    loadCityName();

    // Add navigation functionality
    setupNavigation();

    // Add profile icon interaction
    setupProfileInteraction();
}

function setUserName() {
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
        // Set the name using innerText as requested
        userNameElement.innerText = 'Shihab Chashi';
        console.log('User name set to: Shihab Chashi');
    } else {
        console.error('User name element not found');
    }
}

function loadCityName() {
    const cityNameElement = document.getElementById('cityName');
    if (!cityNameElement) {
        console.error('City name element not found');
        return;
    }

    // Try to get location data from localStorage (set by location page)
    const locationData = localStorage.getItem('geoguardian_location');

    if (locationData) {
        try {
            const parsedData = JSON.parse(locationData);
            console.log('Location data found:', parsedData);

            // Use reverse geocoding to get city name from coordinates
            getCityFromCoordinates(parsedData.latitude, parsedData.longitude);
        } catch (error) {
            console.error('Error parsing location data:', error);
            cityNameElement.innerText = 'Location unavailable';
        }
    } else {
        console.log('No location data found in localStorage');
        cityNameElement.innerText = 'Location not set';
    }
}

async function getCityFromCoordinates(lat, lng) {
    const cityNameElement = document.getElementById('cityName');

    try {
        cityNameElement.innerText = 'Loading location...';

        // Use Nominatim API (free) to get city name
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`);
        const data = await response.json();

        if (data && data.address) {
            // Extract city name (try different address components)
            const city = data.address.city ||
                        data.address.town ||
                        data.address.village ||
                        data.address.county ||
                        data.address.state ||
                        'Unknown Location';

            cityNameElement.innerText = city;
            console.log('City name set to:', city);
        } else {
            cityNameElement.innerText = 'City not found';
        }
    } catch (error) {
        console.error('Error getting city name:', error);
        cityNameElement.innerText = 'Location error';
    }
}

function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();

            const page = this.getAttribute('data-page');
            console.log('Navigation clicked:', page);

            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));

            // Add active class to clicked item
            this.classList.add('active');

            // Handle navigation based on page
            handleNavigation(page);
        });
    });
}

function handleNavigation(page) {
    // This function will handle navigation between different sections
    // For now, just log the navigation
    console.log('Navigating to:', page);

    // You can add specific navigation logic here later
    switch(page) {
        case 'home':
            // Already on home page
            break;
        case 'learn':
            // Navigate to learn page
            window.location.href = 'learn.html';
            break;
        case 'chat':
            // Navigate to chat AI section/page
            showMessage('Chat AI coming soon!', 'info');
            break;
        case 'calendar':
            // Navigate to calendar section/page
            showMessage('Calendar coming soon!', 'info');
            break;
        case 'sell':
            // Navigate to sell section/page
            showMessage('Marketplace coming soon!', 'info');
            break;
        case 'alerts':
            // Navigate to alerts section/page
            showMessage('Alerts coming soon!', 'info');
            break;
        default:
            console.error('Unknown page:', page);
    }
}

function setupProfileInteraction() {
    const profileIcon = document.querySelector('.profile-icon');
    const profilePopup = document.getElementById('profilePopup');
    const closePopupBtn = document.getElementById('closeProfilePopup');
    const editProfileBtn = document.getElementById('editProfileBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    if (profileIcon) {
        profileIcon.addEventListener('click', function() {
            console.log('Profile icon clicked');

            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);

            // Show profile popup
            showProfilePopup();
        });

        // Add hover effect
        profileIcon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.2s ease';
        });

        profileIcon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }

    // Close popup button
    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', function() {
            hideProfilePopup();
        });
    }

    // Edit profile button
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function() {
            console.log('Edit profile clicked');
            showMessage('Edit profile feature coming soon!', 'info');
            hideProfilePopup();
        });
    }

    // Logout button
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            console.log('Logout clicked');

            // Show confirmation
            if (confirm('Are you sure you want to log out?')) {
                handleLogout();
            }
        });
    }

    // Close popup when clicking outside
    if (profilePopup) {
        profilePopup.addEventListener('click', function(event) {
            if (event.target === profilePopup) {
                hideProfilePopup();
            }
        });
    }
}

// Function to show profile popup
function showProfilePopup() {
    const profilePopup = document.getElementById('profilePopup');
    const popupUserName = document.getElementById('popupUserName');
    const popupCityName = document.getElementById('popupCityName');

    if (profilePopup) {
        // Update popup with current user data
        if (popupUserName) {
            popupUserName.innerText = 'Shihab Chashi';
        }

        // Update location in popup
        updatePopupLocation();

        // Show popup
        profilePopup.classList.remove('hidden');

        // Trigger animation after a brief delay
        setTimeout(() => {
            profilePopup.classList.add('show');
        }, 10);

        console.log('Profile popup shown');
    }
}

// Function to hide profile popup
function hideProfilePopup() {
    const profilePopup = document.getElementById('profilePopup');

    if (profilePopup) {
        profilePopup.classList.remove('show');

        // Hide popup after animation completes
        setTimeout(() => {
            profilePopup.classList.add('hidden');
        }, 300);

        console.log('Profile popup hidden');
    }
}

// Function to update location in popup
function updatePopupLocation() {
    const popupCityName = document.getElementById('popupCityName');
    const headerCityName = document.getElementById('cityName');

    if (popupCityName && headerCityName) {
        // Copy location from header to popup
        const cityText = headerCityName.innerText;
        if (cityText && cityText !== 'Loading location...' && cityText !== 'Location not set') {
            popupCityName.innerText = cityText;
        } else {
            popupCityName.innerText = 'Location not available';
        }
    }
}

// Function to handle logout
function handleLogout() {
    console.log('Logging out user...');

    // Clear stored data
    localStorage.removeItem('geoguardian_location');
    localStorage.removeItem('userSession');

    // Show logout message
    showMessage('Logging out...', 'success');

    // Redirect to register page after delay
    setTimeout(() => {
        window.location.href = 'register.html';
    }, 1500);
}

// Utility function to show messages
function showMessage(message, type = 'info') {
    // Create and show temporary message
    const messageDiv = document.createElement('div');
    messageDiv.className = `alert alert-${type} fixed top-20 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 max-w-sm`;
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
            if (messageDiv.parentNode) {
                document.body.removeChild(messageDiv);
            }
        }, 300);
    }, 3000);
}

// Function to refresh location data
function refreshLocation() {
    console.log('Refreshing location data...');
    loadCityName();
}

// Export functions for potential use in other scripts
window.HomePageManager = {
    setUserName,
    loadCityName,
    getCityFromCoordinates,
    refreshLocation,
    showMessage
};
