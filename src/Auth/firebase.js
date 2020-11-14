import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCbsuy57znldI23MIHSkkwF26EVA2kHP0I",
  authDomain: "mywhatsapp-985cc.firebaseapp.com",
  databaseURL: "https://mywhatsapp-985cc.firebaseio.com",
  projectId: "mywhatsapp-985cc",
  storageBucket: "mywhatsapp-985cc.appspot.com",
  messagingSenderId: "78852039384",
  appId: "1:78852039384:web:ca7390844928fb90956dad",
  measurementId: "G-S1Z0ZGGWB0"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const database = firebaseApp.firestore();
const authentication = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { database, authentication, provider };
