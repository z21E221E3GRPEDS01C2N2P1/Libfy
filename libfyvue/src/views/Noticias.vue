<template>
  <div class="news">
    <Navbar></Navbar> 

      <v-main>
      <v-container>
        <v-row>
          <v-col
            v-for="n in 24"
            :key="n"
            cols="4"
          >
            <v-card height="200"></v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

  </div>
</template>

<script>
// @ is an alias to /src 
import Navbar from '../components/Navbar.vue' 

export default {
  name: 'Noticias',
  components: { 
    Navbar, 
  },
  mounted(){
      this.$store.dispatch('carregaNoticiaPaginaInicial')
  }
}
</script>
 