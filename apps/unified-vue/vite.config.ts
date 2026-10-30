import { fileURLToPath, URL } from 'node:url'

import { defineConfig, lazyPlugins, loadEnv } from 'vite-plus'
import { AntdvNextResolver } from '@antdv-next/auto-import-resolver'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
const env = loadEnv('development', process.cwd(), '')

export default defineConfig({
  server: {
    port: Number(env.VITE_PORT) || 5175,
    proxy: {
      '/system-api': {
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/system-api/, ''),
        target: 'http://10.1.113.253:5012/admin-api',
      },
    },
  },
  plugins: lazyPlugins(() => [
    vue(),
    tailwindcss(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
        {
          'vue-i18n': ['useI18n'],
        },
      ],
      dts: 'auto-imports.d.ts',
    }),
    Components({
      resolvers: [AntdvNextResolver()],
    }),
    createSvgIconsPlugin({
      iconDirs: [fileURLToPath(new URL('./src/assets/icons', import.meta.url))],
      symbolId: 'icon-[dir]-[name]',
    }),
    vueDevTools({
      launchEditor: 'idea',
    }),
  ]),
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
