// Mobile menu elements
const menuOpenButton = document.getElementById("menu-open-button");
const menuCloseButton = document.getElementById("menu-close-button");

// Guard: only add listeners if elements exist
if (menuOpenButton) {
  menuOpenButton.addEventListener("click", () => {
    document.body.classList.toggle("show-mobile-menu");
  });
}

// Close menu properly (remove class instead of toggling via open button)
if (menuCloseButton) {
  menuCloseButton.addEventListener("click", () => {
    document.body.classList.remove("show-mobile-menu");
  });
}

// Close mobile menu when a nav link is clicked
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("show-mobile-menu");
  });
});

// Close mobile menu on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.body.classList.remove("show-mobile-menu");
  }
});

// Close mobile menu when clicking the backdrop overlay
document.addEventListener("click", (e) => {
  if (
    document.body.classList.contains("show-mobile-menu") &&
    !e.target.closest(".nav-menu") &&
    !e.target.closest("#menu-open-button")
  ) {
    document.body.classList.remove("show-mobile-menu");
  }
});

// Menu filter logic
const filterButtons = document.querySelectorAll(".filter-btn");
const gridContainers = document.querySelectorAll(".grid-container");

function applyFilter(filter) {
  filterButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.filter === filter);
  });

  gridContainers.forEach((grid) => {
    grid.classList.toggle("active-grid", grid.dataset.filter !== filter);
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => applyFilter(button.dataset.filter));
});

applyFilter("all");

// Add-to-cart toast feedback
function showToast(message) {
  // Remove existing toast if any
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  // Trigger show animation
  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  // Hide after 2 seconds
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 2000);
}

document.querySelectorAll(".card-add").forEach((btn) => {
  btn.addEventListener("click", () => {
    const cardName =
      btn.closest(".menu-card")?.querySelector(".card-name")?.textContent ||
      "Item";
    showToast(`${cardName} added to cart!`);
  });
});
