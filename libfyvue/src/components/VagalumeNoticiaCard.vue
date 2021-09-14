<template>
  <v-carousel-item :show-arrows="false">
    <v-slide-item v-slot="{ active, toggle }">
      <v-card class="mx-auto" max-width="400" dark
      v-on:click="toggle" 
      :color="active ? 'primary' : 'grey darken-4'">
        <v-img
          lazy-src="@/assets/logo.png"
          class="white--text align-end"
          height="200px"
          :src="ibagem"
        >
          <v-card-title>{{ vfornoticia.title }}</v-card-title>
        </v-img>

        <v-card-text class="text--white">
          <span>{{ vfornoticia.description }}</span>
        </v-card-text>
      </v-card>
    </v-slide-item>
  </v-carousel-item>
</template>

<script>
// @ is an alias to /src

export default {
  name: "VagalumeNoticiaCard",
  props: ["vfornoticia"],
  computed: {
    ibagem() {
      return this.vfornoticia.image || this.vfornoticia.urlToImage;
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
 