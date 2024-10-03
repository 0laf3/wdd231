

document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector("#hamburger");

    hamburger.addEventListener("click", () => handleHamburgerClick());

    setCurrentYear();
    setLastModified();
    setCurrentPageNav();
});

function setCurrentYear() {
    let currentYear = new Date().getFullYear();

    document.getElementById("currentYear").textContent = currentYear;
}

function setLastModified() {
    let lastModified = document.lastModified;

    document.getElementById("lastModified").textContent = lastModified;
}

function setCurrentPageNav() {
    let currentPage = document.URL;

    let navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(link => {
        let href = link.getAttribute("href").replace(".html", "");
       
        if (currentPage.includes(href)) {
            link.classList.add("active");
        }
    });
}

function handleHamburgerClick() {
    const nav = document.querySelector("#navigation");

    const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
    
    // expand aria
    hamburger.setAttribute("aria-expanded", !isExpanded);
    
    // hide aria
    nav.setAttribute("aria-hidden", isExpanded);

    //  adding / removing class
    nav.classList.toggle("expanded");
    nav.classList.toggle("collapsed");

    //hamburger icon
    hamburger.textContent = isExpanded ? "☰" : "✖";
}