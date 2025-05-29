async function getDetails() {
    const productId = localStorage.getItem('productId');
    let data = await fetch(`https://fakestoreapi.com/products/${productId}`);
    let product = await data.json();
    temp = `
    <div class="product-details row" id="${product.id}">
        <h2 class="text-center">${product.title}</h2>
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 P-5">
            <img src="${product.image}" class="w-100" alt="${product.title}">
        </div>
        <div class="col-12 col-sm-6 col-md-8 col-lg-9">
            <span class="fw-bold">Category: <span class="btn btn-warning p-1 my-3">${product.category}</span></span>
            <p>${product.description}</p>
            <span class="fw-bold">Price: $${product.price}</span>
        </div>
    </div>`

console.log(product)

    document.getElementById('productDetails').innerHTML = temp;
}

getDetails()

