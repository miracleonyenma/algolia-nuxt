export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'algolia-nuxt',
    meta: [{
      charset: 'utf-8'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    },
    {
      hid: 'description',
      name: 'description',
      content: ''
    }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/tailwind.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/vue-instantsearch.js',],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/tailwindcss', 'nuxt-content-algolia'],

  // this would generate the index
  nuxtContentAlgolia: {

    // Application ID
    appId: process.env.ALGOLIA_APP_ID,
    // Admin API Key
    apiKey: process.env.ALGOLIA_ADMIN_API_KEY,

    paths: [{
      name: 'articles',
      index: process.env.ALGOLIA_INDEX || 'articles',
      fields: ['title', 'description', 'bodyPlainText']
    }]
  },

  hooks: {
    'content:file:beforeInsert': (document) => {
      const removeMd = require('remove-markdown');

      if (document.extension === '.md') {
        document.bodyPlainText = removeMd(document.text);
      }
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vue-instantsearch', 'instantsearch.js/es'],
    babel: {
      plugins: [
        ['@babel/plugin-proposal-private-methods', {
          loose: true
        }],
        ['@babel/plugin-proposal-private-property-in-object', {
          loose: true
        }]
      ],
    },
  }
}

console.log(process.env.ALGOLIA_APP_ID)
