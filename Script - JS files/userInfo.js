// ============ User Info ============
let userData = JSON.parse(sessionStorage.getItem('currentUser'));
document.getElementById('userName').textContent = userData.userName;
document.getElementById('fullName').textContent = userData.name;
document.getElementById('birthDate').textContent = userData.birthDate;
document.getElementById('userEmail').textContent = userData.registerEmail;
document.getElementById('userPhone').textContent = userData.phone;

// ============ Add Product ============
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
    
    // Save to localStorage or send to server
    let products = JSON.parse(localStorage.getItem('newProducts')) || [];
    products.push(newProduct);
    localStorage.setItem('newProducts', JSON.stringify(products));
    popupWindow(`
        <h4>New Product added successfully!</h4>
        `)
    setTimeout(() => {
        addProductForm.reset()
    }, 1000);
    displayNewProducts()
});


// ============ Display New Added Products ============
async function displayNewProducts() {
    let products = JSON.parse(localStorage.getItem('newProducts')) || [];
    let temp = "";
    console.log(products)
    products.forEach((product, index) => {
        temp += `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="product-card" id="product-${index}">
                    <img src="${product.image}" alt="${product.title}">
                    <h4>${product.title}</h4>
                    <p class="text-end">
                        <span class="badge bg-danger">${product.category}</span>
                    </p>
                    <span>Price: $${product.price}</span>
                    <p>${product.description}</p>
                </div>
            </div>
        `;
    });
    document.getElementById('newProductsContainer').innerHTML = temp;
}

displayNewProducts()
