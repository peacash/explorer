const colors = require('tailwindcss/colors')
module.exports = {
	mode: 'jit',
	purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	darkMode: 'class',
	plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')]
}