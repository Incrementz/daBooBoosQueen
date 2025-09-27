// Smooth scroll + demo contact form
/*
49 20 6B 65 65 70 20 61 20 68 6F 75 73 65 20 77 69 74 68 20 6E 6F 20 64 6F 6F 72 73 20 61 6E 64 20 6E 65 76 65 72 20 6C 65 6E 64 20 61 20 6B 65 79 2E 0A 59 65 74 20 68 65 72 65 20 79 6F 75 20 61 72 65 20 69 6E 20 6D 79 20 70 61 72 6C 6F 72 2E 0A 57 68 61 74 20 75 6E 6C 6F 63 6B 65 64 20 79 6F 75 72 20 77 61 79 3F 20 6F 70 65 6E 73 20 65 76 65 72 79 20 6C 6F 63 6B 2C 20 62 75 74 20 73 68 75 74 73 20 6F 6E 6C 79 20 79 6F 75 20 69 6E 73 69 64 65 3F
*/
function qs(sel, root = document) {
  return root.querySelector(sel);
}
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length > 1) {
        e.preventDefault();
        document
          .querySelector(id)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
});
function submitContact(e) {
  e.preventDefault();
  const form = e.target;
  const data = Object.fromEntries(new FormData(form).entries());
  const status = qs("#formStatus");
  status.textContent = "Thanks! We'll be in touch shortly.";
  form.reset();
  return false;
}
