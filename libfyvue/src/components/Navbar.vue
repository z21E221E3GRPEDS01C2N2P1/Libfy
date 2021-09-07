
<template>
  <div class="navbb">
    <div class="sidenav" :class="esconderSideBar ? 'd-none' : ''">
      <router-link to="/">
        <span class="fa fa-home"></span>
        <p>Home</p>
      </router-link>

      <router-link to="/login">
        <span class="fas fa-music"></span>
        <p>Playlists</p>
      </router-link>
      <a href="index.html" class="botao">
        <span class="fas fa-heart"></span>
        <p>Notícias</p>
      </a>
      <h6>Your Library</h6>
      <p>Favoritas</p>
      <p>Favoritas</p>
    </div>
    <section class="topofixo d-flex flex-row justify-start align-center">
      <div class="pesquisa">
        <i class="fa fa-search icone" aria-hidden="true"></i>
        <input
          type="text"
          placeholder="Artists,songs or podcasts"
          v-on:keyup.enter="pesquisarMusica"
        />
      </div>
      <div :class="esconderSideBar ? 'd-none' : ''">
        <main v-if="user.loggedIn" class="d-flex flex-row transparent">
          <v-btn rounded dark to="/perfilusuario"> {{gNomeUsuario}} </v-btn>
        </main>

        <main v-else class="d-flex flex-row transparent">
          <v-btn rounded color="primary" dark to="/cadastrar">
            Cadastrar
          </v-btn>
          <v-btn rounded to="/login"> Log in </v-btn>
        </main>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "../plugins/firebase";

export default {
  name: "Navbar",
  props: ["esconderSideBar"],
  computed: {
    ...mapGetters({
      user: "getUser",
      getQualquerCois: "getQualquerCois",
      gNomeUsuario:"getNomeUsuario"
    })
  },
  methods: {
    pesquisarMusica(e){
      this.$store.dispatch('pesquisaMusica',e.target.value)
      this.$router.push({name:'Pesquisa'})
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "Navbar.css";
</style>
