// Sell Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Sell page loaded and ready');
    
    // Initialize navigation
    setupNavigation();
    
    // Initialize sell page functionality
    initializeSellPage();
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
                // Already on sell page, do nothing
                event.preventDefault();
            } else {
                // For other nav items, prevent default
                event.preventDefault();
                console.log('Navigation to', page, 'coming soon!');
            }
        });
    });
}

function initializeSellPage() {
    // Add any initialization logic here
    console.log('Sell page initialized');
    
    // Initialize price chart
    initializePriceChart();
}

// Initialize Chart.js price trends chart
function initializePriceChart() {
    const ctx = document.getElementById('priceChart').getContext('2d');
    
    const priceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Rice Price (৳/kg)',
                data: [42, 45, 44, 47, 49, 48, 52],
                borderColor: '#22c55e',
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#22c55e',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 5
            }, {
                label: 'Wheat Price (৳/kg)',
                data: [35, 36, 38, 37, 39, 40, 42],
                borderColor: '#f59e0b',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#f59e0b',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 15,
                        font: {
                            size: 12,
                            weight: '600'
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: '#f3f4f6',
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            size: 11
                        },
                        color: '#6b7280',
                        callback: function(value) {
                            return '৳' + value;
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 11
                        },
                        color: '#6b7280'
                    }
                }
            },
            elements: {
                point: {
                    hoverRadius: 8
                }
            }
        }
    });
    
    // Store chart instance for later updates
    window.priceChart = priceChart;
}

// Function to handle post crop button
function postCrop() {
    // Show the post crop popup
    const popup = document.getElementById('postCropPopup');
    if (popup) {
        popup.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    console.log('Post Crop popup opened');
}

// Function to close post crop popup
function closePostCropPopup() {
    const popup = document.getElementById('postCropPopup');
    if (popup) {
        popup.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
    console.log('Post Crop popup closed');
}

// Function to handle form submission
function submitCropPost(event) {
    event.preventDefault();
    
    // Get form values
    const cropName = document.getElementById('cropName').value;
    const cropDetails = document.getElementById('cropDetails').value;
    const cropQuantity = document.getElementById('cropQuantity').value;
    const cropPrice = document.getElementById('cropPrice').value;
    const cropImages = document.getElementById('cropImages').files;
    
    // Basic validation
    if (!cropName || !cropDetails || !cropQuantity || !cropPrice) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Create crop data object
    const cropData = {
        name: cropName,
        details: cropDetails,
        quantity: cropQuantity,
        price: cropPrice,
        images: cropImages.length,
        timestamp: new Date().toISOString()
    };
    
    console.log('Crop data submitted:', cropData);
    
    // Show success message
    alert('Crop posted successfully! Your listing will be reviewed and published soon.');
    
    // Reset form
    document.getElementById('postCropForm').reset();
    
    // Close popup
    closePostCropPopup();
    
    // Optionally add the new crop to the marketplace feed
    addNewCropToFeed(cropData);
}

// Function to add newly posted crop to the feed
function addNewCropToFeed(cropData) {
    // Add the new crop at the top of the marketplace feed
    addCropCard(
        cropData.name,
        cropData.price,
        'You', // Current user
        'Your Location',
        'fas fa-seedling',
        'text-green-500'
    );
}

// Close popup when clicking outside
document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('postCropPopup');
    if (popup) {
        popup.addEventListener('click', function(event) {
            if (event.target === popup) {
                closePostCropPopup();
            }
        });
    }
});

// Function to handle contact seller
function contactSeller(sellerName) {
    // Show contact information or open contact form
    alert(`Contacting ${sellerName}... Phone: +880-123-456-789`);
    console.log(`Contact seller: ${sellerName}`);
}

// Function to update crop card data
function updateCropCard(index, cropName, price, sellerName, location, icon = 'fas fa-seedling', iconColor = 'text-green-500') {
    const cropCards = document.querySelectorAll('.crop-card');
    if (cropCards[index]) {
        const card = cropCards[index];
        
        // Update crop name
        const nameElement = card.querySelector('.crop-name');
        if (nameElement) nameElement.innerText = cropName;
        
        // Update price
        const priceElement = card.querySelector('.crop-price');
        if (priceElement) priceElement.innerText = price;
        
        // Update seller info
        const sellerElement = card.querySelector('.seller-info');
        if (sellerElement) sellerElement.innerText = `${sellerName} • ${location}`;
        
        // Update icon
        const iconElement = card.querySelector('.crop-image i');
        if (iconElement) {
            iconElement.className = `${icon} ${iconColor} text-2xl`;
        }
        
        // Update contact button
        const contactBtn = card.querySelector('.contact-btn');
        if (contactBtn) {
            contactBtn.setAttribute('onclick', `contactSeller('${sellerName}')`);
        }
    }
}

// Function to add new crop card
function addCropCard(cropName, price, sellerName, location, icon = 'fas fa-seedling', iconColor = 'text-green-500') {
    const marketplaceFeed = document.querySelector('.marketplace-feed');
    
    const cropCard = document.createElement('div');
    cropCard.className = 'crop-card';
    
    cropCard.innerHTML = `
        <div class="crop-image">
            <i class="${icon} ${iconColor} text-2xl"></i>
        </div>
        <div class="crop-info">
            <div class="crop-name">${cropName}</div>
            <div class="crop-price">${price}</div>
            <div class="seller-info">${sellerName} • ${location}</div>
        </div>
        <button class="contact-btn" onclick="contactSeller('${sellerName}')">Contact</button>
    `;
    
    marketplaceFeed.appendChild(cropCard);
}

// Function to update price trends
function updatePriceTrends(cropData) {
    if (window.priceChart) {
        // Update chart data
        window.priceChart.data.datasets[0].data = cropData.rice || [42, 45, 44, 47, 49, 48, 52];
        window.priceChart.data.datasets[1].data = cropData.wheat || [35, 36, 38, 37, 39, 40, 42];
        window.priceChart.update();
    }
}

// Function to add new crop data series to chart
function addCropToChart(cropName, priceData, color = '#22c55e') {
    if (window.priceChart) {
        const newDataset = {
            label: `${cropName} Price (৳/kg)`,
            data: priceData,
            borderColor: color,
            backgroundColor: color + '20',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: color,
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 5
        };
        
        window.priceChart.data.datasets.push(newDataset);
        window.priceChart.update();
    }
}

// Function to update smart recommendations
function updateSmartRecommendations(recommendation1, recommendation2, recommendation3) {
    const recommendationsText = document.querySelector('.recommendations-text');
    if (recommendationsText) {
        recommendationsText.innerHTML = `
            ${recommendation1}<br>
            ${recommendation2}<br>
            ${recommendation3}
        `;
    }
}

// Export functions for external use
window.SellPage = {
    updateCropCard,
    addCropCard,
    updatePriceTrends,
    addCropToChart,
    updateSmartRecommendations,
    postCrop,
    contactSeller
};
