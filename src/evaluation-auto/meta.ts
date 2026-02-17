import { defineConfig } from '../shared/define';

export default defineConfig({
  meta: {
    name: '评价表自动选择工具',
    namespace: 'http://tampermonkey.net/',
    version: '1.0',
    description: '自动选择"很好"、"强烈推荐"、"最满意课堂"',
    author: 'XLXZ',
    match: '*://*/*',
    grant: 'none',
  },
  category: 'campus',
});
