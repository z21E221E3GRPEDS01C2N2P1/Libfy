import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    theme:{disable:true},
    themes: {
      light: {
        background:"#3D3132",
        primary: "#8257e6", // #E53935
        secondary: "#3F51B5", // #FFCDD2
        accent: colors.indigo.base, // #3F51B5
      },
      dark:{
        background: "#3D3132",
        primary: "#49347b", // #E53935
        secondary: colors.red.lighten4, // #FFCDD2
        accent: colors.indigo.base,
      }
    },
  },
});
