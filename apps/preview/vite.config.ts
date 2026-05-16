import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  resolve: {
    alias: {
      // 模拟 src/ 下脚本的导入路径
      '@xlxz/components': resolve(__dirname, '../../packages/components/dist/index.js'),
    },
  },
});
