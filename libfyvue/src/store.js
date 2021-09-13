import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import qs from 'qs'
import createPersistedState from 'vuex-persistedstate'
import {
  apiD_news, LIBFY_APIKEY_GNEWS, LIBFY_APIKEY_NEWSAPIORG, LIBFY_CLIENT_ID, LIBFY_CLIENT_SECRET,
  LIBFY_FIRST_ACCESSTOKEN, LIBFY_REFRESHH_TOKEN,
  post_GETTOKENURL
} from './const'
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
      pesquisaDoUsuario: '',
      resultadoPesquisa: [],
      libfy_token_acesso: 'nd',
      libfy_novo_refresh: '',
      deve_recarregar_api: false,
      newsrelacionada: []
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

      data.artists.items = data.artists.items.sort((artA, artB) =>
        artB.followers.total - artA.followers.total)

      state.resultadoPesquisa = data
    },
    SET_PESQUISAQUERY(state, data) {
      state.pesquisaDoUsuario = data
    },
    SET_NEWS_RELACIONADA(state, data) {

      state.newsrelacionada = data
    }

  },
  // equivalente ao methods de um componente
  actions: {
    async renovarAccessToken({ commit }) {
      
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

      let data = {
        grant_type: 'client_credentials'
      }
      return await axios.post(post_GETTOKENURL,
        qs.stringify(data),
        headers).then(databruto => {

          console.log('meLasquei, mas peguei access token ')

          commit('SET_LIBFY_TOKENACESS', {
            access: databruto.data.access_token,
            refresh: LIBFY_REFRESHH_TOKEN
          })
        })

    },
    async carregaDadosPaginaInicial({ state }) {
      return await axios.get("https://api.spotify.com/v1/browse/new-releases?country=BR&limit=10&offset=5",
        {
          headers: {
            Authorization: `Bearer ${state.libfy_token_acesso}`,

            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        })

    },
    async carregar({ commit, state, dispatch }) {
      if (state.libfy_novo_refresh === '') {
        commit('SET_LIBFY_TOKENACESS', {
          access: state.libfy_token_acesso,
          refresh: state.libfy_novo_refresh
        })
      }
      commit('SET_MUSICAS_MAIS_TOCADAS', apiD_musicas.amostra_dados_spotify_famosos)

      try {
        dispatch('carregaDadosPaginaInicial')
          .then(({ data }) => { commit('SET_MUSICAS_MAIS_TOCADAS', data) })
          .catch(erro => dispatch('renovarAccessToken'))
      } catch (err) {
        dispatch('renovarAccessToken')
      } finally {
        commit('ALTERNA_RECARREGAR')
      }


    },
    later() {

      function newspiOK() {
        let headers = {
          headers: {
            Authorization: `Bearer ${LIBFY_APIKEY_NEWSAPIORG}`,
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }
        let urlnewsapi = `https://newsapi.org/v2/everything`
        let queryparams = `?q=melanie+martinez&sortBy=popularity`
        axios.get(`${urlnewsapi}${queryparams}`, headers)
          .then(data => {
            debugger
            console.log(data)
          }).catch(err => {
            debugger
          })
      }
      function gnewsApi() {

        commit('SET_NEWS_RELACIONADA', apiD_news)

        return;

        let urlnewsapi = `https://gnews.io/api/v4/search`
        let queryparams = `?q=melanie+martinez&token=${LIBFY_APIKEY_GNEWS}`

        axios.get(`${urlnewsapi}${queryparams}`)
          .then(data => {
            debugger
            console.log(data)
          }).catch(err => {
            debugger
          })
      } gnewsApi()
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
    async getDadosPesquisa({ commit,state }, tempQuery) {
      return await axios.get(`https://api.spotify.com/v1/search${tempQuery}`,
        {
          headers: {
            Authorization: `Bearer ${state.libfy_token_acesso}`,
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }
      ).then(databrut => {
        commit('SET_PESQUISA_RESULTADO', databrut.data)
      })
    },
    async pesquisaMusica({ commit, state, dispatch }) {
      let nome = state.pesquisaDoUsuario.replaceAll(' ', '-')


      if (!nome) {
        let ultimaPesquisaFeita = "po"
        nome = ultimaPesquisaFeita
      }

      let dadosPreLoad = apiD_musicas.amostra_dados_spotify_tracks_artists

      commit('SET_PESQUISA_RESULTADO', dadosPreLoad)


      const tempQuery = `?q=${nome}&type=track%2Cartist&limit=10&offset=0&include_external=audio`

      dispatch('getDadosPesquisa', tempQuery)
      .catch(DeuRuim => {
        console.log('DeuRuim' + DeuRuim)
        dispatch('renovarAccessToken').then(
          _ => dispatch('getDadosPesquisa', tempQuery))
      })
    },


  },
  plugins: [meuDataStore]
})

export default store
