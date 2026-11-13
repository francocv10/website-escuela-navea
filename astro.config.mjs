// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages publica el sitio en https://fzco-var.github.io/escuela-conduccion-navea/
  site: 'https://fzco-var.github.io',
  base: '/escuela-conduccion-navea',
  vite: {
    plugins: [tailwindcss()]
  }
});