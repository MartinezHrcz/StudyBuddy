/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    darkMode: 'class',
    plugins: [
        function ({ addVariant }) {
            addVariant('hc', '.high-contrast &')
        }
    ],
}