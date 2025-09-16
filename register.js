// register.js - Basic DOM manipulation for GeoGuardian register page

document.addEventListener('DOMContentLoaded', function() {
    console.log('GeoGuardian Register JS loaded successfully');

    // Get form elements
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');
    const signInButton = signInForm.querySelector('button[type="submit"]');
    const signUpButton = signUpForm.querySelector('button[type="submit"]');

    // Handle Sign In form submission
    signInForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission

        console.log('Sign In button clicked');

        // Get form values (for logging purposes only)
        const email = signInForm.querySelector('input[type="text"]').value;
        const password = signInForm.querySelectorAll('input[type="text"]')[1].value;

        console.log('Email entered:', email);
        console.log('Password entered:', password);

        // No validation - allow any input or empty fields

        // Show loading state
        signInButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Signing In...';
        signInButton.disabled = true;

        // Simulate a brief loading delay for better UX
        setTimeout(() => {
            console.log('Redirecting to location.html');
            // Redirect to location.html
            window.location.href = 'location.html';
        }, 1000);
    });

    // Handle Sign Up form submission (for completeness)
    signUpForm.addEventListener('submit', function(e) {
        e.preventDefault();

        console.log('Sign Up button clicked');

        // Get form values
        const inputs = signUpForm.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
        const name = inputs[0].value.trim();
        const email = inputs[1].value.trim();
        const password = inputs[2].value;
        const confirmPassword = inputs[3].value;

        // Basic validation
        if (!name || !email || !password || !confirmPassword) {
            showMessage('Please fill in all fields.', false);
            return;
        }

        if (password !== confirmPassword) {
            showMessage('Passwords do not match.', false);
            return;
        }

        if (password.length < 6) {
            showMessage('Password must be at least 6 characters long.', false);
            return;
        }

        // Show loading state
        signUpButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Creating Account...';
        signUpButton.disabled = true;

        // Simulate account creation and redirect
        setTimeout(() => {
            console.log('Account created, redirecting to location.html');
            showMessage('🎉 Account created successfully!', true);

            // Redirect after showing success message
            setTimeout(() => {
                window.location.href = 'location.html';
            }, 1500);
        }, 1000);
    });

    // Tab switching functionality
    window.showTab = function(tab) {
        const signInForm = document.getElementById('signInForm');
        const signUpForm = document.getElementById('signUpForm');
        const signInTab = document.getElementById('signInTab');
        const signUpTab = document.getElementById('signUpTab');

        // Reset any previous messages and button states
        document.getElementById('formMessage').textContent = '';
        resetButtonStates();

        if (tab === 'signIn') {
            signInForm.classList.remove('hidden', 'slide-in-right');
            signInForm.classList.add('slide-in-left');
            signUpForm.classList.add('hidden');

            signInTab.classList.add('tab-active', 'bg-white', 'text-green-700', 'shadow-sm');
            signInTab.classList.remove('text-gray-600');
            signUpTab.classList.remove('tab-active', 'bg-white', 'text-green-700', 'shadow-sm');
            signUpTab.classList.add('text-gray-600');
        } else {
            signUpForm.classList.remove('hidden', 'slide-in-left');
            signUpForm.classList.add('slide-in-right');
            signInForm.classList.add('hidden');

            signUpTab.classList.add('tab-active', 'bg-white', 'text-green-700', 'shadow-sm');
            signUpTab.classList.remove('text-gray-600');
            signInTab.classList.remove('tab-active', 'bg-white', 'text-green-700', 'shadow-sm');
            signInTab.classList.add('text-gray-600');
        }
    };

    // Helper function to show messages
    function showMessage(msg, success) {
        const el = document.getElementById('formMessage');
        el.textContent = msg;
        el.className = `mt-6 text-center text-sm font-medium transition-all ${
            success ? 'text-green-600' : 'text-red-500'
        }`;

        // Add pulse animation for success
        if (success) {
            el.classList.add('animate-pulse');
            setTimeout(() => el.classList.remove('animate-pulse'), 3000);
        }
    }

    // Helper function to reset button states
    function resetButtonStates() {
        // Reset Sign In button
        signInButton.innerHTML = '<i class="fas fa-sign-in-alt mr-2"></i>Sign In';
        signInButton.disabled = false;

        // Reset Sign Up button
        signUpButton.innerHTML = '<i class="fas fa-user-plus mr-2"></i>Create Account';
        signUpButton.disabled = false;
    }

    // Initialize with Sign In tab active
    showTab('signIn');

    // Add some additional interactivity
    const socialButtons = document.querySelectorAll('.flex-1');
    socialButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const provider = this.textContent.trim();
            console.log(`${provider} login clicked`);
            showMessage(`${provider} login feature coming soon!`, false);
        });
    });

    console.log('All event listeners attached successfully');
});
