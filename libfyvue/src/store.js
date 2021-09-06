import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import { LIBFY_CLIENT_ID, LIBFY_CLIENT_SECRET, LIBFY_FIRST_ACCESSTOKEN, LIBFY_REFRESHH_TOKEN, post_GETTOKENURL } from './const'
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
      libfy_token_acesso: '',
      libfy_novo_refresh: ''
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
    getMaisTocadasArr(state) { return state.maisTocadasArray },
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
    SET_MUSICAS_MAIS_TOCADAS(state, items) {
      let {albums} = items
      state.maisTocadasArray = albums.items
    },
    SET_LIBFY_TOKENACESS(state, { access, refresh }) {
      
      state.libfy_token_acesso = access
      state.libfy_novo_refresh = refresh
    },

  },
  actions: { // equivalente ao methods de um componente
    async carregar({ commit, state }) {
      if (state.libfy_novo_refresh === '') {
        commit('SET_LIBFY_TOKENACESS', {
          access: LIBFY_FIRST_ACCESSTOKEN,
          refresh: LIBFY_REFRESHH_TOKEN
        })
      }
      commit('SET_MUSICAS_MAIS_TOCADAS', apiD_musicas.amostra_dados_spotify_famosos)
      console.log('carregou'+state.libfy_novo_refresh)
      //const token works

      const config_get_axios = {
        headers: {
          Authorization: `Bearer ${LIBFY_FIRST_ACCESSTOKEN}`,

          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      };
      const config_refreshtoken = {
        headers: {
          Authorization: `Basic ${LIBFY_CLIENT_ID}:${LIBFY_CLIENT_SECRET}`,

          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      }

      await axios.get("https://api.spotify.com/v1/browse/" +
        "new-releases?country=SE&limit=10&offset=5",
        config_get_axios).then(({ data }) => {
          console.log(data)
          let itens = data.albums.items
          commit('SET_MUSICAS_MAIS_TOCADAS', itens)
        }
        ).catch((meLasquei) => {
          let url_gettoken = post_GETTOKENURL;
          url_gettoken += "?grant_type=refresh_token";
          url_gettoken += "&refresh_token=" + LIBFY_REFRESHH_TOKEN+'';
          url_gettoken += "&client_id=" + LIBFY_CLIENT_ID; 
          console.log('vou postar no' + url_gettoken)

          axios.post(url_gettoken, config_refreshtoken).then(data => {
            console.log('meLasquei, data eh' + data + 'meLasquei')
            commit('SET_LIBFY_TOKENACESS', {
              access: data.access_token,
              refresh: data.refresh_token
            })
          }).catch(lascouMuito => console.log('lascoumt' + lascouMuito))
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
