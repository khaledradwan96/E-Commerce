// ============ header logic ============
if(sessionStorage.getItem('currentUser')){
    document.querySelector('.user-registration')?.classList.add('visually-hidden')
    document.getElementById('userName').textContent = JSON.parse(sessionStorage.getItem('currentUser')).userName;
}else{
    document.querySelector('.user-info').classList.add('visually-hidden')
}

let logOutBtn = document.getElementById('logOutBtn');
logOutBtn?.addEventListener('click', () => {
    popUpMassage.textContent = 'GoodBye! See you soon.';
    popUp.classList.remove('visually-hidden');
    sessionStorage.removeItem('currentUser');
});

// cart count
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartCount = document.getElementById('cartCount');
if (Object.keys(cart).length > 0) {
    cartCount.textContent = Object.values(cart).reduce((acc, count) => acc + count, 0);
}


// ============ Display Products ============
async function getAllProducts() {
    try {
        let response = await fetch('https://fakestoreapi.com/products');
        let products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

function displayProducts(products) {
    let temp = "";
    products.forEach(element => {
        temp += `
        <div id="${element.id}" class="product-card">
            <img src="${element.image}" onclick="getDetails(${element.id})" alt="${element.title}">
            <h4 onclick="getDetails(${element.id})">${element.title}</h4>
            <span>$${element.price}</span> 
            <i class="fa-solid fa-cart-shopping" onclick="addToCart(${element.id})"></i>
        </div>
        `;
    });
    document.getElementById('allProducts').innerHTML = temp
}

getAllProducts()

// ============ Get Product Details ============
function getDetails(id) {
    localStorage.setItem('productId', id);
    window.location.href = './../Pages/productDetails.html';
}

// ============ Pop up ============
let popUp = document.getElementById('popUp');
let popUpMassage = document.querySelector('#popUp .popUpMassage');
let popUpClose = document.querySelector('#popUp .close');
popUpClose?.addEventListener('click', () => {
    popUp.classList.add('visually-hidden');
    window.location.reload();
});

// ============ Add to Cart ============
function addToCart(id) {
    if(sessionStorage.getItem('currentUser')){
    popUpMassage.textContent = 'Product added to cart Successfully!';
    popUp.classList.remove('visually-hidden');
    let cart = JSON.parse(localStorage.getItem('cart')) || {};
    console.log(cart);
    if (cart[id]) {
        cart[id] += 1;
    } else {
        cart[id] = 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    // Update cart count
    let cartCount = document.getElementById('cartCount');
    cartCount.textContent = Object.values(cart).reduce((acc, count) => acc + count, 0);
    }else{ // If user is not logged in
        popUpMassage.innerHTML = `
        <span>Please login to add products to cart.</span> <br/>
        <a href="./../Pages/login.html" class="btn btn-primary">Login</a>
        `;
        popUp.classList.remove('visually-hidden');
    }

}