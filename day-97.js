// Day 97
// Asset Quick-View & Interactive Modal

const coinsBlock = document.querySelector("#coins-block");
const modalOverlay = document.querySelector("#modal-overlay");
const modalTitle = document.querySelector("#modal-title");
const closeModalButton = document.querySelector("#close-modal-btn");
const modalPrice = document.querySelector("#modal-price");
const modalHigh = document.querySelector("#modal-high");
const modalLow = document.querySelector("#modal-low");
const modalCap = document.querySelector("#modal-cap");

const cryptoAssets = [
  { id: "btc", name: "Bitcoin", symbol: "BTC", price: 64250, high24h: 65100, low24h: 63800, cap: "1.26T" },
  { id: "eth", name: "Ethereum", symbol: "ETH", price: 3480, high24h: 3550, low24h: 3410, cap: "418B" },
  { id: "sol", name: "Solana", symbol: "SOL", price: 145, high24h: 152, low24h: 139, cap: "67B" },
];

const renderCoins = () => {
  if (cryptoAssets.length === 0) {
    coinsBlock.innerHTML = "<p>🔍 No coins found</p>"
  } else {
    coinsBlock.innerHTML = cryptoAssets.map(coin => `
        <div>
          <h3>${coin.name}</h3>
          <p>${coin.symbol}</p>
          <p>Price: $<span class="coin-price">${coin.price}</span></p>
          <button class="open-modal-btn" data-id="${coin.id}">Details 🔍</button>
        </div>
      `).join("");
  }
};

coinsBlock.addEventListener("click", (event) => {
  if (event.target.classList.contains("open-modal-btn")) {
    const clickedId = event.target.dataset.id;

    const targetCoin = cryptoAssets.find(coin => coin.id === clickedId);

    modalTitle.textContent = `${targetCoin.name}`;
    modalPrice.textContent = `${targetCoin.price}`;
    modalHigh.textContent = `${targetCoin.high24h}`;
    modalLow.textContent = `${targetCoin.low24h}`;
    modalCap.textContent = `${targetCoin.cap}`;

    modalOverlay.classList.remove("hidden");
  }
});

// modal close logic
closeModalButton.addEventListener("click", () => {
  modalOverlay.classList.add("hidden");
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    modalOverlay.classList.add("hidden");
  }
});

modalOverlay.addEventListener("click", (event) => {
  if (event.target === modalOverlay) {
    modalOverlay.classList.add("hidden");
  }
});

renderCoins();
