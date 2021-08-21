
let url="https://www.abibliadigital.com.br/api"

var app = new Vue({
        el:"#vuehome",

        data:{
            albumsLikado:[],
            vers:'nome musica elvis',

            firestore:null,
            collection:null,
            consultado:false

        },
        methods:{
            darLikeEmAlbumElvis(){
                const task = collection.add({
                    nome:"Elvis",
                    tocou:234.34,
                    cod:"230485"
                })
                task.then((referenciaDocumentoSalvo)=>{
                    referenciaDocumentoSalvo.id;
                })
            },
            mostrarTodosAlbunsDoUsuario(){
                const task = collection.get()
                task.then((querySnapshot)=>{
                    querySnapshot.forEach((doc)=>{
                        console.log(doc.id)
                        this.albumsLikado=doc.data()
                    })
                })
            }

        },
        mounted(){
            function initFireStore(){
                this.firestore = firebase.firestore()
                this.collection = this.firestore.collection("albuns")
            }
            initFireStore()

        }
    }
);
