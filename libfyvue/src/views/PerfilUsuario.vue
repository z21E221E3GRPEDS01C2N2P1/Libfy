<template>
  <div class="home">
    <Navbar v-bind:esconderSideBar="true"></Navbar>
    <v-container>
      <v-row>
        <div class="flex-column">
          <i class="fas fa-user grande" color="white"></i>
          {{ nomeUsuario }}
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
        aperiam hic necessitatibus veritatis ratione. Neque numquam magnam eaque
        voluptas ullam illo laudantium, nostrum consectetur quidem, quae velit
        molestias ea?Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Beatae repellendus nemo id officiis esse, quibusdam necessitatibus nulla
        eos distinctio fugiat ea commodi? Ipsum voluptatum vitae doloribus.
        Nobis ipsum quibusdam id Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Delectus magni nulla sunt eaque rerum quod, molestiae
        cumque temporibus ipsum aperiam. Cupiditate inventore quisquam veniam
        numquam exercitationem. Mollitia velit fugiat asperiores! Eos tenetur
        eveniet aperiam laborum quaerat itaque nam illo aliquid dolor laboriosam
        delectus rem voluptatibus quidem aut ullam voluptas, numquam quam
        cupiditate asperiores iusto pariatur blanditiis hic possimus esse.
        Ducimus. Fuga esse laborum quidem minima accusamus sapiente libero dicta
        maiores aperiam adipisci. Fugiat quae autem fugit quas necessitatibus,
        impedit placeat beatae, quisquam voluptatem dolores maxime, modi laborum
        sunt quibusdam eos! Reiciendis earum eum unde fugit praesentium
        molestias ratione quam odit nostrum dolor quisquam doloremque vel, eius
        minus. Placeat voluptatum nulla qui assumenda animi veritatis aperiam,
        totam aliquid? Impedit, error harum! Aut quae ducimus rerum. Laboriosam
        eos voluptates nemo quod temporibus obcaecati et laborum beatae vitae,
        ab sequi natus nostrum dicta facilis recusandae ut labore hic veritatis
        excepturi architecto. Debitis, placeat.
      </h1>
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
      return this.getNomeUsuario
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
