let userData = JSON.parse(sessionStorage.getItem('currentUser'));
document.getElementById('userName').textContent = userData.userName;
document.getElementById('fullName').textContent = userData.name;
document.getElementById('birthDate').textContent = userData.birthDate;
document.getElementById('userEmail').textContent = userData.registerEmail;
document.getElementById('userPhone').textContent = userData.phone;
