<template>
  
    <v-slide-item v-if="vfornoticia" v-slot="{ active, toggle }">

      <v-card class="mx-auto" max-width="100%" dark
      v-on:click="toggle" 
      :color="active ? 'primary' : 'grey darken-4'">
        <v-img
          lazy-src="@/assets/logo.png"
          class="white--text align-end"
          height="200px"
          :src="ibagem"
        >
          <v-card-title>{{ vfornoticia.headline }}</v-card-title>
        </v-img>

        <v-card-text class="text--white">
          <span>{{ vfornoticia.kicker }}</span>
        </v-card-text>
      </v-card>
    
    </v-slide-item>
  
</template>

<script>
// @ is an alias to /src

export default {
  name: "VagalumeNoticiaCard",
  props: ["vfornoticia"],
  computed: {
    ibagem() {
      return `https://www.vagalume.com.br/${this.vfornoticia.images[1]}` || this.vfornoticia.urlToImage;
    }
  },
  data: () => {
    return {
      fakeimg: "https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    };
  },
  components: {}
};
</script>
 