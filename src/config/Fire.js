import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCfd6fWqaCcLU9MJ84G4g7NaQdNw87qxWU",
  authDomain: "pokeapi-35d10.firebaseapp.com",
  projectId: "pokeapi-35d10",
  storageBucket: "pokeapi-35d10.appspot.com",
  messagingSenderId: "855678160230",
  appId: "1:855678160230:web:87a913bd33a11b4323cca7"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const auth = getAuth();