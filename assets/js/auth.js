$(document).ready(function() {
    // Check if user is logged in
    const checkAuth = () => {
        const token = localStorage.getItem('userToken');
        if (token) {
            $('#loginBtn').hide();
            $('#signupBtn').html('Logout').attr('href', '#');
            return true;
        }
        return false;
    };

    // Login Form Submit
    $('#loginForm').submit(function(e) {
        e.preventDefault();
        const email = $('#email').val();
        const password = $('#password').val();

        // Simulate login (In real app, this would be an API call)
        if (email && password) {
            localStorage.setItem('userToken', 'dummy-token');
            localStorage.setItem('userEmail', email);
            window.location.href = '../index.html';
        }
    });

    // Signup Form Submit
    $('#signupForm').submit(function(e) {
        e.preventDefault();
        const email = $('#email').val();
        const password = $('#password').val();
        const confirmPassword = $('#confirmPassword').val();

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        // Simulate signup
        localStorage.setItem('userToken', 'dummy-token');
        localStorage.setItem('userEmail', email);
        window.location.href = '../index.html';
    });

    // Logout
    $('#signupBtn').click(function(e) {
        if (checkAuth()) {
            e.preventDefault();
            localStorage.removeItem('userToken');
            localStorage.removeItem('userEmail');
            window.location.reload();
        }
    });

    // Check auth status on page load
    checkAuth();
});

// Function to check if the user is logged in
function isLoggedIn() {
    return localStorage.getItem('user') !== null;
}

// Function to redirect to login page
function redirectToLogin() {
    const currentPage = window.location.pathname;
    localStorage.setItem('redirectAfterLogin', currentPage);
    window.location.href = '/pages/login.html';
}

// Function to protect routes
function protectRoute() {
    if (!isLoggedIn()) {
        redirectToLogin();
    }
}

// Function to handle redirect after login
function handleRedirectAfterLogin() {
    const redirectPath = localStorage.getItem('redirectAfterLogin');
    if (redirectPath) {
        localStorage.removeItem('redirectAfterLogin');
        window.location.href = redirectPath;
    } else {
        window.location.href = '/index.html';
    }
}

// Update login function
function login(email, password) {
    // Simulate login (replace with actual authentication logic)
    localStorage.setItem('user', JSON.stringify({ email: email }));
    handleRedirectAfterLogin();
}

// Add logout function
function logout() {
    localStorage.removeItem('user');
    window.location.href = '/index.html';
}
