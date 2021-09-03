
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
    <section class="topofixo">
      <div class="pesquisa">
        
        <input
        type="text"
        placeholder="Artists,songs or podcasts" 
      />
      </div>
      <v-btn
      rounded
      color="primary"
      dark to="/cadastrar"
    >  Cadastrar 
    
    </v-btn>
    <v-btn
      rounded  to="/login" 
    >  Log in 
    </v-btn>

    
     
    </section>
  </div>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "Navbar.css";
</style>
