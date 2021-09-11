
<template>
  <div>
    <Chat
      :participants="participants"
      :myself="myself"
      :messages="messages"
      :chat-title="chatTitle"
      :placeholder="placeholder"
      :colors="colors"
      :border-style="borderStyle"
      :hide-close-button="hideCloseButton"
      :submit-icon-size="submitIconSize"
      :submit-image-icon-size="submitImageIconSize"
      :async-mode="asyncMode"
      :scroll-bottom="scrollBottom"
      :display-header="false"
      :send-images="false"
      :profile-picture-config="profilePictureConfig"
      :timestamp-config="timestampConfig"
      :link-options="linkOptions"
      :accept-image-types="'.png, .jpeg'"
      @onMessageSubmit="onMessageSubmit"
      @onType="onType"
      @onClose="onClose"
    />
  </div>
</template>
<script>
import { Chat } from "vue-quick-chat";
import estiloChat from "./ChatQuick.css";
import { apiD_chat } from "../const";
import { mapGetters } from "vuex";
export default {
  components: {
    Chat
  },
  props: ["artistaThreadSelecionado"],
  computed: {
    ...mapGetters(["getUser"]),
    usuarioatual() {
      return this.getUser;
    }
  },
  data() {
    return {
      ...estiloChat,
      visible: true,
      participants: [],
      myself: {},
      messages: [],
      ultimoIdUsr: 9,

      // there are other options, you can check them here
      // https://soapbox.github.io/linkifyjs/docs/options.html
      linkOptions: {
        myself: {
          className: "myLinkClass",
          events: {
            click: function(e) {
              alert("Link clicked!");
            },
            mouseover: function(e) {
              alert("Link hovered!");
            }
          },
          format: function(value, type) {
            if (type === "url" && value.length > 50) {
              value = value.slice(0, 50) + "…";
            }
            return value;
          }
        },
        others: {
          className: "othersLinkClass",
          events: {
            click: function(e) {
              alert("Link clicked!");
            },
            mouseover: function(e) {
              alert("Link hovered!");
            }
          },
          format: function(value, type) {
            if (type === "url" && value.length > 50) {
              value = value.slice(0, 50) + "…";
            }
            return value;
          }
        }
      }
    };
  },
  methods: {
    converteMsgsFirebase(docDataMensags) {
      let msgsComMyself = docDataMensags;

      for (const mensagem of msgsComMyself) {
        if (mensagem.participantId === this.myself.id) {
          mensagem.myself = true;
        } else {
          mensagem.myself = false;
        }
      }

      return msgsComMyself;
    },
    onType: function(event) {
      //here you can set any behavior
    },
    onClose() {
      this.visible = false;
    },
    

    adicionaUltimoIdNovo() {
      this.ultimoIdUsr = 1
      let objadd = { ultimoid:{
                  idfinal:1
                } };
                fdatabase
                  .collection(this.artistaThreadSelecionado)
                  .add(objadd)                   
    },
    adicionaParticipanteNovo() {
      let participantesPresentes = this.participants;
      participantesPresentes.push(this.myself)

      let fdatabase = this.$firebase.firestore();

      fdatabase
        .collection(this.artistaThreadSelecionado)
        .doc("participnts")
        .update(doc => {
          partcps: participantesPresentes;
        }).then(_=>{
          this.adicionaUltimoIdNovo()
        });
    },
    adicionaNovoArrayParticipantes(){
       let particps = { participnts:{
                  partcps:[]
                } };
                fdatabase
                  .collection(this.artistaThreadSelecionado)
                  .add(particps)
                  
    },
    setupInicialEstruturaDadosChatArtista(){
      this.adicionaNovoArrayParticipantes()
    },
    carregaFakeDados() {
      let { participants, myself, messages } = apiD_chat.chatplaceholder;
      this.participants = participants;
      this.myself = myself;
      this.messages = messages;
    },

    carregaMensagensChat() {
      this.$firebase
        .firestore()
        .collection("themidnight")
        .doc("msgs")
        .get()
        .then(doc => {
          this.messages = this.converteMsgsFirebase(doc.data().mensags);

          console.log("carreguei msgs");
        })
        .catch(er => console.log(er));
    },
    carregaParticipantesEmensagens() {
      //this.carregaFakeDados();
      let fdatabase = this.$firebase.firestore();

      fdatabase
        .collection(this.artistaThreadSelecionado)
        .doc("ultimoid")
        .get(doc => (this.ultimoIdUsr = doc.data().idfinal))
        .catch(naoExisteUltimoId=>{
          this.adicionaUltimoIdNovo()})
        .then(_ => {
          fdatabase
            .collection(this.artistaThreadSelecionado)
            .doc("participnts")
            .get()
            .then(doc => 
            {
              if (doc.exists) {
                console.log("Document data:", doc.data().partcps);
                let usuarioAgora = this.usuarioatual.data;
                let particpantes = doc.data().partcps;

                let usuarioNaoLogado = !usuarioAgora || !usuarioAgora.email

                if (usuarioNaoLogado) {
                  this.$router.push({ name: "Home" });
                  return;
                }

                let participantesSemEuMesmo = particpantes.filter(
                  participante => participante.email !== usuarioAgora.email
                );

                let euMesmo = particpantes.filter(
                  participante => participante.email === usuarioAgora.email
                )[0];

                if (!euMesmo) {
                  this.myself = {
                    profilePicture: "",
                    name: usuarioAgora.email,
                    email: usuarioAgora.email,
                    id: this.ultimoIdUsr
                  };
                } else {
                  this.myself = euMesmo;     }

                this.participants= participantesSemEuMesmo
 
              } else {
                // doc.data() will be undefined in this case
                console.log("vc eh first nesse artista!");               
                   
              }
            }).catch(naoExisteParticipnts=>{
                this.setupInicialEstruturaDadosChatArtista()
            })
            .then(_ => {
              this.carregaMensagensChat();
            })
            .catch(error => {
              console.log("Error getting document:", error);
            });
        });
    },
    enviaMensagensChat(message) {
      let mensagensArrRef = this.$firebase
        .firestore()
        .collection(this.artistaThreadSelecionado)
        .doc("msgs");
      let msgSerializada = { ...message };
      if (msgSerializada.myself) {
        delete msgSerializada.myself;
      }
      msgSerializada.timestamp = msgSerializada.timestamp.toISO();
      console.log(message);

      // Atomically add a new region to the "regions" array field.
      mensagensArrRef.update({
        mensags: this.$firebase.firestore.FieldValue.arrayUnion(msgSerializada)
      });
    },
    unsubscribeMsgNovas: () => {},
    onMessageSubmit: function(message) {
      this.enviaMensagensChat(message);
    }
  },
  mounted() {
    this.carregaParticipantesEmensagens();

    this.unsubscribeMsgNovas = this.$firebase
      .firestore()
      .collection("themidnight")
      .doc("msgs")
      .onSnapshot(doc => {
        this.$firebase
          .firestore()
          .collection("themidnight")
          .doc("ultimoid")
          .get(doc => (this.ultimoIdUsr = doc.data().idfinal))
          .then(_ => {
            this.carregaParticipantesEmensagens();
          });
      });
  },
  unmounted() {
    this.unsubscribeMsgNovas();
    this.participants = [];
    this.myself = [];
    this.messages = [];
  }
};
</script>
<style scoped>
@import "ChatQuickNpm.css";
.material-design-icon,
.image-icon {
  border: 1px solid red;
}
</style>