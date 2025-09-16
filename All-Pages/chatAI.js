// Simple Chatbot for GeoGuardian using DaisyUI chat UI
const chatMessages = document.getElementById('chatMessages');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');

const simpleAnswers = {
    'how to protect crops from flood': 'You can use raised beds and proper drainage channels to protect crops from flood damage.',
    'how to improve soil fertility': 'Add organic compost and rotate crops to improve soil fertility.',
    'how to save water in farming': 'Use drip irrigation and rainwater harvesting to save water in farming.',
    'how to manage drought': 'Grow drought-resistant crops and mulch soil to retain moisture.',
    'how to prevent crop diseases': 'Practice crop rotation and use disease-resistant seeds.'
};

function addMessage(text, sender = 'user') {
    const msgDiv = document.createElement('div');
    msgDiv.className = sender === 'user' ? 'chat chat-end' : 'chat chat-start';
    // Use theme-matching bubble colors
    const bubbleColor = sender === 'user' ? 'bg-green-500 text-white' : 'bg-gray-100 text-green-800';
    msgDiv.innerHTML = `<div class="chat-bubble ${bubbleColor}" style="border-radius:16px;padding:10px 18px;max-width:80%;font-size:1rem;">${text}</div>`;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotAnswer(question) {
    const q = question.trim().toLowerCase();
    for (const key in simpleAnswers) {
        if (q.includes(key)) {
            return simpleAnswers[key];
        }
    }
    return "Sorry, I don't know the answer. Try searching on Google.";
}

chatForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const userText = chatInput.value.trim();
    if (!userText) return;
    addMessage(userText, 'user');
    setTimeout(() => {
        addMessage(getBotAnswer(userText), 'bot');
    }, 600);
    chatInput.value = '';
    hideSuggestions();
});

// Handle suggestion button clicks
function handleSuggestionClick(question) {
    chatInput.value = question;
    addMessage(question, 'user');
    setTimeout(() => {
        addMessage(getBotAnswer(question), 'bot');
    }, 600);
    chatInput.value = '';
    hideSuggestions();
}

// Hide suggestions after first interaction
function hideSuggestions() {
    const suggestions = document.getElementById('suggestions');
    if (suggestions) {
        suggestions.style.display = 'none';
    }
}

// Add event listeners for suggestion buttons
document.addEventListener('DOMContentLoaded', function() {
    const suggestionBtns = document.querySelectorAll('.suggestion-btn');
    suggestionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const question = this.getAttribute('data-question');
            handleSuggestionClick(question);
        });
    });
});

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
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
                // Already on chat page, do nothing
                event.preventDefault();
            } else {
                // For other nav items, prevent default
                event.preventDefault();
                console.log('Navigation to', page, 'coming soon!');
            }
        });
    });
});
