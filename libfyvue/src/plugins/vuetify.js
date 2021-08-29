import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark:true,
        theme:{disable:true},
        themes: {
          light: {//dont work
            primary: colors.red.lighten4, // #E53935
            secondary: colors.red.lighten4, // #FFCDD2
            accent: colors.indigo.base, // #3F51B5
          },
          dark:{
            background: colors.red.lighten4,
            primary: colors.red.lighten4, // #E53935
            secondary: colors.red.lighten4, // #FFCDD2
            accent: colors.indigo.base,
          }
        },
      },
});
