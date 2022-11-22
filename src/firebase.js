// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE,
  authDomain: "dwisewatch-f0a29.firebaseapp.com",
  projectId: "dwisewatch-f0a29",
  storageBucket: "dwisewatch-f0a29.appspot.com",
  messagingSenderId: "966529995627",
  appId: "1:966529995627:web:978628bae1250b4149f22e",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);

export const provider = new GoogleAuthProvider();
