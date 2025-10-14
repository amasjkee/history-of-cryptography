import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/history-of-cryptography/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
