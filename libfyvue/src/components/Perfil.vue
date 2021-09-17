<template>
  <div class="home">
    <v-container>
      <v-row>
        <div class="flex-column">
          <i class="fas fa-user grande text-center py-6" color="white"></i>
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
        <v-icon dark> Log out</v-icon>
      </v-btn>

      <h1 class="text-lg-h6 text-center py-6">
        Está tela contará com as informações do usuário futuramente implementadas
      </h1>
    </v-container>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
// @ is an alias to /src 

export default {
  name: "Perfil",
  computed: {
    ...mapGetters(["getUser", "getNomeUsuario"]),

    nomeUsuario() {
      return this.getNomeUsuario || ''
    },
  },

  methods: {
    deslogar() {
      this.$firebase
          .auth()
          .signOut()
          .then(() => {
            this.$router.replace({
              name: "Home",
            });
          });
    },
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
