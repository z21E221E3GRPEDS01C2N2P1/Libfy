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
              <ChatQuick v-bind:artistaThreadSelecionado="nomeArtistaEmIdChatThread"></ChatQuick>
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
      chatThreadAberto: false,
      nomeArtistaEmIdChatThread:"themidnight"
    };
  },
  methods: { 
    TransformaNomeEmIdChatThread(label) {
      if(!label) return;

      label = label
        .replace(/[^a-z0-9\s-]/gi, "")
        .trim()
        .replace(/\s+/g, "")
        .toLowerCase();
      return label
    },
    criaChatArtistaThread(){
      
    },
    abrirChatThread(artis) {
      if (this.artistaSelecionado.id !== artis.id) {
        this.tamanhoSlideArtist = 6;
        this.artistaSelecionado = artis;
        this.nomeArtistaEmIdChatThread=(this.TransformaNomeEmIdChatThread(artis.name))
        
        this.chatThreadAberto = true;
      } else {
        this.tamanhoSlideArtist = 12;
        this.artistaSelecionado = { id: 99 };
        this.chatThreadAberto = false;
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
@import "css/ListaMusicas.scss";
</style>
