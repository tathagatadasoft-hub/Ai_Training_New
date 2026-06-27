/*
=========================================
Configuration File
Supports:
1. Supabase
2. Firebase
=========================================
*/

// =========================================
// SUPABASE CONFIGURATION
// =========================================

const SUPABASE_URL = "https://kxfvygnmcgvzsizwwlop.supabase.co";

const SUPABASE_KEY = "sb_publishable_KPc7MdTlw9p79t1YGboASg_y94Ct98v";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

// =========================================
// FIREBASE CONFIGURATION
// =========================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-analytics.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {

    apiKey: "AIzaSyD8QgSm87s0Y437F04OuZ-4HffODoTjyR8",

    authDomain: "wrik-ai.firebaseapp.com",

    projectId: "wrik-ai",

    storageBucket: "wrik-ai.firebasestorage.app",

    messagingSenderId: "665195074530",

    appId: "1:665195074530:web:678cc62a9efb6d25699fbb",

    measurementId: "G-DPB1K9543X"

};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);

const analytics = getAnalytics(firebaseApp);

const firestoreDB = getFirestore(firebaseApp);

// =========================================
// Export Firebase Objects
// =========================================

export {

    firebaseApp,

    firestoreDB,

    analytics

};

console.log("Supabase Connected");

console.log("Firebase Connected");
