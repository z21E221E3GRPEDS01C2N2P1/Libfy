<template>
  <main>
    <h1 class="titulofileira">Mais tocadas </h1>
    <div class="musicas">
      <section  >
        <v-sheet class="mx-auto" dark >
          <v-slide-group
            multiple
            show-arrows
            center-active
            dark 
          >
            <MusicaCard
              v-for="musica in temp_GetMusicas"
              v-bind:key="musica.id"
              v-bind:selemusica="musica"
            />
          </v-slide-group>
        </v-sheet>
      </section>

      <h1 class="titulofileira">Recentemente Tocadas</h1>
      <section  >
        <v-sheet class="mx-auto" dark>
          <v-slide-group multiple show-arrows center-active dark>
            <MusicaCard
              v-for="musica in temp_GetMusicas"
              v-bind:key="musica.id"
              v-bind:selemusica="musica"
            />
          </v-slide-group>
        </v-sheet>
      </section>
    </div>
  </main>
</template>

<script>
import MusicaCard from "./MusicaCard.vue";
import {mapGetters, mapState} from 'vuex'

import { apiD_musicas } from "../const";
export default {
  components: { MusicaCard },
  name: "ListaMusicas",
  computed: {
    ...mapState(['qualquerCois']),
    ...mapGetters(['getMaisTocadasArr']),
    getMusicasMaisTocadas(){
      return this.getMaisTocadasArr
    },

    temp_GetMusicas() {
      return apiD_musicas.musicas;
    },
    
  },
  data: () => {
    return {
      s_musica: null,
    };
  },
  mounted(){
    this.$store.dispatch('carregar') 
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "ListaMusicas.css";
</style>
