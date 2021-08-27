<template>
  <div class="cadastrar"> 
    <TelaLogin v-bind:cadastrando="true"></TelaLogin>
  </div>
</template>

<script>
// @ is an alias to /src  


import TelaLogin from '../components/TelaLogin.vue'

export default {
  name: 'Cadastro',
  components: {  
    TelaLogin
  }
}
</script>
