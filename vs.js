console.log('loading')
let url="https://www.abibliadigital.com.br/api"

var app = new Vue({
    el:"#vuehome",
    data:{
        versiculo:0
    },

    created: function () {
        axios.get(url+'/verses/nvi/sl/23').then(
            (resposta) => {
                this.versiculo = resposta.data;
                console.log(this.versiculo.verses[0]);

            });
    }

});