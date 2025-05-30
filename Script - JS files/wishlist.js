async function wishlistProducts() {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || {};
    let temp = "";
    if (Object.keys(wishlist).length === 0) {
        temp = `<h3 class="text-center mt-5">wishlist is empty</h3>`;
        document.getElementById("wishlistContainer").innerHTML = temp;
        return;
    }
    for (const id in wishlist) {
        try {
            const response = await fetch(`https://fakestoreapi.com/products/${id}`);
            const product = await response.json();
            temp += `
            <tr class="cart-item" id="${product.id}">
                <td><h4>${product.title}</h4></td>
                <td><div><img src="${product.image}"  alt="${product.title}"></div></td>
                <td>$${product.price}</td>
                <td>
                    <button class="btn btn-danger" onclick="confirmRemove(${product.id})">Remove</button>
                    <button class="btn btn-warning" onclick="addToCart(${product.id})">Add to cart</button>
                </td>
            </tr>`;
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    }
    document.getElementById("wishlistContainer").innerHTML = temp;
}

wishlistProducts()

// ============ Pop up ============
let popUp = document.getElementById('popUp');
let popUpMassage = document.querySelector('#popUp .popUpMassage');
let popUpClose = document.querySelector('#popUp .close');
popUpClose?.addEventListener('click', () => {
    popUp.classList.add('visually-hidden');
});

// ============ Check before removing from wishlist ============
function confirmRemove(id) {
    popUp.classList.remove('visually-hidden');
    popUpMassage.innerHTML = `
    <h4>Are you sure you want to remove this product from your wishlist?</h4>
    <button class="btn btn-danger" onclick="removeFromWishlist(${id})">Yes</button>
    <button class="btn btn-primary" onclick="closePopup()">No</button>
    `;
}
function closePopup() {
    popUp.classList.add('visually-hidden');
}

// ============ Remove from wishlist ============
function removeFromWishlist(id) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || {};
    if (wishlist[id]) {
        delete wishlist[id];
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
    closePopup()
    window.location.reload();
}

// ============ Add to Cart ============
function addToCart(id) {
    if(sessionStorage.getItem('currentUser')){
        popUpMassage.textContent = 'Product added to cart Successfully!';
        popUp.classList.remove('visually-hidden');
        let cart = JSON.parse(localStorage.getItem('cart')) || {};
        if (cart[id]) {
            cart[id] += 1;
        } else {
            cart[id] = 1;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        removeFromWishlist(id)
    }else{ // If user is not logged in
        popUpMassage.innerHTML = `
        <span>Please login to add products to cart.</span> <br/>
        <a href="./../Pages/login.html" class="btn btn-primary">Login</a>
        `;
        popUp.classList.remove('visually-hidden');
    }
}