/// <reference types="vitest" />
/// <reference types="Vite/client" />

import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // Puedes agregar opciones específicas de Sass aquí si lo necesitas
        // silenceDeprecations: ['legacy-js-api'],
      },
    },
  },
  // experimental: {
  //   sassApi: 'modern', // o 'modern-compiler'
  // },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTest.ts'],
  },
  resolve: {
    alias: {
      '@hooks': path.resolve(__dirname, 'src/hooks'),
    },
  },
})
