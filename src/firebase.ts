import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDq4ZUgqczZZhRKwuifwga0eAc1tqCUz4o",
  authDomain: "realtimechatappreact.firebaseapp.com",
  projectId: "realtimechatappreact",
  storageBucket: "realtimechatappreact.firebasestorage.app",
  messagingSenderId: "1088750563861",
  appId: "1:1088750563861:web:0683fc6b77c7e2bc4d541c",
  measurementId: "G-HKMZ2XMV4L"
};

const app: FirebaseApp = initializeApp(firebaseConfig);

export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);