export {};

import NumberFlow, { styles as numberFlowStyles } from 'number-flow';
import { showToast } from '@xlxz/components/toast';
import { createFloatingPanel } from '@xlxz/components/floating-panel';
import type { Message } from './types';
import { buildMarkdown, SCROLL_CONFIG } from './config';

// ─── 注入 number-flow 样式 ───────────────────
const nfStyle = document.createElement('style');
nfStyle.textContent = numberFlowStyles.join('\n');
document.head.appendChild(nfStyle);

// ─── 消息提取 ────────────────────────────────
function extractMessage(el: Element): Message | null {
  const hasMarkdown = el.querySelector('.ds-markdown');
  if (hasMarkdown) {
    const thinkBlock = el.querySelector('.ds-think-content');
    let think: string | undefined;
    if (thinkBlock) {
      const thinkMd = thinkBlock.querySelector('.ds-markdown');
      think = thinkMd?.textContent?.trim();
    }
    const respMd =
      el.querySelector('.ds-markdown.ds-assistant-message-main-content') ??
      el.querySelector('.ds-markdown');
    const text = respMd?.textContent?.trim() ?? '';
    return { type: 'ai', text, think };
  } else {
    const msgDiv = el.querySelector('.ds-message');
    const textDiv = msgDiv?.querySelector('div');
    const text = textDiv?.textContent?.trim() ?? '';
    return text ? { type: 'user', text } : null;
  }
}

function collectMessages(): Map<string, Message> {
  const items = document.querySelectorAll('[data-virtual-list-item-key]');
  const map = new Map<string, Message>();
  for (const el of items) {
    const key = el.getAttribute('data-virtual-list-item-key')!;
    if (map.has(key)) continue;
    const msg = extractMessage(el);
    if (msg) map.set(key, msg);
  }
  return map;
}

// ─── 滚动容器 ────────────────────────────────
function findScrollContainer(): HTMLElement | null {
  const vList = document.querySelector('.ds-virtual-list');
  if (!vList) return null;
  const vStyle = window.getComputedStyle(vList);
  if (vStyle.overflowY === 'auto' || vStyle.overflowY === 'scroll') {
    return vList as HTMLElement;
  }
  let el: HTMLElement | null = vList.parentElement;
  while (el) {
    const style = window.getComputedStyle(el);
    if (style.overflowY === 'auto' || style.overflowY === 'scroll') return el;
    el = el.parentElement;
  }
  return null;
}

function sleep(ms: number): Promise<void> {
  return new Promise(r => setTimeout(r, ms));
}

// ─── 下载 ────────────────────────────────────
function downloadFile(content: string, filename: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ─── 面板内容构建 ────────────────────────────
let panel: ReturnType<typeof createFloatingPanel> | null = null;
let scrollNF: InstanceType<typeof NumberFlow> | null = null;
let countNF: InstanceType<typeof NumberFlow> | null = null;

function buildPanelHTML(): string {
  return `
<div style="display:flex;flex-direction:column;gap:12px;align-items:center;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
  <div class="dse-dashboard">
    <div class="dse-dashboard__item">
      <div class="dse-dashboard__label">滚动进度</div>
      <number-flow id="dse-nf-scroll" class="dse-dashboard__value">0</number-flow><span id="dse-scroll-max" class="dse-dashboard__unit">/ 0</span>
    </div>
    <div class="dse-dashboard__item">
      <div class="dse-dashboard__label">已收集</div>
      <number-flow id="dse-nf-count" class="dse-dashboard__value">0</number-flow><span class="dse-dashboard__unit">条</span>
    </div>
  </div>
  <div style="display:flex;gap:8px;width:100%">
    <button id="dse-btn-md" class="dse-panel-btn dse-panel-btn--primary" style="flex:1">导出 Markdown</button>
    <button id="dse-btn-json" class="dse-panel-btn" style="flex:1">导出 JSON</button>
  </div>
</div>`;
}

const PANEL_CSS = `
.dse-panel-btn {
  padding: 8px 16px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  background: #fff;
  color: #333;
  font-size: 13px;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.15s;
}
.dse-panel-btn:hover { border-color: #4d6bfe; color: #4d6bfe; }
.dse-panel-btn--primary {
  background: #4d6bfe;
  border-color: #4d6bfe;
  color: #fff;
}
.dse-panel-btn--primary:hover { background: #3d5be5; color: #fff; }
.dse-panel-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.dse-dashboard {
  display: flex;
  gap: 24px;
  width: 100%;
  justify-content: center;
}
.dse-dashboard__item {
  text-align: center;
}
.dse-dashboard__label {
  font-size: 11px;
  color: #999;
  margin-bottom: 4px;
}
.dse-dashboard__value {
  font-size: 18px;
  font-weight: 600;
  color: #222;
  font-variant-numeric: tabular-nums;
}
.dse-dashboard__value number-flow {
  font-size: 18px;
  font-weight: 600;
  color: #222;
  font-variant-numeric: tabular-nums;
}
.dse-dashboard__unit {
  font-size: 11px;
  color: #999;
  margin-left: 2px;
}
`;

function setupPanel() {
  // 注入面板样式
  const s = document.createElement('style');
  s.textContent = PANEL_CSS;
  document.head.appendChild(s);

  panel = createFloatingPanel({
    title: 'DeepSeek 导出',
    content: buildPanelHTML(),
    width: 340,
    height: 200,
    position: { x: window.innerWidth - 360, y: window.innerHeight - 320 },
  });

  panel.show();

  // 绑定按钮事件（延迟到 DOM 挂载）
  setTimeout(() => {
    scrollNF = document.querySelector('#dse-nf-scroll') as InstanceType<typeof NumberFlow> | null;
    countNF = document.querySelector('#dse-nf-count') as InstanceType<typeof NumberFlow> | null;
    bindPanelButtons();
  }, 100);
}

function updateDashboard(scrollCur: number, scrollMax: number, msgCount: number) {
  if (!panel) return;
  if (scrollNF) scrollNF.update(scrollCur);
  if (countNF) countNF.update(msgCount);
  // Update the scroll-max label and button disabled state via DOM
  const maxLabel = document.querySelector('#dse-scroll-max');
  if (maxLabel) maxLabel.textContent = `/ ${scrollMax}`;
  const btnMd = document.querySelector('#dse-btn-md') as HTMLButtonElement | null;
  const btnJson = document.querySelector('#dse-btn-json') as HTMLButtonElement | null;
  if (btnMd) btnMd.disabled = true;
  if (btnJson) btnJson.disabled = true;
}

function bindPanelButtons() {
  const btnMd = document.querySelector('#dse-btn-md') as HTMLButtonElement | null;
  const btnJson = document.querySelector('#dse-btn-json') as HTMLButtonElement | null;

  btnMd?.addEventListener('click', () => doExport('md'));
  btnJson?.addEventListener('click', () => doExport('json'));
}

type ExportFormat = 'md' | 'json';

async function doExport(format: ExportFormat) {
  const btnMd = document.querySelector('#dse-btn-md') as HTMLButtonElement | null;
  const btnJson = document.querySelector('#dse-btn-json') as HTMLButtonElement | null;
  if (btnMd) btnMd.disabled = true;
  if (btnJson) btnJson.disabled = true;

  showToast('正在滚动收集全部对话消息…', { type: 'info', duration: 2000 });

  const messages = await scrollCollectAll();

  if (messages.length === 0) {
    showToast('未找到任何消息', { type: 'error' });
    if (btnMd) btnMd.disabled = false;
    if (btnJson) btnJson.disabled = false;
    return;
  }

  const title = document.title.replace(/ - DeepSeek$/, '') || 'DeepSeek Chat';

  if (format === 'md') {
    const md = buildMarkdown(messages, title);
    downloadFile(md, `${title}.md`, 'text/markdown;charset=utf-8');
  } else {
    const json = JSON.stringify(messages, null, 2);
    downloadFile(json, `${title}.json`, 'application/json;charset=utf-8');
  }

  showToast(`已导出 ${messages.length} 条消息`, { type: 'success' });

  if (btnMd) btnMd.disabled = false;
  if (btnJson) btnJson.disabled = false;
}

// ─── 滚动收集（带实时看板更新） ──────────────
async function scrollCollectAll(): Promise<Message[]> {
  const container = findScrollContainer();
  if (!container) {
    showToast('未找到滚动容器，将仅导出当前可见消息', { type: 'warning' });
    return [...collectMessages().values()];
  }

  const all = new Map<string, Message>();
  const maxScroll = container.scrollHeight - container.clientHeight;

  // 更新看板初始状态
  updateDashboard(0, maxScroll, 0);

  // Phase 1: 回顶加载历史
  for (let i = 0; i < SCROLL_CONFIG.maxScrolls; i++) {
    container.scrollTop = 0;
    await sleep(SCROLL_CONFIG.scrollDelay);

    const current = collectMessages();
    let newKeys = 0;
    for (const [key, msg] of current) {
      if (!all.has(key)) {
        all.set(key, msg);
        newKeys++;
      }
    }

    updateDashboard(container.scrollTop, maxScroll, all.size);

    if (newKeys === 0) break;
  }

  // Phase 2: 逐步下滚收集
  let emptyStreak = 0;

  for (let i = 0; i < SCROLL_CONFIG.maxScrolls; i++) {
    const current = collectMessages();
    let newKeys = 0;
    for (const [key, msg] of current) {
      if (!all.has(key)) {
        all.set(key, msg);
        newKeys++;
      }
    }

    updateDashboard(container.scrollTop, maxScroll, all.size);

    if (newKeys > 0) {
      emptyStreak = 0;
    } else {
      emptyStreak++;
    }

    const atBottom =
      container.scrollTop + container.clientHeight >=
      container.scrollHeight - 10;

    if (atBottom && emptyStreak >= SCROLL_CONFIG.retryOnEmpty) break;

    container.scrollTop += container.clientHeight * 0.5;
    await sleep(SCROLL_CONFIG.scrollDelay);
  }

  return [...all.values()];
}

// ─── 入口 ─────────────────────────────────────
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupPanel);
} else {
  setupPanel();
}
