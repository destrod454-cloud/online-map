// ================= MOBILE HAMBURGER MENU =================

const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const closeMenu = document.getElementById("closeMenu");
const menuOverlay = document.getElementById("menuOverlay");


// Open menu
function openMenu() {
    mobileMenu.classList.add("active");
    menuOverlay.classList.add("active");

    hamburger.classList.add("active");
    hamburger.setAttribute("aria-expanded", "true");

    document.body.style.overflow = "hidden";
}


// Close menu
function closeMobileMenu() {
    mobileMenu.classList.remove("active");
    menuOverlay.classList.remove("active");

    hamburger.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");

    document.body.style.overflow = "";
}


// Hamburger button
if (hamburger) {
    hamburger.addEventListener("click", openMenu);
}


// Close button
if (closeMenu) {
    closeMenu.addEventListener("click", closeMobileMenu);
}


// Close when clicking outside the menu
if (menuOverlay) {
    menuOverlay.addEventListener("click", closeMobileMenu);
}


// Close menu after selecting a navigation link
const mobileLinks = document.querySelectorAll(".mobile-nav a");

mobileLinks.forEach(function(link) {
    link.addEventListener("click", closeMobileMenu);
});


// Close menu when pressing Escape
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closeMobileMenu();
    }
});


// Reset menu if screen becomes desktop-sized
window.addEventListener("resize", function() {
    if (window.innerWidth > 900) {
        closeMobileMenu();
    }
});