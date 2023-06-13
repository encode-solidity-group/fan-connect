// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAVvJah_BOkUmgWq0wAvSNC4toKCXsxZ0",
  authDomain: "only-blocks.firebaseapp.com",
  projectId: "only-blocks",
  storageBucket: "only-blocks.appspot.com",
  messagingSenderId: "291949653751",
  appId: "1:291949653751:web:8e6991c6f3147da3896df2",
  measurementId: "G-KYLM4D16PR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);