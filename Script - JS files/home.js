async function getProducts() {
    try {
        let response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
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
        <div id="${element.id}" class="product-card col-12 col-sm-6 col-md-4 col-lg-3 P-5" onclick="getDetails(${element.id})">
            <img src="${element.image}" class="w-100" alt="${element.title}">
            <h2>${element.title}</h2>
            <span>$${element.price}</span> 
            <i class="fa-solid fa-cart-shopping" onclick="addToCart(${element.id})"></i>
        </div>
        `;
    });
    document.getElementById('allProducts').innerHTML = temp
}

getProducts()