<template>
  <v-slide-item v-slot="{ active, toggle }">

    <v-card
      :color="active ? 'primary' : 'grey lighten-1'"
      class="  cardmusica" 
      @click="toggle" 
    >
      <v-img
      lazy-src="@/assets/logo.png"
      contain
        v-bind:src="selemusica.images[1].url"
        max-width="250" 
        class="imagemmusica"
      ></v-img> 
    </v-card>
  </v-slide-item>
</template>

<script>

// @ is an alias to /sr
export default {
  name: "ArtistaCard",
  props:['selemusica'],
  
  data: () => {
    return{
      
    }
  },
  components: {},
};
</script>
<style scoped>
@import "MusicaCard.css";
</style>
