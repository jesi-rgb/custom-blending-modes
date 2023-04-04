/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Manrope'],
				mono: ['JetBrains Mono']
			}
		}
	},
	plugins: []
};
