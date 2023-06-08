// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9JnSHNJPmVFaPJUteDx9GaEHHw07QLLM",
  authDomain: "software1-fotos.firebaseapp.com",
  databaseURL: "https://software1-fotos-default-rtdb.firebaseio.com",
  projectId: "software1-fotos",
  storageBucket: "software1-fotos.appspot.com",
  messagingSenderId: "639007329636",
  appId: "1:639007329636:web:a9f98270eb10af0f8afe71",
  measurementId: "G-ZSF13QG595"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
const analytics = getAnalytics(app);