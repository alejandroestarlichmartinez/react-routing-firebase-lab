// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGV3nM9InLlcVlsbgKbooxIbIq0hupdH0",
  authDomain: "react-firebase-dcdd0.firebaseapp.com",
  projectId: "react-firebase-dcdd0",
  storageBucket: "react-firebase-dcdd0.appspot.com",
  messagingSenderId: "15664036671",
  appId: "1:15664036671:web:99cff751f90f949ff5b18a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };