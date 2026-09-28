// Day 98
// Live Crypto Ticker & Async State Engine

const updateButton = document.querySelector("#update-quotes");
const lastUpdate = document.querySelector("#last-update");
const cryptoContainer = document.querySelector("#crypto-container");

const loadCryptoData = async () => {
  try {
    cryptoContainer.innerHTML = `<p>Loading exchange data... ⏳</p>`;

    const response = await fetch("https://api.coinpaprika.com/v1/tickers");

    if (!response.ok) {
      console.log('API Error:', response.status, await response.text());

      showError();

      return null;
    }

    const allCoins = await response.json();
    const topCoins = allCoins.slice(0, 6);

    showCoins(topCoins);

    lastUpdate.textContent = `Updated: ${new Date().toLocaleTimeString()}`;
  } catch (error) {
    console.log(`An error occurred: ${error}`);

    showError();
  }
};

const showCoins = (coins) => {
  cryptoContainer.innerHTML = coins.map(coin => {
    const change = coin.quotes.USD.percent_change_24h;
    let changeClass = "negative";

    if (change >= 0) {
      changeClass = "positive";
    }

    return `
      <div>
        <h3>${coin.name}</h3>
        <h5>${coin.symbol}</h5>
        <p>Current price: $<span class="coin-price">${(coin.quotes.USD.price).toFixed(2)}</span></p>
        <p>24h change: <span class="${changeClass}">${(change).toFixed(2)}%</span></p>
      </div>
    `;
  }).join("");
};

const showError = () => {
  cryptoContainer.innerHTML = `
      <div>
        <p>Failed to get data from the server ⚠️</p>
        <button id="repeat-button">Try again 🔄</button>
      </div>
    `;

  const repeatButton = document.querySelector("#repeat-button");

  repeatButton.addEventListener("click", () => {
    loadCryptoData();
  });
};

updateButton.addEventListener("click", () => {
  loadCryptoData();
});

loadCryptoData();
