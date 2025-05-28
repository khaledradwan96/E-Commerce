async function cartProducts() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart == []) {
        console.log("Cart is empty");
        return;
    }
    let temp = "";
    for (const id of Object.keys(cart)) {
        try {
            const res = await fetch(`https://fakestoreapi.com/products/${id}`);
            const product = await res.json();
            temp += `
            <div class="cart-item" id="${product.id}">
                <img src="${product.image}" alt="${product.title}">
                <h4>${product.title}</h4>
                <span>$${product.price}</span>
                <span>Quantity: ${cart[id]}</span>
                <button onclick="removeFromCart(${product.id})">Remove</button>
            </div>`;
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    }

    
}

cartProducts()