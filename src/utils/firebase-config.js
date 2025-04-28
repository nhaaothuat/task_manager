// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBMcfgD38owg7AUFOACfdrrJr4cmzuVVD0",
  authDomain: "task-90e40.firebaseapp.com",
  projectId: "task-90e40",
  storageBucket: "task-90e40.firebasestorage.app",
  messagingSenderId: "62245375944",
  appId: "1:62245375944:web:83fd5fef16dfcf22df7afd",
  measurementId: "G-8QZ0KNM762"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

 export const auth = getAuth(app);