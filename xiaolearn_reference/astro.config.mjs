import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://xiaolearn.com',
  output: 'static',
  adapter: cloudflare(),
  integrations: [react()],
});
