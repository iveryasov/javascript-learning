// Day 93
// First Financial Chart with Chart.js

const sevenDaysButton = document.querySelector("#seven-days-btn");
const thirtyDaysButton = document.querySelector("#thirty-days-btn");
const randomPriceButton = document.querySelector("#random-price-btn");
const cryptoChart = document.querySelector("#cryptoChart");

const myChart = new Chart(cryptoChart, {
  type: "line",
  data: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [{
      label: "Bitcoin Price ($)",
      data: [62000, 62500, 61800, 63100, 64000, 63800, 65200],
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

sevenDaysButton.addEventListener("click", () => {
  myChart.data.labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  myChart.data.datasets[0].data = [62000, 62500, 61800, 63100, 64000, 63800, 65200];

  myChart.update();
});

thirtyDaysButton.addEventListener("click", () => {
  myChart.data.labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
  myChart.data.datasets[0].data = [62000, 62500, 61800, 63100, 64000, 63800, 65200, 64200, 69700, 73100, 71800, 74500, 73900, 76200, 75100, 77800, 76500, 79200, 80400, 79600, 82100, 81500, 83700, 82900, 85600, 84800, 87100, 86300, 88500, 89200];

  myChart.update();
});

randomPriceButton.addEventListener("click", () => {
  myChart.data.labels.push("New day");
  myChart.data.datasets[0].data.push(Math.floor(Math.random() * 5000) + 60000);

  myChart.update();
});
