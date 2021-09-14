<template>
  <main class="main">
    <div class="musicas ">
      <section class="" v-if="existeArtistasNaPesquisa">
        <h1 class="titulofileira">Artists</h1>
        <v-row class="flex-child">
          <v-col cols="12" :md="tamanhoSlideArtist">
            <v-sheet class=" " dark>
              <v-slide-group show-arrows center-active>
                <ArtistaCard
                  v-for="artist in gPesquisaResult.artists.items"
                  v-bind:key="artist.id"
                  v-bind:vforartista="artist"
                  v-on:selecaoART="abrirChatThread"
                />
              </v-slide-group>
            </v-sheet>
            <v-col cols="12" md="12" v-if="chatThreadAberto">
              <v-row cols="12" md="12">
                <v-col cols="12" md="6">
                  <NoticiasCarrossel
                    v-bind:nomeArtistaSelecionado="artistaSelecionado.name"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <NoticiasCarrossel
                    v-bind:nomeArtistaSelecionado="artistaSelecionado.name"
                    v-bind:aoContrario="true"
                  />
                </v-col>
              </v-row>
              
            </v-col>
          </v-col>
          <v-expand-transition>
            <v-col cols="12" md="4" v-if="chatThreadAberto">
              <div>
                <ChatQuick
                  v-bind:artistaThreadSelecionado="nomeArtistaEmIdChatThread"
                ></ChatQuick>
              </div>
            </v-col>
          </v-expand-transition>
        </v-row>
      </section>
      <h1 class="titulofileira">Songs</h1>
      <section>
        <v-sheet class="mx-auto bg--purple-4" dark>
          <v-slide-group show-arrows center-active>
            <TrackCard
              v-for="track in gPesquisaResult.tracks.items"
              v-bind:key="track.id"
              v-bind:vfortrack="track"
            />
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
import TrackCard from "./TrackCard.vue";
import NoticiasCarrossel from "./NoticiasCarrossel.vue";

export default {
  components: {
    MusicaCard,
    ArtistaCard,
    ChatQuick,
    TrackCard,
    NoticiasCarrossel
  },
  name: "ResultadoPesquisa",
  computed: {
    ...mapState(["qualquerCois"]),
    ...mapGetters(["getPesquisaResult"]),

    gPesquisaResult() {
      return this.getPesquisaResult;
    },
    existeArtistasNaPesquisa() {
      return this.gPesquisaResult.artists.items.length > 1;
    }
  },
  data: () => {
    return {
      artistaSelecionado: { id: 99, name: "the midnight" },
      tamanhoSlideArtist: 12,
      dataraw: [],
      chatThreadAberto: false,
      nomeArtistaEmIdChatThread: "themidnight"
    };
  },
  methods: {
    TransformaNomeEmIdChatThread(label) {
      if (!label) return;

      label = label
        .replace(/[^a-z0-9\s-]/gi, "")
        .trim()
        .replace(/\s+/g, "")
        .toLowerCase();
      return label;
    },
    criaChatArtistaThread() {},
    abrirChatThread(artis) {
      if (this.artistaSelecionado.id !== artis.id) {
        this.tamanhoSlideArtist = 8;
        this.artistaSelecionado = artis;

        this.nomeArtistaEmIdChatThread = this.TransformaNomeEmIdChatThread(
          artis.name
        );

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
<style lang="scss" scoped>
@import "css/ListaMusicas.scss";
</style>
