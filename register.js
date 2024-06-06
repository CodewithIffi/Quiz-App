// register.js

const registerForm = document.getElementById('register-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const registerBtn = document.getElementById('register-btn');

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (password === confirmPassword) {
        // Create new user object
        const user = {
            email,
            password,
        };

        // Get existing users from local storage
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Add new user to the list
        users.push(user);

        // Store users in local storage
        localStorage.setItem('users', JSON.stringify(users));

        console.log(`Registered new user with email ${email}`);
    } else {
        alert('Passwords do not match');
    }
});