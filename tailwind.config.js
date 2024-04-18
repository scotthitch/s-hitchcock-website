/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts}'],
    future: {
        hoverOnlyWhenSupported: true
    },
    theme: {
        extend: {
            colors: {
                // 'cv-blue': '#0F365B',
                // 'col-primary': '#181818',
                // 'col-secondary': "#F0F0F0",
                // 'col-tertiary': "#D9D9D9",
                'col-dark': '#181818',
                'col-light': '#F5F5F5',
                'col-mid': '#717171',
                'col-primary': '#0F365B',
                'col-secondary': '#BB0A21'
            },
            screens: {
                xs: '400px'
            }
        }
    },
    plugins: []
}
