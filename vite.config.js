import { defineConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import eslint from 'vite-plugin-eslint'
import path from 'node:path'
import viteCompression from 'vite-plugin-compression'

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
    }),
    viteCompression({
      verbose: true,
      disable: false, // 不禁⽤压缩
      deleteOriginFile: false, // 压缩后是否删除原⽂件
      threshold: 10240, // 压缩前最⼩⽂件⼤⼩
      algorithm: 'gzip', // 压缩算法
      ext: '.gz', // ⽂件类型
    }),

  ],
  resolve: {
    alias: { '@': resolve('src') }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/style/_variables.scss";@import "@/style/mixin.scss";`,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          'echarts': ['echarts'],
          'lodash': ['lodash'],
        },
      },
    },
    terserOptions: {
      compress: {
        // warnings: false,
        drop_console: true, // 打包时删除console
        drop_debugger: true, // 打包时删除 debugger
        pure_funcs: ['console.log'],
      },
      output: {
        // 去掉注释内容
        comments: true,
      },
    },
  }
})
