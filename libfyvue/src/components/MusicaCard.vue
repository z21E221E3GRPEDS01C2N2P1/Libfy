<template>
  <v-slide-item v-slot="{ active, toggle }" dark>

    <v-card
      :color="active ? 'secondary' : 'purple darken-5'"
      class="cardmusica" 
      @click="toggle"
      dark
    >
      <img
        v-bind:src="selemusica.images[1].url"
        alt=""
        class="imagemmusica"
      />
      
      <p>{{selemusica.artists[0].name?
        selemusica.artists[0].name
        :
        selemusica.followers.total}}</p>
      <p>{{selemusica.name}}</p> 
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
<style lang="scss" scoped>
@import "css/MusicaCard.scss";
</style>
