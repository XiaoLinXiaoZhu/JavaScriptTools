import { defineConfig } from '../shared/define';

export default defineConfig({
  meta: {
    name: 'Fufugal 评分过滤',
    namespace: 'https://github.com/XiaoLinXiaoZhu/JavaScriptTools',
    version: '0.3.0',
    description: '为 fufugal.com（我的Galgame资源发布站）按评分阈值过滤卡片，可在浮动面板中开关与调节阈值',
    author: 'XLXZ',
    match: 'https://fufugal.com/*',
    grant: 'none',
    license: 'MIT',
    'run-at': 'document-idle',
  },
  category: 'tools',
});
