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
function openReviewModal(courseId,title){

document.getElementById("reviewCourseId").value=courseId;

document.getElementById("reviewCourseTitle").innerHTML=title;

document.getElementById("reviewRating").value=5;

document.getElementById("reviewText").value="";

document.getElementById("reviewModal").style.display="block";

}

document.addEventListener("click",function(event){

if(event.target.id==="closeReviewModal"){

document.getElementById("reviewModal").style.display="none";

}

});
