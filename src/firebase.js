// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDq4ZUgqczZZhRKwuifwga0eAc1tqCUz4o",
  authDomain: "realtimechatappreact.firebaseapp.com",
  projectId: "realtimechatappreact",
  storageBucket: "realtimechatappreact.firebasestorage.app",
  messagingSenderId: "1088750563861",
  appId: "1:1088750563861:web:0683fc6b77c7e2bc4d541c",
  measurementId: "G-HKMZ2XMV4L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
