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

        if(window.location.pathname.includes("index.html")){

            if(user.email===ADMIN_EMAIL){

                window.location.href="admin.html";

            }

            else{

                window.location.href="profile.html";

            }

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
