async function getDetails() {
    const productId = localStorage.getItem('productId');
    let data = await fetch(`https://fakestoreapi.com/products/${productId}`);
    let product = await data.json();
    temp = `
    <div class="product-details row" id="${product.id}">
        <h2 class="text-center">${product.title}</h2>
        <img src="${product.image}" class="col-12 col-sm-6 col-md-4 col-lg-3 P-5" alt="${product.title}">
        <div class="col-12 col-sm-6 col-md-8 col-lg-9">
            <span class="btn btn-warning p-1">${product.category}</span>
            <p>${product.description}</p>
            <span>$${product.price}</span>
            <i class="fa-solid fa-cart-shopping" onclick="addToCart(${product.id})"></i>
        </div>
    </div>`

console.log(product)

    document.getElementById('productDetails').innerHTML = temp;
}

getDetails()

