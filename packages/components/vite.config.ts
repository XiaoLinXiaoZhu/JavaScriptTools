import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';

// Custom plugin to handle @xlxz/styles CSS imports as raw strings
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

export default defineConfig({
  plugins: [vue(), stylesRawPlugin()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index',
    },
    outDir: 'dist',
    emptyDirBeforeWrite: true,
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
