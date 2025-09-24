import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqWGvqN83wpXumsdwoCQd_a43hVu3iCvU",
  authDomain: "booklife-98435.firebaseapp.com",
  projectId: "booklife-98435",
  storageBucket: "booklife-98435.firebasestorage.app",
  messagingSenderId: "692413387213",
  appId: "1:692413387213:web:52d45ca27c449ae7a13484"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
