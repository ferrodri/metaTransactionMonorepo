//eslint-disable-next-line @typescript-eslint/no-var-requires
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/pages/**/*.{jsx,tsx}', './src/components/**/*.{jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                black: '#121212',
            },
            fontFamily: {
                primary: ['var(--font-primary)', ...fontFamily.sans],
                secondary: ['var(--font-secondary)', ...fontFamily.sans],
            },
            height: {
                navbar: '72px',
            },
        },
    },
    plugins: [],
};
