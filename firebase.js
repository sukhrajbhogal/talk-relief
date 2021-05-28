import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAc-FyoaMXEDn_FyK1Anwt39DDB4U4ToKQ",
  authDomain: "talkrelief-c20b8.firebaseapp.com",
  projectId: "talkrelief-c20b8",
  storageBucket: "talkrelief-c20b8.appspot.com",
  messagingSenderId: "495150222981",
  appId: "1:495150222981:web:7770a65e8ad5613cfde3ec",
  measurementId: "G-B3HX9GSQTL",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const database = firebaseApp.firestore();

export default database;
