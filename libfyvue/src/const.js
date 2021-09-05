import Home from './views/Home.vue'
import apiD_musicas from './assets/apiDev_musicas.json'
 
const OAUTHTOKEN_LIBFY = 'BQBZmS-lWjilmbNx4cDbE2X5Z5EKLcPgAJNbxYLNYu4I4L_0oAPTYPahMmyF7ia2AlFO4oiygAgIlW0CcZD9zcn8YEREBWCcOA9ANyhc0rGgcLTh_qdRw8myD8MURTVAFszgNr0z3Zw2zaBWKL7fr6qGcS5QtJ1cM_DDjZwdQ7b1DRo'
const SCOPELESS_AUTHTOKEN2 = 'BQBZV-Z4_mle_5nE9SKLgbqtC8VGFFNeENk68oL9qqqDaggIOmRvowDzbyzB062sBEwA5wgHPG53tai3Y8akj3XjtStEz9QZJsyunJ5fG06Yy_DjPcmG9-f7WJB0BCD_Kxfz0tDIwztRyGpWZbJJmVRROMq8fkYe3asG-LkUuxWM5E2GaJfU'
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
    path: '/perfilusuario',
    name: 'PerfilUsuario',
    component: () => import('./views/PerfilUsuario.vue')
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

  export {rotasmain, apiD_musicas,SCOPELESS_AUTHTOKEN2  };