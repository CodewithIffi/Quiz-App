// login.js

const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;


    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((user) => user.email === email && user.password === password);

    if (user) {
        console.log(`Logged in successfully as ${email}`);

        localStorage.setItem('loggedIn', true);
        localStorage.setItem('currentUser', JSON.stringify(user));

        Swal.fire({
            title: 'Success!',
            text: 'You have successfully logged in!',
            icon: 'success',
            confirmButtonText: 'Start Quiz',
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "quiz.html";
            }
          });


       
    } else {
        console.log('Invalid email or password');
    }
});