// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDaztnnIaxkvKxafAlEeeikGfCqeEYBKIQ",
  authDomain: "ishanya-6d293.firebaseapp.com",
  projectId: "ishanya-6d293",
  storageBucket: "ishanya-6d293.firebasestorage.app",
  messagingSenderId: "1004044682669",
  appId: "1:1004044682669:web:b0ffab961b7e0048a1cd24",
  measurementId: "G-X2MFP41GJX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    throw error;
  }
};
