import Home from './views/Home.vue'
import apiD_musicas from './assets/apiDev_musicas.json'

const LIBFY_FIRST_ACCESSTOKEN = 'BQBZmS-lWjilmbNx4cDbE2X5Z5EKLcPgAJNbxYLNYu4I4L_0oAPTYPahMmyF7ia2AlFO4oiygAgIlW0CcZD9zcn8YEREBWCcOA9ANyhc0rGgcLTh_qdRw8myD8MURTVAFszgNr0z3Zw2zaBWKL7fr6qGcS5QtJ1cM_DDjZwdQ7b1DRo'
const LIBFY_REFRESHH_TOKEN = 'AQAVmK4y7krTMEKYVXB6Yk8rmnntu2UvJ6aqxHmMxXMuzBnUThHDFV9pZsissXfNCWtSAtEKzTKC7nItlCf3oOHm9v7Ag7Jdj-jHavM0ZUqXm6LkQ5Buvjz-6EY1UnGd7X8'
const LIBFY_CLIENT_ID = '10fb72562a3f45969296b336205c3e4a'
const LIBFY_CLIENT_SECRET = 'cf283f7f71cc4896827331b94d330714'

const post_GETTOKENURL = 'https://accounts.spotify.com/api/token'

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
  apimusicas: './assets/apiDev_musicas.json'
}

export {
  rotasmain, apiD_musicas, LIBFY_REFRESHH_TOKEN,
  LIBFY_CLIENT_ID, LIBFY_FIRST_ACCESSTOKEN, LIBFY_CLIENT_SECRET,
  post_GETTOKENURL
};