<template>
  <div class="news">
    <Navbar></Navbar> 

      <v-main class="main mt-10">
      <v-container>
        <v-row cols="12"> 
          <v-col
            v-for="(noticia,n) in getNoticiasPGinicial.news"
            :key="n" sm="12" :md="(n)%2!==0? 3 : 4" >
            
            <VagalumeNoticiaCard :vfornoticia="noticia"/>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// @ is an alias to /src 
import Navbar from '../components/Navbar.vue' 
import VagalumeNoticiaCard from '../components/VagalumeNoticiaCard.vue'
export default {
  name: 'Noticias',
  components: { 
    Navbar, 
    VagalumeNoticiaCard
  },
  computed:{
    ...mapGetters(['getNoticiasPGinicial'])
  },
  mounted(){
      this.$store.dispatch('carregaNoticiaPaginaInicial')
  }
}
</script>
 