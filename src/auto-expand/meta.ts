import { defineConfig } from '../shared/define';

export default defineConfig({
  meta: {
    name: {
      '': '页面自动展开',
      'zh-CN': '页面自动展开',
      en: 'Auto Expand — Unfold hidden page content',
    },
    namespace: 'https://github.com/XiaoLinXiaoZhu/JavaScriptTools',
    version: '0.1.0',
    description: {
      '': '自动展开 CSDN 文章、百度文库、思创等网站被折叠的页面内容，移除展开提示框。',
      en: 'Auto-expand folded content on CSDN, Baidu Wenku, SiChuang and more websites.',
    },
    author: 'XLXZ',
    match: [
      '*://blog.csdn.net/*',
      '*://download.csdn.net/download/*',
      '*://wenku.csdn.net/answer/*',
      '*://wenku.baidu.com/view/*',
      '*://ispacesoft.com/*.html',
    ],
    grant: ['GM_addStyle', 'GM_getValue', 'GM_setValue', 'GM_registerMenuCommand'],
    license: 'MIT',
    icon: 'https://www.google.com/s2/favicons?domain=csdn.net',
  },
  category: 'tools',
  greasyforkId: undefined,
});
