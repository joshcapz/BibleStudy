import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCFMTJiEeVR_FXSUb7TSmgjsihlp19tT3s",
  authDomain: "jgc-goal-tracker.firebaseapp.com",
  projectId: "jgc-goal-tracker",
  storageBucket: "jgc-goal-tracker.firebasestorage.app",
  messagingSenderId: "375969020015",
  appId: "1:375969020015:web:a9ef43664061df8d16f59a"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)