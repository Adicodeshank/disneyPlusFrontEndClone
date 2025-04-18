import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAb13yjpuwDAsCFzNdeq5SEY02pLg5nr7E",
  authDomain: "disneyplus-clone-aeea8.firebaseapp.com",
  projectId: "disneyplus-clone-aeea8",
  storageBucket: "disneyplus-clone-aeea8.appspot.com",
  messagingSenderId: "163746576014",
  appId: "1:163746576014:web:e7d08f337a9903a6887bdf",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
