
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
      :display-header="$vuetify.breakpoint.width>920"
      :send-images="false"
      :profile-picture-config="profilePictureConfig"
      :timestamp-config="timestampConfig"
      :link-options="linkOptions"
      :accept-image-types="'.png, .jpeg'"
      @onMessageSubmit="onMessageSubmit"
      @onType="onType"
      @onClose="onClose"
      ref="chatArtisti"
    >
      <template v-slot:header>
        <div class="pa-4">
          <span class="text-capitalize  white--text text-lg-h6">
            {{ "sobre " + artistaThreadSelecionado }}
          </span>

          <span class="text-caption white--text">: Participantes :</span>
          <div class=" cabecalhodentro">
            <span
              v-for="partici in participants"
              v-bind:key="partici.id"
              class="text-caption"
            >
              {{ partici.name }}, &nbsp;
            </span>
          </div>
        </div>
      </template>
    </Chat>
  </div>
</template>
<script>
import { Chat } from "vue-quick-chat";
import estiloChat from "./css/ChatQuick.css";
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
    },
    nomeParticipantes() {
      let participantsNome = [];
      for (const participant of this.participants) {
        participantsNome.push(participant.name);
      }
      return participantsNome;
    }
  },
  data() {
    return {
      ...estiloChat,
      visible: true,
      participants: [],
      myself: {},
      messages: [],
      ultimoIdUsr: 1,

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

    adicionaArrayParticipantesNovo() {
      let fdatabase = this.$firebase.firestore();

      let participnts = {
        partcps: []
      };
      let msgs = {
        mensags: []
      };
      fdatabase
        .collection(this.artistaThreadSelecionado)
        .doc("participnts")
        .set(participnts)
        .then(_ => {
          fdatabase
            .collection(this.artistaThreadSelecionado)
            .doc("msgs")
            .set(msgs);
        });
    },

    adicionaUltimoIdNovo(arrayParticipantesJaCriado) {
      let fdatabase = this.$firebase.firestore();

      let objDocumento = {
        idfinal: this.ultimoIdUsr + 1
      };
      fdatabase
        .collection(this.artistaThreadSelecionado)
        .doc("ultimoid")
        .set(objDocumento)
        .catch(err => {
          console.log(err);
        })
        .then(_ => {
          if (arrayParticipantesJaCriado) return;

          this.adicionaArrayParticipantesNovo();
        });
    },
    setupInicialEstruturaDadosChatArtista() {
      this.adicionaUltimoIdNovo();
    },
    adicionaAtualizaParticipante() {
      //participantes existentes ja sao armazenados quando componente monta
      let participantesPresentes = this.participants;
      participantesPresentes.push(this.myself);

      let fdatabase = this.$firebase.firestore();

      fdatabase
        .collection(this.artistaThreadSelecionado)
        .doc("participnts")
        .update({
          partcps: participantesPresentes
        })
        .then(_ => {
          this.adicionaUltimoIdNovo(true);
        });
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
        .collection(this.artistaThreadSelecionado)
        .doc("msgs")
        .get()
        .then(doc => {
          this.messages = this.converteMsgsFirebase(doc.data().mensags);

          console.log("carreguei msgs");
        })
        .catch(er => {
          console.log(er + "nao existe msgs ainda");
          this.messages = [];
        });
    },
    addEventListenerFirebase() {
      this.unsubscribeMsgNovas = this.$firebase
        .firestore()
        .collection(this.artistaThreadSelecionado)
        .doc("msgs")
        .onSnapshot(doc => {
          this.$firebase
            .firestore()
            .collection(this.artistaThreadSelecionado)
            .doc("ultimoid")
            .get(doc => (this.ultimoIdUsr = doc.data().idfinal))
            .then(_ => {
              this.carregaParticipantesEmensagens();
            });
        });
    },
    carregaParticipantesEmensagens() {
      //this.carregaFakeDados();
      let fdatabase = this.$firebase.firestore();

      fdatabase
        .collection(this.artistaThreadSelecionado)
        .doc("ultimoid")
        .get()
        .catch(naoExisteUltimoId => {
          this.setupInicialEstruturaDadosChatArtista();
        })
        .then(doc => {
          this.ultimoIdUsr = doc.data().idfinal;
        })
        .catch(naoExisteUltimoId => {
          this.setupInicialEstruturaDadosChatArtista();
        })
        .then(_ => {
          fdatabase
            .collection(this.artistaThreadSelecionado)
            .doc("participnts")
            .get()
            .then(doc => {
              if (doc.exists) {
                let usuarioAgora = this.usuarioatual.data;
                let particpantes = doc.data().partcps;

                let usuarioNaoLogado = !usuarioAgora || !usuarioAgora.email;

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
                  this.myself = euMesmo;
                }

                this.participants = participantesSemEuMesmo;
              } else {
                // doc.data() will be undefined in this case
                console.log("vc eh first nesse artista!");

                this.setupInicialEstruturaDadosChatArtista();
              }
            })
            .catch(naoExisteParticipnts => {
              console.log("Error getting document:", naoExisteParticipnts);
              this.setupInicialEstruturaDadosChatArtista();
            })
            .then(_ => {
              this.carregaMensagensChat();
            })
            .catch(error => {
              console.log("Error getting document:", error);
            });
        });
    },

    async enviaMensagensChat(message) {
      let mensagensArrRef = this.$firebase
        .firestore()
        .collection(this.artistaThreadSelecionado)
        .doc("msgs");
      let msgSerializada = { ...message };
      if (msgSerializada.myself) {
        delete msgSerializada.myself;
      }
      msgSerializada.timestamp = msgSerializada.timestamp.toISO();

      let participanteNaoCadastrado = await this.$firebase
        .firestore()
        .collection(this.artistaThreadSelecionado)
        .doc("participnts")
        .get()
        .then(dta =>
          dta.data().partcps.filter(participante => {
            return participante.email === this.myself.email;
          })
        )
        .catch(participanteNaoDefinido => console.log(participanteNaoDefinido));

      if (
        !participanteNaoCadastrado ||
        participanteNaoCadastrado.length === 0
      ) {
        this.adicionaAtualizaParticipante(true);
      }

      //aaa
      // Atomically add
      mensagensArrRef.update({
        mensags: this.$firebase.firestore.FieldValue.arrayUnion(msgSerializada)
      });
    },
    unsubscribeMsgNovas: () => {},
    onMessageSubmit: function(message) {
      this.enviaMensagensChat(message);
    },
    focaNoInput() {
      let cssAnimation = {
          duration: 3000,
          offset: 0,
          easing: easeInOutCubic,
        }
        setTimeout(()=>{
          this.$vuetify.goTo('#scrolaAqui',cssAnimation)
        },700)
    }
  },
  mounted() {
    this.carregaParticipantesEmensagens();
    this.addEventListenerFirebase();
    this.focaNoInput();
  },
  unmounted() {
    this.unsubscribeMsgNovas();
    this.participants = [];
    this.myself = [];
    this.messages = [];
  }
};
</script>
<style  scoped>
@import "css/ChatQuickNpm.scss";
</style>