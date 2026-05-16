import { defineConfig, type Plugin } from 'vite';
import { resolve, relative, basename, dirname } from 'node:path';
import { readdirSync, existsSync, readFileSync } from 'node:fs';

const PAGES_DIR = resolve(__dirname, 'pages');

/** 扫描 pages/ 下所有包含 index.html 的子目录 */
function scanPages(): { name: string; htmlPath: string }[] {
  if (!existsSync(PAGES_DIR)) return [];

  return readdirSync(PAGES_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .filter(d => existsSync(resolve(PAGES_DIR, d.name, 'index.html')))
    .map(d => ({
      name: d.name,
      htmlPath: resolve(PAGES_DIR, d.name, 'index.html'),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** 自动生成首页目录的 Vite 插件 */
function autoIndexPlugin(): Plugin {
  const VIRTUAL_INDEX = 'virtual:preview-index';

  return {
    name: 'preview-auto-index',

    configureServer(server) {
      // 在 dev server 中拦截根路径请求，返回自动生成的首页
      server.middlewares.use((req, res, next) => {
        if (req.url === '/' || req.url === '/index.html') {
          const pages = scanPages();
          const html = generateIndexHtml(pages);
          res.setHeader('Content-Type', 'text/html');
          res.end(html);
          return;
        }
        next();
      });
    },

    // build 时生成 index.html
    generateBundle() {
      const pages = scanPages();
      this.emitFile({
        type: 'asset',
        fileName: 'index.html',
        source: generateIndexHtml(pages),
      });
    },
  };
}

function generateIndexHtml(pages: { name: string; htmlPath: string }[]): string {
  const cards = pages.map(p => {
    // 从 HTML 中提取 <title> 和 subtitle 作为描述
    const html = readFileSync(p.htmlPath, 'utf-8');
    const titleMatch = html.match(/<h1>(.*?)<\/h1>/);
    const subtitleMatch = html.match(/class="subtitle"[^>]*>(.*?)<\//);
    const title = titleMatch?.[1] ?? p.name;
    const desc = subtitleMatch?.[1] ?? '';

    return `
      <a class="card" href="/pages/${p.name}/">
        <h2 class="card-title">${title}</h2>
        <p class="card-desc">${desc}</p>
      </a>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>组件预览</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      padding: 40px;
      background: #f8f8f8;
      color: #222;
      min-height: 100vh;
    }
    h1 { margin-bottom: 8px; }
    .subtitle { color: #666; margin-bottom: 32px; font-size: 14px; }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 16px;
    }
    .card {
      display: block;
      padding: 20px;
      background: #fff;
      border: 1px solid #e7e7e7;
      border-radius: 12px;
      text-decoration: none;
      color: inherit;
      transition: border-color 0.15s, box-shadow 0.15s;
    }
    .card:hover {
      border-color: #fb7299;
      box-shadow: 0 4px 16px rgba(251, 114, 153, 0.12);
    }
    .card-title {
      font-size: 16px;
      font-weight: 600;
      color: #222;
      margin-bottom: 6px;
    }
    .card:hover .card-title { color: #fb7299; }
    .card-desc {
      font-size: 13px;
      color: #999;
      line-height: 1.5;
    }
  </style>
</head>
<body>
  <h1>组件预览</h1>
  <p class="subtitle">点击卡片进入各组件的独立演示页面。新增组件只需在 pages/ 下创建文件夹即可自动出现。</p>
  <div class="grid">
    ${cards}
  </div>
</body>
</html>`;
}

export default defineConfig({
  resolve: {
    alias: {
      '@xlxz/components': resolve(__dirname, '../../packages/components/dist/index.js'),
    },
  },
  plugins: [autoIndexPlugin()],
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        scanPages().map(p => [p.name, p.htmlPath])
      ),
    },
  },
});
