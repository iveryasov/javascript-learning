// Day 88
// Financial, analytics, warehouse (API + KPI Dash)

const loadButton = document.querySelector("#load-btn");
const totalCost = document.querySelector("#total-cost");
const totalItems = document.querySelector("#total-items");
const averagePrice = document.querySelector("#average-price");
const tableOfBalances = document.querySelector("#table-of-balances");
const tableBody = document.querySelector("#table-body");
const bodyLine = document.querySelector("#body-line");

loadButton.addEventListener("click", () => {
  loadProducts();
});

// Function to load data
const loadProducts = async () => {
  try {
    const response = await fetch("https://dummyjson.com/products?limit=8");

    const data = await response.json();

    showInfo(data.products);
    showProducts(data.products);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

const showInfo = (products) => {
  // Calculate total cost of all products
  const totalCostProducts = products.reduce((total, product) => {
    return total + product.price * product.stock;
  }, 0);

  totalCost.textContent = `$${totalCostProducts.toFixed(2)}`;

  // Calculate total quantity of products in stock
  const allProductsInStock = products.reduce((total, product) => {
    return total + product.stock;
  }, 0);

  totalItems.textContent = `${allProductsInStock} pcs.`;

  // Calculate average product price
  const averageProductPrice = products.reduce((total, product) => {
    return total + product.price / products.length;
  }, 0);

  averagePrice.textContent = `$${averageProductPrice.toFixed(2)}`;
};

const showProducts = (products) => {
  tableBody.innerHTML = products.map(product => `
    <tr>
      <td>${product.title}</td>
      <td>${product.category}</td>
      <td>${product.price}</td>
      <td>${product.stock}</td>
      <td>${(product.price * product.stock).toFixed(2)}</td>
    </tr>
  `).join("");
};
