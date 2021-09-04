import Vue from 'vue'
import './plugins/vuex'
import App from './App.vue'
import router from './router'

import firebase from './plugins/firebase' 



import vuetify from './plugins/vuetify'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

import store from './store'
 
firebase.auth().onAuthStateChanged(usuario=>{
  store.dispatch("carregarUsuario",usuario)
})
Vue.config.productionTip = false

new Vue({
  router,
  firebase,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
