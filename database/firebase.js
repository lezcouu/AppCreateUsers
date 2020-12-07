import firebase from "firebase"
import "firebase/firestore"

var firebaseConfig = {
    apiKey: "AIzaSyA_ztvJ3Qo-bHG1ONqj267XvnvYZheLHkI",
    authDomain: "react-native-firebase-59352.firebaseapp.com",
    projectId: "react-native-firebase-59352",
    storageBucket: "react-native-firebase-59352.appspot.com",
    messagingSenderId: "992695102063",
    appId: "1:992695102063:web:8a466f441278a6ffa93b9a"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore()

  export default {
  	firebase,
  	db,
  }