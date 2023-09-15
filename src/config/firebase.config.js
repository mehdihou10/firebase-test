// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJJ0DktRE0s1CSKpN_CHu30JimXBxnz-o",
  authDomain: "fir-course-70b15.firebaseapp.com",
  projectId: "fir-course-70b15",
  storageBucket: "fir-course-70b15.appspot.com",
  messagingSenderId: "771519767402",
  appId: "1:771519767402:web:830da6aae561bbb2f2fb13",
  measurementId: "G-1CCDEJCK6N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
