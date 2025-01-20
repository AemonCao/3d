import path from 'node:path'
import { defineConfig } from 'vite'
import gltf from 'vite-plugin-gltf'

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    gltf(),
  ],
})
