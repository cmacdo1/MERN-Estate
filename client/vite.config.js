import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        /* everything starting with /api will add this prefix to the beginning */
        target: 'http://localhost:3000',
        secure: false,
      }
    }
  }
})