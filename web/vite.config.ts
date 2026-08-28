import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite';

export default defineConfig({
	plugins: [
		sveltekit(),
		// Tree-shaken inline SVG icons, replacing the FontAwesome kit CDN script.
		// Usage: import Github from '~icons/fa6-brands/github';
		Icons({
			compiler: 'svelte'
		})
	],
	preview: {
		host: '0.0.0.0',
		port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
		allowedHosts: true
	},
	server: {
		host: '0.0.0.0',
		port: 5173
	}
});
