/*
=================================
Profile Page
=================================
*/

auth.onAuthStateChanged(async(user)=>{

if(!user){

window.location="index.html";

return;

}

document.getElementById("profilePhoto").src=user.photoURL;

document.getElementById("profileName").innerHTML=user.displayName;

document.getElementById("profileEmail").innerHTML=user.email;

loadMyReviews(user.email);

});

async function loadMyReviews(email){

const container=document.getElementById("myReviews");

container.innerHTML="Loading...";

const {data,error}=await supabaseClient

.from("reviews")

.select("*")

.eq("user_email",email)

.order("id",{ascending:false});

if(error){

container.innerHTML=`

<div class="card">

<h3>Error</h3>

<p>

${error.message}

</p>

</div>

`;

return;

}

if(data.length==0){

container.innerHTML=`

<div class="card">

<h3>

No Reviews Yet

</h3>

</div>

`;

return;

}

container.innerHTML="";

data.forEach(review=>{

container.innerHTML+=`

<div class="card">

<h3>

${review.course_name}

</h3>

<p>

⭐ Rating :

${review.rating}/5

</p>

<p>

${review.review}

</p>

</div>

`;

});

}
