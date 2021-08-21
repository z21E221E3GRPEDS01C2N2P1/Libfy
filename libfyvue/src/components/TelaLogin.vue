<template>
   
<section>
 

<div class="main" id="vuelogin">
    




    <div class="musicas login">
        <div class="loginalternativ">
            <a href  class="facebook btn btnlogin">Continuar com</a>
            <button class="fb btn">Continuar com</button>
            <button class="fb btn">Continuar com</button>

        </div>
        <div>
            <div class="linha"></div><div>ou</div><div class="linha"></div>
        </div>

        <div>
            <form action="">
                <h6 class="alerta"> {{this.msgErro}}</h6>
                <div><label for="loginE"></label>
                    <input type="type"
                           v-model="email"
                           placeholder="Email" id="loginE"></div>
                <div><label for="passx"></label>
                    <input type="text"
                           v-model="senha"
                           placeholder="Senha" id="passx"></div>

                <a href>Esqueceu sua senha?</a>
                <div>
                    <input type="checkbox" id="lembrarLogin" checked>
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
export default {
  name: 'TelaLogin',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 @import 'TelaLogin.css';
</style>
