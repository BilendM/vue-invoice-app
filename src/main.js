import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import firebase from "firebase/app"


var firebaseConfig = {
  apiKey: "AIzaSyB7H5nwH3H3Z7FJdjKaEp7wnOzdHzyG3Xs",
  authDomain: "invoice-app-99fc9.firebaseapp.com",
  projectId: "invoice-app-99fc9",
  storageBucket: "invoice-app-99fc9.appspot.com",
  messagingSenderId: "851247429391",
  appId: "1:851247429391:web:c89e0f77c88f0c3950307a"
};

firebase.initializeApp(firebaseConfig);

createApp(App).use(store).use(router).mount('#app')
