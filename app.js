const menuOpenButton = document.getElementById("menu-open-button")
const menuCloseButton = document.getElementById("menu-close-button")

menuOpenButton.addEventListener("click", () => {
    document.body.classList.toggle("show-mobile-menu")
})

menuCloseButton.addEventListener("click", () => menuOpenButton.click())

const filterButtons = document.querySelectorAll(".filter-btn")
const gridContainers = document.querySelectorAll(".grid-container")

function applyFilter(filter) {
  filterButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.filter === filter)
  })

  gridContainers.forEach((grid) => {
    grid.classList.toggle("active-grid", grid.dataset.filter !== filter)
  })
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => applyFilter(button.dataset.filter))
})

applyFilter("all")