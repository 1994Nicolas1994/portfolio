// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxtjs/mdc',
    '@nuxt/ui'
  ],
  runtimeConfig: {
    public: {
      strapiUrl: '' // wird automatisch aus .env gelesen
    }
  },
  image: {
    providers: {
      strapi: {
        name: 'strapi',
        provider: '~/providers/strapi'
        // baseURL wird aus runtimeConfig geladen, siehe unten
      }
    }
  },
  css: ['@/assets/css/style.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  mdc: {
    components: {
      prose: true
    }
  },
  components: {
    global: true,
    dirs: ['./components']
  },



})