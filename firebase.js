import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAc-FyoaMXEDn_FyK1Anwt39DDB4U4ToKQ",
  authDomain: "talkrelief-c20b8.firebaseapp.com",
  projectId: "talkrelief-c20b8",
  storageBucket: "talkrelief-c20b8.appspot.com",
  messagingSenderId: "495150222981",
  appId: "1:495150222981:web:7770a65e8ad5613cfde3ec",
  measurementId: "G-B3HX9GSQTL",
};

let firebaseApp;

if (firebase.apps.length === 0) {
  firebaseApp = firebase.initializeApp(firebaseConfig);
} else {
  firebaseApp = firebaseApp.app();
}
//admin.initializeApp();

const database = firebaseApp.firestore();
const auth = firebase.auth();

// const sendReplyNotification = functions.firestore
//   .document(`users/${userID}/posts/{docID}`)
//   .onCreate((reply) => {
//     const after = reply.after.data();
//     console.log(after);
//     const payload = {
//       data: {
//         title: after.replierUsername,
//       },
//     };
//     //admin.messaging().sendToDevice
//   });
export { auth, database };
