import { initializeApp } from "firebase/app";
import { getFunctions } from "firebase/functions";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZ5AnjSR_HEtqsXh5srCJc47E01w-kkTw",
  authDomain: "shalom-103df.firebaseapp.com",
  projectId: "shalom-103df",
  storageBucket: "shalom-103df.appspot.com",
  messagingSenderId: "280962315968",
  appId: "1:280962315968:web:d19626f6a9cc51fb25df25",
  measurementId: "G-MM2P4K0TK5",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

export{app,auth,db,functions}