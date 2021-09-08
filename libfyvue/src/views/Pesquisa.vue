<template>
  <div class="home">
    <Navbar></Navbar>
    <ResultadoPesquisa></ResultadoPesquisa>
  </div>
</template>

<script>
// @ is an alias to /src 
import Navbar from '../components/Navbar.vue'

import ResultadoPesquisa from '../components/ResultadoPesquisa.vue'

export default {
  name: 'Pesquisa',
  components: { 
    Navbar, 
    ResultadoPesquisa
  }
}
</script>
