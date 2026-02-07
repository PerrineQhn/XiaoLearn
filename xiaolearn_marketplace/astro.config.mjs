// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  output: 'static',
  site: 'https://shop.xiaolearn.com',
  build: {
    assets: 'assets'
  },
  vite: {
    css: {
      devSourcemap: true
    }
  }
});