// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7XkONOjCSbsViwcnLSHs8v3eXZvwFEE0",
  authDomain: "pilar-challenge-c8e47.firebaseapp.com",
  projectId: "pilar-challenge-c8e47",
  storageBucket: "pilar-challenge-c8e47.firebasestorage.app",
  messagingSenderId: "819880887613",
  appId: "1:819880887613:web:bd3474b8bbb22ae81f3154",
  measurementId: "G-284314CXZH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);