// Alerts Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Alerts page loaded and ready');
    
    // Initialize navigation
    setupNavigation();
    
    // Initialize alerts page functionality
    initializeAlertsPage();
});

function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(event) {
            const page = this.getAttribute('data-page');
            
            // Handle navigation based on page
            if (page === 'home') {
                event.preventDefault();
                window.location.href = 'home.html';
            } else if (page === 'learn') {
                event.preventDefault();
                window.location.href = 'learn.html';
            } else if (page === 'chat') {
                event.preventDefault();
                window.location.href = 'chatAI.html';
            } else if (page === 'calendar') {
                event.preventDefault();
                window.location.href = 'crop-calendar.html';
            } else if (page === 'sell') {
                event.preventDefault();
                window.location.href = 'sell.html';
            } else if (page === 'alerts') {
                // Already on alerts page, do nothing
                event.preventDefault();
            } else {
                // For other nav items, prevent default
                event.preventDefault();
                console.log('Navigation to', page, 'coming soon!');
            }
        });
    });
}

function initializeAlertsPage() {
    // Initialize modal close events
    setupModalEvents();
    console.log('Alerts page initialized');
}

// Alert details data
const alertDetails = {
    flood: {
        title: 'Flood Alert!',
        content: `
            <strong>⚠️ URGENT FLOOD WARNING</strong><br><br>
            
            Heavy rainfall is expected in your area within the next 3 days. Here are important flood safety tips:<br><br>
            
            <strong>🌾 Crop Protection:</strong><br>
            • Use raised beds and drainage channels<br>
            • Move harvested crops to higher ground<br>
            • Secure farm equipment and tools<br><br>
            
            <strong>🏠 Property Safety:</strong><br>
            • Check drainage systems around your property<br>
            • Store emergency supplies and drinking water<br>
            • Keep important documents in waterproof containers<br><br>
            
            <strong>📱 Emergency Contacts:</strong><br>
            • Local Emergency: 999<br>
            • Agricultural Extension Officer: +880-123-456-789<br><br>
            
            Stay safe and monitor weather updates regularly.
        `
    },
    calendar: {
        title: 'Crop Calendar Reminder',
        content: `
            <strong>🌱 IDEAL PLANTING WEEK</strong><br><br>
            
            This is the perfect time to plant your paddy crop! Here's what you need to know:<br><br>
            
            <strong>🌾 Recommended Varieties:</strong><br>
            • BRRI Dhan-29 (High yield, flood tolerant)<br>
            • BRRI Dhan-52 (Early maturity)<br>
            • BRRI Dhan-71 (Premium quality)<br><br>
            
            <strong>📅 Planting Guidelines:</strong><br>
            • Prepare seedbed 21 days before transplanting<br>
            • Use 40-50g seeds per square meter<br>
            • Maintain 2-3 cm water level in seedbed<br><br>
            
            <strong>🌱 Best Practices:</strong><br>
            • Apply organic fertilizer before planting<br>
            • Ensure proper spacing (20cm x 15cm)<br>
            • Monitor for pests and diseases<br><br>
            
            Need help? Contact your local agricultural extension officer.
        `
    },
    market: {
        title: 'Market Update',
        content: `
            <strong>📈 PADDY PRICE SURGE</strong><br><br>
            
            Great news for farmers! Paddy market prices have increased by 7% locally this week.<br><br>
            
            <strong>💰 Current Prices:</strong><br>
            • Premium Paddy: ৳52-55/kg<br>
            • Standard Paddy: ৳48-50/kg<br>
            • Organic Paddy: ৳58-62/kg<br><br>
            
            <strong>🏪 Best Markets:</strong><br>
            • Dhaka Wholesale Market<br>
            • Chittagong Agricultural Market<br>
            • Local Collection Centers<br><br>
            
            <strong>📊 Market Trends:</strong><br>
            • High demand from processing companies<br>
            • Export opportunities increasing<br>
            • Prices expected to remain stable<br><br>
            
            <strong>💡 Selling Tips:</strong><br>
            • Ensure proper moisture content (14%)<br>
            • Clean and grade your paddy<br>
            • Consider collective selling for better prices
        `
    },
    feedback: {
        title: 'Help Us Improve',
        content: `
            <strong>💬 YOUR FEEDBACK MATTERS</strong><br><br>
            
            Help us make GeoGuardian alerts more useful for you!<br><br>
            
            <strong>📝 We'd love to know:</strong><br>
            • Are alerts timely and relevant?<br>
            • What additional information would be helpful?<br>
            • Which alerts are most valuable to you?<br>
            • Any suggestions for improvement?<br><br>
            
            <strong>👨‍💻 Developer Contact:</strong><br>
            • Team: StellarSeeds<br>
            • Phone: 01842823300<br>
            • Email: ahmadzubayer007@gmail.com<br><br>
            
            <strong>🏆 Rewards Program:</strong><br>
            Share feedback and get points that can be redeemed for:<br>
            • Premium weather forecasts<br>
            • Agricultural consultation credits<br>
            • Market price alerts<br><br>
            
            Thank you for helping us serve you better!
        `
    },
    weather: {
        title: 'Weather Advisory',
        content: `
            <strong>⛈️ SEVERE WEATHER WARNING</strong><br><br>
            
            Strong winds and thunderstorms are expected tonight. Take immediate precautions:<br><br>
            
            <strong>🌪️ Wind Safety:</strong><br>
            • Secure all loose farm equipment<br>
            • Tie down greenhouse covers and tarps<br>
            • Bring in lightweight tools and containers<br><br>
            
            <strong>⚡ Storm Precautions:</strong><br>
            • Shelter livestock in secure areas<br>
            • Avoid working in open fields<br>
            • Disconnect electrical equipment<br><br>
            
            <strong>🌾 Crop Protection:</strong><br>
            • Cover young plants if possible<br>
            • Ensure proper drainage in fields<br>
            • Check crop insurance coverage<br><br>
            
            <strong>🚨 Safety First:</strong><br>
            • Stay indoors during the storm<br>
            • Keep emergency kit ready<br>
            • Monitor weather updates regularly
        `
    },
    pest: {
        title: 'Pest Management Alert',
        content: `
            <strong>🐛 PEST ALERT: BROWN PLANTHOPPER</strong><br><br>
            
            Brown planthopper activity has been detected in nearby rice fields. Take preventive action now:<br><br>
            
            <strong>🔍 Identification:</strong><br>
            • Small brown insects on rice stems<br>
            • Yellow/orange patches on leaves<br>
            • Stunted plant growth<br><br>
            
            <strong>🛡️ Prevention:</strong><br>
            • Inspect fields twice weekly<br>
            • Maintain proper field sanitation<br>
            • Avoid excessive nitrogen fertilizer<br><br>
            
            <strong>💊 Treatment Options:</strong><br>
            • Biological: Release natural predators<br>
            • Chemical: Use recommended insecticides<br>
            • Cultural: Adjust water management<br><br>
            
            <strong>📞 Get Help:</strong><br>
            Contact your agricultural extension officer for:<br>
            • Field assessment<br>
            • Treatment recommendations<br>
            • Pesticide application guidelines
        `
    }
};

// Function to show alert modal
function showAlertModal(alertType) {
    const modal = document.getElementById('alertModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    if (alertDetails[alertType]) {
        modalTitle.textContent = alertDetails[alertType].title;
        modalBody.innerHTML = alertDetails[alertType].content;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    
    console.log(`Opened alert modal: ${alertType}`);
}

// Function to close alert modal
function closeAlertModal() {
    const modal = document.getElementById('alertModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
    console.log('Closed alert modal');
}

// Setup modal events
function setupModalEvents() {
    const modal = document.getElementById('alertModal');
    
    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeAlertModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeAlertModal();
        }
    });
}

// Function to add new alert
function addAlert(type, title, description, icon = 'fas fa-bell') {
    const alertsList = document.querySelector('.alerts-list');
    
    const alertCard = document.createElement('div');
    alertCard.className = `alert-card ${type}`;
    alertCard.onclick = function() { showAlertModal('custom'); };
    
    alertCard.innerHTML = `
        <div class="alert-icon ${type}">
            <i class="${icon}"></i>
        </div>
        <div class="alert-content">
            <div class="alert-title">${title}</div>
            <div class="alert-description">${description}</div>
        </div>
    `;
    
    // Add to top of list
    alertsList.insertBefore(alertCard, alertsList.firstChild);
}

// Function to remove alert
function removeAlert(index) {
    const alertCards = document.querySelectorAll('.alert-card');
    if (alertCards[index]) {
        alertCards[index].remove();
    }
}

// Export functions for external use
window.AlertsPage = {
    showAlertModal,
    closeAlertModal,
    addAlert,
    removeAlert
};
