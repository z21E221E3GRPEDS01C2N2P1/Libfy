import Home from './views/Home.vue'
import apiD_musicas from './assets/apiDev_musicas.json'

const LIBFY_FIRST_ACCESSTOKEN = 'BQDG0bjU57QVQEhmbn7K62AgPMFguoVRycDmWepA5-R4yLE4dXe1vqbjdC3VscOOS1Gf_gfSYtxOmzxcoQNzJ2N0FA4qjQ2ue2vY8RkneHJVpYBdcnfv8mHKXuAtQrrnVJypZWiEZwzsYpNnleyGw95e73nAdyFY9m8HuxONqr5Xywty7_fM-0ekqP6jwrfxHqr-ROIWpzWNDryJEJkaPg'
let LIBFY_REFRESHH_TOKEN = 'AQAVmK4y7krTMEKYVXB6Yk8rmnntu2UvJ6aqxHmMxXMuzBnUThHDFV9pZsissXfNCWtSAtEKzTKC7nItlCf3oOHm9v7Ag7Jdj-jHavM0ZUqXm6LkQ5Buvjz-6EY1UnGd7X8'

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