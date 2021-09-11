import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import qs from 'qs'
import createPersistedState from 'vuex-persistedstate'
import { LIBFY_CLIENT_ID, LIBFY_CLIENT_SECRET, LIBFY_FIRST_ACCESSTOKEN, LIBFY_REFRESHH_TOKEN, post_GETTOKENURL } from './const'
import { apiD_musicas } from "./const";

Vue.use(Vuex)

const meuDataStore = createPersistedState({
  paths: ["qualquerCois", "libfy_novo_refresh", "libfy_token_acesso"]
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
      pesquisaDoUsuario: '',
      resultadoPesquisa: [],
      libfy_token_acesso: 'nd',
      libfy_novo_refresh: '',
      deve_recarregar_api: false
    }

  },
  getters: { // equivalente ao computed de um componente

    getUser(state) {
      return state.user;
    },
    getNomeUsuario(state) {
      return state.user.data?.displayName ||
        state.user.data?.email ||
        'Guest1234'
    },
    getMaisTocadasArr(state) { return state.maisTocadasArray },
    getQualquerCois(state) {
      return state.qualquerCois;
    },
    getPesquisaResult(state) {
      return state.resultadoPesquisa
    }

  },
  mutations: { // altera o state 
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    ALTERNA_RECARREGAR(state) {
      state.deve_recarregar_api = !state.deve_recarregar_api
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
    SET_MUSICAS_MAIS_TOCADAS(state, data) {
      let { albums } = data
      state.maisTocadasArray = albums.items
    },
    SET_LIBFY_TOKENACESS(state, { access, refresh }) {

      state.libfy_token_acesso = access
      state.libfy_novo_refresh = refresh
    },
    SET_PESQUISA_RESULTADO(state, data) {
       
      data.artists.items = data.artists.items.sort((artA,artB)=>
        artB.followers.total - artA.followers.total)
         
      state.resultadoPesquisa = data
    },
    SET_PESQUISAQUERY(state, data) {
      state.pesquisaDoUsuario = data
    }

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


      const headers = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
          username: LIBFY_CLIENT_ID,
          password: LIBFY_CLIENT_SECRET
        }
      }

      axios.get("https://api.spotify.com/v1/browse/new-releases?country=BR&limit=10&offset=5",
        {
          headers: {
            Authorization: `Bearer ${state.libfy_token_acesso}`,

            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }).then(({ data }) => {
          commit('SET_MUSICAS_MAIS_TOCADAS', data)
        }
        ).catch((meLasquei) => {
          let data = {
            grant_type: 'client_credentials'
          }
          axios.post(
            post_GETTOKENURL,
            qs.stringify(data),
            headers
          ).then(databruto => {
            console.log('meLasquei, mas peguei access token ' + meLasquei)

            commit('SET_LIBFY_TOKENACESS', {
              access: databruto.data.access_token,
              refresh: LIBFY_REFRESHH_TOKEN
            })
          }).then(_ => {
            commit('ALTERNA_RECARREGAR')
          })
            .catch(lascouMuito => console.log('lascou mt' + lascouMuito))
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
    async pesquisaMusica({ commit, state }) {
      let nome = state.pesquisaDoUsuario.replaceAll(' ', '-')
      

      if (!nome) {
        let ultimaPesquisaFeita = "po"
        nome = ultimaPesquisaFeita        
      }
      
      let dadosPreLoad = apiD_musicas.amostra_dados_spotify_tracks_artists
      
      commit('SET_PESQUISA_RESULTADO', dadosPreLoad)
      

      const tempQuery = `?q=${nome}&type=track%2Cartist&limit=10&offset=0&include_external=audio`
 
      axios.get(`https://api.spotify.com/v1/search${tempQuery}`,
        {
          headers: {
            Authorization: `Bearer ${state.libfy_token_acesso}`,
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }
      ).then(databrut => { 
        
        commit('SET_PESQUISA_RESULTADO', databrut.data)
      }).catch(err => {
        console.log('err'+err)
      })
    },


  },
  plugins: [meuDataStore]
})

export default store
