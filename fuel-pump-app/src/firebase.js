// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAOvIwZdf_5bIkOcLmeEyUHEIxcOkgxx6Q",
  authDomain: "netrakonafuel.firebaseapp.com",
  projectId: "netrakonafuel",
  storageBucket: "netrakonafuel.firebasestorage.app",
  messagingSenderId: "708887985136",
  appId: "1:708887985136:web:635a524fbbc8feaf6f3b35",
  measurementId: "G-G2M5VQYK3W",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
