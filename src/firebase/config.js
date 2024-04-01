// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyC83loTu92zMMfsgEi57af5dBTyhVcu6n4",
  authDomain: "yelp-54f50.firebaseapp.com",
  projectId: "yelp-54f50",
  storageBucket: "yelp-54f50.appspot.com",
  messagingSenderId: "599974007522",
  appId: "1:599974007522:web:2f1bbd0c9384df69d704bb",
  measurementId: "G-RXZFHQM6QR"
};

const app = initializeApp(firebaseConfig);
export default app;
export const db = getFirestore(app);
