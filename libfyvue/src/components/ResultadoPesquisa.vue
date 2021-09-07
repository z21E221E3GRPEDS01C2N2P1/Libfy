<template>
  <main  class="main">
    <h1 class="titulofileira">Mais tocadas </h1>
    <div class="musicas ">
      <section class="" >
        <v-sheet class="mx-auto " dark >
          <v-slide-group
            multiple
            show-arrows
            center-active
            dark 
            v-if="gPesquisaResult.artists.items"
          >
            <MusicaCard
            
              v-for="artist in gPesquisaResult.artists.items"
              v-bind:key="artist.id"
              v-bind:selemusica="artist"
            />
          </v-slide-group>
            <h1 v-else>{{getPesquisaResult}}</h1>
        </v-sheet>
      </section> 
      <h1 class="titulofileira">Recentemente Tocadas</h1>
      <section  >
        <v-sheet class="mx-auto" dark>
          <v-slide-group multiple show-arrows center-active dark>
          <!--  <MusicaCard
              v-for="tracks in gPesquisaResult.tracks.items"
              v-bind:key="tracks.id"
              v-bind:selemusica="tracks"
            /> -->
          </v-slide-group>
        </v-sheet>
      </section>
    </div>
  </main>
</template>

<script>
import MusicaCard from "./MusicaCard.vue";
import {mapGetters, mapState} from 'vuex'
 
export default {
  components: { MusicaCard },
  name: "ResultadoPesquisa",
  computed: {
    ...mapState(['qualquerCois']),
    ...mapGetters(['getPesquisaResult']),
     
    gPesquisaResult(){
      return this.getPesquisaResult
    }
 
  },
  data: () => {
    return {
      s_musica: null, 
    };
  },
  methods:{ 
  },
  mounted(){ 
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "ListaMusicas.css";
</style>
