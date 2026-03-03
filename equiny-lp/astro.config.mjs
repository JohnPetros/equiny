import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    }
  },
  server: {
    port: 3000,
    host: '0.0.0.0'
  }
});
