// eslint-disable-next-line import/no-unresolved
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), visualizer()] as any,
  test: {
    environment: 'jsdom',
    setupFiles: path.resolve(__dirname, './vitest.setup.js')
  },
  // thay đổi port
  server: {
    port: 3000
  },
  // bật "devSourcemap" css file để biết css đó thuộc file nào, mặc định là false
  css: {
    devSourcemap: true
  },
  // cấu hình cho terminal hiểu path
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src')
    }
  }
})
