
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ArcoResolver } from 'unplugin-vue-components/resolvers';
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import ElementPlus from "unplugin-element-plus/vite"

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src')
      }
    ],
    extensions: ['.js', '.vue', '.ts', '.tsx']
  },
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', "vue-router"],
      resolvers: [ElementPlusResolver(), ArcoResolver()],
    }),
    Components({
      resolvers: [
        ElementPlusResolver(), 
        ArcoResolver({
          sideEffect: true
        })
      ],
      dirs: [
        "src/components",
        "src/layout/components",
        "src/views/**/components"
      ]
    }),
    ElementPlus({}) // 导入element-ui样式
  ],
})
