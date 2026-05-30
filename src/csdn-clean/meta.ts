import { defineConfig } from '../shared/define';

export default defineConfig({
  meta: {
    name: {
      '': 'CSDN 页面净化',
      'zh-CN': 'CSDN 页面净化',
      en: 'CSDN Page Cleaner',
    },
    namespace: 'https://github.com/XiaoLinXiaoZhu/JavaScriptTools',
    version: '0.1.0',
    description: {
      '': '清理 CSDN 页面广告、移除复制后缀、展开被折叠的文章、优化评论区显示。',
      en: 'Remove CSDN ads, clean clipboard suffix, auto-expand articles, and optimize comment area.',
    },
    author: 'XLXZ',
    match: [
      '*://blog.csdn.net/*',
      '*://download.csdn.net/*',
      '*://wenku.csdn.net/*',
    ],
    grant: ['GM_setClipboard', 'GM_getValue', 'GM_setValue', 'GM_addStyle', 'GM_registerMenuCommand'],
    license: 'MIT',
    icon: 'https://www.google.com/s2/favicons?domain=csdn.net',
  },
  category: 'tools',
  greasyforkId: undefined,
});
