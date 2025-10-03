document.addEventListener('DOMContentLoaded', function() {
    console.log('Sell page loaded and ready');
    
    setupNavigation();
    
    initializeSellPage();
});

function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(event) {
            const page = this.getAttribute('data-page');
            
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
            } else {
                event.preventDefault();
                console.log('Navigation to', page, 'coming soon!');
            }
        });
    });
}

function initializeSellPage() {
    console.log('Sell page initialized');
    
    initializePriceChart();
}

function initializePriceChart() {
    const ctx = document.getElementById('priceChart').getContext('2d');
    
    const priceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Rose Price (৳/100 pieces)',
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
                label: ' Sunflower (৳/kg)',
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
    window.priceChart = priceChart;
}

function postCrop() {
    const popup = document.getElementById('postCropPopup');
    if (popup) {
        popup.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    console.log('Post Crop popup opened');
}

function closePostCropPopup() {
    const popup = document.getElementById('postCropPopup');
    if (popup) {
        popup.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    console.log('Post Crop popup closed');
}

function submitCropPost(event) {
    event.preventDefault();
    
    const cropName = document.getElementById('cropName').value;
    const cropDetails = document.getElementById('cropDetails').value;
    const cropQuantity = document.getElementById('cropQuantity').value;
    const cropPrice = document.getElementById('cropPrice').value;
    const cropImages = document.getElementById('cropImages').files;
    
    if (!cropName || !cropDetails || !cropQuantity || !cropPrice) {
        alert('Please fill in all required fields');
        return;
    }
    
    const cropData = {
        name: cropName,
        details: cropDetails,
        quantity: cropQuantity,
        price: cropPrice,
        images: cropImages.length,
        timestamp: new Date().toISOString()
    };
    
    console.log('Crop data submitted:', cropData);
    
    alert('Crop posted successfully! Your listing will be reviewed and published soon.');
    
    document.getElementById('postCropForm').reset();
    
    closePostCropPopup();
    
    addNewCropToFeed(cropData);
}

function addNewCropToFeed(cropData) {
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

window.SellPage = {
    updateCropCard,
    addCropCard,
    updatePriceTrends,
    addCropToChart,
    updateSmartRecommendations,
    postCrop,
    contactSeller
};
