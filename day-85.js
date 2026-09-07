// Day 85
// FinTrack — Interactive Data Visualizer and Analytics Widget

const criticalButton = document.getElementById("critical-btn");
const topButton = document.getElementById("top-btn");
const resetButton = document.getElementById("reset-btn");
const chartContainer = document.getElementById("chart-container");
const totalValuation = document.getElementById("total-valuation");
const leaderProduct = document.getElementById("leader-product");

let allProducts = [];

const loadProducts = async () => {
    try {
        const response = await fetch("https://dummyjson.com/products?limit=8");
        const data = await response.json();

        allProducts = data.products;

        allProducts = data.products.map(product => {
            return {
                ...product,
                totalValue: product.price * product.stock
            }
        });

        renderChart(allProducts);
    } catch (error) {
        console.log(`Error: ${error}`);
    }
};

const renderChart = (list) => {
    let totalSum = 0;

    for (let product of list) {
        totalSum += product.totalValue;
    }

    totalValuation.textContent = `$${Math.round(totalSum)}`;

    if (list.length > 0) {
        const sorted = [...list].sort((a, b) => b.totalValue - a.totalValue);
        leaderProduct.textContent = sorted[0].title;
    } else {
        leaderProduct.textContent = "—";
    }

    const maxValue = Math.max(...list.map(p => p.totalValue));

    chartContainer.innerHTML = list.map(product => {
        const percent = Math.round((product.totalValue / maxValue) * 100);

        return `
        <div class="chart-row">
            <div class="row-header">
                <span>${product.title}</span>
                <span>$${product.totalValue.toFixed(2)}</span>
            </div>
            <div class="bar-track">
                <div class="bar-fill" style="width: ${percent}%;"></div>
            </div>
        </div>
        `;
    }).join("");
};

criticalButton.addEventListener("click", () => {
    const critical = allProducts.filter(product => product.stock < 20);
    renderChart(critical);
});

topButton.addEventListener("click", () => {
    const sorted = [...allProducts].sort((a, b) => b.totalValue - a.totalValue);
    renderChart(sorted);
});

resetButton.addEventListener("click", () => {
    renderChart(allProducts);
});

loadProducts();
