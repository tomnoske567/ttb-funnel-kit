// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Your deployed URL - used to build absolute links for social share images.
  // Change this to your own domain when you deploy.
  site: 'https://ttb-funnel-kit.pages.dev',

  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  }
});