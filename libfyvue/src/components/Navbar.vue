
<template>
  <div class="navbb">
    <div class="sidenav">
    <a href="index.html" class="botao">
        <span class="fa fa-home"></span>
        <p>Home</p>
    </a>
    <a href="index.html" class="botao">
        <span class="fa fa-home"></span>
        <p>Playlist</p>
    </a>
    <a href="index.html" class="botao">
        <span class="fa fa-home"></span>
        <p>Home</p>
    </a>
    <h6>Your Library</h6>
    <p>Favoritas</p>
    <p>Favoritas</p>
</div>
<section class="topofixo">
    <input type="text"
           placeholder="Artists,songs or podcasts" class="pesquisa">

<router-link to="/cadastrar" class="btn">Cadastrar</router-link>
    
    <a href="login.html" class="btn">Log in</a>
</section>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 @import 'Navbar.css';
</style>
