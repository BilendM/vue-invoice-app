import firebase from "firebase/app"
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyB7H5nwH3H3Z7FJdjKaEp7wnOzdHzyG3Xs",
  authDomain: "invoice-app-99fc9.firebaseapp.com",
  projectId: "invoice-app-99fc9",
  storageBucket: "invoice-app-99fc9.appspot.com",
  messagingSenderId: "851247429391",
  appId: "1:851247429391:web:c89e0f77c88f0c3950307a"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore()