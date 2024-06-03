// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { getAnalytics } from "firebase/analytics";// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-M3Hssbq6JyBOIPihlgCOVG5o50DbfBY",
  authDomain: "diary-app-a86f4.firebaseapp.com",
  databaseURL: "https://diary-app-a86f4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "diary-app-a86f4",
  storageBucket: "diary-app-a86f4.appspot.com",
  messagingSenderId: "74033649533",
  appId: "1:74033649533:web:8f542a69c58e3403dd9e14",
  measurementId: "G-ZRMG9VJEMC"
};

if (!getApps()?.length) {
  initializeApp(firebaseConfig);
}

export const auth = getAuth();
export const db = getFirestore();