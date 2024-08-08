/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './app.vue',
        './error.vue'
    ],
    future: {
        hoverOnlyWhenSupported: true
    },
    theme: {
        extend: {
            colors: {
                'col-dark': '#181818',
                'col-light': '#FFFFFF',
                'col-mid': '#717171'
            },
            screens: {
                xs: '400px'
            }
        }
    },
    plugins: []
};
