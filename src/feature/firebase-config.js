import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBeLRpmTB_hNAN3Swmy6UuQDtnYmVNf_xs",
    authDomain: "e-commerce-redux-62ac1.firebaseapp.com",
    projectId: "e-commerce-redux-62ac1",
    storageBucket: "e-commerce-redux-62ac1.appspot.com",
    messagingSenderId: "508332027358",
    appId: "1:508332027358:web:a1f0d8c179eeb4657d014f"
  };

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;