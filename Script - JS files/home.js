// ============ header logic ============
if(sessionStorage.getItem('currentUser')){
    document.querySelector('.user-registration')?.classList.add('visually-hidden')
    document.getElementById('userName').textContent = JSON.parse(sessionStorage.getItem('currentUser')).userName;
}else{
    document.querySelector('.user-info').classList.add('visually-hidden')
}

let logOutBtn = document.getElementById('logOutBtn');
logOutBtn?.addEventListener('click', () => {
    sessionStorage.removeItem('currentUser');
    window.location.href = '../index.html';
});



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
            <img src="${element.image}" alt="${element.title}">
            <h4 onclick="getDetails(${element.id})">${element.title}</h4>
            <span>$${element.price}</span> 
            <i class="fa-solid fa-cart-shopping" onclick="addToCart(${element.id})"></i>
        </div>
        `;
    });
    document.getElementById('allProducts').innerHTML = temp
}

getAllProducts()

function getDetails(id) {
    localStorage.setItem('productId', id);
    window.location.href = '../Pages/productDetails.html';
}

function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[id]) {
        cart[id] += 1;
    } else {
        cart[id] = 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}