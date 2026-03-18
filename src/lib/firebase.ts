import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB0Zw2A0SB3XY9gu3hL8L9wo_KLC9V-2pM",
  authDomain: "net-vybe-submission.firebaseapp.com",
  projectId: "net-vybe-submission",
  storageBucket: "net-vybe-submission.firebasestorage.app",
  messagingSenderId: "805472146961",
  appId: "1:805472146961:web:7201bd63f1f516bef43b0"
};

// Prevent duplicate initialization during SSR or hot reload
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);