<template>
  <v-slide-item v-if="vfortrack.images" v-slot="{ active, toggle }">
    <v-card
      :color="active ? 'primary' : 'grey darken-4'"
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
        <p :class="active ? 'white--text' : 'purple--text'">
          {{ track.seguidores }} followers
        </p>
      </v-container>
    </v-card>
  </v-slide-item>
</template>

<script>
// @ is an alias to /sr
export default {
  name: "trackCard",
  props: ["vfortrack"],
  computed: {
    track() {
      return {
        image: this.vfortrack?.images[1]?.url
          ? this.vfortrack.images[1].url || "@/assets/logo.png"
          : "@/assets/logo.png",
        seguidores: `${this.vfortrack.followers.total}` || "Many",
        nome: `${this.vfortrack.name}` || ""
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
