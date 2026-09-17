// Day 87
// Freelance Tasks Board with Smart Search

// DOM Elements
const searchInput = document.querySelector("#search-input");
const allOrdersButton = document.querySelector("#all-orders-btn");
const reactOrdersButton = document.querySelector("#react-orders-btn");
const jsOrdersButton = document.querySelector("#js-orders-btn");
const htmlOrdersButton = document.querySelector("#html-orders-btn");
const nodeOrdersButton = document.querySelector("#node-orders-btn");
const counter = document.querySelector("#counter");
const tasksBlock = document.querySelector("#tasks");

// Initial Tasks Data
const initialTasks = [
  {
    id: 1,
    title: "Build a responsive landing page",
    description: "Need clean HTML/CSS from Figma mockup with vanilla JS animations.",
    tags: ["HTML/CSS", "JavaScript"],
    budget: 12000
  },
  {
    id: 2,
    title: "Develop a Telegram order bot",
    description: "Node.js bot for a pizzeria with payment integration and database.",
    tags: ["Node.js", "JavaScript"],
    budget: 25000
  },
  {
    id: 3,
    title: "Migrate UI to React",
    description: "Legacy jQuery project needs to be refactored into modern React components.",
    tags: ["React", "JavaScript"],
    budget: 45000
  },
  {
    id: 4,
    title: "Fix layout bugs in Safari",
    description: "Flexbox and fonts are misaligned on iOS mobile devices.",
    tags: ["HTML/CSS"],
    budget: 5000
  },
  {
    id: 5,
    title: "Create an analytics dashboard",
    description: "Interactive charts and data filtering tables built with React.",
    tags: ["React"],
    budget: 35000
  },
  {
    id: 6,
    title: "Scrape product catalog",
    description: "Node.js script to extract prices and save structured data into JSON.",
    tags: ["Node.js"],
    budget: 15000
  }
];

// Render Function
const render = (tasks) => {
  // Counter placed on top (outside if/else)
  counter.textContent = `Tasks found: ${tasks.length} of 6`;

  if (tasks.length > 0) {
    tasksBlock.innerHTML = tasks.map(task => `
      <div class="task-card">
        <h3>${task.title}</h3>
        <p>ID: ${task.id}</p>
        <p>Description: ${task.description}</p>
        <p>Tags: ${task.tags.join(", ")}</p>
        <p>Budget: $${task.budget}</p>
      </div>
    `).join("");
  } else {
    tasksBlock.innerHTML = `<p class="not-found">No tasks found for your query 🙄</p>`;
  }
};

// Initial Render
render(initialTasks);

// Smart Search via String .includes()
searchInput.addEventListener("input", () => {
  const userText = searchInput.value.trim().toLowerCase();

  const filterTasks = initialTasks.filter(task =>
    task.title.trim().toLowerCase().includes(userText) ||
    task.description.trim().toLowerCase().includes(userText)
  );

  render(filterTasks);
});

// Tag Filter Event Listeners via Array .includes()
allOrdersButton.addEventListener("click", () => {
  render(initialTasks);
});

reactOrdersButton.addEventListener("click", () => {
  const filterTasks = initialTasks.filter(task => task.tags.includes("React"));
  render(filterTasks);
});

jsOrdersButton.addEventListener("click", () => {
  const filterTasks = initialTasks.filter(task => task.tags.includes("JavaScript"));
  render(filterTasks);
});

htmlOrdersButton.addEventListener("click", () => {
  const filterTasks = initialTasks.filter(task => task.tags.includes("HTML/CSS"));
  render(filterTasks);
});

nodeOrdersButton.addEventListener("click", () => {
  const filterTasks = initialTasks.filter(task => task.tags.includes("Node.js"));
  render(filterTasks);
});
