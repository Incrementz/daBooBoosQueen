const header = document.querySelector(".site-header");
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("primary-nav");

toggle?.addEventListener("click", () => {
  const isOpen = header.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});

// Close menu when a link is clicked (mobile nicety)
nav?.addEventListener("click", (e) => {
  if (e.target.closest("a") && header.classList.contains("open")) {
    header.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }
});

// Close on Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && header.classList.contains("open")) {
    header.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }
});
