import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind({
    applyBaseStyles: false,
  }), react(), sitemap()],
  site: 'https://kmkkiii.github.io',
  base: '/til',
  image: {
    // Used for all `<Image />` and `<Picture />` components unless overridden
    experimentalLayout: 'constrained',
  },
  experimental: {
    responsiveImages: true,
    svg: true,
  },
});
