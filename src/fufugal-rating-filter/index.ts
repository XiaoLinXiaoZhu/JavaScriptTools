export {};

import { createFloatingPanel } from '@xlxz/components/floating-panel';
import { createAnimatedSlider } from '@xlxz/components/animated-slider';
import { loadConfig, saveConfig, clampThreshold, type FilterConfig } from './config';

// ─── 评分解析 ────────────────────────────────
//
// 卡片中评分位于「星形图标」之后的 <a>。星形图标的 SVG path 以下列特征串开头，
// 用它定位评分元素，避免误匹配品牌/评论数等其它带 <a> 的图标。
const STAR_PATH_PREFIX = 'M283.84 867.84';

const CARD_SELECTOR = 'div.upDate';

/**
 * 在卡片内找到评分文本元素。
 */
function findRatingAnchor(card: Element): HTMLAnchorElement | null {
  const paths = card.querySelectorAll('svg path[d]');
  for (const path of paths) {
    const d = path.getAttribute('d') ?? '';
    if (!d.startsWith(STAR_PATH_PREFIX)) continue;
    // 星形图标所在的 <span> 内，紧随图标的 <a> 即为评分
    const span = path.closest('span');
    const anchor = span?.querySelector('a');
    if (anchor) return anchor as HTMLAnchorElement;
  }
  return null;
}

/**
 * 解析评分。「暂无评分」/无法解析时按 0 分处理。
 */
function parseRating(text: string): number {
  const t = text.trim();
  if (!t || t.includes('暂无')) return 0;
  const m = t.match(/-?\d+(?:\.\d+)?/);
  if (!m) return 0;
  const n = Number(m[0]);
  return Number.isFinite(n) ? n : 0;
}

/**
 * 读取卡片当前评分。
 *
 * 注意：不缓存。fufugal 是 Vue SPA，列表重渲染时会复用 DOM 节点并替换其中的游戏内容，
 * 若把评分缓存在节点属性上，会读到「上一个游戏」的旧评分，导致过滤错乱
 * （表现为某些低分卡片在高阈值下反而没被隐藏）。因此每次都重新读取。
 */
function readRating(card: HTMLElement): number {
  const anchor = findRatingAnchor(card);
  return parseRating(anchor?.textContent ?? '');
}

// ─── 过滤应用 ────────────────────────────────

let config: FilterConfig = loadConfig();

function shouldHide(rating: number): boolean {
  if (!config.enabled) return false;
  return rating < config.threshold;
}

function applyToCard(card: HTMLElement): void {
  const rating = readRating(card);
  card.style.display = shouldHide(rating) ? 'none' : '';
}

function applyAll(): void {
  const cards = document.querySelectorAll<HTMLElement>(CARD_SELECTOR);
  for (const card of cards) applyToCard(card);
}

// ─── SPA 动态加载监听 ────────────────────────

let scheduled = false;
function scheduleApply(): void {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(() => {
    scheduled = false;
    applyAll();
  });
}

/** 我们自己注入的面板根节点，需排除以免 number-flow 动画触发无限重应用 */
let panelRoot: HTMLElement | null = null;

function isOwnMutation(target: Node | null): boolean {
  if (!panelRoot || !(target instanceof Node)) return false;
  return panelRoot.contains(target);
}

function observeMutations(): void {
  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.addedNodes.length === 0) continue;
      if (isOwnMutation(m.target)) continue;
      scheduleApply();
      return;
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

// ─── 快捷翻页 ────────────────────────────────
//
// 站点使用 Element Plus 分页组件：button.btn-prev / button.btn-next。
// 按 [ 上一页，] 下一页。点击对应按钮触发 Vue 翻页。
const PREV_SELECTOR = 'button.btn-prev';
const NEXT_SELECTOR = 'button.btn-next';

/** 当前焦点是否落在可输入元素上（避免拦截正常输入） */
function isTypingTarget(el: EventTarget | null): boolean {
  if (!(el instanceof HTMLElement)) return false;
  const tag = el.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable;
}

function clickPager(selector: string): void {
  const btn = document.querySelector<HTMLButtonElement>(selector);
  if (!btn || btn.disabled) return;
  btn.click();
  // 翻页后滚动到顶部，便于从头浏览
  window.scrollTo({ top: 0 });
}

function onKeydown(e: KeyboardEvent): void {
  if (e.key !== '[' && e.key !== ']') return;
  if (isTypingTarget(e.target)) return;
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  e.preventDefault();
  clickPager(e.key === '[' ? PREV_SELECTOR : NEXT_SELECTOR);
}

function setupHotkeys(): void {
  window.addEventListener('keydown', onKeydown, true);
}

// ─── 浮动面板 ────────────────────────────────

const PANEL_CSS = `
.frf-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 13px;
  color: #333;
}
.frf-label { color: #444; user-select: none; }
.frf-switch {
  position: relative;
  width: 44px;
  height: 24px;
  flex: none;
  cursor: pointer;
}
.frf-switch input { display: none; }
.frf-switch__track {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: #ccc;
  transition: background 0.2s;
}
.frf-switch__thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.3);
  transition: transform 0.2s;
}
.frf-switch input:checked + .frf-switch__track { background: #4d6bfe; }
.frf-switch input:checked + .frf-switch__track + .frf-switch__thumb {
  transform: translateX(20px);
}
.frf-slider-host { margin-top: 14px; }
.frf-slider-host.frf-disabled { opacity: 0.5; pointer-events: none; }
.frf-hint {
  margin-top: 14px;
  font-size: 12px;
  color: #999;
  line-height: 1.6;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
`;

function buildPanelHTML(): string {
  return `
<div style="display:flex;flex-direction:column;">
  <div class="frf-row">
    <span class="frf-label">启用评分过滤</span>
    <label class="frf-switch">
      <input id="frf-toggle" type="checkbox" ${config.enabled ? 'checked' : ''}>
      <span class="frf-switch__track"></span>
      <span class="frf-switch__thumb"></span>
    </label>
  </div>
  <div id="frf-slider-host" class="frf-slider-host ${config.enabled ? '' : 'frf-disabled'}"></div>
  <div class="frf-hint">低于阈值的卡片将被隐藏；「暂无评分」按 0 分处理，开启时一并隐藏。<br>快捷键：[ 上一页，] 下一页。</div>
</div>`;
}

function setupPanel(): void {
  const style = document.createElement('style');
  style.textContent = PANEL_CSS;
  document.head.appendChild(style);

  createFloatingPanel({
    title: 'Fufugal 评分过滤',
    content: buildPanelHTML(),
    width: 320,
    height: 220,
    position: { x: window.innerWidth - 340, y: 80 },
  }).show();

  // 等待面板内容挂载后再绑定控件
  setTimeout(() => {
    bindControls();
  }, 100);
}

function bindControls(): void {
  const toggle = document.querySelector<HTMLInputElement>('#frf-toggle');
  const sliderHost = document.querySelector<HTMLElement>('#frf-slider-host');
  if (!toggle || !sliderHost) return;

  // 记录面板根节点，供 MutationObserver 排除自身动画
  panelRoot = (sliderHost.closest('.xlxz-root') as HTMLElement) ?? sliderHost;

  const slider = createAnimatedSlider({
    min: 0,
    max: 10,
    step: 0.1,
    value: config.threshold,
    label: '阈值',
    onChange: (value) => {
      config = { ...config, threshold: clampThreshold(value) };
      saveConfig(config);
      applyAll();
    },
  });
  sliderHost.appendChild(slider.getElement());

  toggle.addEventListener('change', () => {
    config = { ...config, enabled: toggle.checked };
    saveConfig(config);
    sliderHost.classList.toggle('frf-disabled', !config.enabled);
    applyAll();
  });
}

// ─── 入口 ─────────────────────────────────────

function init(): void {
  setupPanel();
  applyAll();
  observeMutations();
  setupHotkeys();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
