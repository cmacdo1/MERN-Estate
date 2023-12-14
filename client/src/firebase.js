// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-3d793.firebaseapp.com",
  projectId: "mern-estate-3d793",
  storageBucket: "mern-estate-3d793.appspot.com",
  messagingSenderId: "165564442431",
  appId: "1:165564442431:web:9bb0d5e5cc72077031d58a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);