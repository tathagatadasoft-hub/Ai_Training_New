/*
=========================================
Firebase Service
=========================================
*/

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-analytics.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import { GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

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

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

const db = getFirestore(app);

/*
=========================================
Exports
=========================================
*/

export {

    app,

    analytics,

    auth,

    provider,

    db

};

console.log("Firebase Loaded Successfully");
