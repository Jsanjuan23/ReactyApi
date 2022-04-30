import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAYdhXGWnCwxZs6Qy1mRo2pG_f65pfSzn4",
  authDomain: "bd-salud-63bbc.firebaseapp.com",
  projectId: "bd-salud-63bbc",
  storageBucket: "bd-salud-63bbc.appspot.com",
  messagingSenderId: "989424799096",
  appId: "1:989424799096:web:e46055ad00bf2aedc4cc8d"
};

firebase.initializeApp(firebaseConfig);
export{firebase} 