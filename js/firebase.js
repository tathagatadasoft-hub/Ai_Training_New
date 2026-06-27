/*
=========================================
Firebase Configuration
=========================================
*/

const firebaseConfig = {

    apiKey: "AIzaSyD8QgSm87s0Y437F04OuZ-4HffODoTjyR8",

    authDomain: "wrik-ai.firebaseapp.com",

    projectId: "wrik-ai",

    storageBucket: "wrik-ai.firebasestorage.app",

    messagingSenderId: "665195074530",

    appId: "1:665195074530:web:678cc62a9efb6d25699fbb",

    measurementId: "G-DPB1K9543X"

};

/*
=========================================
Initialize Firebase
=========================================
*/

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

console.log("Firebase Ready");
