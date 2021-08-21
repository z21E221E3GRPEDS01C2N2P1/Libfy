<template> 

<main> 
        <h1 class="titulofileira">Teste Vue firebase</h1>
    <div class="musicas">
            <section class="fileira">
               
                <div class="cardmusica">
                    <img src="https://upload.wikimedia.org/wikipedia/en/f/f5/Elvis_Presley_LPM-1254_Album_Cover.jpg"
                        alt="" class="imagemmusica">
                    <p>Elvis</p>
                    <p>Elvis</p>
                </div>
                <div class="cardmusica">
                    <img src="https://upload.wikimedia.org/wikipedia/en/f/f5/Elvis_Presley_LPM-1254_Album_Cover.jpg"
                        alt="" class="imagemmusica">
                    <p>Elvis</p>
                    <p>Elvis</p>
                </div>
            </section>

        <h1 class="titulofileira">Recentemente Tocadas</h1>
        <section class="fileira">
            <div class="cardmusica">
                <img src="https://upload.wikimedia.org/wikipedia/en/f/f5/Elvis_Presley_LPM-1254_Album_Cover.jpg"
                     alt="" class="imagemmusica">
                <p>Elvis</p>
                <p>Elvis</p>
            </div>
            <div class="cardmusica">
                <img src="https://upload.wikimedia.org/wikipedia/en/f/f5/Elvis_Presley_LPM-1254_Album_Cover.jpg"
                     alt="" class="imagemmusica">
                <p>Elvis</p>
                <p>Elvis</p>
            </div>
            <div class="cardmusica">
                <img src="https://upload.wikimedia.org/wikipedia/en/f/f5/Elvis_Presley_LPM-1254_Album_Cover.jpg"
                     alt="" class="imagemmusica">
                <p>Elvis</p>
                <p>Elvis</p>
            </div>
            <div class="cardmusica">
                <img src="https://upload.wikimedia.org/wikipedia/en/f/f5/Elvis_Presley_LPM-1254_Album_Cover.jpg"
                     alt="" class="imagemmusica">
                <p>Elvis</p>
                <p>Elvis</p>
            </div>
        </section>
    </div>
</main>

</template>

<script>
export default {
  name: 'ListaMusicas',
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped> @import 'ListaMusicas.css' </style>
