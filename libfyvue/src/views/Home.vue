<template>
  <div class="home">
    <Navbar></Navbar>
    <ListaMusicas></ListaMusicas>
  </div>
</template>

<script>
// @ is an alias to /src 
import Navbar from '../components/Navbar.vue'
import ListaMusicas from '../components/ListaMusicas.vue'

export default {
  name: 'Home',
  components: { 
    Navbar,
    ListaMusicas
  }
}
</script>
 