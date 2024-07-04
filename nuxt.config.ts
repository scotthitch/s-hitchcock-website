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
    devtools: { enabled: true },
    modules: [
      '@nuxtjs/tailwindcss',
      '@nuxt/image',
      '@pinia/nuxt',
      "@nuxtjs/google-fonts"
    ],
    css: ['~/assets/css/main.css']
})