import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import"bootstrap/dist/css/bootstrap.css";
import"bootstrap/dist/js/bootstrap.js";
import"bootstrap-icons/font/bootstrap-icons.css";
//import "./assets/main.css";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyCeXFjV1AyH2BYwykA686Ytc3RN56GhfmQ",
    authDomain: "fir-0-dd676.firebaseapp.com",
    projectId: "fir-0-dd676",
    storageBucket: "fir-0-dd676.appspot.com",
    messagingSenderId: "440863504803",
    appId: "1:440863504803:web:8b012f1afdd6bebf27c216",
    measurementId: "G-MNSKQMJXJF"
  };


// Initialize Firebase
const initFirebase = initializeApp(firebaseConfig);

export const db = getFirestore(initFirebase);

const app = createApp(App);

app.use(router);

app.mount("#app");