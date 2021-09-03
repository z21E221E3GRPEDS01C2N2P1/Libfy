import Vue from 'vue'
import Vuex from 'vuex'

import { useSheetApi, baseUrlApi } from './const'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
const meuDataStore = createPersistedState({
  paths: ["times", "jogadores"]
}) 

const store = new Vuex.Store({
  state: {  // equivalente ao data de um componente
    
    vaa:'abcdfd'
  },
  getters: { // equivalente ao computed de um componente

    

  },
  mutations: { // altera o state 
    

  },
  actions: { // equivalente ao methods de um componente
    async carregar({ commit }) {
      console.log('menma')
    }

  },
  plugins: [meuDataStore]
})

export default store
