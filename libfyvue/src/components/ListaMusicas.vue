<template>
  <main>
    <h1 class="titulofileira">Mais tocadas</h1>
    <div class="musicas">
      <section >
        <v-sheet class="mx-auto"  >
          <v-slide-group multiple show-arrows > 
               
                <MusicaCard v-for="nr in 8" v-bind:key="nr" />
               
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
export default {
  components: { MusicaCard },
  name: "ListaMusicas",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "ListaMusicas.css";
</style>
