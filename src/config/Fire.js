// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfd6fWqaCcLU9MJ84G4g7NaQdNw87qxWU",
  authDomain: "pokeapi-35d10.firebaseapp.com",
  projectId: "pokeapi-35d10",
  storageBucket: "pokeapi-35d10.appspot.com",
  messagingSenderId: "855678160230",
  appId: "1:855678160230:web:87a913bd33a11b4323cca7"
};

// Initialize Firebase
const fire = initializeApp(firebaseConfig);
export default fire