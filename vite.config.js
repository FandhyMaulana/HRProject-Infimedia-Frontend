import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    allowedHosts: true,
    proxy: {
      // url backend
      '/api': {
        target: 'https://localhost:7232',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
