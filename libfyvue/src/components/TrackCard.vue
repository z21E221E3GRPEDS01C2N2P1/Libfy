<template>
  <v-slide-item v-if="vfortrack" v-slot="{ active, toggle }">
    <v-card
      :color="active ? 'secondary' : 'grey darken-2'"
      class="cardmusica "
      @click="mytoggle(vfortrack, toggle)"
      dark
    >

 
      <v-container>
        <h6>{{ track.nome }}</h6>
        <p>............</p>
         
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
