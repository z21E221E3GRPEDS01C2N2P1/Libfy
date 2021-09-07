<template>
  <div class="home">
    <Navbar v-bind:esconderSideBar="true"></Navbar>
    <v-container>
      <v-row>
        <div class="flex-column">
          <i class="fas fa-user grande" color="white"></i>
          {{ nomeUsuario ? nomeUsuario : '' }}
        </div>
      </v-row>

      <v-btn
        fixed
        right
        bottom
        rounded
        dark
        large
        color="purple"
        class="mx-2 botaomobile"
        v-on:click="deslogar"
      >
        <v-icon dark> Log out </v-icon>
      </v-btn>

      <h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit dolor
        aperiam hi </h1>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from '../plugins/firebase'
// @ is an alias to /src
import Navbar from "../components/Navbar.vue";

export default {
  name: "PerfilUsuario",
  computed: {
    ...mapGetters(["getUser","getNomeUsuario"]),
     
    nomeUsuario() {
      return this.getNomeUsuario || ''
    },
  },

  methods: {
    deslogar() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: "Home",
          });
        });
    },
  },
  components: {
    Navbar,
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
