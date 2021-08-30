<template>
  <main>
    <v-container class="main" align="center" justify="center">
      <section>
        <div class="login">
          <h1>Login - Libfy</h1>

          <div class="loginalternativ">
            
            <v-btn rounded to="/cadastrar" class="btn" block
              ><i class="fab fa-facebook-f"></i> Continue with facebook</v-btn>
            <v-btn rounded to="/cadastrar" class="btn" block
              ><i class="fab fa-google"></i> Continue With Google
            </v-btn>
            
          </div>

          <div class="linhacontainer">
            <v-row no-gutters>
              <v-col cols="12" sm="5">
                <v-divider inset color="white"></v-divider>
              </v-col>
              <v-col cols="12" sm="2"> or </v-col>
              <v-col cols="12" sm="5">
                <v-divider inset color="white"></v-divider>
              </v-col>
            </v-row>
          </div>

          <main>
            <form action="" class="">
              <h6 class="alerta">{{ this.msgErro }}</h6>
              <div>
                <label for="loginE"></label>
                <input
                  type="type"
                  v-model="emailu"
                  placeholder="Email"
                  id="loginE"
                />
              </div>
              <div>
                <label for="passx"></label>
                <input
                  type="text"
                  v-model="senha"
                  placeholder="Senha"
                  id="passx"
                />
              </div>

              <a href>Esqueceu sua senha?</a>
              <div>
                <input type="checkbox" id="lembrarLogin" checked />
                <label for="lembrarLogin">Lembrar de mim</label>
              </div>
              <div v-if="cadastrando">
                <v-btn rounded  v-on:click="cadastrarLogin"

                  class="btn" block
                  >Cadastrar</v-btn
                >
              </div>
              <div v-else>
                <v-btn
                  rounded 
                  to="/cadastrar"
                  class="btn"
                  v-on:click="logarLogin"
                  >Entrar</v-btn
                >
              </div>
            </form>

            <div class="linha"></div>
            <v-container class="loginalternativ">
              <h6>Nao tem uma conta?</h6>

              <v-btn rounded to="/cadastrar" class="btn">
                Sign up for Libfy
              </v-btn>
            </v-container>
          </main>
        </div>
      </section>
    </v-container>
  </main>
</template>

<script>
import firebase from "firebase";

export default {
  name: "TelaLogin",
  props: {
    msg: String,
    cadastrando: Boolean,
  },
  data: () => {
    return {
      emailu: "",
      senha: "",
      msgErro: "",
      vers: "nome musica elvis",
      logando: true,
    };
  },
  methods: {
    cadastrarLogin(e) {
      e.preventDefault();
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.emailu, this.senha)
        .then((credenciais) => {
          let usuario = credenciais.user;
          console.log(usuario);
        })
        .catch((erro) => {
          this.msgErro = `${erro.code} ${erro.message}`;
        });
    },
    logarLogin(e) {
      firebase.auth().signInWithEmailAndPassword();
    },
  },
  mounted() {
    function importFire() {
      var firebaseConfig = {
        apiKey: "AIzaSyDQYcaY9B89obl52Opf8ORFl_6ywN9EbIg",

        authDomain: "libfyzin.firebaseapp.com",

        projectId: "libfyzin",

        storageBucket: "libfyzin.appspot.com",

        messagingSenderId: "480452003717",

        appId: "1:480452003717:web:9e402ed32c685f523526ec",
      };

      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
    }
    importFire();

    /* function initFireStore() {
      this.firestore = firebase.firestore();
    }
    initFireStore();
    const collection = this.firestore.collection("musicas");
    collection.add({
      nome: "Elvis",
      tocou: 234.34,
      cod: "230485",
    }); */
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "TelaLogin.css";
@import "btnspotify.css";
</style>
