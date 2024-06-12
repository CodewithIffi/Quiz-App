// register.js

const registerForm = document.getElementById('register-form');
const nameInput = document.getElementById('full-name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const registerBtn = document.getElementById('register-btn');

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (password === confirmPassword) {
        const user = {
            name,
            email,
            password,
        };

        const users = JSON.parse(localStorage.getItem('users')) || [];


        users.push(user);

        localStorage.setItem('users', JSON.stringify(users));
        Swal.fire({
            title: 'Success!',
            text: 'Your account registered successfully!',
            icon: 'success',
            confirmButtonText: 'Login',
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "login.html";
            }
        });

        console.log(`Registered new user with email ${email}`);
    } else {
        alert('Passwords do not match');

    }
});
