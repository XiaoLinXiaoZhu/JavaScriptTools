import { defineConfig } from '../shared/define';

export default defineConfig({
  meta: {
    name: {
      '': '屏蔽B站营销视频和推广视频',
      'zh-CN': '屏蔽B站营销视频和推广视频',
      'zh-TW': '屏蔽B站营销视频和推广视频',
      en: "Block Bilibili's marketing videos and promotional videos",
    },
    namespace: 'http://tampermonkey.net/',
    version: '2.8',
    description: {
      '': '屏蔽部分B站（bilibili）主页推荐的视频卡片，屏蔽up主粉丝少于一定数量的，屏蔽直播与右侧推广，屏蔽带广告标签的',
      'zh-CN':
        '屏蔽部分B站（bilibili）主页推荐的视频卡片，屏蔽up主粉丝少于一定数量的，屏蔽直播与右侧推广，屏蔽带广告标签的',
      'zh-TW':
        '遮罩部分B站（bilibili）主頁推薦的視頻卡片，遮罩up主粉絲少於一定數量的，遮罩直播與右側推廣，遮罩帶廣告標籤的',
      en: 'Block some video cards recommended on the homepage of Bilibili. The rules are to block those from creators with a certain number of small fans, block live streams and right-hand promotion, and block those with advertising tags.',
    },
    author: 'anonymous',
    match: [
      'https://www.bilibili.com/',
      'https://www.bilibili.com/?spm_id_from=*',
    ],
    icon: 'https://www.bilibili.com/favicon.ico',
    grant: 'none',
    license: 'GNU General Public License v3.0',
    downloadURL:
      'https://update.greasyfork.org/scripts/467384/%F0%9F%9B%A0%EF%B8%8F%E5%B1%8F%E8%94%BDB%E7%AB%99%E8%90%A5%E9%94%80%E8%A7%86%E9%A2%91.user.js',
    updateURL:
      'https://update.greasyfork.org/scripts/467384/%F0%9F%9B%A0%EF%B8%8F%E5%B1%8F%E8%94%BDB%E7%AB%99%E8%90%A5%E9%94%80%E8%A7%86%E9%A2%91.meta.js',
  },
  category: 'bilibili',
  greasyforkId: 467384,
});
