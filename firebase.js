// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQ6dQsk9OY72sSb0CW9NiLWDr8odzwimY",
  authDomain: "pantry-app-919f5.firebaseapp.com",
  projectId: "pantry-app-919f5",
  storageBucket: "pantry-app-919f5.appspot.com",
  messagingSenderId: "12469904809",
  appId: "1:12469904809:web:64d1311091f78f479310b8",
  measurementId: "G-4B63CZN3BL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export {firestore};