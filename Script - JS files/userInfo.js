// ============ User Info ============
let userData = JSON.parse(sessionStorage.getItem('currentUser'));
document.getElementById('userName').textContent = userData.userName;
document.getElementById('fullName').textContent = userData.name;
document.getElementById('birthDate').textContent = userData.birthDate;
document.getElementById('userEmail').textContent = userData.registerEmail;
document.getElementById('userPhone').textContent = userData.phone;

// ============ Add Product ============
let newProduct = []
const addProductForm = document.getElementById('addProductForm');
addProductForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get product details from form
    const productName = document.getElementById('productName').value;
    const productCategory = document.getElementById('productCategory').value;
    const productPrice = parseFloat(document.getElementById('productPrice').value);
    const productImage = document.getElementById('productImage').value;
    const productDescription = document.getElementById('productDescription').value;
    
    // Create new product object
    const newProduct = {
        title: productName,
        category: productCategory,
        price: productPrice,
        description: productDescription,
        image: productImage
    };
    console.log('New Product:', newProduct);
    
    // Save to localStorage or send to server
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    popUpMassage.innerHTML = `<h4>Product added successfully!</h4>`;
    popUp.classList.remove('visually-hidden');
});


// ============ Pop up ============
let popUp = document.getElementById('popUp');
let popUpMassage = document.querySelector('#popUp .popUpMassage');
let popUpClose = document.querySelector('#popUp .close');
popUpClose?.addEventListener('click', () => {
    popUp.classList.add('visually-hidden');
    addProductForm.reset()
    window.location.reload();
});