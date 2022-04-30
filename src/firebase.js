import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAHWPZRpUP0Iek_Ju9SWHje7z1AHD8pRv8",
  authDomain: "bd-pruebas-79b2c.firebaseapp.com",
  projectId: "bd-pruebas-79b2c",
  storageBucket: "bd-pruebas-79b2c.appspot.com",
  messagingSenderId: "1029780647759",
  appId: "1:1029780647759:web:c6071829f1577da60d5f3a"
};

firebase.initializeApp(firebaseConfig);
export{firebase} 