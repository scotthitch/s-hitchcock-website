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
                'col-dark': 'rgb(var(--color-bg) / <alpha-value>)',
                'col-light': 'rgb(var(--color-content) / <alpha-value>)',
                'col-mid': 'rgb(var(--color-mid) / <alpha-value>)'
            },
            screens: {
                xs: '400px'
            }
        }
    },
    plugins: []
};
