import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
    headers: {
      'Cache-Control': 'public, max-age=31536000',
      'Content-Security-Policy': "img-src 'self' data: https: http:;",
      'Permissions-Policy': 'interest-cohort=()',
    },
    fs: {
      strict: true
    },
    middleware: [
      (req, res, next) => {
        res.setHeader('Cache-Control', 'public, max-age=31536000');
        next();
      },
    ],
  },
});