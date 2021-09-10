<template>
  <div class="home">
    <Navbar v-bind:esconderSideBar="true"></Navbar>
    <Perfil></Perfil>
  </div>
</template>

<script>
import { mapGetters } from "vuex"; 
// @ is an alias to /src
import Navbar from "../components/Navbar.vue";
import Perfil from '../components/Perfil.vue';

export default {
  name: "PerfilUsuario",
   
  components: {
    Navbar,Perfil
  },
};
</script>
<style scoped>
.grande {
  font-size: 22vh;
}
.botaomobile {
}
</style>
