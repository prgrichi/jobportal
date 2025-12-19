// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaR5QKBO52Gj27_2stAiALJ1ZFAK32n28",
  authDomain: "jobportal-8a79b.firebaseapp.com",
  databaseURL: "https://jobportal-8a79b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "jobportal-8a79b",
  storageBucket: "jobportal-8a79b.firebasestorage.app",
  messagingSenderId: "188201209430",
  appId: "1:188201209430:web:7174734731554ab9e275f7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);