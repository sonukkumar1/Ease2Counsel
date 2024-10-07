// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqjNxsTh8zrWx4Qf5KEcytb-3csiy0DwE",
  authDomain: "ease2counsel.firebaseapp.com",
  projectId: "ease2counsel",
  storageBucket: "ease2counsel.appspot.com",
  messagingSenderId: "620594676036",
  appId: "1:620594676036:web:328b3c2483ec68996e9711",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
export default storage;