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
Load Courses
=========================================
*/

async function loadCourses() {

    const tbody = document.getElementById("courseList");

    tbody.innerHTML = `
        <tr>
            <td colspan="5">
                Loading...
            </td>
        </tr>
    `;

    const { data, error } = await supabaseClient
        .from("trainingdata")
        .select("*")
        .order("id", { ascending: false });

    if (error) {

        tbody.innerHTML = `
            <tr>
                <td colspan="5">
                    ${error.message}
                </td>
            </tr>
        `;

        return;

    }

    if (data.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td colspan="5">
                    No Courses Available
                </td>
            </tr>
        `;

        return;

    }

    tbody.innerHTML = "";

    data.forEach(course => {

        tbody.innerHTML += `

<tr>

<td>${course.title}</td>

<td>${course.tech ?? ""}</td>

<td>

<a
href="${course.link}"
target="_blank">

Open

</a>

</td>

<td>

<button
class="btn"

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
=========================================
Save Course
=========================================
*/

async function saveCourse() {

    const title = document.getElementById("courseTitle").value.trim();

    const desc = document.getElementById("courseDesc").value.trim();

    const tech = document.getElementById("courseTech").value.trim();

    const link = document.getElementById("courseLink").value.trim();

    if (!title) {

        alert("Course Title is required.");

        return;

    }

    const { error } = await supabaseClient

        .from("trainingdata")

        .insert({

            title,

            desc,

            tech,

            link

        });

    if (error) {

        alert(error.message);

        return;

    }

    alert("Course Added Successfully");

    clearCourseForm();

    loadCourses();

    loadDashboardCounts();

}
/*
=========================================
Clear Form
=========================================
*/

function clearCourseForm(){

document.getElementById("courseId").value="";

document.getElementById("courseTitle").value="";

document.getElementById("courseDesc").value="";

document.getElementById("courseTech").value="";

document.getElementById("courseLink").value="";

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

/*
==========================================================
Load Users
==========================================================
*/

async function loadUsers() {

    const tbody = document.getElementById("userList");

    tbody.innerHTML = `
        <tr>
            <td colspan="7">Loading Users...</td>
        </tr>
    `;

    const { data, error } = await supabaseClient
        .from("users")
        .select("*")
        .order("display_name");

    if (error) {

        tbody.innerHTML = `
            <tr>
                <td colspan="7">${error.message}</td>
            </tr>
        `;

        return;

    }

    if (!data || data.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td colspan="7">No Users Found</td>
            </tr>
        `;

        return;

    }

    renderUsers(data);

}
function renderUsers(users) {

    const tbody = document.getElementById("userList");

    let html = "";

    users.forEach(user => {

        const roleBadge = user.role === "admin"
            ? "🟣 Admin"
            : "🔵 User";

        const statusBadge = user.status === "disabled"
            ? "🔴 Disabled"
            : "🟢 Active";

        const lastLogin = user.last_login
            ? new Date(user.last_login).toLocaleString()
            : "-";

        let actionButton = "";

        // Logged in admin
        if (user.email === currentUser.email) {

            actionButton = `
                <button
                    class="btn"
                    disabled>
                    Current User
                </button>
            `;

        }

        // Other admins
        else if (user.role === "admin") {

            actionButton = `
                <button
                    class="btn"
                    disabled>
                    Protected
                </button>
            `;

        }

        // Normal users
else {

    if (user.status === "disabled") {

        actionButton = `

<button
class="btn"
onclick="viewUser(${user.id})">

View

</button>

<button
class="btn"
onclick="toggleUserStatus(${user.id},'active')">

Enable

</button>

`;

    }

    else {

        actionButton = `

<button
class="btn"
onclick="viewUser(${user.id})">

View

</button>

<button
class="btn delete-btn"
onclick="toggleUserStatus(${user.id},'disabled')">

Disable

</button>

`;

    }

}

        html += `

<tr>

<td>

<img
src="${user.photo_url}"
style="width:45px;height:45px;border-radius:50%;">

</td>

<td>${user.display_name}</td>

<td>${user.email}</td>

<td>${roleBadge}</td>

<td>${statusBadge}</td>

<td>${lastLogin}</td>

<td>${actionButton}</td>

</tr>

`;

    });

    tbody.innerHTML = html;

}
async function toggleUserStatus(id, status) {

    const { error } = await supabaseClient
        .from("users")
        .update({
            status: status
        })
        .eq("id", id);

    if (error) {

        alert(error.message);

        return;

    }

    loadUsers();

}

async function viewUser(id){

const {data,error}=await supabaseClient

.from("users")

.select("*")

.eq("id",id)

.single();

if(error){

alert(error.message);

return;

}

document.getElementById("modalPhoto").src=data.photo_url;

document.getElementById("modalName").innerHTML=data.display_name;

document.getElementById("modalEmail").innerHTML=data.email;

document.getElementById("modalRole").innerHTML=data.role;

document.getElementById("modalStatus").innerHTML=data.status;

document.getElementById("modalUID").innerHTML=data.firebase_uid;

document.getElementById("modalLastLogin").innerHTML=

data.last_login

? new Date(data.last_login).toLocaleString()

: "-";

document.getElementById("userModal").style.display="block";

}

/*
==========================================================
Delete User
==========================================================
*/

async function deleteUser(id) {

    const confirmDelete = confirm(

        "Are you sure you want to delete this user?"

    );

    if (!confirmDelete) {

        return;

    }

    const { error } = await supabaseClient

        .from("users")

        .delete()

        .eq("id", id);

    if (error) {

        alert(error.message);

        return;

    }

    alert("User deleted successfully.");

    loadUsers();

    loadDashboardCounts();

}

document.addEventListener("click",function(event){

if(event.target.id==="btnSaveCourse"){

saveCourse();

}

});
document.addEventListener("input", async function (event) {

    if (event.target.id !== "userSearch") return;

    const keyword = event.target.value.toLowerCase();

    const { data } = await supabaseClient
        .from("users")
        .select("*")
        .order("display_name");

    const filtered = data.filter(user =>

        user.display_name.toLowerCase().includes(keyword) ||

        user.email.toLowerCase().includes(keyword)

    );

    renderUsers(filtered);

});
document.addEventListener("click",function(event){

if(event.target.id==="closeUserModal"){

document.getElementById("userModal").style.display="none";

}

if(event.target.id==="userModal"){

document.getElementById("userModal").style.display="none";

}

});
