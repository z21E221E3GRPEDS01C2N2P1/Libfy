<template>
  <main>
    <h1 class="titulofileira">Mais tocadas</h1>
    <div class="musicas">
      <section>
        <v-sheet class="mx-auto">
          <v-slide-group multiple show-arrows center-active>
            <MusicaCard
            v-for="musica in temp_GetMusicas" v-bind:key="musica"
             v-bind:selemusica="musica" />
          </v-slide-group>
        </v-sheet>
      </section>

      <h1 class="titulofileira">Recentemente Tocadas</h1>
      <section class="fileira">
        <MusicaCard v-for="nr in 5" v-bind:key="nr" />
      </section>
    </div>
  </main>
</template>

<script>
import MusicaCard from "./MusicaCard.vue";

import { apiD_musicas } from "../const";
export default {
  components: { MusicaCard },
  name: "ListaMusicas",
  computed: {
    temp_GetMusicas() {
      return apiD_musicas.musicas;
    },
  },
  data: () => {
    return {
      s_musica: null,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "ListaMusicas.css";
</style>
