import Home from './views/Home.vue'
import apiD_musicas from './assets/apiDev_musicas.json'
import firebase from "firebase";
function importFire() {
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
}
importFire();

const rotasmain = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cadastrar',
    name: 'Cadastro',
    component: () => import('./views/Cadastro.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('./views/Login.vue')
  },

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
  }
  ]


  export {rotasmain, apiD_musicas, firebase};