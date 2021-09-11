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
  --cor-fundo-escura:#fff;
  --cor-selecao:#49347b;
  --cor-primary:#8257e6;
}
#app{
  background-color: rgb(61, 49, 49);
}
.topofixo{
  transition: all 5s,ease-in;
  
}
.icone{
  color:white;
} 
.main {
    margin-left:21vh;
  margin-top:1%;
  font-size: 28px; 
  padding: 0px 10px; 

}
@media (max-width: 600px)
{
  
.main {
    margin-left:1vh;
    }
}

</style>