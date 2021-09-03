import Vue from 'vue'
import './plugins/vuex'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

import store from './store'
import mitt from 'mitt'
 

const bus = mitt()
 



 

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
