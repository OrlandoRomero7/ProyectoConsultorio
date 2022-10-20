// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkeWmi1J1gl5pIvWSBySyTFfOPn-Gagyk",
  authDomain: "smae-nuevo.firebaseapp.com",
  databaseURL: "https://smae-nuevo-default-rtdb.firebaseio.com",
  projectId: "smae-nuevo",
  storageBucket: "smae-nuevo.appspot.com",
  messagingSenderId: "217422970616",
  appId: "1:217422970616:web:5c4e6d4c9dfcc88026c50d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

export {auth}