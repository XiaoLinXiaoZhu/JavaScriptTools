import { defineConfig } from '../shared/define';

export default defineConfig({
  meta: {
    name: '动画疯自动同意年龄确认，移除广告跳转，广告静音，自动点击跳过广告',
    namespace: 'http://tampermonkey.net/',
    version: '2.0',
    license: 'MIT',
    description:
      '能够动画疯自动同意年龄确认，移除广告跳转，广告静音，自动点击跳过广告……安装即可，自动执行',
    author: 'XLXZ',
    match: 'https://ani.gamer.com.tw/animeVideo.php?sn=*',
    icon: 'https://www.google.com/s2/favicons?sz=64&domain=gamer.com.tw',
    grant: 'none',
  },
  category: 'entertainment',
});
