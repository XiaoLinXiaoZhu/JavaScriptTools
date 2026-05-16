import { defineConfig } from '../shared/define';

export default defineConfig({
  meta: {
    name: 'DeepSeek Chat Export',
    namespace: 'https://github.com/XiaoLinXiaoZhu/JavaScriptTools',
    version: '0.1.0',
    description: '导出 DeepSeek 聊天记录为 Markdown，自动滚动收集完整对话（含深度思考）',
    author: 'XLXZ',
    match: 'https://chat.deepseek.com/*',
    grant: 'none',
    license: 'MIT',
  },
  category: 'tools',
});
