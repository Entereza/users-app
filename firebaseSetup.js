import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDNn80ZL1LyHmMPOHRCyBq-VzUS5F1B8Bc",
    authDomain: "entereza-analytics.firebaseapp.com",
    projectId: "entereza-analytics",
    storageBucket: "entereza-analytics.appspot.com",
    messagingSenderId: "511900415351",
    appId: "1:511900415351:web:d505190aca975498e05d72",
    measurementId: "G-YV9SGPZK9G"
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

export default app;