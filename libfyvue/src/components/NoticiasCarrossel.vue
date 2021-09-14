<template>
  <v-carousel
    cycle
    height="370" hide-delimiters
      delimiter-icon="mdi-minus"
    hide-delimiter-background
    show-arrows
    class="mt-5"
  >   
    <NoticiaCard
      v-for="noticia in gNoticias.articles"
      v-bind:key="noticia.image"
      v-bind:vfornoticia="noticia"
    />
  </v-carousel>
</template>

<script>
import { mapGetters } from "vuex";
import NoticiaCard from "./NoticiaCard.vue";
// @ is an alias to /src

export default {
  components: { NoticiaCard },
  name: "NoticiasCarrossel",
  props: ["nomeArtistaSelecionado","aoContrario"],
  computed: {
    ...mapGetters(["getNoticiasRelacionadasArtista",
    "getNoticiasInvertidaRelacionadasArtista"]),
    gNoticias() { 
      if(this.aoContrario){
        return this.getNoticiasInvertidaRelacionadasArtista;
      }
      return this.getNoticiasRelacionadasArtista;
    }
  },
  mounted() {
    let nomeFormatoUrl = this.nomeArtistaSelecionado.replace(/ /g, "%20");

    this.$store.dispatch("pesquisaNoticiaArtista", nomeFormatoUrl);
  }
};
</script>
 <style scoped>
 /* seta bugada */
 .v-window__prev, .v-window__next{
   background: none;
 }
 </style>