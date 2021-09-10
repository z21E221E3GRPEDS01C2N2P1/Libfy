<template>
  <main class="main">
    <h1 class="titulofileira">Artists</h1>
    <div class="musicas ">
      <section class="">
        <v-row class="flex-child">
          <v-col cols="12" :md="tamanhoSlideArtist">
            <v-sheet class=" metade" dark>
              <v-slide-group show-arrows center-active>
                <ArtistaCard
                  v-for="artist in gPesquisaResult.artists.items"
                  v-bind:key="artist.id"
                  v-bind:vforartista="artist"
                  v-on:selecaoART="abrirChatThread"
                />
              </v-slide-group>
            </v-sheet>
          </v-col>
          <v-col cols="12" md="5" v-if="chatThreadAberto">
            <div>
              <ChatQuick></ChatQuick>
            </div>
          </v-col>
        </v-row>
      </section>
      <h1 class="titulofileira">Recentemente Tocadas</h1>
      <section>
        <v-sheet class="mx-auto" dark>
          <v-slide-group multiple show-arrows center-active dark>
            <!--  <MusicaCard
              v-for="tracks in gPesquisaResult.tracks.items"
              v-bind:key="tracks.id"
              v-bind:selemusica="tracks"
            /> -->
          </v-slide-group>
        </v-sheet>
      </section>
    </div>
  </main>
</template>

<script>
import MusicaCard from "./MusicaCard.vue";
import { mapGetters, mapState } from "vuex";
import ArtistaCard from "./ArtistaCard.vue";
import ChatQuick from "./ChatQuick.vue";

export default {
  components: { MusicaCard, ArtistaCard, ChatQuick },
  name: "ResultadoPesquisa",
  computed: {
    ...mapState(["qualquerCois"]),
    ...mapGetters(["getPesquisaResult"]),

    gPesquisaResult() {
      return this.getPesquisaResult;
    }
  },
  data: () => {
    return {
      artistaSelecionado: { id: 99 },
      tamanhoSlideArtist: 12,
      dataraw: [],
      chatThreadAberto:false
    };
  },
  methods: {
    fbUseful(){

        let fdatabase = this.$firebase.firestore();
        
        fdatabase
          .collection("mensagens")
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(documento => {
              console.log(documento.id);
              this.dataraw = documento.data();
            });
          });
        let testzao = { texto: "Gets", enviadoPor: "Tarlindo" };
        fdatabase
          .collection("mensagens")
          .add(testzao)
          .then(dcmnt => {
            dcmnt.id;
          });

        var docRef = fdatabase
          .collection("mensagens").doc("1uo7KfD0HT6It8JgizFQ");

        docRef
          .get()
          .then(doc => {
            if (doc.exists) {
              console.log("Document data:", doc.data());
            } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
            }
          })
          .catch(error => {
            console.log("Error getting document:", error);
          });

    },
    fbCriaMatrizArrDeMsgs(){
      fdatabase.collection("themidnight")
        .doc("msgs")
        .set({ 
          mensags: [
            {
              content: "v",
              participantId: 3,
              timestamp: "2021-09-09T19:16:35.956-03:00",
              createdAt:this.$firebase.database.ServerValue.TIMESTAMP,
              uploaded: false,
              viewed: false,
              type: "text",
              myself: true
            }
          ]}
          ).then(function() {
          console.log("Frankta2 created");
        }).catch(er=>console.log(er));
        
    },
    abrirChatThread(artis) { 

      if (this.artistaSelecionado.id !== artis.id) {
        this.tamanhoSlideArtist = 6;
        this.artistaSelecionado = artis;
        this.chatThreadAberto = true


      } else {
        this.tamanhoSlideArtist = 12;
        this.artistaSelecionado = { id: 99 };
        this.chatThreadAberto = false
      }
    }
  },
  created() {
    this.$store.dispatch("pesquisaMusica");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "ListaMusicas.css";
</style>
