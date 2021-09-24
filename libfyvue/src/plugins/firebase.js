import firebase from "firebase"; 
require('firebase/firestore');



    var firebaseConfig = {
      apiKey: "AIzaSyDQYcaY9B89obl52Opf8ORFl_6ywN9EbIg",
  
      authDomain: "libfyzin.firebaseapp.com",
  
      projectId: "libfyzin",
  
      storageBucket: "libfyzin.appspot.com",
  
      messagingSenderId: "480452003717",
  
      appId: "1:480452003717:web:9e402ed32c685f523526ec",
    };
  
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  
  export default firebase;