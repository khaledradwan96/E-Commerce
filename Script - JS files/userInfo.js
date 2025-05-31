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
                    <button class="btn btn-danger" onclick="deleteProduct(${index})">Delete</button>
                    <button class="btn btn-warning" onclick="editProduct(${index})">Edit</button>
                </div>
            </div>
        `;
    });
    document.getElementById('newProductsContainer').innerHTML = temp;
}

displayNewProducts()

// ============ Delete Product ============
function deleteProduct(index) {
    let products = JSON.parse(localStorage.getItem('newProducts')) || [];
    products.splice(index, 1);
    localStorage.setItem('newProducts', JSON.stringify(products));
    popupWindow(`
        <h4>Product deleted successfully!</h4>
        `)
    setTimeout(() => {
        displayNewProducts();
    }, 1000);
}

// ============ Edit Product ============
function editProduct(index) {
    let products = JSON.parse(localStorage.getItem('newProducts')) || [];
    const product = products[index];
    const actionBtn = document.getElementById('actionBtn');
    actionBtn.innerHTML = `
        <span id="saveEditBtn" class="btn btn-primary">Update Product</span>
        `;
    
    // Fill the form with product details
    document.getElementById('productName').value = product.title;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productImage').value = product.image;
    document.getElementById('productDescription').value = product.description;

    // Change the form submit to update instead of add
    const saveEditBtn = document.getElementById('saveEditBtn');
    saveEditBtn.onclick = function() {
        products[index] = {
            title: document.getElementById('productName').value,
            category: document.getElementById('productCategory').value,
            price: parseFloat(document.getElementById('productPrice').value),
            image: document.getElementById('productImage').value,
            description: document.getElementById('productDescription').value
        };
        localStorage.setItem('newProducts', JSON.stringify(products));
        popupWindow(`
            <h4>Product updated successfully!</h4>
            `)
        setTimeout(() => {
            displayNewProducts();
            addProductForm.reset();
            actionBtn.innerHTML = `
                <button type="submit" class="btn btn-warning text-white">Add Product</button>
                <button type="reset" class="btn btn-danger text-white">Reset All</button>
            `;
        }, 1000);
    };
}