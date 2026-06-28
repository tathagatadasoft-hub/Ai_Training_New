/*
=========================================
Admin Dashboard
=========================================
*/

auth.onAuthStateChanged(async (user) => {

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

/*
=========================================
Dashboard
=========================================
*/

function loadDashboard() {

    showSection("dashboardSection");

    loadDashboardCounts();

}

/*
=========================================
Sidebar Navigation
=========================================
*/

document.addEventListener("click", function (event) {

    switch (event.target.id) {

        case "menuDashboard":

            showSection("dashboardSection");
            loadDashboardCounts();
            break;

        case "menuCourses":

            showSection("courseSection");
            loadCourses();
            break;

        case "menuReviews":

            showSection("reviewSection");
            loadReviews();
            break;

        case "menuUsers":

            showSection("userSection");
            loadUsers();
            break;

    }

});

/*
=========================================
Show Section
=========================================
*/

function showSection(sectionId) {

    document.getElementById("dashboardSection").style.display = "none";
    document.getElementById("courseSection").style.display = "none";
    document.getElementById("reviewSection").style.display = "none";
    document.getElementById("userSection").style.display = "none";

    document.getElementById(sectionId).style.display = "block";

}

/*
=========================================
Dashboard Counts
=========================================
*/

async function loadDashboardCounts() {

    const courses = await supabaseClient
        .from("trainingdata")
        .select("*", { count: "exact", head: true });

    const users = await supabaseClient
        .from("users")
        .select("*", { count: "exact", head: true });

    let reviewsCount = 0;

    try {

        const reviews = await supabaseClient
            .from("reviews")
            .select("*", { count: "exact", head: true });

        reviewsCount = reviews.count || 0;

    } catch {

        reviewsCount = 0;

    }

    document.getElementById("totalCourses").innerHTML =
        courses.count || 0;

    document.getElementById("totalUsers").innerHTML =
        users.count || 0;

    document.getElementById("totalReviews").innerHTML =
        reviewsCount;

}

/*
=========================================
Placeholder Functions
=========================================
*/

async function loadCourses() {

    document.getElementById("courseList").innerHTML = `
        <tr>
            <td colspan="5">
                Loading Courses...
            </td>
        </tr>
    `;

}

async function loadReviews() {

    document.getElementById("reviewList").innerHTML = `
        <tr>
            <td colspan="5">
                Loading Reviews...
            </td>
        </tr>
    `;

}

async function loadUsers() {

    document.getElementById("userList").innerHTML = `
        <tr>
            <td colspan="6">
                Loading Users...
            </td>
        </tr>
    `;

}
