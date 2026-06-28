/*
=========================================
Shared Footer Component
=========================================
*/

function renderFooter() {

    const footer = document.getElementById("site-footer");

    if (!footer) return;

    footer.innerHTML = `

<footer>

    <p>© 2026 GitHub Training Portal</p>

</footer>

`;

}

document.addEventListener("DOMContentLoaded", renderFooter);
