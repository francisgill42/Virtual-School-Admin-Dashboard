import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'universal',
  head: {
    titleTemplate: '',
    title: 'Virtual School Admin Dashboard' || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  loading: { color: '#fff' },
  
  css: [],

  plugins: ['~/plugins/icons'],

  buildModules: ['@nuxtjs/vuetify'],

  modules: [ '@nuxtjs/axios', '@nuxtjs/pwa','@nuxtjs/auth' ],

 axios: {
       baseURL: 'https://sub.webndesign.website/api/'
      //  baseURL: 'http://localhost/pro/wow/public/api' 
},

auth: {


  strategies: {
    local: {
      endpoints: {
        login: { url: 'login', method: 'post',propertyName: 'token' },
        logout: false,
        user: { url: 'me', method: 'get', propertyName: 'user' }
      }
     
    }
  },
 
  redirect: {
    login: '/login',
    logout: '/login',
    callback: '/login',
    home: '/'
  }
},
router: {
  middleware: ['auth']
},
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: '#008080',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: '#008080',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
