// Day 86
// Live Marketplace Order Dashboard

// DOM Elements
const ordersList = document.querySelector("#orders-list");
const allOrdersButton = document.querySelector("#all-orders-btn");
const onTheWayOrdersButton = document.querySelector("#on-the-way-btn");
const deliveredOrdersButton = document.querySelector("#delivered-btn");
const cheapOrdersButton = document.querySelector("#cheap-orders-btn");
const expensiveOrdersButton = document.querySelector("#expensive-orders-btn");
const timerText = document.querySelector("#timer");

// Initial Orders Data
const initialOrders = [
  { id: 101, title: "Gaming Mouse", price: 2500, status: "in_transit" },
  { id: 102, title: "Mechanical Keyboard", price: 7000, status: "delivered" },
  { id: 103, title: "27-inch Monitor", price: 22000, status: "in_transit" },
  { id: 104, title: "USB Type-C Cable", price: 600, status: "delivered" },
  { id: 105, title: "Mouse Pad", price: 1200, status: "delivered" },
  { id: 106, title: "Gaming Headset", price: 4500, status: "in_transit" }
];

// Render Orders List
const render = (orders) => {
  ordersList.innerHTML = orders.map(product => `
    <div class="product-card">
      <h3>Product: ${product.title}</h3>
      <p>Order ID: #${product.id}</p>
      <p>Price: $${product.price}</p>
      <span class="status">Status: ${product.status}</span>
    </div>
  `).join("");
};

// Initial Render
render(initialOrders);

// Filter Event Listeners
allOrdersButton.addEventListener("click", () => {
  render(initialOrders);
});

onTheWayOrdersButton.addEventListener("click", () => {
  const filteredOrders = initialOrders.filter(p => p.status === "in_transit");
  render(filteredOrders);
});

deliveredOrdersButton.addEventListener("click", () => {
  const filteredOrders = initialOrders.filter(p => p.status === "delivered");
  render(filteredOrders);
});

// Sort Event Listeners (Immutable)
cheapOrdersButton.addEventListener("click", () => {
  const sortedProducts = [...initialOrders].sort((cheap, expen) => cheap.price - expen.price);
  render(sortedProducts);
});

expensiveOrdersButton.addEventListener("click", () => {
  const sortedProducts = [...initialOrders].sort((cheap, expen) => expen.price - cheap.price);
  render(sortedProducts);
});

// Auto-Sync Timer
let secondsLeft = 5;
timerText.textContent = `🔄 Sync in: ${secondsLeft}s`;

const timer = setInterval(() => {
  secondsLeft--;
  if (secondsLeft > 0) {
    timerText.textContent = `🔄 Sync in: ${secondsLeft}s`;
  } else {
    timerText.textContent = `🔄 Syncing...`;
    secondsLeft = 5;
  }
}, 1000);
