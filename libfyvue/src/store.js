import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import { LIBFY_CLIENT_ID, LIBFY_CLIENT_SECRET, LIBFY_REFRESHH_TOKEN, post_GETTOKENURL } from './const'
import { apiD_musicas } from "./const";

Vue.use(Vuex)

const meuDataStore = createPersistedState({
  paths: ["qualquerCois"]
})

const store = new Vuex.Store({
  state() {
    return {  // equivalente ao data de um componente
      qualquerCois: 'storetest',
      user: {
        data: null,
        loggedIn: false
      },
      maisTocadasArray: [],
      token_acesso:''
    }

  },
  getters: { // equivalente ao computed de um componente

    getUser(state) {
      return state.user;
    },
    getNomeUsuario(state) {
      if (state.user.data.displayName) {
        return state.user.data.displayName;
      }
      return state.user.data.email ? state.user.data.email : '';
    },
    getMaisTocadasArr(state){return state.maisTocadasArray},
    getQualquerCois(state) {
      return state.qualquerCois;
    }

  },
  mutations: { // altera o state 
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
    SET_MUSICAS_MAIS_TOCADAS(state, data) {
      let { albums } = data
      state.maisTocadasArray = albums
    }, 
    SET_TOKENACESS(state,pload){
      state.token_acesso=pload
    }

  },
  actions: { // equivalente ao methods de um componente
    async carregar({ commit }) {
      commit('SET_MUSICAS_MAIS_TOCADAS',apiD_musicas.amostra_dados_spotify_famosos)
      console.log('carregou')

      const config_get_axios = {
        headers: {
          Authorization: `Bearer ${LIBFY_REFRESHH_TOKEN}`,

          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      };
      const config_refreshtoken= {
        headers: {
          Authorization: `Basic ${LIBFY_CLIENT_ID} : ${LIBFY_CLIENT_SECRET}`,

          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      }
      
      axios.get("https://api.spotify.com/v1/browse/" +
        "new-releases?country=SE&limit=10&offset=5",
        config_get_axios).then(({ data }) => {
          console.log(data)
          commit('SET_MUSICAS_MAIS_TOCADAS',data.albums.items)
        }
        ).catch((meLasquei)=>{
          axios.post(post_GETTOKENURL)
        })
    }, 
    async carregarUsuario({ commit }, user) {
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
    },
    

  },
  plugins: [meuDataStore]
})

export default store
