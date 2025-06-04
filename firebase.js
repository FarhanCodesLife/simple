// firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC_9apK83zu1X6dhVsKozMjPrJj8_6YmGE",
    authDomain: "bloging-app-by-farhan.firebaseapp.com",
    projectId: "bloging-app-by-farhan",
    storageBucket: "bloging-app-by-farhan.appspot.com",
    messagingSenderId: "615288019917",
    appId: "1:615288019917:web:7dd9da3f4ea875ca170284",
    measurementId: "G-LCKVD9RTM9"
  };

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
