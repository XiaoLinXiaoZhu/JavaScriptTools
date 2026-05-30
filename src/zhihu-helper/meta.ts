import { defineConfig } from '../shared/define';

export default defineConfig({
  meta: {
    name: {
      '': '知乎问题时间显示',
      'zh-CN': '知乎问题时间显示',
      en: 'Zhihu Answer Timestamp',
    },
    namespace: 'https://github.com/XiaoLinXiaoZhu/JavaScriptTools',
    version: '0.1.0',
    description: {
      '': '在知乎问题下的每个回答中显示创建时间和最后编辑时间。',
      en: 'Display creation and last-edit timestamps on Zhihu answer cards.',
    },
    author: 'XLXZ',
    match: ['*://www.zhihu.com/question/*'],
    grant: [],
    license: 'MIT',
    icon: 'https://www.google.com/s2/favicons?domain=zhihu.com',
  },
  category: 'social',
  greasyforkId: undefined,
});
