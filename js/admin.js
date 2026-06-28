/*
==========================================================
GitHub Training Portal
Admin Dashboard
Version 2.0
==========================================================
*/

/*
==========================================================
Global Variables
==========================================================
*/

let currentUser = null;

let editingCourseId = null;

/*
==========================================================
Authentication
==========================================================
*/

auth.onAuthStateChanged(async (user) => {

    if (!user) {

        window.location.href = "index.html";

        return;

    }

    currentUser = user;

    const { data, error } = await supabaseClient

        .from("users")

        .select("role")

        .eq("firebase_uid", user.uid)

        .single();

    if (error) {

        console.error(error);

        alert("Unable to verify user.");

        window.location.href = "index.html";

        return;

    }

    if (data.role !== "admin") {

        alert("Access Denied");

        window.location.href = "profile.html";

        return;

    }

    initializeDashboard();

});

/*
==========================================================
Initialize Dashboard
==========================================================
*/

function initializeDashboard() {

    registerEvents();

    showDashboard();

}

/*
==========================================================
Register Events
==========================================================
*/

function registerEvents() {

    document

        .getElementById("menuDashboard")

        .addEventListener("click", showDashboard);

    document

        .getElementById("menuCourses")

        .addEventListener("click", showCourses);

    document

        .getElementById("menuReviews")

        .addEventListener("click", showReviews);

    document

        .getElementById("menuUsers")

        .addEventListener("click", showUsers);

    document

        .getElementById("btnSaveCourse")

        .addEventListener("click", saveCourse);

    document

        .getElementById("btnCancelEdit")

        .addEventListener("click", cancelEdit);

}

/*
==========================================================
Hide All Sections
==========================================================
*/

function hideAllSections() {

    document

        .getElementById("dashboardSection")

        .style.display = "none";

    document

        .getElementById("courseSection")

        .style.display = "none";

    document

        .getElementById("reviewSection")

        .style.display = "none";

    document

        .getElementById("userSection")

        .style.display = "none";

}

/*
==========================================================
Dashboard
==========================================================
*/

async function showDashboard() {

    hideAllSections();

    document

        .getElementById("dashboardSection")

        .style.display = "block";

    await loadStatistics();

}

/*
==========================================================
Dashboard Statistics
==========================================================
*/

async function loadStatistics() {

    const courseResult = await supabaseClient

        .from("trainingdata")

        .select("*", {

            count: "exact",

            head: true

        });

    document

        .getElementById("totalCourses")

        .innerHTML = courseResult.count || 0;

    const userResult = await supabaseClient

        .from("users")

        .select("*", {

            count: "exact",

            head: true

        });

    document

        .getElementById("totalUsers")

        .innerHTML = userResult.count || 0;

    let reviewCount = 0;

    try {

        const reviewResult = await supabaseClient

            .from("reviews")

            .select("*", {

                count: "exact",

                head: true

            });

        reviewCount = reviewResult.count || 0;

    }

    catch {

        reviewCount = 0;

    }

    document

        .getElementById("totalReviews")

        .innerHTML = reviewCount;

}

/*
==========================================================
Course Management
==========================================================
*/

async function showCourses() {

    hideAllSections();

    document

        .getElementById("courseSection")

        .style.display = "block";

    clearCourseForm();

    await loadCourses();

}
