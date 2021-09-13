<template>
  <v-carousel
    cycle
    height="400"
    hide-delimiter-background
    show-arrows-on-hover
  >    
      <NoticiaCard v-for="noticia in gNoticias.articles"
      v-bind:vfornoticia="noticia"/>     
  </v-carousel>
</template>

<script>
import { mapGetters } from 'vuex'
import NoticiaCard from './NoticiaCard.vue';
// @ is an alias to /src  

export default {
  components: { NoticiaCard },
  name: 'NoticiasCarrossel',
  props:['nomeArtistaSelecionado'], 
  computed:{
    ...mapGetters(['getNoticiasRelacionadasArtista']),
    gNoticias(){
      return this.getNoticiasRelacionadasArtista;
    }
  },
  mounted(){
      let nomeFormatoUrl = this.nomeArtistaSelecionado.replace(/ /g,'%20')
      
      this.$store.dispatch('pesquisaNoticiaArtista',nomeFormatoUrl)
  }
}
</script>
 