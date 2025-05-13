// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCk02QtaUEBWyYgVox2XMSYnNwiJBn_TyQ",
  authDomain: "mylastexam-2c749.firebaseapp.com",
  projectId: "mylastexam-2c749",
  storageBucket: "mylastexam-2c749.firebasestorage.app",
  messagingSenderId: "640509733099",
  appId: "1:640509733099:web:687ed3e0f18b75889f36ae",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
