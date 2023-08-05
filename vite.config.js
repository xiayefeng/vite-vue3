import { defineConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import eslint from 'vite-plugin-eslint'
import path from 'node:path'

function resolve (dir) {
  return path.join(__dirname, dir)
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    eslint(),
    visualizer({
      emitFile: false,
      file: "stats.html", //分析图生成的文件名
      open: true //如果存在本地服务端口，将在打包后自动展示
    })
  ],
  resolve: {
    '@': resolve('src')
  }
})
