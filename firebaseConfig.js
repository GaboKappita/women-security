// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmb3p57YglSjZlZe9qYxQvTRycgPvaAnk",
  authDomain: "women-security-app-31986.firebaseapp.com",
  databaseURL: "https://women-security-app-31986-default-rtdb.firebaseio.com",
  projectId: "women-security-app-31986",
  storageBucket: "women-security-app-31986.appspot.com",
  messagingSenderId: "22178517804",
  appId: "1:22178517804:web:ec15e717a505d54aa8d289",
  measurementId: "G-CXCHFTLQ1B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const database = getDatabase(app);
