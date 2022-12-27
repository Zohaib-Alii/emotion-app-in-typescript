// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCgejocFJ55pzR_sKbi4Jgfb7tLz9JAUps",
  authDomain: "emotion-app-with-ts.firebaseapp.com",
  projectId: "emotion-app-with-ts",
  storageBucket: "emotion-app-with-ts.appspot.com",
  messagingSenderId: "950279645885",
  appId: "1:950279645885:web:6d18929ca534b0111ea5d4",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth();
