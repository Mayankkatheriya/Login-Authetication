// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAa1RE22OBP8DbjDptoWJiucTElq5XS2Kc",
  authDomain: "auth-demo-f2e42.firebaseapp.com",
  projectId: "auth-demo-f2e42",
  storageBucket: "auth-demo-f2e42.appspot.com",
  messagingSenderId: "1056812673294",
  appId: "1:1056812673294:web:fbe57b94380698aef04f5f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app)
export default app