<template>
  <main  class="main">
    <h1 class="titulofileira"> Artists </h1>
    <div class="musicas ">
      <section class="" >
        
          <v-row class="flex-child">
          <v-col cols="12" :md="tamanhoSlideArtist">
        <v-sheet class=" metade" dark >
            <v-slide-group
            multiple
            show-arrows
            center-active
            dark 
          >
            <ArtistaCard 
              v-for="artist in gPesquisaResult.artists.items"
              v-bind:key="artist.id" 
              v-bind:seleartista="artist" 
            />

          </v-slide-group> 
                    
        </v-sheet>
          </v-col>
        <v-col cols="12" md="5" >
            <div 
              >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus expedita, magnam molestiae assumenda itaque repellat dolores ea natus saepe, sapiente ipsam libero! Vero, et? Quae repellat optio quos facilis tempora.
            </div>
          </v-col>
        </v-row>
        
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
import ArtistaCard from './ArtistaCard.vue';
 
export default {
  components: { MusicaCard, ArtistaCard },
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
      tamanhoSlideArtist:12
    };
  },
  methods:{ 
    JustOpenThread(artis){
      console.log('artis')
    }
  },
  created(){
     this.$store.dispatch('pesquisaMusica')
  }
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "ListaMusicas.css";
 
</style>
