// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMLHDgoI7neLvrco6dDMU0Ta3DGcQgpTU",
  authDomain: "microstation-corp.firebaseapp.com",
  projectId: "microstation-corp",
  storageBucket: "microstation-corp.appspot.com",
  messagingSenderId: "721690591897",
  appId: "1:721690591897:web:a7929c41612f9afad2ee08",
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const usersref = collection(db, "users");
