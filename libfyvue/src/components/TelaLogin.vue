<template>
  <main class="loginalternativ">
    <v-container class="main pa-8 ma-auto lesswidth">
      <section>
        <div class="container">
          <div class="login">
            <v-container class="ma-auto w-25">
              <v-img
                lazy-src="@/assets/logo.png"
                contain
                class="ml-0 ma-auto"
                src="@/assets/logo.png"
              ></v-img>
            </v-container>

            <div class="loginalternativ">
              <v-btn rounded @click="cadastrarComGoogle" class="btn">
                <i class="fab fa-google ma-sm-8 icone"></i>
                Continue With Google
              </v-btn>
            </div>

            <div class="linhacontainer mt-10">
              <v-row no-gutters>
                <v-col cols="12" sm="5">
                  <v-divider inset color="white"></v-divider>
                </v-col>
                <v-col cols="12" sm="2" class="text-sm-body-1"> or </v-col>
                <v-col cols="12" sm="5">
                  <v-divider inset color="white"></v-divider>
                </v-col>
              </v-row>
            </div>

            <main>
              <form action="">
                <section class="label">
                  <div>
                    <label for="loginE">Email</label>
                    <input
                      type="type"
                      v-model="emailu"
                      placeholder="Enter your e-mail"
                      id="loginE"
                      class="input"
                    />
                  </div>
                  <div>
                    <label for="passx">Password</label>
                    <input
                      type="password"
                      v-model="senha"
                      placeholder="Enter your password"
                      id="passx"
                      class="input"
                    />
                  </div>
                </section>

                <div v-if="cadastrando">
                  <v-btn
                    rounded
                    v-on:click="cadastrarLogin"
                    class="btn mb-10 mt-10"
                    block
                    >Cadastrar</v-btn
                  >
                </div>
                <div v-else>
                  <section class="label">
                    <a class="text-sm-body-1" href="/">Esqueceu sua senha?</a>
                    <div>
                      <input
                        type="checkbox"
                        id="lembrarLogin"
                        checked
                        class="check"
                      />
                      <label class="text-sm-body-1" for="lembrarLogin"
                        >Lembrar de mim</label
                      >
                    </div>
                  </section>
                  <v-btn
                    rounded
                    class="btn mb-10 mt-10"
                    block
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
        </div>
        <v-snackbar
          color="warning"
          v-model="msgErro.deveAparecer"
          transition="scale-transition"
          :vertical="false"
        >
          <template v-slot:action="{ attrs }">
            <v-alert
              v-bind="attrs"
              @click="msgErro.deveAparecer = false"
              :value="msgErro.deveAparecer"
              color="warning"
              border="top"
              icon="mdi-home"
            >
              {{ msgErro.msg }}
            </v-alert>
          </template>
        </v-snackbar>
      </section>
    </v-container>
  </main>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TelaLogin",
  props: {
    msg: String,
    cadastrando: Boolean
  },
  data: () => {
    return {
      emailu: "",
      senha: "",
      msgErro: { deveAparecer: false, msg: "" },
      logando: true
    };
  },
  methods: {
    cadastrarLogin(e) {
      e.preventDefault();
      this.$firebase
        .auth()
        .createUserWithEmailAndPassword(this.emailu, this.senha)
        .then(credenciais => {
          /* credenciais.user.updateProfile({
            displayName:
          }) */
          let usuario = credenciais.user;
        })
        .catch(erro => {
          console.log(erro.message);
          this.msgErro.deveAparecer = true;
          this.msgErro.msg = `${erro.message}`;
        });
    },
    logarLogin(e) {
      this.$firebase
        .auth()
        .signInWithEmailAndPassword(this.emailu, this.senha)
        .then(credenciais => {
          this.$router.push({ name: "Home" });
        })
        .catch(erro => {
          this.msgErro.deveAparecer = true;
          this.msgErro.msg = `${erro.message}`;
        });
    },
    handleCadastroGoogle(result) {
      /** @type {firebase.auth.OAuthCredential} */
      try {
        let credential = result.credential;
        // This gives you a Google Access Token. You can use it to access the Google API.
        let token = credential.accessToken;
        // The signed-in user info.
        let user = result.user;

        this.$router.push({ name: "Home" });

        // ...
      } catch (error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        // The email of the user's account used.
        let email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        let credential = error.credential;
      }
    },
    cadastrarComGoogle() {
      console.log("sofar");
      let provider = this.$gProviderInstancia;

      this.$firebase
        .auth()
        .signInWithPopup(provider)
        .then(this.handleCadastroGoogle);
    }
  },
  computed: {
    ...mapGetters(["getUser"])
  },
  mounted() {
    setTimeout(() => {
      let isLogado = this.getUser.data;
      
      if (isLogado) {
        this.$router.push({ name: "Home" });
      }
    }, 500);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "css/TelaLogin";
</style>
