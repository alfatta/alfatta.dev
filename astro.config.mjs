// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://alfatta.dev',
	trailingSlash: 'always',
	integrations: [mdx(), sitemap()],
	markdown: {
		// Code tokens read from the palette so both themes stay in system.
		shikiConfig: { theme: 'css-variables' },
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
