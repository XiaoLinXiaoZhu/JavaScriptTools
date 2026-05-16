import { defineConfig } from '../shared/define';

export default defineConfig({
  meta: {
    name: 'Bilibili 视频质量筛选器',
    namespace: 'http://tampermonkey.net/',
    version: '1.1.0',
    description:
      '通过播放量和UP主粉丝量加权筛选低质量视频，并使用毛玻璃遮罩',
    author: 'XLXZ',
    match: '*://search.bilibili.com/*',
    grant: [
      'GM_xmlhttpRequest',
      'GM_setValue',
      'GM_getValue',
      'GM_addStyle',
      'GM_registerMenuCommand',
    ],
    connect: 'api.bilibili.com',
    license: 'MIT',
  },
  category: 'bilibili',
});
