/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts}'],
    future: {
        hoverOnlyWhenSupported: true
    },
    theme: {
        extend: {
            colors: {
                'cv-blue': '#0F365B',
                'col-primary': '#181818',
                'col-secondary': "#F0F0F0",
                'col-tertiary': "#D9D9D9",
            },
            screens: {
                xs: '400px'
            }
        }
    },
    plugins: []
}
