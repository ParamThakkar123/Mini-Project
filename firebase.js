// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhIFiWdCSkJe9g8kauDRpn4y6t9CjB5vo",
  authDomain: "ordermanagement-2e88f.firebaseapp.com",
  projectId: "ordermanagement-2e88f",
  storageBucket: "ordermanagement-2e88f.appspot.com",
  messagingSenderId: "786673964570",
  appId: "1:786673964570:web:49cc0489f2766f74cca3a3",
  measurementId: "G-1BD5VGDCSS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const imageDb = getStorage(app)