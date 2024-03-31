/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts}'],
    future: {
        hoverOnlyWhenSupported: true
    },
    theme: {
        extend: {
            colors: {
                'cv-blue': '#0F365B'
            },
            screens: {
                xs: '400px'
            }
        }
    },
    plugins: []
}
