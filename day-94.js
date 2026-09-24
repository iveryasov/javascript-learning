// Day 94
// Live Bitcoin Chart with CoinCap API

const chartStatus = document.querySelector("#status");
const cryptoChart = document.querySelector("#crypto-chart");
const sevenDaysButton = document.querySelector("#seven-days-btn");
const fourteenDaysButton = document.querySelector("#fourteen-days-btn");

const mainChart = new Chart(cryptoChart, {
  type: "line",
  data: {
    labels: [],
    datasets: [{
      label: "Bitcoin Price ($)",
      data: [],
      borderColor: "#10b981",
      backgroundColor: "rgba(16, 185, 129, 0.1)",
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false
  }
});

let allHistoryData = [];

const API_KEY = "YOUR_COINCAP_API_KEY"; // get it at https://coincap.io

const loadCryptoData = async () => {
  try {
    chartStatus.textContent = "Loading...";

    const response = await fetch(`https://rest.coincap.io/v3/assets/bitcoin/history?interval=d1&apiKey=${API_KEY}`);

    if (!response.ok) {
      console.log('API Error:', response.status, await response.text());
      return null;
    };

    const result = await response.json();

    const history = result.data.slice(-14);

    const date = history.map(item => item.date.slice(5, 10));
    const prices = history.map(item => Number(Number(item.priceUsd).toFixed(2)));

    allHistoryData = result.data;

    mainChart.data.labels = date;
    mainChart.data.datasets[0].data = prices;
    mainChart.update();

    chartStatus.textContent = "✅ Data updated";
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

sevenDaysButton.addEventListener("click", () => {
  chartStatus.textContent = "Loading...";

  const history = allHistoryData.slice(-7);
  const date = history.map(item => item.date.slice(5, 10));
  const prices = history.map(item => Number(Number(item.priceUsd).toFixed(2)));

  mainChart.data.labels = date;
  mainChart.data.datasets[0].data = prices;
  mainChart.update();

  chartStatus.textContent = "✅ Data updated";
});

fourteenDaysButton.addEventListener("click", () => {
  chartStatus.textContent = "Loading...";

  const history = allHistoryData.slice(-14);
  const date = history.map(item => item.date.slice(5, 10));
  const prices = history.map(item => Number(Number(item.priceUsd).toFixed(2)));

  mainChart.data.labels = date;
  mainChart.data.datasets[0].data = prices;
  mainChart.update();

  chartStatus.textContent = "✅ Data updated";
});

loadCryptoData();
