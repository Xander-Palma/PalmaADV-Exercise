// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRzmjVfTV29TBMr6clo8AsHcnO8do5Pcg",
  authDomain: "advactivity-afbf6.firebaseapp.com",
  projectId: "advactivity-afbf6",
  storageBucket: "advactivity-afbf6.firebasestorage.app",
  messagingSenderId: "551314786188",
  appId: "1:551314786188:web:3f5fb87e12a404644478a9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app, auth}