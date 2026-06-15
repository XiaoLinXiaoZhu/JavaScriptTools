import { defineConfig } from '../shared/define';

export default defineConfig({
  meta: {
    name: 'Danbooru Tag Copy',
    namespace: 'https://github.com/XiaoLinXiaoZhu/JavaScriptTools',
    version: '0.1',
    description: '一键复制 Danbooru 标签，按 meta / rating / character+copyright / @artist / general 分类输出',
    author: 'XLXZ',
    license: 'MIT',
    match: 'https://danbooru.donmai.us/posts/*',
    grant: 'none',
    'run-at': 'document-idle',
  },
  category: 'tools',
});
