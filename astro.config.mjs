import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
  ],
  site: 'https://kmkkiii.github.io',
  base: '/til',
  image: {
    // Used for all `<Image />` and `<Picture />` components unless overridden
    experimentalLayout: 'responsive',
  },
  experimental: {
    responsiveImages: true,
    svg: true,
  },
});
