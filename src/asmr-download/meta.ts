import { defineConfig } from '../shared/define';

export default defineConfig({
  meta: {
    name: 'AutoTool',
    namespace: 'https://github.com/XiaoLinXiaoZhu/AutoTool',
    version: '0.1',
    description: "XLXZ'a AutoTool",
    author: 'XLXZ',
    match: ['https://www.asmrgay.com/*', 'https://cczhhz.asmr.icu/*'],
    grant: 'none',
    license: 'MIT',
  },
  category: 'tools',
});
