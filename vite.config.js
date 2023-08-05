import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// import eslint from 'vite-plugin-eslint'
import path from 'node:path'

function resolve (dir) {
  return path.join(__dirname, dir)
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx()
  ],
  resolve: {
    '@': resolve('src')
  }
})
