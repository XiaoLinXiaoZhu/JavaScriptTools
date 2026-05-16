export {};

import type { Message } from './types';
import { BUTTON_CSS, SCROLL_CONFIG, buildMarkdown } from './config';

// ─── 注入样式 ────────────────────────────────
const style = document.createElement('style');
style.textContent = BUTTON_CSS;
document.head.appendChild(style);

// ─── Toast 提示 ────────────────────────────────
function toast(msg: string, warn = false) {
  const el = document.createElement('div');
  el.className = 'dse-toast' + (warn ? ' dse-toast--warn' : '');
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2500);
}

// ─── 消息提取 ────────────────────────────────
function extractMessage(el: Element): Message | null {
  const hasMarkdown = el.querySelector('.ds-markdown');
  if (hasMarkdown) {
    // AI 消息
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
    // 用户消息：文本在 ds-message 下的第一个 div
    const msgDiv = el.querySelector('.ds-message');
    const textDiv = msgDiv?.querySelector('div');
    const text = textDiv?.textContent?.trim() ?? '';
    return text ? { type: 'user', text } : null;
  }
}

/** 收集当前页面上所有可见的消息（去重，按 key 排序） */
function collectMessages(): Message[] {
  const items = document.querySelectorAll('[data-virtual-list-item-key]');
  const seen = new Set<string>();
  const messages: Message[] = [];
  for (const el of items) {
    const key = el.getAttribute('data-virtual-list-item-key')!;
    if (seen.has(key)) continue;
    seen.add(key);
    const msg = extractMessage(el);
    if (msg) messages.push(msg);
  }
  return messages;
}

// ─── 滚动收集 ────────────────────────────────
function findScrollContainer(): HTMLElement | null {
  const vList = document.querySelector('.ds-virtual-list');
  if (!vList) return null;

  // 检查虚拟列表自身是否可滚动
  const vStyle = window.getComputedStyle(vList);
  if (vStyle.overflowY === 'auto' || vStyle.overflowY === 'scroll') {
    return vList as HTMLElement;
  }

  // 否则向上查找第一个可滚动的祖先
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

async function scrollCollectAll(): Promise<Message[]> {
  const container = findScrollContainer();
  if (!container) {
    toast('未找到滚动容器，将仅导出当前可见消息', true);
    return collectMessages();
  }

  // ── 打印模式：所有消息已渲染，快速扫一遍 ──
  const vList = document.querySelector('.ds-virtual-list');
  if (vList?.classList.contains('ds-virtual-list--printable')) {
    toast('检测到打印模式，快速收集…');
    // 先滚到顶部，再滚到底部，确保所有懒加载内容已触发
    container.scrollTop = 0;
    await sleep(SCROLL_CONFIG.scrollDelay / 2);
    container.scrollTop = container.scrollHeight;
    await sleep(SCROLL_CONFIG.scrollDelay / 2);
    return collectMessages();
  }

  // ── 正常模式：分阶段滚动加载 ──
  let prevCount = 0;
  let emptyStreak = 0;

  // 阶段 1：滚动到顶部，加载所有历史消息
  for (let i = 0; i < SCROLL_CONFIG.maxScrolls; i++) {
    container.scrollTop = 0;
    await sleep(SCROLL_CONFIG.scrollDelay);

    const msgs = collectMessages();
    if (msgs.length > prevCount) {
      prevCount = msgs.length;
      emptyStreak = 0;
    } else {
      emptyStreak++;
      if (emptyStreak >= SCROLL_CONFIG.retryOnEmpty + 1) break;
    }
  }

  // 阶段 2：逐步向下滚动，确保所有消息都被渲染
  emptyStreak = 0;
  for (let i = 0; i < SCROLL_CONFIG.maxScrolls; i++) {
    container.scrollTop += container.clientHeight * 0.7;
    await sleep(SCROLL_CONFIG.scrollDelay);

    const msgs = collectMessages();
    if (msgs.length > prevCount) {
      prevCount = msgs.length;
      emptyStreak = 0;
    } else {
      emptyStreak++;
      // 同时检查是否已经滚到底部
      const atBottom =
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - 10;
      if (atBottom && emptyStreak >= SCROLL_CONFIG.retryOnEmpty) break;
    }
  }

  return collectMessages();
}

// ─── 下载 ────────────────────────────────────
function downloadMarkdown(md: string, filename: string) {
  const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ─── 导出按钮 ────────────────────────────────
function createExportButton() {
  const btn = document.createElement('button');
  btn.className = 'dse-btn';
  btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1a.5.5 0 0 1 .5.5v8.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 1 1 .708-.708L7.5 10.293V1.5A.5.5 0 0 1 8 1zM2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" fill="currentColor"/></svg>导出`;
  btn.title = '导出完整对话记录 (Markdown)';

  btn.addEventListener('click', async () => {
    btn.classList.add('dse-btn--loading');
    btn.textContent = '收集消息中…';
    toast('正在滚动收集全部对话消息…');

    const messages = await scrollCollectAll();

    if (messages.length === 0) {
      toast('未找到任何消息', true);
      btn.classList.remove('dse-btn--loading');
      btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1a.5.5 0 0 1 .5.5v8.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 1 1 .708-.708L7.5 10.293V1.5A.5.5 0 0 1 8 1zM2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" fill="currentColor"/></svg>导出`;
      return;
    }

    const title = document.title.replace(/ - DeepSeek$/, '') || 'DeepSeek Chat';
    const md = buildMarkdown(messages, title);
    downloadMarkdown(md, `${title}.md`);

    toast(`已导出 ${messages.length} 条消息`);
    btn.classList.remove('dse-btn--loading');
    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1a.5.5 0 0 1 .5.5v8.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 1 1 .708-.708L7.5 10.293V1.5A.5.5 0 0 1 8 1zM2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" fill="currentColor"/></svg>导出`;
  });

  document.body.appendChild(btn);
}

// ─── 入口 ─────────────────────────────────────
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createExportButton);
} else {
  createExportButton();
}
