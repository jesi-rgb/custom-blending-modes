/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Supreme'],
				serif: ['Zodiak'],
				mono: ['IBM Plex Mono']
			}
		}
	},
	plugins: []
};
