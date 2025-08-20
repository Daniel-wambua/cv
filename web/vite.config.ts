import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
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
