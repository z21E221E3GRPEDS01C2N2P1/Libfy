<template>
  <v-slide-item v-if="vforartista.images" v-slot="{ active , toggle }">
    <v-card
      :color="active ? 'primary' : 'grey lighten-1'"
      class="  cardmusica"
      @click="mytoggle(vforartista,toggle)" 
    >
      <v-img
        lazy-src="@/assets/logo.png"
        contain
        v-bind:src="artista.image"
        max-width="250"
        max-height="250"
        contains
        class="imagemmusica"
      ></v-img>
      <v-container>
        <p></p>
        <h6>{{ artista.nome }}</h6>
        <p>{{ artista.seguidores }} followers</p>
      </v-container>
    </v-card>
  </v-slide-item>
</template>

<script>
// @ is an alias to /sr
export default {
  name: "ArtistaCard",
  props: ["vforartista"],
  computed: {
    artista() {
      return {
        image: this.vforartista?.images[1]?.url? this.vforartista.images[1].url || "@/assets/logo.png" : '@/assets/logo.png',
        seguidores: `${this.vforartista.followers.total}` || "Many",
        nome: `${this.vforartista.name}` || ""
      };
    }
  },
  data: () => {
    return {};
  },
  methods:{
    mytoggle(vforartista,vuetiFyToggle){       
      this.$emit('selecaoART',vforartista)
      vuetiFyToggle()
    }
  },
  components: {}
};
</script>
<style scoped>
@import "MusicaCard.css";
</style>
