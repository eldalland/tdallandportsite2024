
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9387XEkxsuhzMwztx6y3O6Ws4ezvaAds",
  authDomain: "tdallandportfoliosite2024.firebaseapp.com",
  projectId: "tdallandportfoliosite2024",
  storageBucket: "tdallandportfoliosite2024.appspot.com",
  messagingSenderId: "139178529478",
  appId: "1:139178529478:web:ec216af23a54d55055bdc7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)