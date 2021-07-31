
let url="https://www.abibliadigital.com.br/api"

var app = new Vue({
    el:"#vuelogin",

    data:{
        email:'',
        senha:'',
        msgErro:'',
        vers:'nome musica elvis',
        logando:true,
        firestore:null

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
                    this.msgErro=`${erro.code} ${erro.message}`
                })
        },
        logarLogin(e){

        },

    },
    mounted(){
        function initFireStore(){
            firestore = firebase.firestore()
        }
        initFireStore()
        const  collection = firestore.collection("musicas")
        collection.add({
            nome:"Elvis",
            tocou:234.34,
            cod:"230485"
        })
    }
}
);
