import { defineConfig } from '../shared/define';

export default defineConfig({
  mode: 'node',
  category: 'hexo',
  outputName: 'hexo-image-redirect',
  external: ['cheerio'],
});
