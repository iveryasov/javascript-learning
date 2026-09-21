// Day 91
// Interactive Wishlist with Individual Removal (Wishlist Tracker)

const favoritesCounter = document.querySelector("#favorites-counter");
const productsBlock = document.querySelector("#products");
const favoritesBlock = document.querySelector("#favorites");

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

let allProducts = [];

const loadProducts = async () => {
    try {
        const response = await fetch("https://dummyjson.com/products?limit=8");

        if (!response.ok) {
            console.log('API Error:', response.status, await response.text());
            return null;
        }

        const data = await response.json();

        allProducts = data.products;

        renderCatalog();
        renderFavorites();
    } catch (error) {
        console.log(`Error: ${error}`);
        return null;
    }
};

const renderCatalog = () => {
    productsBlock.innerHTML = allProducts.map(product => {
        const isFav = favorites.some(fav => fav.id === product.id);

        let btnText = "";
        let btnClass = "";

        if (isFav) {
        btnText = "❤️ In favorites";
        btnClass = "fav-btn active";
        } else {
        btnText = "🤍 Add to favorites";
        btnClass = "fav-btn";
        }

        return `
            <div class="product-card">
                <h3>${product.title}</h3>
                <p>${product.category}</p>
                <p>Price: $${product.price}</p>
                <button class="${btnClass}">${btnText}</button>
            </div>
        `;
    }).join("");

    const favButtons = document.querySelectorAll(".fav-btn");

    favButtons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            toggleFavorite(allProducts[index]);
        })
    });

    const toggleFavorite = (product) => {
        const isFav = favorites.some(fav => fav.id === product.id);

        if (isFav) {
            favorites = favorites.filter(item => item.id !== product.id);
        } else {
            favorites.push(product);
        }

        // Save the array to localStorage
        localStorage.setItem("favorites", JSON.stringify(favorites));

        renderCatalog();
        renderFavorites();
    }
};

const renderFavorites = () => {
    if (favorites.length === 0) {
        favoritesBlock.innerHTML = "<p>No favorites yet</p>";
    } else {
        favoritesCounter.textContent = `⭐ In favorites: ${favorites.length} items`;

        favoritesBlock.innerHTML = favorites.map(product => `
            <div>
                <h3>${product.title}</h3>
                <p>${product.category}</p>
                <p>Price: $${product.price}</p>
                <button class="remove-btn">❌ Remove from favorites</button>
            </div>
        `).join("");

        const removeButtons = document.querySelectorAll(".remove-btn");

        removeButtons.forEach((btn, index) => {
            btn.addEventListener("click", () => {
                const productToDelete = favorites[index];

                favorites = favorites.filter(item => item.id !== productToDelete.id);

                localStorage.setItem("favorites", JSON.stringify(favorites));

                renderCatalog();
                renderFavorites();
            });
        });
    }
};

loadProducts();
