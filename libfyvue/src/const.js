import Home from './views/Home.vue'
import apiD_musicas from './assets/apiDev_musicas.json'
 

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
  
  const baseUrlApi = {
    apimusicas:'./assets/apiDev_musicas.json'
  }

  export {rotasmain, apiD_musicas  };