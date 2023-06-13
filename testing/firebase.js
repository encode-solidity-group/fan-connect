// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgClpVskMO21B5qmO3zvRon9419uSJfiI",
  authDomain: "fanconnect-aee1c.firebaseapp.com",
  projectId: "fanconnect-aee1c",
  storageBucket: "fanconnect-aee1c.appspot.com",
  messagingSenderId: "73518490078",
  appId: "1:73518490078:web:caed290fb71419ccafbd4f",
  measurementId: "G-7K2ENB7E02"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
export default app;
export { db, storage };