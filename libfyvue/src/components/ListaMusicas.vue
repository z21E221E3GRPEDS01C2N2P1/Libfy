<template>
  <main class="main">
    <h1 class="titulofileira">Mais tocadas </h1>
    <div class="musicas ">
      <section class="" >
        <v-sheet class="mx-auto bg--purple-4" dark  >
          <v-slide-group
            multiple
            show-arrows
            center-active
            dark  
          >
            <MusicaCard
              v-for="album in getMusicasMaisTocadas"
              v-bind:key="album.id"
              v-bind:selemusica="album"
            />
          </v-slide-group>
        </v-sheet>
      </section> 
      <h1 class="titulofileira">Recentemente Tocadas</h1>
      <section  >
        <v-sheet class="mx-auto" dark>
          <v-slide-group multiple show-arrows center-active dark>
           <MusicaCard
              v-for="album in getMusicasMaisTocadas"
              v-bind:key="album.id"
              v-bind:selemusica="album"
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
 
export default {
  components: { MusicaCard },
  name: "ListaMusicas",
  computed: {
    ...mapState(['qualquerCois','deve_recarregar_api']),
    ...mapGetters(['getMaisTocadasArr']),
    getMusicasMaisTocadas(){
      return this.getMaisTocadasArr
    },
 
    
  },
  data: () => {
    return {
      s_musica: null, 
    };
  },
  methods:{ 
  },
  mounted(){
    
    this.$store.dispatch('carregar')  
    setTimeout(()=>{
      
      if(this.deve_recarregar_api){
      
       this.$store.dispatch('carregar') 
    }
    },3000)
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" >
@import "css/ListaMusicas.scss";
</style>
