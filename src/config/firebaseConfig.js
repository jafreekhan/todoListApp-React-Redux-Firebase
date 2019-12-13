import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyCOwKjwoSEfexw5KsiiZcGRSzDR7C4tjpw",
    authDomain: "todo-hw3-ncw-899a2.firebaseapp.com",
    databaseURL: "https://todo-hw3-ncw-899a2.firebaseio.com",
    projectId: "todo-hw3-ncw-899a2",
    storageBucket: "todo-hw3-ncw-899a2.appspot.com",
    messagingSenderId: "587965271437",
    appId: "1:587965271437:web:99e1bd0526ccbd3f99c1c4",
    measurementId: "G-51NTFL7P01"   
    ////////////////////
    // apiKey: "AIzaSyAIE0UqPDaY3LDBDFh7DPpm16q7wOskA_A",
    // authDomain: "wireframer-app.firebaseapp.com",
    // databaseURL: "https://wireframer-app.firebaseio.com",
    // projectId: "wireframer-app",
    // storageBucket: "wireframer-app.appspot.com",
    // messagingSenderId: "775415138878",
    // appId: "1:775415138878:web:110d044f79b7d1c1e2df6f",
    // measurementId: "G-66MN1ZYKXT"
    //////////////
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;