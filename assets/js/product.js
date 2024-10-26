// Cart and wishlist data
let cart = [];
let wishlist = [];

// Function to fetch products from the Fake Store API
async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        allProducts = await response.json();
        return allProducts;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

// Function to fetch categories from the Fake Store API
async function fetchCategories() {
    try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const categories = await response.json();
        return categories;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

// Function to fetch a single product
async function fetchSingleProduct(productId) {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const product = await response.json();
        return product;
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}

// Function to display products
function displayProducts(products) {
    const productContainer = document.getElementById('productContainer');
    if (!productContainer) return;

    productContainer.innerHTML = '';

    products.forEach(product => {
        const productCard = `
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <img src="${product.image}" class="card-img-top" alt="${product.title}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text flex-grow-1">${product.description.substring(0, 100)}...</p>
                        <p class="card-text"><strong>$${product.price.toFixed(2)}</strong></p>
                        <a href="product-details.html?id=${product.id}" class="btn btn-primary mt-auto">View Details</a>
                        <button onclick="addToCart(${product.id})" class="btn btn-outline-primary mt-2">Add to Cart</button>
                        <button onclick="addToWishlist(${product.id})" class="btn btn-outline-secondary mt-2">Add to Wishlist</button>
                    </div>
                </div>
            </div>
        `;
        productContainer.innerHTML += productCard;
    });
}

// Function to update category filters
async function updateCategoryFilters() {
    const categories = await fetchCategories();
    const filterContainer = document.querySelector('.card-body .d-grid');
    
    if (filterContainer) {
        filterContainer.innerHTML = `
            <button class="btn btn-outline-primary category-filter" data-category="all">All</button>
        `;
        
        categories.forEach(category => {
            // Capitalize the first letter of each word in the category
            const capitalizedCategory = category.split(' ').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ');

            filterContainer.innerHTML += `
                <button class="btn btn-outline-primary category-filter" data-category="${category}">${capitalizedCategory}</button>
            `;
        });
    }
}

// Function to add "Add to Cart" button listeners
function addToCartListeners() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            addToCart(productId);
        });
    });
}

// Function to add "Add to Wishlist" button listeners
function addToWishlistListeners() {
    const addToWishlistButtons = document.querySelectorAll('.add-to-wishlist');
    addToWishlistButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            addToWishlist(productId);
        });
    });
}

// Function to add a product to the cart
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert('Product added to cart!');
}

// Function to add a product to the wishlist
function addToWishlist(productId) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist.push(productId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
    alert('Product added to wishlist!');
}

// Function to update the cart count in the UI
function updateCartCount() {
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = cart.length;
    }
}

// Function to update the wishlist count in the UI
function updateWishlistCount() {
    const wishlistCountElement = document.getElementById('wishlistCount');
    if (wishlistCountElement) {
        wishlistCountElement.textContent = wishlist.length;
    }
}

// Function to display cart items in the modal
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = '';
        cart.forEach(item => {
            cartItemsContainer.innerHTML += `
                <div class="card mb-3">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${item.image}" class="img-fluid rounded-start" alt="${item.title}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${item.title}</h5>
                                <p class="card-text">$${item.price.toFixed(2)}</p>
                                <button class="btn btn-danger btn-sm remove-from-cart" data-product-id="${item.id}">Remove</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
    }
}

// Function to display wishlist items in the modal
function displayWishlistItems() {
    const wishlistItemsContainer = document.getElementById('wishlistItems');
    if (wishlistItemsContainer) {
        wishlistItemsContainer.innerHTML = '';
        wishlist.forEach(item => {
            wishlistItemsContainer.innerHTML += `
                <div class="card mb-3">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${item.image}" class="img-fluid rounded-start" alt="${item.title}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${item.title}</h5>
                                <p class="card-text">$${item.price.toFixed(2)}</p>
                                <button class="btn btn-primary btn-sm add-to-cart-from-wishlist" data-product-id="${item.id}">Add to Cart</button>
                                <button class="btn btn-danger btn-sm remove-from-wishlist" data-product-id="${item.id}">Remove</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
    }
}

// Function to fetch a single product by ID
async function fetchProductById(id) {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const product = await response.json();
        return product;
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}

// Function to display product details
async function displayProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        console.error('No product ID provided');
        return;
    }

    const product = await fetchProductById(productId);
    if (!product) {
        console.error('Product not found');
        return;
    }

    const productDetailsContainer = document.getElementById('productDetails');
    if (!productDetailsContainer) return;

    productDetailsContainer.innerHTML = `
        <div class="col-md-4">
            <div class="product-image-container">
                <img src="${product.image}" class="img-fluid product-image" alt="${product.title}">
            </div>
        </div>
        <div class="col-md-8">
            <h2>${product.title}</h2>
            <p class="lead">$${product.price.toFixed(2)}</p>
            <p>${product.description}</p>
            <p><strong>Category:</strong> ${product.category}</p>
            <div class="mt-3">
                <button class="btn btn-primary me-2" onclick="addToCart(${product.id})">Add to Cart</button>
                <button class="btn btn-outline-primary" onclick="addToWishlist(${product.id})">Add to Wishlist</button>
            </div>
        </div>
    `;
}

// Function to update cart modal
async function updateCartModal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cartItems');
    if (!cartItems) return;

    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    for (const productId of cart) {
        const product = await fetchProductById(productId);
        if (product) {
            const item = `
                <div class="cart-item">
                    <img src="${product.image}" alt="${product.title}" style="width: 50px; height: 50px; object-fit: contain;">
                    <span>${product.title}</span>
                    <span>$${product.price.toFixed(2)}</span>
                    <button onclick="removeFromCart(${product.id})" class="btn btn-sm btn-danger">Remove</button>
                </div>
            `;
            cartItems.innerHTML += item;
        }
    }
}

// Function to update wishlist modal
async function updateWishlistModal() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const wishlistItems = document.getElementById('wishlistItems');
    if (!wishlistItems) return;

    wishlistItems.innerHTML = '';

    if (wishlist.length === 0) {
        wishlistItems.innerHTML = '<p>Your wishlist is empty.</p>';
        return;
    }

    for (const productId of wishlist) {
        const product = await fetchProductById(productId);
        if (product) {
            const item = `
                <div class="wishlist-item">
                    <img src="${product.image}" alt="${product.title}" style="width: 50px; height: 50px; object-fit: contain;">
                    <span>${product.title}</span>
                    <span>$${product.price.toFixed(2)}</span>
                    <button onclick="removeFromWishlist(${product.id})" class="btn btn-sm btn-danger">Remove</button>
                </div>
            `;
            wishlistItems.innerHTML += item;
        }
    }
}

// Function to filter products by category
function filterProducts(category) {
    if (category === 'all') {
        displayProducts(allProducts);
    } else {
        const filteredProducts = allProducts.filter(product => product.category === category);
        displayProducts(filteredProducts);
    }
}

// Function to sort products
function sortProducts(sortBy) {
    let sortedProducts = [...allProducts];
    switch (sortBy) {
        case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
            break;
    }
    displayProducts(sortedProducts);
}

// Function to setup event listeners
function setupEventListeners() {
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => sortProducts(e.target.value));
    }

    const categoryFilters = document.querySelectorAll('.category-filter');
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', (e) => filterProducts(e.target.dataset.category));
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', async function() {
    allProducts = await fetchProducts();
    displayProducts(allProducts);
    setupEventListeners();
    updateCartCount();
    updateWishlistCount();
    
    // Add event listeners for cart and wishlist modals
    $('#cartModal').on('show.bs.modal', updateCartModal);
    $('#wishlistModal').on('show.bs.modal', updateWishlistModal);
});

// Function to remove item from cart
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(id => id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartModal();
}

// Function to remove item from wishlist
function removeFromWishlist(productId) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist = wishlist.filter(id => id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
    updateWishlistModal();
}
