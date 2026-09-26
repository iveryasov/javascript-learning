// Day 96
// Crypto Watchlist & Live Filter Engine

const cryptoData = [
  { name: "Bitcoin", symbol: "BTC", price: 64250, change24h: 3.4 },
  { name: "Ethereum", symbol: "ETH", price: 3480, change24h: -1.8 },
  { name: "Solana", symbol: "SOL", price: 145, change24h: 8.2 },
  { name: "Cardano", symbol: "ADA", price: 0.45, change24h: -4.1 },
  { name: "Ripple", symbol: "XRP", price: 0.58, change24h: 0.9 },
  { name: "Dogecoin", symbol: "DOGE", price: 0.12, change24h: -0.5 },
];

const searchInput = document.querySelector("#search-input");
const growthCheckbox = document.querySelector("#only-plus-input");
const counter = document.querySelector("#counter");
const cryptoList = document.querySelector("#crypto-list");

const renderList = () => {
  const searchText = searchInput.value.toLowerCase();
  const isGrowthOnly = growthCheckbox.checked;

  const filteredCoins = cryptoData.filter(coin => {
    const nameMatches = coin.name.toLowerCase().includes(searchText);
    const symbolMatches = coin.symbol.toLowerCase().includes(searchText);

    if (nameMatches === false && symbolMatches === false) {
      return false;
    }

    if (isGrowthOnly === true && coin.change24h <= 0) {
      return false;
    }

    return true;
  });

  if (filteredCoins.length === 0) {
    cryptoList.innerHTML = "<p>No coins found 🔍</p>"
  } else {
    const htmlArray = filteredCoins.map(coin => {
      let changeColor = "red";

      if (coin.change24h >= 0) {
        changeColor = "green";
      }

      return `
        <div>
          <h3>${coin.name}</h3>
          <p>Price: ${coin.price}</p>
          <p>24h change: <span style="color: ${changeColor};">${coin.change24h}%</span></p>
        </div>
      `;
    });

    cryptoList.innerHTML = htmlArray.join("");
  }

  counter.textContent = `Showing coins: ${filteredCoins.length} of ${cryptoData.length}`;
};

searchInput.addEventListener("input", () => {
  renderList();
});

growthCheckbox.addEventListener("change", () => {
  renderList();
});

renderList();
