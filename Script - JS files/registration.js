//  ============ sign up ============
const registerForm = document.getElementById('registerForm');
registerForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const fName = document.getElementById('fName').value;
    const lName = document.getElementById('lName').value;
    const name = `${fName} ${lName}`;
    const birthDate = document.getElementById('birthDate').value;
    const gender = document.getElementById('birthDate').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const rePassword = document.getElementById('rePassword').value;


    if (password !== rePassword) {
        alert('Passwords do not match');
        return;
    }

    const userData = {
        name,
        birthDate,
        gender,
        email,
        phone,
        password
    };

    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
    window.location.href = 'login.html';
});

// ============ login ============
const loginForm = document.getElementById('loginForm');
loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('errorMsg');

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = users.find( user => user.email === email);

    if (!foundUser) {
        errorMsg.textContent = 'User not found';
    } else if (foundUser.password !== password) {
        errorMsg.textContent = 'Incorrect Password';
    } else {
        errorMsg.textContent = '';
        alert('Logged in successfully');
        window.location.href = '../index.html';
    }
});
