// ============ Pop up ============
let popUp = document.getElementById('popUp');
let popUpMassage = document.querySelector('#popUp .popUpMassage');
let popUpClose = document.querySelector('#popUp .close');
popUpClose?.addEventListener('click', () => {
    popUp.classList.add('visually-hidden');
});

//  ============ sign up ============
const registerForm = document.getElementById('registerForm');
registerForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const fName = document.getElementById('fName').value;
    const lName = document.getElementById('lName').value;
    const name = `${fName} ${lName}`;
    const userName = document.getElementById('userName').value;
    const birthDate = document.getElementById('birthDate').value;
    const registerEmail = document.getElementById('registerEmail').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const rePassword = document.getElementById('rePassword').value;

    const userData = {
        name,
        userName,
        birthDate,
        registerEmail,
        phone,
        password
    };
    
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // ===== Validation =====
    // Check password
    if (password !== rePassword) {
        popUpMassage.textContent = 'Passwords do not match';
        popUp.classList.remove('visually-hidden');
        return;
    }
    
    const foundUser = users.find( user => user.userName === userName);
    const foundEmail = users.find( user => user.registerEmail === registerEmail);
    if(foundUser){ // Check used userName
        popUpMassage.textContent = 'user name is already used';
        popUp.classList.remove('visually-hidden');
    }else if(foundEmail){ // Check used email
        popUpMassage.textContent = 'email is already used';
        popUp.classList.remove('visually-hidden');
    }else{ // save data
        users.push(userData);
        localStorage.setItem('users', JSON.stringify(users)); 
        popUpMassage.innerHTML = `
                <h4>Welcome, <span class="text-warning">${userName}</span>  !</h4>
                <p>Your account has been created successfully.</p>
                <a href="login.html" class="btn btn-primary">Login Now</a>
        `;
        popUp.classList.remove('visually-hidden');
    }
});

// ============ login ============
const loginForm = document.getElementById('loginForm');
loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const loginEmail = document.getElementById('loginEmail').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('errorMsg');

    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check data
    const foundUser = users.find( user => user.registerEmail === loginEmail);

    if (!foundUser) {
        errorMsg.textContent = 'User not found';
    } else if (foundUser.password !== password) {
        errorMsg.textContent = 'Incorrect Password';
    } else {
        errorMsg.textContent = '';
        popUpMassage.innerHTML = `
            <h4>Welcome back, <span class="text-warning">${foundUser.userName}</span>  !</h4>
            <a href="../index.html" class="btn btn-primary">Go Shopping</a>
        `;
        popUp.classList.remove('visually-hidden');
        sessionStorage.setItem('currentUser', JSON.stringify(foundUser));
    }
});
