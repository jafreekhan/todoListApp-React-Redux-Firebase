import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyAIE0UqPDaY3LDBDFh7DPpm16q7wOskA_A",
    authDomain: "wireframer-app.firebaseapp.com",
    databaseURL: "https://wireframer-app.firebaseio.com",
    projectId: "wireframer-app",
    storageBucket: "wireframer-app.appspot.com",
    messagingSenderId: "775415138878",
    appId: "1:775415138878:web:110d044f79b7d1c1e2df6f",
    measurementId: "G-66MN1ZYKXT"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;