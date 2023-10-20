// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: import.meta.env.VITE_APIKEY,
  // authDomain: import.meta.env.VITE_AUTHDOMAIN, 
  // projectId: import.meta.env.VITE_PROJECTID, 
  // storageBucket: import.meta.env.VITE_STORAGEBUCKET, 
  // messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID, 
  // appId: import.meta.env.VITE_APPID,
  apiKey: "AIzaSyANV5TCbu5cmRgr-odc5LBCeCqWJVQRFNM",
  authDomain: "motor-mingle.firebaseapp.com",
  projectId: "motor-mingle",
  storageBucket: "motor-mingle.appspot.com",
  messagingSenderId: "384758156085",
  appId: "1:384758156085:web:22da53212107885f929a7c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;