// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    nitro: {
      static: true
    },
    ssr: false,
    // routeRules: {
    //     "/projects": { ssr: false },
    //     "/contact": { ssr: false },
    //   },
    devtools: {
      enabled: true,

      timeline: {
        enabled: true
      }
    },
    modules: ['@nuxtjs/tailwindcss', '@nuxt/image', '@pinia/nuxt'],
    css: ['~/assets/css/main.css']
})