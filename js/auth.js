/*
=========================================
Authentication
=========================================
*/

const ADMIN_EMAIL = "tathagata.dasoft@gmail.com";

/*
=========================================
Login
=========================================
*/

function loginWithGoogle() {

    auth.signInWithPopup(provider)

    .then((result)=>{

        console.log(result.user.displayName);

    })

    .catch((error)=>{

        console.error(error);

        alert(error.message);

    });

}

/*
=========================================
Logout
=========================================
*/

function logout() {

    auth.signOut();

}

/*
=========================================
Authentication State
=========================================
*/

auth.onAuthStateChanged((user)=>{

    console.log("Current Page:", window.location.pathname);

    console.log("User:", user ? user.email : "No User");

    console.log("Auth.js Running");
    
    const loginBtn=document.getElementById("loginBtn");

    const userInfo=document.getElementById("userInfo");

    if(user){

        if(loginBtn){

            loginBtn.style.display="none";

        }

        if(userInfo){

            userInfo.style.display="flex";

        }

        const photo=document.getElementById("userPhoto");

        const name=document.getElementById("userName");

        if(photo){

            photo.src=user.photoURL;

        }

        if(name){

            name.innerHTML=user.displayName;

        }

        console.log("Logged in");

        console.log(user.email);
        
// Sync Firebase user to Supabase
syncUserToSupabase(user);
        
// Redirect only if user manually opens admin page without permission

const path = window.location.pathname;

if (
    path.endsWith("/admin.html") &&
    user.email !== ADMIN_EMAIL
) {

    alert("Access Denied");

    window.location.href = "profile.html";

}
    }

    else{

        if(loginBtn){

            loginBtn.style.display="inline-block";

        }

        if(userInfo){

            userInfo.style.display="none";

        }

    }

});

/*
=========================================
Button Events
=========================================
*/

document.addEventListener("click",(event)=>{

    if(event.target.id==="loginBtn"){

        loginWithGoogle();

    }

    if(event.target.id==="logoutBtn"){

        logout();

    }

});
/*
=========================================
Sync User To Supabase
=========================================
*/

async function syncUserToSupabase(user) {

    const { data, error } = await supabaseClient

        .from("users")

        .select("*")

        .eq("firebase_uid", user.uid)

        .single();

    if (error && error.code !== "PGRST116") {

        console.error(error);

        return;

    }

    // User already exists
    if (data) {

        const { error: updateError } = await supabaseClient

            .from("users")

            .update({

                display_name: user.displayName,

                photo_url: user.photoURL,

                last_login: new Date().toISOString()

            })

            .eq("firebase_uid", user.uid);

        if (updateError) {

            console.error(updateError);

        }

        return;

    }

    // New User
    const { error: insertError } = await supabaseClient

        .from("users")

        .insert({

            firebase_uid: user.uid,

            display_name: user.displayName,

            email: user.email,

            photo_url: user.photoURL,

            role: "user",

            last_login: new Date().toISOString()

        });

    if (insertError) {

        console.error(insertError);

    }

}
