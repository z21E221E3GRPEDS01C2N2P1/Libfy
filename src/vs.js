
let url="https://www.abibliadigital.com.br/api"

var app = new Vue({
    el:"#vuelogin",
    data:{
        email:'',
        senha:'',
        vers:'nome musica elvis',

    },
    methods:{
        cadastrarLogin(e){
            e.preventDefault()
            firebase.auth()
                .createUserWithEmailAndPassword(
                this.email,
                this.senha)
                .then((credenciais)=>{
                    let usuario = credenciais.user;
                    console.log(usuario)
                })
                .catch((erro)=>{
                    let errorCode;
                })
        }
    }
}
);
