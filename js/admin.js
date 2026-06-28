alert("admin.js loaded");

/*
=====================================
Admin Dashboard
=====================================
*/

const ADMIN_EMAIL = "tathagata.dasoft@gmail.com";

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

async function showManageCourses() {

    console.log("Manage Courses clicked");

    alert("Manage Courses clicked");

    const section = document.getElementById("courseSection");

    console.log(section);

    if (!section) {

        alert("courseSection NOT FOUND");

        return;

    }

    section.style.display = "block";

    await loadCourses();

}
/*
====================================
Load Courses
====================================
*/

async function loadCourses() {

    const tbody = document.getElementById("courseList");

    tbody.innerHTML = "";

    const { data, error } = await supabaseClient
        .from("trainingdata")
        .select("*")
        .order("id", { ascending: false });

    if (error) {

        tbody.innerHTML = `
            <tr>
                <td colspan="5">${error.message}</td>
            </tr>
        `;

        return;
    }

    if (data.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td colspan="5">No courses found.</td>
            </tr>
        `;

        return;
    }

    data.forEach(course => {

        tbody.innerHTML += `

            <tr>

                <td>${course.title}</td>

                <td>${course.tech || ""}</td>

                <td>

                    <a
                        href="${course.link}"
                        target="_blank">

                        Open

                    </a>

                </td>

                <td>

                    <button
                        class="btn edit-btn"
                        onclick="editCourse(${course.id})">

                        Edit

                    </button>

                </td>

                <td>

                    <button
                        class="btn delete-btn"
                        onclick="deleteCourse(${course.id})">

                        Delete

                    </button>

                </td>

            </tr>

        `;

    });

}
/*
====================================
Delete Course
====================================
*/

async function deleteCourse(id){

if(

!confirm("Delete this course?")

){

return;

}

const {error}=await supabaseClient

.from("trainingdata")

.delete()

.eq("id",id);

if(error){

alert(error.message);

return;

}

loadCourses();

}
document.addEventListener(

"click",

function(event){

if(

event.target.id==="btnSaveCourse"

){

saveCourse();

}

});
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
