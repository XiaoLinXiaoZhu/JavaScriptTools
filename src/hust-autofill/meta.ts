import { defineConfig } from '../shared/define';

export default defineConfig({
  meta: {
    name: 'HUST华中科技大学军理线上作业自动填充助手',
    namespace: 'https://github.com/XiaoLinXiaoZhu/HUST-',
    version: '0.1',
    description: 'HUST military science online homework autofill assistant',
    author: 'XLXZ',
    match: 'http://bookcenter.hustp.com/exercises/detail/*.html',
    grant: 'none',
    license: 'MIT',
  },
  category: 'campus',
});
