<template>
  <v-slide-item v-slot="{ active, toggle }" dark>

    <v-card
      :color="active ? 'purple darken-5' : 'grey darken-4'"
      class="cardmusica" 
      @click="toggle"
      dark
    >
      <img
        v-bind:src="selemusica.images[1].url"
        alt=""
        class="imagemmusica"
      />
      
      <v-container>        
      <p>{{selemusica.name}}</p> 
        <div>.............</div>
      <p>{{selemusica.artists[0].name?
        selemusica.artists[0].name
        :
        selemusica.followers.total}}</p>
      </v-container>
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
