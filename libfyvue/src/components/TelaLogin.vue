<template>
  <main class="loginalternativ">
    <v-container class="main pa-16 ma-auto lesswidth">
      <section>
        <div class="login">
          <v-container>
            <v-img
              lazy-src="@/assets/logo.png"
              contain
              class="ml-15"
              max-width="40%"
              src="@/assets/logo.png"
            ></v-img>
          </v-container>

          <div class="loginalternativ">
            <v-btn rounded to="/cadastrar" class="btn" block
              ><i class="fab fa-facebook-f ma-2 icone"></i>
              <div v-if="cadastrando">Cadastre-se com facebook</div>
              <div v-else>Continue with facebook</div>
            </v-btn>
            <v-btn rounded to="/cadastrar" class="btn" block
              ><i class="fab fa-google ma-2 icone"></i>
              <div v-if="cadastrando">Cadastre-se com Google</div>
              <div v-else>
                Continue With Google
              </div>
            </v-btn>
          </div>

          <div class="linhacontainer mt-10">
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
                  <a href="/">Esqueceu sua senha?</a>
                  <div>
                    <input
                      type="checkbox"
                      id="lembrarLogin"
                      checked
                      class="check"
                    />
                    <label for="lembrarLogin">Lembrar de mim</label>
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
      vers: "nome musfica elvis",
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
          this.msgErro.msg = `${erro.code} ${erro.message}`;
        });
    },
    logarLogin(e) {
      this.$firebase
        .auth()
        .signInWithEmailAndPassword(this.emailu, this.senha)
        .then(credenciais => {
          this.$router.push({ name: "Home" });
        })
        .catch(e => console.log(e));
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "css/TelaLogin";
</style>
