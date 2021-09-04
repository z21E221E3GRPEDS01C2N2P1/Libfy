import Vue from 'vue'
import Vuex from 'vuex' 
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
const meuDataStore = createPersistedState({
  paths: ["qualquerCois"]
})

const store = new Vuex.Store({
  state() {
    return {  // equivalente ao data de um componente

      qualquerCois: 'storetest'
    }

  },
  getters: { // equivalente ao computed de um componente



  },
  mutations: { // altera o state 


  },
  actions: { // equivalente ao methods de um componente
    async carregar({ commit }) {
      console.log('carregou')
    },
    async logaUsuario({ commit }, cred) {
      console.log('ave')
    }

  },
  plugins: [meuDataStore]
})

export default store
