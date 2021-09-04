<template>
  <main class="loginalternativ"> 
    <v-container class="main pa-16 ma-auto lesswidth" >
      <section>
        <div class="login">
          <h1></h1>

          <div class="loginalternativ">
            
            <v-btn rounded to="/cadastrar" class="btn" block
              ><i class="fab fa-facebook-f ma-2"></i> Continue with facebook</v-btn>
            <v-btn rounded to="/cadastrar" class="btn" block
              ><i class="fab fa-google ma-2"></i> Continue With Google
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
            <form action="" >
              <h6 class="alerta">{{ this.msgErro }}</h6>
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
                  type="text"
                  v-model="senha"
                  placeholder="Enter your password"
                  id="passx" 
                  class="input"
                />
              </div>
            </section>

              
              <div v-if="cadastrando">
                <v-btn rounded  v-on:click="cadastrarLogin" 
                  class="btn" block
                  >Cadastrar</v-btn
                >
              </div>
              <div v-else>
                <section class="label">
                <a href>Esqueceu sua senha?</a>
                <div>
                  <input type="checkbox" id="lembrarLogin" checked class="check" />
                <label for="lembrarLogin">Lembrar de mim</label>
                </div>
              </section>
                <v-btn
                  rounded  
                  class="btn" block
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
import firebase from '../plugins/firebase'

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
      vers: "nome musfica elvis",
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
          /* credenciais.user.updateProfile({
            displayName:
          }) */
          let usuario = credenciais.user;
          console.log(usuario);
        })
        .catch((erro) => {
          this.msgErro = `${erro.code} ${erro.message}`;
        });
    },
    logarLogin(e) {
      console.log('credenciais')
      firebase.auth().signInWithEmailAndPassword(
        this.emailu,this.senha).then((credenciais)=>{
          
          this.$store.dispatch('logaUsuario',credenciais)
          this.$router.push({name:'Home'})
        }

        ).catch(e=>console.log(e));
    },
  },
  mounted() {
    

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
@media (min-width: 1200px)
{
  .lesswidth{
    width:50%
  }
  
  }
</style>
