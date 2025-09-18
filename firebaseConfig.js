import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyA__8MIG9TMi1q1Ensi6ik1fxA77R7Ra-I",
  authDomain: "poker-80e13.firebaseapp.com",
  projectId: "poker-80e13",
  storageBucket: "poker-80e13.firebasestorage.app",
  messagingSenderId: "1047389252647",
  appId: "1:1047389252647:web:f88de8ee178a059317f202"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);