import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
    
});

export default new Vuetify({
   theme: {
      
        primary: colors.teal.base,
        secondary: colors.blue.base,
        accent: colors.indigo.base,
        error: colors.red.base,
        warning: colors.orange.base,
        info: colors.cyan.base,
        success: colors.green.base

   }
});
