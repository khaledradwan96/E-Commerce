//  ============ sign up ============
const registerForm = document.getElementById('registerForm');
registerForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const fName = document.getElementById('fName').value;
    const lName = document.getElementById('lName').value;
    const name = `${fName} ${lName}`;
    const userName = document.getElementById('userName').value;
    const birthDate = document.getElementById('birthDate').value;
    const gender = document.getElementById('birthDate').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const rePassword = document.getElementById('rePassword').value;

    const userData = {
        name,
        userName,
        birthDate,
        gender,
        email,
        phone,
        password
    };
    
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    // ===== Validation =====
    // Check password
    if (password !== rePassword) {
        alert('Passwords do not match');
        return;
    }
    
    const foundUser = users.find( user => user.userName === userName);
    const foundEmail = users.find( user => user.email === email);
    if(foundUser){ // Check used userName
        alert('user name is already used')
    }else if(foundEmail){ // Check used email
        alert('email is already used');
    }else{ // save data
        users.push(userData);
        localStorage.setItem('users', JSON.stringify(users)); 
        window.location.href = 'login.html';
    }
});

// ============ login ============
const loginForm = document.getElementById('loginForm');
loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('errorMsg');

    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check data
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
