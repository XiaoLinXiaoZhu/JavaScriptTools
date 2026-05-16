import { defineConfig } from '../shared/define';

export default defineConfig({
  meta: {
    name: 'AutoTool_Download',
    namespace: 'https://github.com/XiaoLinXiaoZhu/JavaScriptTools',
    version: '0.4.1',
    description:
      "XLXZ's 自动下载 小工具，本质上是匹配特殊内容并且模拟点击",
    author: 'XLXZ',
    match: ['https://www.sunwenjie.top/article/*', '*://*/*'],
    grant: 'none',
    license: 'MIT',

  },
  category: 'tools',
});
