// Function to fetch featured products
async function fetchFeaturedProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products?limit=6');
        const products = await response.json();
        return products;
    } catch (error) {
        console.error('Error fetching featured products:', error);
        return [];
    }
}

// Function to display featured products
function displayFeaturedProducts(products) {
    const featuredProductsContainer = document.getElementById('featuredProducts');
    if (!featuredProductsContainer) return;

    featuredProductsContainer.innerHTML = '';

    products.forEach(product => {
        const productCard = `
            <div class="col-md-4 mb-4">
                <div class="card featured-product-card h-100">
                    <div class="card-img-container">
                        <img src="${product.image}" class="card-img-top" alt="${product.title}">
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text flex-grow-1">${product.description.substring(0, 100)}...</p>
                        <div class="mt-auto">
                            <p class="card-text price">$${product.price.toFixed(2)}</p>
                            <a href="pages/product.html?id=${product.id}" class="btn btn-primary">View Details</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        featuredProductsContainer.innerHTML += productCard;
    });
}

// Function to update category links
function updateCategoryLinks() {
    const categoryLinks = document.querySelectorAll('.category-card a');
    categoryLinks.forEach(link => {
        const category = link.parentElement.querySelector('h3').textContent.toLowerCase();
        link.href = `pages/product.html?category=${category}`;
    });
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

// Function to fetch a sample product from a category
async function fetchSampleProductFromCategory(category) {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/category/${category}?limit=1`);
        const products = await response.json();
        return products[0];
    } catch (error) {
        console.error(`Error fetching sample product for ${category}:`, error);
        return null;
    }
}

// Function to display category cards
async function displayCategories(categories) {
    const categoryContainer = document.getElementById('categoryContainer');
    if (!categoryContainer) return;

    categoryContainer.innerHTML = '';

    for (const category of categories) {
        const sampleProduct = await fetchSampleProductFromCategory(category);
        const imageUrl = sampleProduct ? sampleProduct.image : 'path/to/default/image.jpg';

        const capitalizedCategory = category.split(' ').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');

        const categoryCard = `
            <div class="col-md-3 mb-4">
                <div class="card category-card h-100">
                    <img src="${imageUrl}" class="card-img-top category-image" alt="${capitalizedCategory}">
                    <div class="card-body d-flex flex-column justify-content-center align-items-center">
                        <h3 class="card-title text-center">${capitalizedCategory}</h3>
                        <a href="pages/product.html?category=${category}" class="btn btn-outline-primary mt-3">Shop Now</a>
                    </div>
                </div>
            </div>
        `;
        categoryContainer.innerHTML += categoryCard;
    }
}

// Function to fetch products for the carousel
async function fetchCarouselProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products?limit=5');
        const products = await response.json();
        return products;
    } catch (error) {
        console.error('Error fetching carousel products:', error);
        return [];
    }
}

// Function to display the product carousel
function displayProductCarousel(products) {
    const carouselInner = document.querySelector('#productCarousel .carousel-inner');
    if (!carouselInner) return;

    carouselInner.innerHTML = '';

    products.forEach((product, index) => {
        const carouselItem = `
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                <img src="${product.image}" class="d-block w-100" alt="${product.title}">
                <div class="carousel-caption d-none d-md-block">
                    <h5>${product.title}</h5>
                    <p>$${product.price.toFixed(2)}</p>
                </div>
            </div>
        `;
        carouselInner.innerHTML += carouselItem;
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', async function() {
    // Display product carousel
    const carouselProducts = await fetchCarouselProducts();
    displayProductCarousel(carouselProducts);

    // Display featured products
    const featuredProducts = await fetchFeaturedProducts();
    displayFeaturedProducts(featuredProducts);

    // Display categories
    const categories = await fetchCategories();
    await displayCategories(categories);

    // Update cart and wishlist counts
    updateCartCount();
    updateWishlistCount();
});

document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDarkMode = body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        updateDarkModeIcon(isDarkMode);
    });

    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        body.classList.add('dark-mode');
        updateDarkModeIcon(true);
    }

    function updateDarkModeIcon(isDarkMode) {
        const icon = darkModeToggle.querySelector('i');
        icon.classList.remove('fa-moon', 'fa-sun');
        icon.classList.add(isDarkMode ? 'fa-sun' : 'fa-moon');
    }
});
