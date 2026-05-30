import { defineConfig } from '../shared/define';

export default defineConfig({
  meta: {
    name: {
      '': '搜索引擎快捷跳转',
      'zh-CN': '搜索引擎快捷跳转',
      en: 'Search Engine Quick Switch',
    },
    namespace: 'https://github.com/XiaoLinXiaoZhu/JavaScriptTools',
    version: '0.1.0',
    description: {
      '': '在百度、Google、搜狗、360、Bing 等搜索引擎页面添加浮动按钮，一键将当前搜索词切换到其他搜索引擎。',
      en: 'Add a floating button on search engine pages to switch the current query to another search engine with one click.',
    },
    author: 'XLXZ',
    match: [
      '*://www.baidu.com/*',
      '*://www.google.com/search*',
      '*://www.sogou.com/web*',
      '*://www.so.com/s*',
      '*://cn.bing.com/search*',
      '*://www.bing.com/search*',
    ],
    grant: ['GM_getValue', 'GM_setValue', 'GM_registerMenuCommand', 'GM_addStyle'],
    license: 'MIT',
    icon: 'https://www.google.com/s2/favicons?domain=google.com',
  },
  category: 'search',
  greasyforkId: undefined,
});
