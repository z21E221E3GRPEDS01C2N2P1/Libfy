<template>
  <v-slide-item v-if="seleartista.images" v-slot="{ active, toggle }">
    <v-card
      :color="active ? 'primary' : 'grey lighten-1'"
      class="  cardmusica"
      @click="toggle"
    >
      <v-img
        lazy-src="../assets/logo.png"
        contain
        v-bind:src="artista.image"
        max-width="250"
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
  props: ["seleartista"],
  computed: {
    artista() {
      return {
        image: this.seleartista.images[1]?.url? this.seleartista.images[1].url || "@/assets/logo.png" : '@/assets/logo.png',
        seguidores: `${this.seleartista.followers.total}` || "Many",
        nome: `${this.seleartista.name}` || ""
      };
    }
  },
  data: () => {
    return {};
  },
  components: {}
};
</script>
<style scoped>
@import "MusicaCard.css";
</style>
