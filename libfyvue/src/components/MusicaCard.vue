<template>
  <v-slide-item v-slot="{ active, toggle }">
    <v-card
      :color="active ? 'primary' : 'grey lighten-1'"
      class="  cardmusica" 
      @click="toggle"
      
    >
      <img
        v-bind:src="selemusica.album"
        alt=""
        class="imagemmusica"
      />
      <p>{{selemusica.nome}}</p>
      <p>{{selemusica.ano}}</p>
    </v-card>
  </v-slide-item>
</template>

<script>

// @ is an alias to /sr
export default {
  name: "MusicaCard",
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
