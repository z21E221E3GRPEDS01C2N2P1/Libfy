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
                  v-on:selecaoART="JustOpenThread"
                />
              </v-slide-group>
            </v-sheet>
          </v-col>
          <v-col cols="12" md="5">
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
              expedita, magnam molestiae assumenda itaque repellat dolores ea
              natus saepe, sapiente ipsam libero! Vero, et? Quae repellat optio
              quos facilis tempora.
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

export default {
  components: { MusicaCard, ArtistaCard },
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
      dataraw: ""
    };
  },
  methods: {
    JustOpenThread(artis) {
      if (this.artistaSelecionado.id !== artis.id) {
        this.tamanhoSlideArtist = 6;
        this.artistaSelecionado = artis;

        let fdatabase = this.$firebase
        .firestore();
        
        let dl='132'


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
          })
          
      } else {
        this.tamanhoSlideArtist = 12;
        this.artistaSelecionado = { id: 99 };
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
