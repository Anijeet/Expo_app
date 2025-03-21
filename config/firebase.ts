// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7gDWIyDhqs9mQuazLVeft6WluPSb-EAw",
  authDomain: "motomate-4e06b.firebaseapp.com",
  projectId: "motomate-4e06b",
  storageBucket: "motomate-4e06b.firebasestorage.app",
  messagingSenderId: "1095684807776",
  appId: "1:1095684807776:web:e0691b15655038804cb705",
  measurementId: "G-2S595M6NB5"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {db, app, auth};