// Day 90
// Product Showcase with Persistent Cart

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const catalog = document.querySelector("#catalog");
const cartInfo = document.querySelector("#cart-info");
const cartItems = document.querySelector("#cart-items");
const resetCartButton = document.querySelector("#reset-cart-btn");

const loadProducts = async () => {
    try {
        const response = await fetch("https://dummyjson.com/products?limit=6");

        if (!response.ok) {
            console.log('API Error:', response.status, await response.text());
            return null;
        }

        const data = await response.json();

        renderProductCards(data.products);
    } catch (error) {
        console.log(error);
        return null;
    }
};

loadProducts();

const renderProductCards = (products) => {
    catalog.innerHTML = products.map(product => `
        <div class="product-card">
            <h3>${product.title}</h3>
            <p>Price: $${product.price}</p>
            <button class="add-btn">🛒 Add to cart</button>
        </div>
    `).join("");

    const addButtons = document.querySelectorAll(".add-btn");

    // Attach a regular addEventListener to each button
    addButtons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            cart.push(products[index]);

            // Save the array to localStorage
            localStorage.setItem("cart", JSON.stringify(cart));

            renderCart();
        })
    });
};

const renderCart = () => {
    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Cart is empty</p>";
        cartInfo.textContent = "Total items: 0 pcs. | Amount due: $0.00";
    } else {
        cartItems.innerHTML = cart.map(product => `
            <div class="product-card">
                <h3>${product.title}</h3>
                <p>Price: $${product.price}</p>
            </div>
        `).join("");

        const finalSum = cart.reduce((acc, product) => {
            const total = acc + product.price;

            return total;
        }, 0);

        cartInfo.textContent = `Total items: ${cart.length} pcs. | Amount due: $${finalSum.toFixed(2)}`;
    }
};

resetCartButton.addEventListener("click", () => {
    cart = [];

    localStorage.removeItem("cart");

    renderCart();
});

renderCart();
