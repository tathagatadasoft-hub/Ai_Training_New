/*
=====================================
Admin Dashboard
=====================================
*/

const ADMIN_EMAIL = "YOUR_GMAIL@gmail.com";

auth.onAuthStateChanged((user) => {

    if (!user) {

        window.location.href = "index.html";

        return;

    }

    if (user.email !== ADMIN_EMAIL) {

        alert("Access Denied");

        window.location.href = "profile.html";

        return;

    }

    loadDashboard();

});

function loadDashboard() {

    console.log("Admin Dashboard Loaded");

}

/*
=====================================
Buttons
=====================================
*/

document.addEventListener("click", (event) => {

    switch (event.target.id) {

        case "btnManageCourses":

            showManageCourses();

            break;

        case "btnReviews":

            showReviews();

            break;

        case "btnUsers":

            showUsers();

            break;

    }

});

function showManageCourses() {

    document.getElementById("adminContent").innerHTML = `

        <h2>Course Management</h2>

        <p>This section will allow you to:</p>

        <ul>

            <li>Add New Course</li>

            <li>Edit Course</li>

            <li>Delete Course</li>

        </ul>

        <br>

        <button id="btnAddCourse" class="btn">

            Add New Course

        </button>

    `;

}

function showReviews() {

    document.getElementById("adminContent").innerHTML = `

        <h2>Review Management</h2>

        <p>All visitor reviews will appear here.</p>

    `;

}

function showUsers() {

    document.getElementById("adminContent").innerHTML = `

        <h2>User Management</h2>

        <p>All logged-in users will appear here.</p>

    `;

}
