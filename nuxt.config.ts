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
    router: {
        options: {
            scrollBehaviorType: 'smooth'
        }
    },
    devtools: {
        enabled: true,

        timeline: {
            enabled: true
        }
    },
    modules: ['@nuxtjs/tailwindcss', '@nuxt/image', '@pinia/nuxt'],
    css: ['~/assets/css/main.css']
});
