// Day 89
// Hot Deals Analyzer (Data Pipeline & Grouping)

const startButton = document.querySelector("#start-btn");
const analyticsBlock = document.querySelector("#analytics-block");
const hotOffersBlock = document.querySelector("#hot-offers-block");

startButton.addEventListener("click", () => {
  loadProducts();
});

const loadProducts = async () => {
  try {
    const response = await fetch("https://dummyjson.com/products?limit=15");

    if (!response.ok) {
      console.log('API Error:', response.status, await response.text());
      return null;
    }

    const data = await response.json();

    showProducts(data.products);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

const showProducts = (products) => {
  const filteredProducts = products.filter(product => product.rating >= 4.0);

  const sortedProducts = [...filteredProducts].sort((a, b) => b.discountPercentage - a.discountPercentage);

  hotOffersBlock.innerHTML = sortedProducts.map(product => {
    const discountAmount = product.price * (product.discountPercentage / 100);
    const finalPrice = (product.price - discountAmount).toFixed(2);
    
    return `
    <div class="products">
      <h3>${product.title}</h3>
      <p>Rating ⭐️: ${product.rating}</p>
      <p>Price: <s>$${product.price}</s> $${finalPrice}. Discount: ${product.discountPercentage}%</p>
    </div>
    `;
  }).join("");

  const categoryStats = sortedProducts.reduce((acc, product) => {
  
    const cat = product.category;

    acc[cat] = (acc[cat] || 0) + 1;

    return acc;
  }, {});

  const categoriesArray = Object.entries(categoryStats);

  const html = categoriesArray.map(item => {
    const categoryName = item[0];
    const count = item[1];

    return `
    <p><b>${categoryName}:</b> ${count} pcs.</p>
    `;
  }).join("");

  analyticsBlock.innerHTML = html;
};
