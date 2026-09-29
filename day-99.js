// Day 99
// Dashboard Layout & Dynamic Tabs Engine

const sidebar = document.querySelector("#sidebar");
const allTabs = document.querySelectorAll(".tab-content");

sidebar.addEventListener("click", (event) => {
  if (event.target.classList.contains("nav-btn")) {
    const targetId = event.target.dataset.id;

    allTabs.forEach(tab => {
      tab.classList.add("hidden");
    });

    const activeTab = document.querySelector("#" + targetId);
    activeTab.classList.remove("hidden");
  }
});
