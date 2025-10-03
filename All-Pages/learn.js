document.addEventListener('DOMContentLoaded', function() {
    console.log('Learn.js loaded and ready');

    initializeLearnPage();
});

function initializeLearnPage() {
    setupNavigation();

    setupProfileInteraction();

    setupVideoInteractions();

    setupCategoryInteractions();

    setupQuizFunctionality();
}

function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', function(event) {
            const page = this.getAttribute('data-page');
            const href = this.getAttribute('href');

            console.log('Navigation clicked:', page, 'href:', href);
            
        });
    });
}

function handleNavigation(page) {
    console.log('Navigating to:', page);

    switch(page) {
        case 'learn':
            break;
        case 'chat':
            window.location.href = 'chatAI.html';
            break;
        case 'calendar':
            window.location.href = 'crop-calendar.html';
            break;
        case 'sell':
            window.location.href = 'sell.html';
            break;
        case 'alerts':
            window.location.href = 'alerts.html';
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

            if (confirm('Are you sure you want to log out?')) {
                handleLogout();
            }
        });
    }

    if (profilePopup) {
        profilePopup.addEventListener('click', function(event) {
            if (event.target === profilePopup) {
                hideProfilePopup();
            }
        });
    }
}

function setupVideoInteractions() {
    const videoThumbnails = document.querySelectorAll('.video-thumbnail');

    videoThumbnails.forEach(video => {
        video.addEventListener('click', function() {
            const iframe = this.querySelector('iframe');
            const title = this.querySelector('h4').textContent;

            console.log('Video clicked:', title);
            showMessage('Opening video tutorial...', 'info');

            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });

        video.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.2s ease';
        });

        video.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    const viewMoreLink = document.querySelector('a[href="#"]');
    if (viewMoreLink && viewMoreLink.textContent.includes('View More Tutorials')) {
        viewMoreLink.addEventListener('click', function(event) {
            event.preventDefault();
            showMessage('More tutorials will be available soon!', 'info');
        });
    }
}

function setupCategoryInteractions() {
    const categoryCards = document.querySelectorAll('.category-card');

    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const categoryName = this.querySelector('h3').textContent;
            console.log('Category clicked:', categoryName);

            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);

            showMessage(`Loading ${categoryName} tutorials...`, 'info');
        });
    });

    // Handle "View More Categories" link
    const viewMoreCategoriesLink = document.querySelector('a[href="#"]');
    const links = document.querySelectorAll('a[href="#"]');
    links.forEach(link => {
        if (link.textContent.includes('View More Categories')) {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                showMessage('More categories coming soon!', 'info');
            });
        }
    });
}

function setupQuizFunctionality() {
    const quizSection = document.getElementById('quizSection');
    const quizPopup = document.getElementById('quizPopup');
    const closeQuizBtn = document.getElementById('closeQuizPopup');
    const submitQuizBtn = document.getElementById('submitQuizAnswer');
    const quizOptions = document.querySelectorAll('.quiz-option');
    const quizResult = document.getElementById('quizResult');
    const quizResultText = document.getElementById('quizResultText');

    let selectedAnswer = null;

    // Quiz section click to open popup
    if (quizSection) {
        quizSection.addEventListener('click', function() {
            console.log('Quiz section clicked - opening popup');
            showQuizPopup();
        });
    }

    if (closeQuizBtn) {
        closeQuizBtn.addEventListener('click', function() {
            hideQuizPopup();
        });
    }

    quizOptions.forEach(option => {
        option.addEventListener('click', function() {
            quizOptions.forEach(opt => {
                opt.classList.remove('selected');
                const radio = opt.querySelector('.w-4');
                radio.style.backgroundColor = '';
                radio.style.borderColor = '#d1d5db';
            });

            this.classList.add('selected');
            const radio = this.querySelector('.w-4');
            radio.style.backgroundColor = '#3b82f6';
            radio.style.borderColor = '#3b82f6';

            selectedAnswer = this.getAttribute('data-answer');

            if (submitQuizBtn) {
                submitQuizBtn.disabled = false;
                submitQuizBtn.classList.remove('btn-disabled');
            }

            console.log('Selected answer:', selectedAnswer);
        });
    });

    if (submitQuizBtn) {
        submitQuizBtn.addEventListener('click', function() {
            if (!selectedAnswer) return;

            console.log('Submitting quiz answer:', selectedAnswer);

            const isCorrect = selectedAnswer === 'drainage-canals';

            if (quizResult && quizResultText) {
                quizResult.classList.remove('hidden');

                if (isCorrect) {
                    quizResult.classList.add('bg-green-100', 'border', 'border-green-300');
                    quizResult.classList.remove('bg-red-100', 'border-red-300');
                    quizResultText.textContent = '✓ Correct! Drainage canals help prevent flood damage by directing water away from farmland.';
                    quizResultText.classList.add('text-green-700');
                    quizResultText.classList.remove('text-red-700');
                } else {
                    quizResult.classList.add('bg-red-100', 'border', 'border-red-300');
                    quizResult.classList.remove('bg-green-100', 'border-green-300');
                    quizResultText.textContent = '✗ Incorrect. The correct answer is Drainage Canals. They help channel excess water away from crops.';
                    quizResultText.classList.add('text-red-700');
                    quizResultText.classList.remove('text-green-700');
                }
            }

            // Disable submit button after answering
            this.disabled = true;
            this.textContent = 'Answer Submitted';

            // Auto close popup after 3 seconds
            setTimeout(() => {
                hideQuizPopup();
                resetQuiz();
            }, 3000);
        });
    }

    if (quizPopup) {
        quizPopup.addEventListener('click', function(event) {
            if (event.target === quizPopup) {
                hideQuizPopup();
            }
        });
    }
}

function showQuizPopup() {
    const quizPopup = document.getElementById('quizPopup');

    if (quizPopup) {
        quizPopup.classList.remove('hidden');

        setTimeout(() => {
            quizPopup.classList.add('show');
        }, 10);

        console.log('Quiz popup shown');
    }
}

function hideQuizPopup() {
    const quizPopup = document.getElementById('quizPopup');

    if (quizPopup) {
        quizPopup.classList.remove('show');

        setTimeout(() => {
            quizPopup.classList.add('hidden');
        }, 300);

        console.log('Quiz popup hidden');
    }
}

function resetQuiz() {
    const quizOptions = document.querySelectorAll('.quiz-option');
    const submitQuizBtn = document.getElementById('submitQuizAnswer');
    const quizResult = document.getElementById('quizResult');

    quizOptions.forEach(option => {
        option.classList.remove('selected');
        const radio = option.querySelector('.w-4');
        radio.style.backgroundColor = '';
        radio.style.borderColor = '#d1d5db';
    });

    // Reset submit button
    if (submitQuizBtn) {
        submitQuizBtn.disabled = true;
        submitQuizBtn.textContent = 'Submit Answer';
        submitQuizBtn.classList.add('btn-disabled');
    }

    // Hide result
    if (quizResult) {
        quizResult.classList.add('hidden');
        quizResult.classList.remove('bg-green-100', 'bg-red-100', 'border-green-300', 'border-red-300');
    }

    selectedAnswer = null;
    console.log('Quiz reset');
}

// Profile popup functions
function showProfilePopup() {
    const profilePopup = document.getElementById('profilePopup');
    const popupUserName = document.getElementById('popupUserName');
    const popupCityName = document.getElementById('popupCityName');

    if (profilePopup) {
        // Update popup with current user data
        if (popupUserName) {
            popupUserName.innerText = 'Shihab Chashi';
        }

        // Get location data from localStorage if available
        const locationData = localStorage.getItem('geoguardian_location');
        if (locationData && popupCityName) {
            try {
                const parsedData = JSON.parse(locationData);
                // Use a simple reverse geocoding or stored city name
                popupCityName.innerText = 'Your Location';
            } catch (error) {
                popupCityName.innerText = 'Location not available';
            }
        }

        // Show popup
        profilePopup.classList.remove('hidden');

        // Trigger animation after a brief delay
        setTimeout(() => {
            profilePopup.classList.add('show');
        }, 10);

        console.log('Profile popup shown');
    }
}

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

function handleLogout() {
    console.log('Logging out user...');

    // Clear stored data
    localStorage.removeItem('geoguardian_location');
    localStorage.removeItem('userSession');

    showMessage('Logging out...', 'success');

    setTimeout(() => {
        window.location.href = 'register.html';
    }, 1500);
}

function showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `alert alert-${type} fixed top-20 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 max-w-sm`;
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
            if (messageDiv.parentNode) {
                document.body.removeChild(messageDiv);
            }
        }, 300);
    }, 3000);
}

window.LearnPageManager = {
    showProfilePopup,
    hideProfilePopup,
    handleLogout,
    showMessage
};
