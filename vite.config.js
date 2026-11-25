import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        dashboard: resolve(__dirname, 'dashboard.html'),
        login: resolve(__dirname, 'login.html'),
        register: resolve(__dirname, 'register.html'),
        about: resolve(__dirname, 'about.html'),
        contact: resolve(__dirname, 'contact.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        terms: resolve(__dirname, 'terms.html'),
        '404': resolve(__dirname, '404.html'),
        tictactoe: resolve(__dirname, 'tictactoe.html'),
        chess: resolve(__dirname, 'chess.html'),
        snake: resolve(__dirname, 'snake.html'),
        '2048': resolve(__dirname, '2048.html'),
        pong: resolve(__dirname, 'pong.html'),
        memory: resolve(__dirname, 'memory.html'),
        flappy: resolve(__dirname, 'flappy.html'),
        dino: resolve(__dirname, 'dino.html'),
        wordle: resolve(__dirname, 'wordle.html'),
        sudoku: resolve(__dirname, 'sudoku.html')
      },
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'motion-vendor': ['framer-motion'],
          'auth0-vendor': ['@auth0/auth0-react']
        }
      }
    }
  }
});
