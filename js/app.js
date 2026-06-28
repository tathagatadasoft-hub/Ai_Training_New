alert("app.js loaded");
let currentCourseId = null;
/*
=========================================
GitHub Training Portal
Main Application
=========================================
*/

async function loadTrainingData() {

    const container = document.getElementById("training-list");

    // Stop if this page doesn't contain the training list
    if (!container) {
        return;
    }

    try {

        const { data, error } = await supabaseClient
            .from("trainingdata")
            .select("*")
            .order("id", { ascending: true });

        if (error) {
            throw error;
        }

        container.innerHTML = "";

        if (!data || data.length === 0) {

            container.innerHTML = `
                <div class="card">
                    <h3>No Training Available</h3>
                    <p>No training records were found.</p>
                </div>
            `;

            return;
        }

        data.forEach(item => {

            const description = item.desc || "";
            const technology = item.tech || "";
            const link = item.link || "#";

            container.innerHTML += `

                <div class="card">

                    <h3>${item.title}</h3>

                    <p>${description}</p>

                    <div class="tech">

                        ${technology}

                    </div>

                    <br>

                    <a
                        class="btn"
                        href="${link}"
                        target="_blank"
                        rel="noopener noreferrer">

                        Open Training

                    </a>

<br><br>

<button
class="btn review-btn"
onclick="openReviewModal(${item.id},'${item.title}')">

⭐ Write Review

</button>

                </div>

            `;

        });

    }
    catch (error) {

        console.error(error);

        container.innerHTML = `

            <div class="card">

                <h3>Error Loading Data</h3>

                <p>${error.message}</p>

            </div>

        `;

    }

}

/*
=========================================
Load Page
=========================================
*/

document.addEventListener("DOMContentLoaded", () => {

    loadTrainingData();

});
/*
=========================================
Open Review Modal
=========================================
*/

function openReviewModal(courseId, title) {

    // User must be logged in
    if (!auth.currentUser) {

        alert("Please login first to submit a review.");

        return;

    }

    currentCourseId = courseId;

    document.getElementById("reviewCourseId").value = courseId;

    document.getElementById("reviewCourseTitle").innerHTML = title;

    document.getElementById("reviewRating").value = 5;

    document.getElementById("reviewText").value = "";

    document.getElementById("reviewModal").style.display = "block";

}

document.addEventListener("click",function(event){

if(event.target.id==="closeReviewModal"){

document.getElementById("reviewModal").style.display="none";

}

});
/*
=========================================
Submit Review
=========================================
*/

document.addEventListener("click", async function (event) {

    if (event.target.id !== "btnSubmitReview") return;

    const user = auth.currentUser;

    const courseId = document.getElementById("reviewCourseId").value;

    const courseName = document.getElementById("reviewCourseTitle").innerHTML;

    const rating = Number(document.getElementById("reviewRating").value);

    const review = document.getElementById("reviewText").value.trim();

    if (review === "") {

        alert("Please write your review.");

        return;

    }

    // Check if the user has already reviewed this course

    const { data: existing } = await supabaseClient

        .from("reviews")

        .select("*")

        .eq("course_id", courseId)

        .eq("user_email", user.email)

        .maybeSingle();

    let error;

    if (existing) {

        ({ error } = await supabaseClient

            .from("reviews")

            .update({

                rating: rating,

                review: review

            })

            .eq("id", existing.id));

    } else {

        ({ error } = await supabaseClient

            .from("reviews")

            .insert({

                course_id: courseId,

                course_name: courseName,

                user_email: user.email,

                user_name: user.displayName,

                user_photo: user.photoURL,

                rating: rating,

                review: review

            }));

    }

    if (error) {

        alert(error.message);

        return;

    }

    alert("Review saved successfully!");

    document.getElementById("reviewModal").style.display = "none";

});
