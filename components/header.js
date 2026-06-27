/*
=========================================
Shared Header Component
=========================================
*/

function renderHeader() {

    const header = document.getElementById("site-header");

    if (!header) return;

    header.innerHTML = `

<header class="main-header">

<div class="logo">

<h1>GitHub Training Portal</h1>

<p>Learn GitHub, Cloud, DevOps & AI</p>

</div>

<div class="header-right">

<button
id="loginBtn"
class="login-btn">

Login with Google

</button>

<div
id="userInfo"
class="user-info"
style="display:none;">

<img
id="userPhoto"
class="user-photo">

<div>

<span id="userName"></span>

<br>

<a
href="profile.html">

My Profile

</a>

</div>

</div>

</div>

<nav>

<a href="index.html">

Home

</a>

<a href="about.html">

About

</a>

<a href="contact.html">

Contact

</a>

</nav>

</header>

`;

}

document.addEventListener("DOMContentLoaded", renderHeader);
