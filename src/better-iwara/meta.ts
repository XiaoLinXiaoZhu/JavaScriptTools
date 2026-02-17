import { defineConfig } from '../shared/define';

export default defineConfig({
  meta: {
    name: 'Better Iwara',
    namespace: 'none',
    version: '0.1',
    description: 'An alternate style for Iwara, made by XLXZ',
    author: 'XLXZ',
    license: 'CC BY-NC',
    match: 'https://*.iwara.tv/*',
    grant: 'none',
    'run-at': 'document-start',
  },
  category: 'entertainment',
});
