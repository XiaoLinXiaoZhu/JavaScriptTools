export {};

// ─── 搜索引擎配置 ─────────────────────────────────────────────

interface SearchEngine {
  name: string;
  /** 搜索 URL 模板，{q} 会被替换为搜索词 */
  searchUrl: string;
  /** 图标 Emoji */
  icon: string;
}

const ENGINES: SearchEngine[] = [
  { name: '百度', searchUrl: 'https://www.baidu.com/s?wd={q}', icon: 'B' },
  { name: 'Google', searchUrl: 'https://www.google.com/search?q={q}', icon: 'G' },
  { name: '搜狗', searchUrl: 'https://www.sogou.com/web?query={q}&ie=utf8', icon: 'S' },
  { name: '360', searchUrl: 'https://www.so.com/s?q={q}', icon: '3' },
  { name: 'Bing', searchUrl: 'https://cn.bing.com/search?q={q}', icon: 'B' },
];

// ─── 当前页面搜索框选择器 ──────────────────────────────────────

const KEY_SELECTORS: Record<string, string> = {
  'www.baidu.com': '#kw',
  'www.google.com': 'input[name="q"]',
  'www.sogou.com': '#upquery',
  'www.so.com': '#input',
  'cn.bing.com': '#sb_form_q',
  'www.bing.com': '#sb_form_q',
};

// ─── 获取当前搜索词 ───────────────────────────────────────────

function getQuery(): string {
  const host = window.location.hostname;
  const selector = KEY_SELECTORS[host];

  if (selector) {
    const input = document.querySelector(selector) as HTMLInputElement | null;
    if (input?.value?.trim()) return input.value.trim();
  }

  // 回退：从 URL 提取
  const url = window.location.href;
  const patterns = ['wd', 'q', 'query', 'search', 'keyword', 'word'];
  for (const key of patterns) {
    const m = url.match(new RegExp(`[?&]${key}=([^&]+)`, 'i'));
    if (m) {
      try {
        return decodeURIComponent(m[1].replace(/\+/g, ' '));
      } catch {
        return m[1];
      }
    }
  }

  return '';
}

// ─── 界面 ─────────────────────────────────────────────────────

const PANEL_ID = 'search-helper-panel';

function injectStyles(): void {
  GM_addStyle(`
#${PANEL_ID} {
  position: fixed;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 99999;
  display: flex;
  flex-direction: column;
  gap: 6px;
  opacity: 0.35;
  transition: opacity 0.2s;
}
#${PANEL_ID}:hover {
  opacity: 1;
}
#${PANEL_ID} .sh-btn {
  width: 38px;
  height: 38px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 4px rgba(0,0,0,0.15);
  transition: transform 0.15s, box-shadow 0.15s;
}
#${PANEL_ID} .sh-btn:hover {
  transform: scale(1.12);
  box-shadow: 0 3px 10px rgba(0,0,0,0.25);
}
#${PANEL_ID} .sh-btn.sh-baidu  { background: #2932e1; }
#${PANEL_ID} .sh-btn.sh-google { background: #4285f4; }
#${PANEL_ID} .sh-btn.sh-sogou  { background: #ff6c00; }
#${PANEL_ID} .sh-btn.sh-360    { background: #3cba3c; }
#${PANEL_ID} .sh-btn.sh-bing   { background: #00809d; }
#${PANEL_ID} .sh-toggle {
  width: 38px;
  height: 22px;
  border: none;
  border-radius: 11px;
  cursor: pointer;
  font-size: 9px;
  background: #999;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12);
  opacity: 0.6;
  transition: opacity 0.15s;
}
#${PANEL_ID} .sh-toggle:hover {
  opacity: 1;
}
  `);
}

function createPanel(): HTMLElement {
  injectStyles();

  const panel = document.createElement('div');
  panel.id = PANEL_ID;

  const query = getQuery();
  if (!query) return panel;

  for (const engine of ENGINES) {
    // 跳过当前搜索引擎
    const host = window.location.hostname;
    const engineHost = new URL(engine.searchUrl.replace('{q}', 'test')).hostname;
    if (host === engineHost) continue;

    const btn = document.createElement('button');
    btn.className = `sh-btn sh-${engine.name.toLowerCase()}`;
    btn.textContent = engine.icon;
    btn.title = `在 ${engine.name} 中搜索「${query}」`;
    btn.addEventListener('click', () => {
      const url = engine.searchUrl.replace('{q}', encodeURIComponent(query));
      window.open(url, '_blank');
    });
    panel.appendChild(btn);
  }

  // 隐藏按钮
  const toggle = document.createElement('button');
  toggle.className = 'sh-toggle';
  toggle.textContent = '×';
  toggle.title = '隐藏按钮';
  toggle.addEventListener('click', () => {
    panel.style.display = 'none';
    // 点击页面任意位置重新显示
    const show = () => {
      panel.style.display = '';
      document.removeEventListener('click', show);
    };
    setTimeout(() => document.addEventListener('click', show), 100);
  });
  panel.appendChild(toggle);

  return panel;
}

// ─── 主流程 ───────────────────────────────────────────────────

function run(): void {
  const query = getQuery();
  if (!query) return;

  const panel = createPanel();
  document.body.appendChild(panel);
}

// 页面加载后执行
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', run);
} else {
  run();
}
