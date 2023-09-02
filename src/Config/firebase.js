// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCD9qfY-_Q33brLa34qhxFqafGc9G4kDDk",
  authDomain: "stikywall55.firebaseapp.com",
  projectId: "stikywall55",
  storageBucket: "stikywall55.appspot.com",
  messagingSenderId: "902458869044",
  appId: "1:902458869044:web:468575d1b8eee9abb55161",
  measurementId: "G-SDBLGGN4RZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { analytics, auth ,firestore,}