import { defineConfig } from '../shared/define';

export default defineConfig({
  meta: {
    name: '评价表自动选择工具',
    namespace: 'http://tampermonkey.net/',
    version: '1.2.0',
    description: '自动选择评分项，支持单个填充和全自动批量评价',
    author: 'XLXZ',
    match: '*://*/*',
    grant: 'none',
  },
  category: 'campus',
});
