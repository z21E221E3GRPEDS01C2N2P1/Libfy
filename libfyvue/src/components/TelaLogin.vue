<template>
  <section>
    <link
      href="https://use.fontawesome.com/releases/v5.0.13/css/all.css"
      rel="stylesheet"
    />

    <div class="main" id="vuelogin">
      <h1>teste</h1>

      <div class="musicas login">
        <div class="loginalternativ">
          <a href class="facebook btn btnlogin"
            ><i class="fab fa-facebook-f"></i> Continuar com</a
          >
          <button class=" btn btnlogin">Continuar com</button>
          <button class=" btn btnlogin">Continuar com</button>
        </div>
        <div>
          <div class="linha"></div>
          <div>ou</div>
          <div class="linha"></div>
        </div>

        <div>
          <form action="">
            <h6 class="alerta">{{ this.msgErro }}</h6>
            <div>
              <label for="loginE"></label>
              <input
                type="type"
                v-model="email"
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
            <div v-if="logando">
              <a href class="loginbtn" v-on:click="cadastrarLogin">Cadastrar</a>
            </div>
            <div v-else>
              <a href class="loginbtn" v-on:click="logarLogin">Entrar</a>
            </div>
          </form>

          <div class="linha"></div>
          <footer>
            <h6>Nao tem uma conta?</h6>
            <a href="signup.html" class="btn">Inscreva-se</a>
          </footer>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import * as firebase from "firebase/app"

export default {
  name: "TelaLogin",
  props: {
    msg: String,
  },
  data: {
    email: "",
    senha: "",
    msgErro: "",
    vers: "nome musica elvis",
    logando: true,
    firestore: null,
  },
  methods: {
    cadastrarLogin(e) {
      e.preventDefault();
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.senha)
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
    }importFire()

    function initFireStore() {
      firestore = firebase.firestore();
    }
    initFireStore();
    const collection = firestore.collection("musicas");
    collection.add({
      nome: "Elvis",
      tocou: 234.34,
      cod: "230485",
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "TelaLogin.css";
@import "btnspotify.css";
</style>
