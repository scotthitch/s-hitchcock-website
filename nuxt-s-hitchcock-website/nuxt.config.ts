// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ['@nuxtjs/tailwindcss', '@nuxt/image', '@pinia/nuxt'],
    css: ['~/assets/css/main.css']
})
