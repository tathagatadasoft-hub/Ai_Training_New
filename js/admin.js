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

async function showManageCourses(){

document.getElementById("courseSection").style.display="block";

loadCourses();

}
/*
====================================
Load Courses
====================================
*/

async function loadCourses(){

const container=document.getElementById("courseList");

container.innerHTML="Loading...";

const {data,error}=await supabaseClient

.from("trainingdata")

.select("*")

.order("id",{ascending:false});

if(error){

container.innerHTML=error.message;

return;

}

container.innerHTML="";

data.forEach(course=>{

container.innerHTML+=`

<div class="card">

<h3>${course.title}</h3>

<p>${course.desc}</p>

<p>

<strong>${course.tech}</strong>

</p>

<a

class="btn"

href="${course.link}"

target="_blank">

Open

</a>

<button

class="btn delete-btn"

onclick="deleteCourse(${course.id})">

Delete

</button>

</div>

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
