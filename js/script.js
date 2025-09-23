const openMenu = document.getElementById("open-menu");
const closeMenu = document.getElementById("close-menu");
const nav = document.querySelector("nav");

openMenu.addEventListener("click", () => {
  nav.classList.add("menu-opened");
});

closeMenu.addEventListener("click", () => {
  nav.classList.remove("menu-opened");
});

const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
