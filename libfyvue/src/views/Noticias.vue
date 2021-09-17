<template>
  <div class="news">
    <Navbar></Navbar> 

      <v-main class="main mt-10">
      <v-container>
        <v-row cols="12"> 
          <v-col
            v-for="n in 24"
            :key="n" sm="12" :md="(n+1)%3!==0? 3 : 6" >
            <v-card height="300">{{n}}</v-card>
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
    ...mapGetters(['getNoticiaPGinicial'])
  },
  mounted(){
      this.$store.dispatch('carregaNoticiaPaginaInicial')
  }
}
</script>
 