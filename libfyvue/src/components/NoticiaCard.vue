<template>
  <v-carousel-item 
      :show-arrows="false">
    <v-card class="mx-auto" max-width="400" dark>
      <v-img 
        lazy-src="@/assets/logo.png"
        class="white--text align-end"
        height="200px"
        :src="vfornoticia.image"
      >
        <v-card-title>{{vfornoticia.description.slice(0,61)}}</v-card-title>
      </v-img>


      <v-card-text class="text--white">
        <span>{{vfornoticia.content}}</span>
      </v-card-text>
 
    </v-card>
  </v-carousel-item>
</template>

<script>
// @ is an alias to /src

export default {
  name: "NoticiaCard",
  props: ["ArtistaSelecionado","vfornoticia"],
  computed:{
    ntcia(){ 
    }
  },
  data:()=>{
    return{
      fakeimg:'https://cdn.vuetifyjs.com/images/cards/docks.jpg'
    }
  },
  components: {}
};
</script>
 