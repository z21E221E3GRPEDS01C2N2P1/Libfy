import Vue from 'vue'
import Vuex from 'vuex' 
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const meuDataStore = createPersistedState({
  paths: ["qualquerCois"]
})

const store = new Vuex.Store({
  state() {
    return {  // equivalente ao data de um componente
       qualquerCois: 'storetest',
       user:{
         data:null,
         loggedIn:false
       }
    }

  },
  getters: { // equivalente ao computed de um componente

    getUser(state){
      return state.user;
    },
    getNomeUsuario(state) {
      if (state.user.data.displayName) {
        return state.user.data.displayName;
      }
      return state.user.data.email;
    },
    getQualquerCois(state){
      return state.qualquerCois;
    }

  },
  mutations: { // altera o state 
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    }

  },
  actions: { // equivalente ao methods de um componente
    async carregar({ commit }) {
      console.log('carregou')
    },
    async carregarUsuario({commit},user){
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        commit("SET_USER", {
          displayName: user.displayName,
          email: user.email
        });
      } else {
        commit("SET_USER", null);
      }
    },
    async logaUsuario({ commit }, cred) {
      console.log('ave')
    }

  },
  plugins: [meuDataStore]
})

export default store
