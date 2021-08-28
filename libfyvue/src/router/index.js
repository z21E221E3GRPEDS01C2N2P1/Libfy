import Vue from 'vue'
import VueRouter from 'vue-router' 
import {rotasmain} from '../const.js'

Vue.use(VueRouter)

const routes = rotasmain

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
