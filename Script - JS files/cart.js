async function cartProducts() {
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    let temp = "";
    let totalAmount = 0;
    if (Object.keys(cart).length === 0) {
        temp = `<h3 class="text-center mt-5">Cart is empty</h3>`;
        document.getElementById("cartContainer").innerHTML = temp;
        return;
    }
    for (const id in cart) {
        try {
            const response = await fetch(`https://fakestoreapi.com/products/${id}`);
            const product = await response.json();
            let itemTotal = product.price * cart[id];
            totalAmount += itemTotal;
            temp += `
            <tr class="cart-item" id="${product.id}">
                <td><h4>${product.title}</h4></td>
                <td><div><img src="${product.image}"  alt="${product.title}"></div></td>
                <td>$${product.price}</td>
                <td>${cart[id]}</td>
                <td>$${itemTotal}</td>
                <td><button class="btn btn-danger" onclick="confirmRemove(${product.id})">Remove</button></td>
            </tr>`;
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    }
    temp += `
        <tr>
            <td colspan="4" class="text-end"><strong>Total Amount:</strong></td>
            <td colspan="2" class="fw-bold text-success">$${totalAmount.toFixed(2)}</td>
        </tr>`
    document.getElementById("cartContainer").innerHTML = temp;
    
}

cartProducts()

// ============ Check before removing from wishlist ============
function confirmRemove(id) {
    popupWindow(`
        <h4>Are you sure you want to remove this product from your cart?</h4>
        <button class="btn btn-danger" onclick="removeFromCart(${id})">Yes</button>
        <button class="btn btn-primary" onclick="closePopup()">No</button>
        `);
}

// ============ Remove from Cart ============
function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    if (cart[id]) {
        delete cart[id];
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    closePopup()
    window.location.reload();
}