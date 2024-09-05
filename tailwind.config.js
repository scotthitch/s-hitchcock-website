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
        hoverOnlyWhenSupported: false
    },
    theme: {
        extend: {
            colors: {
                'col-bg': 'rgb(var(--color-bg) / <alpha-value>)',
                'col-content': 'rgb(var(--color-content) / <alpha-value>)',
                'col-mid': 'rgb(var(--color-mid) / <alpha-value>)'
            },
            screens: {
                xs: '400px'
            },
            spacing: {
                header: 'calc(var(--header-height))',
                'header-buffer': 'calc(var(--header-height) * 1.05)'
            },
            keyframes: {
                'slide-left': {
                    from: { transform: 'translateX(0)' },
                    to: { transform: 'translateX(-100%)' }
                }
            },
            animation: {
                'slide-left-infinite': 'slide-left 20s linear infinite'
            }
        }
    },
    plugins: []
};
