// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
//import {getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFjBtjJwJnuR_uvYLE6Jk8X2Mb2ANOaDE",
  authDomain: "myntra-project-5f015.firebaseapp.com",
  projectId: "myntra-project-5f015",
  storageBucket: "myntra-project-5f015.appspot.com",
  messagingSenderId: "444306999646",
  appId: "1:444306999646:web:1f33a3c624939573d2e7cf",
  measurementId: "G-3QHXZ75RP2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db=getFirestore(app);
