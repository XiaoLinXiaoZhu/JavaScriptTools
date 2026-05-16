import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';

// Custom plugin to handle styles CSS imports as raw strings
function stylesRawPlugin() {
  return {
    name: 'xlxz-styles-raw',
    resolveId(id: string) {
      if (id.startsWith('@xlxz/styles/') && id.endsWith('.css')) {
        return resolve(__dirname, '../styles', id.replace('@xlxz/styles/', ''));
      }
    },
    load(id: string) {
      if (id.endsWith('.css') && id.includes('packages/styles')) {
        const content = readFileSync(id, 'utf-8');
        return `export default ${JSON.stringify(content)};`;
      }
    },
  };
}

// 入口点定义：每个组件独立打包
const entries = {
  index: resolve(__dirname, 'src/index.ts'),
  toast: resolve(__dirname, 'src/toast/index.ts'),
  'config-panel': resolve(__dirname, 'src/config-panel/index.ts'),
  'floating-panel': resolve(__dirname, 'src/floating-panel/index.ts'),
  'animated-slider': resolve(__dirname, 'src/animated-slider/index.ts'),
};

// 如果指定了 BUILD_ENTRY 环境变量，则使用单入口模式（产物无共享 chunk）
const buildEntry = process.env.BUILD_ENTRY?.trim();
const libConfig = buildEntry
  ? {
      entry: resolve(__dirname, `src/${buildEntry}/index.ts`),
      formats: ['es'] as const,
    }
  : {
      entry: entries,
      formats: ['es'] as const,
    };

export default defineConfig({
  plugins: [vue(), stylesRawPlugin()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    __VUE_OPTIONS_API__: 'false',
    __VUE_PROD_DEVTOOLS__: 'false',
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
  },
  build: {
    lib: libConfig,
    outDir: 'dist',
    emptyDirBeforeWrite: true,
    rollupOptions: {
      output: {
        entryFileNames: buildEntry ? `${buildEntry}.js` : '[name].js',
      },
    },
  },
});
