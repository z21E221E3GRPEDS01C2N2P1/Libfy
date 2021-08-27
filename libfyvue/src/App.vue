<template>
  <div id="app">
   
    <router-view/>
  </div>
</template>
<script>
import * as firebase from "firebase/app"

export default {
  name:'App',
  mounted(){
        var firebaseConfig = {

        apiKey: "AIzaSyDQYcaY9B89obl52Opf8ORFl_6ywN9EbIg",
    
        authDomain: "libfyzin.firebaseapp.com",
    
        projectId: "libfyzin",
    
        storageBucket: "libfyzin.appspot.com",
    
        messagingSenderId: "480452003717",
    
        appId: "1:480452003717:web:9e402ed32c685f523526ec"
    
      };
    
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
  }
}

</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
