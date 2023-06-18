import firebase from "firebase";
import 'firebase/firestore'
import 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyCW_cWOJ1tXV7nsLUpbcbeiYHuLbMh7_Kc",
    authDomain: "vue-blog22.firebaseapp.com",
    projectId: "vue-blog22",
    storageBucket: "vue-blog22.appspot.com",
    messagingSenderId: "1004556447637",
    appId: "1:1004556447637:web:781b451fb8f81cfbb0d09c"
  };

  firebase.initializeApp(firebaseConfig);
let db=firebase.firestore();
let auth=firebase.auth(); 
let timestamp=firebase.firestore.FieldValue.serverTimestamp;

export {db,timestamp,auth};