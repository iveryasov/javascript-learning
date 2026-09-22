// Day 92
// Smart Filtering Panel with Saved Search Settings

let allProducts = [];

const searchInput = document.querySelector("#search-input");
const categorySelect = document.querySelector("#category-select");
const sortSelect = document.querySelector("#sort-select");
const resetButton = document.querySelector("#reset-btn");
const informationFound = document.querySelector("#information-found");
const filteredProducts = document.querySelector("#filtered-products");

const defaultFilters = {
  search: "",
  category: "all",
  sort: "default"
};

let currentFilters = JSON.parse(localStorage.getItem("userFilters")) || defaultFilters;

const loadProducts = async () => {
  try {
    const response = await fetch("https://dummyjson.com/products?limit=20");

    if (!response.ok) {
      console.log('API Error:', response.status, await response.text());
      return null;
    }

    const data = await response.json();

    allProducts = data.products;

    searchInput.value = currentFilters.search;
    categorySelect.value = currentFilters.category;
    sortSelect.value = currentFilters.sort;

    applyFiltersAndRender();
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};

const applyFiltersAndRender = () => {
  const filteredOnSearch = allProducts.filter(product => product.title.toLowerCase().includes(currentFilters.search.toLowerCase()));

  const filteredOnCategory = filteredOnSearch.filter(product => {
    return currentFilters.category === "all" || product.category === currentFilters.category;
  });

  const filteredOnPrice = [...filteredOnCategory].sort((a, b) => {
    if (currentFilters.sort === "expensive") {
      return b.price - a.price;
    } else if (currentFilters.sort === "cheap") {
      return a.price - b.price;
    } else {
      return 0;
    }
  });

  const totalPrice = filteredOnPrice.reduce((acc, product) => {
    return acc + product.price;
  }, 0);

  let averagePrice = 0;

  if (filteredOnPrice.length > 0) {
    averagePrice = totalPrice / filteredOnPrice.length;
  }

  informationFound.textContent = `Items found: ${filteredOnPrice.length} pcs. | Average price: $${averagePrice.toFixed(2)}`;

  filteredProducts.innerHTML = filteredOnPrice.map(product => `
      <div>
        <h3>${product.title}</h3>
        <p>Price: ${product.price}</p>
        <p>Category: ${product.category}</p>
      </div>
    `).join("");
};

searchInput.addEventListener("input", () => {
  currentFilters.search = searchInput.value;
  
  localStorage.setItem("userFilters", JSON.stringify(currentFilters));

  applyFiltersAndRender();
});

categorySelect.addEventListener("change", () => {
  currentFilters.category = categorySelect.value;

  localStorage.setItem("userFilters", JSON.stringify(currentFilters));

  applyFiltersAndRender();
});

sortSelect.addEventListener("change", () => {
  currentFilters.sort = sortSelect.value;

  localStorage.setItem("userFilters", JSON.stringify(currentFilters));

  applyFiltersAndRender();
});

resetButton.addEventListener("click", () => {
  currentFilters.search = defaultFilters.search;
  currentFilters.category = defaultFilters.category;
  currentFilters.sort = defaultFilters.sort;

  localStorage.removeItem("userFilters")

  searchInput.value = "";
  categorySelect.value = "all";
  sortSelect.value = "default";

  applyFiltersAndRender();
});

loadProducts();
