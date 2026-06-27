/*
=========================================
Common JavaScript
Shared across all pages
=========================================
*/

document.addEventListener("DOMContentLoaded", () => {

    console.log("Common JavaScript Loaded Successfully");

    highlightCurrentPage();

    updateFooterYear();

});

/*
=========================================
Highlight Active Navigation Link
=========================================
*/

function highlightCurrentPage() {

    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(link => {

        const href = link.getAttribute("href");

        if (href === currentPage) {

            link.classList.add("active");

        }

    });

}

/*
=========================================
Automatically Update Footer Year
=========================================
*/

function updateFooterYear() {

    const footer = document.querySelector("footer");

    if (!footer) {

        return;

    }

    footer.innerHTML = `© ${new Date().getFullYear()} GitHub Training Portal`;

}
