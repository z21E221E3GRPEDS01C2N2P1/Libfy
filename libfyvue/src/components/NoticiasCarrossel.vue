<template>
  <v-carousel
    cycle
    height="400"
    hide-delimiter-background
    show-arrows-on-hover
  >
    <v-carousel-item
      v-for="(slide, i) in slides"
      :key="i"
    >
      <v-sheet
        :color="colors[i]"
        height="100%"
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <div class="text-h2">
            {{ slide }} Slide
          </div>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
// @ is an alias to /src  

export default {
  name: 'NoticiasCarrossel',
  props:['nomeArtistaSelecionado'],
  components: {  
  },
  mounted(){
      let nomeFormatoUrl = this.nomeArtistaSelecionado || 'the midnight'
      nomeFormatoUrl = nomeFormatoUrl.replace(/ /g,'%20')
      this.$store.dispatch('pesquisaNoticiaArtista')
  }
}
</script>
 