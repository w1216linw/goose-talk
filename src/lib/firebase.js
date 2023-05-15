import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDF-92Y98WR2JntZQYoZLAVuOfQgi2avlc",
  authDomain: "firstone-cb28b.firebaseapp.com",
  projectId: "firstone-cb28b",
  storageBucket: "firstone-cb28b.appspot.com",
  messagingSenderId: "238505775325",
  appId: "1:238505775325:web:a2c68833946c8f2c370b34",
  measurementId: "G-SRR72J75KS",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
