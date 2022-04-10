// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMlX2qOUxp7FKQKqpHLiRBhgPhxi1zIgk",
  authDomain: "alpha-7ec97.firebaseapp.com",
  projectId: "alpha-7ec97",
  storageBucket: "alpha-7ec97.appspot.com",
  messagingSenderId: "775052585289",
  appId: "1:775052585289:web:3deae5cec614a0755f9298",
  databaseURL: 'https://alpha-7ec97.firebaseio.com'
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}
const auth = firebase.auth();
export { auth };