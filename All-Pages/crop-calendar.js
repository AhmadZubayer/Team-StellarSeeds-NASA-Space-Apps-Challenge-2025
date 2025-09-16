// Crop Calendar JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Crop Calendar loaded and ready');
    
    // Initialize navigation
    setupNavigation();
    
    // Initialize calendar functionality
    initializeCalendar();
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
                // Already on calendar page, do nothing
                event.preventDefault();
            } else {
                // For other nav items, prevent default
                event.preventDefault();
                console.log('Navigation to', page, 'coming soon!');
            }
        });
    });
}

function initializeCalendar() {
    // Calendar data that can be updated dynamically
    const calendarData = [
        {
            date: "Sunday, August 31",
            weather: "Heavy Rain",
            task: "Avoid Sowing",
            weatherIcon: "fas fa-cloud-rain",
            weatherClass: "rain"
        },
        {
            date: "Monday, September 1",
            weather: "Rain",
            task: "Delay Planting",
            weatherIcon: "fas fa-cloud-rain",
            weatherClass: "rain"
        },
        {
            date: "Tuesday, September 2",
            weather: "Cloudy",
            task: "Prepare Land",
            weatherIcon: "fas fa-cloud",
            weatherClass: "cloudy"
        },
        {
            date: "Wednesday, September 3",
            weather: "Sunny",
            task: "Good Sowing",
            weatherIcon: "fas fa-sun",
            weatherClass: "sunny"
        },
        {
            date: "Thursday, September 4",
            weather: "Sunny",
            task: "Irrigate Wheat",
            weatherIcon: "fas fa-sun",
            weatherClass: "sunny"
        },
        {
            date: "Friday, September 5",
            weather: "Cloudy",
            task: "Study Rice",
            weatherIcon: "fas fa-cloud",
            weatherClass: "cloudy"
        },
        {
            date: "Saturday, September 6",
            weather: "Light Rain",
            task: "Monitor Crops",
            weatherIcon: "fas fa-cloud-drizzle",
            weatherClass: "rain"
        }
    ];
    
    // Update calendar items with data
    updateCalendarDisplay(calendarData);
}

// Function to update calendar display
function updateCalendarDisplay(data) {
    data.forEach((item, index) => {
        const itemIndex = index + 1;
        
        // Update date
        const dateElement = document.getElementById(`date${itemIndex}`);
        if (dateElement) {
            dateElement.innerText = item.date;
        }
        
        // Update weather
        const weatherElement = document.getElementById(`weather${itemIndex}`);
        if (weatherElement) {
            weatherElement.innerText = item.weather;
        }
        
        // Update task
        const taskElement = document.getElementById(`task${itemIndex}`);
        if (taskElement) {
            taskElement.innerText = item.task;
        }
        
        // Update weather icon
        const iconElement = document.getElementById(`weatherIcon${itemIndex}`);
        if (iconElement) {
            iconElement.className = item.weatherIcon;
            iconElement.parentElement.className = `weather-icon ${item.weatherClass}`;
        }
    });
}

// Function to update individual calendar item
function updateCalendarItem(index, date, weather, task, weatherIcon = "fas fa-sun", weatherClass = "sunny") {
    const itemIndex = index + 1;
    
    const dateElement = document.getElementById(`date${itemIndex}`);
    const weatherElement = document.getElementById(`weather${itemIndex}`);
    const taskElement = document.getElementById(`task${itemIndex}`);
    const iconElement = document.getElementById(`weatherIcon${itemIndex}`);
    
    if (dateElement) dateElement.innerText = date;
    if (weatherElement) weatherElement.innerText = weather;
    if (taskElement) taskElement.innerText = task;
    if (iconElement) {
        iconElement.className = weatherIcon;
        iconElement.parentElement.className = `weather-icon ${weatherClass}`;
    }
}

// Export functions for external use
window.CropCalendar = {
    updateCalendarDisplay,
    updateCalendarItem
};
