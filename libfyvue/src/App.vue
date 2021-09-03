<template>
  <v-app>
    <div id="app">
   
    <router-view/>
  </div>
  </v-app>
</template>
<script>

import {busmitter} from './plugins/mitt'

export default {
  name:'App',
  
}

</script>
<style >
:root{
  --cor-fundo:#191414;
  --cor-fundo-escura:#121212;
  --cor-selecao:#49347b;
  --cor-primary:#8257e6;
}
#app{
  background-color: rgb(61, 49, 49);
}
</style>