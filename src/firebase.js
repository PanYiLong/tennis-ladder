import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCIb5LampeZ_a58JXcHqr0RgJ_MoEQ6zVo",
  authDomain: "spring-tennis-ladder.firebaseapp.com",
  projectId: "spring-tennis-ladder",
  storageBucket: "spring-tennis-ladder.firebasestorage.app",
  messagingSenderId: "831588904775",
  appId: "1:831588904775:web:f520e6672bf6fce3262662"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
