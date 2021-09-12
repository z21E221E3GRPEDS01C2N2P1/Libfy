<template>
  <v-slide-item v-if="vfortrack" v-slot="{ active, toggle }">
    <v-card
      :color="active ? 'secondary' : 'grey darken-2'"
      class="cardmusica "
      @click="mytoggle(vfortrack, toggle)"
      dark
    >
      <v-img
        lazy-src="@/assets/logo.png"
        contain
        v-bind:src="track.image"
        max-width="250"
        max-height="250"
        contains
        class="imagemmusica"
      ></v-img>
      <v-container>
        <h6>{{ track.nome }}</h6>
        <p>............</p>
        <p v-text="track.cantor"></p>
      </v-container>
    </v-card>
  </v-slide-item>
</template>

<script>
// @ is an alias to /sr
export default {
  name: "TrackCard",
  props: ["vfortrack"],
  computed: {
    track() {
      
      return {
        nome: `${this.vfortrack.name}` || "",
        cantor: `${this.vfortrack.artists[0].name}` || "",

        image: this.vfortrack?.album?.images[1]?.url
          ? this.vfortrack?.album?.images[1].url
          || "@/assets/logo.png"
          : "@/assets/logo.png"
      };
    }
  },
  data: () => {
    return {};
  },
  methods: {
    mytoggle(vfortrack, vuetiFyToggle) {
      //this.$emit("selecaoART", vfortrack);
      vuetiFyToggle();
    }
  },
  components: {}
};
</script>
<style lang="scss" scoped>
@import "css/MusicaCard.scss";
</style>
