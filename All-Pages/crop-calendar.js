document.addEventListener('DOMContentLoaded', function() {
    console.log('Crop Calendar loaded and ready');
    
    setupNavigation();
    
    initializeCalendar();
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
            } else {
                event.preventDefault();
                console.log('Navigation to', page, 'coming soon!');
            }
        });
    });
}

function initializeCalendar() {
    const calendarData = [
        {
            date: "Saturday, October 4",
            weather: "🌧 Periods of rain, humid, warm (30°/25°)",
            task: "Avoid Sowing",
            weatherIcon: "fas fa-cloud-rain",
            weatherClass: "rain"
        },
        {
            date: "Sunday, October 5",
            weather: "🌦 Showers, thick cloud cover (31°/25°)",
            task: "Delay Planting",
            weatherIcon: "fas fa-cloud-rain",
            weatherClass: "rain"
        },
        {
            date: "Monday, October 6",
            weather: "🌧 Morning showers, cloudy later (31°/25°)",
            task: "Prepare Land",
            weatherIcon: "fas fa-cloud-rain",
            weatherClass: "rain"
        },
        {
            date: "Tuesday, October 7",
            weather: "⛅ Mostly cloudy, light afternoon rain (31°/25°)",
            task: "Monitor Weather",
            weatherIcon: "fas fa-cloud",
            weatherClass: "cloudy"
        },
        {
            date: "Wednesday, October 8",
            weather: "⛅ Mostly cloudy, chance of afternoon showers (31°/25°)",
            task: "Check Irrigation",
            weatherIcon: "fas fa-cloud",
            weatherClass: "cloudy"
        },
        {
            date: "Thursday, October 9",
            weather: "🌦 Morning showers, light afternoon rain (31°/26°)",
            task: "Study Rice",
            weatherIcon: "fas fa-cloud-rain",
            weatherClass: "rain"
        },
        {
            date: "Friday, October 10",
            weather: "⛅ Cloudy, possible showers (31°/26°)",
            task: "Monitor Crops",
            weatherIcon: "fas fa-cloud",
            weatherClass: "cloudy"
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
        
        const weatherElement = document.getElementById(`weather${itemIndex}`);
        if (weatherElement) {
            weatherElement.innerText = item.weather;
        }
        
        const taskElement = document.getElementById(`task${itemIndex}`);
        if (taskElement) {
            taskElement.innerText = item.task;
        }
        
        const iconElement = document.getElementById(`weatherIcon${itemIndex}`);
        if (iconElement) {
            iconElement.className = item.weatherIcon;
            iconElement.parentElement.className = `weather-icon ${item.weatherClass}`;
        }
    });
}

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

window.CropCalendar = {
    updateCalendarDisplay,
    updateCalendarItem
};
