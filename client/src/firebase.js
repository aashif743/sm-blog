// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// process.env.VITE_FIREBASE_API_KEY,

const firebaseConfig = {
  apiKey: "AIzaSyA-gMyN86sx2lfRG7iv1_UIA1Nvc2NUtuo",
  authDomain: "sm-blog-19993.firebaseapp.com",
  projectId: "sm-blog-19993",
  storageBucket: "sm-blog-19993.firebasestorage.app",
  messagingSenderId: "707135874522",
  appId: "1:707135874522:web:179b4df88ab2161be78ce3",
  measurementId: "G-DWRD55PZN6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);