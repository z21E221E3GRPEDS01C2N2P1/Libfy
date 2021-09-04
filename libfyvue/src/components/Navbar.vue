
<template>
  <div class="navbb">
    <div class="sidenav">
     

      <router-link to="/login">
        <span class="fa fa-home"></span>
        <p>Home</p>
      </router-link>
      
      <a href="index.html" class="botao">
        <span class="fas fa-music"></span>
        <p>Playlists</p>
      </a>
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
        
        <input
        type="text"
        placeholder="Artists,songs or podcasts" 
      />
      
      </div>
      <main v-if="user.loggedIn" class="d-flex flex-row transparent ">
        <v-btn rounded color="primary" dark v-on:click="deslogar"  > Deslogar </v-btn>
     </main>
     <main v-else class="d-flex flex-row transparent "> 
        <v-btn rounded color="primary" dark to="/cadastrar"> Cadastrar </v-btn>
        <v-btn rounded to="/login"> Log in </v-btn>
      </main>

     

    
     
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import firebase from '../plugins/firebase'

export default {
  name: "Navbar",
  computed:{
    ...mapGetters({
      user:"getUser",
      getQualquerCois:"getQualquerCois"
    })
  },
  methods:{
    deslogar(){
       firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: "Home"
          });
        });
    }
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "Navbar.css";
</style>
