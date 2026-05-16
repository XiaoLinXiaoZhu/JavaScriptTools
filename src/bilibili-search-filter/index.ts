import style from './style.css';
import { showToast } from '@xlxz/components/toast';
import { createAnimatedSlider } from '@xlxz/components/animated-slider';

// --- 样式注入 ---
GM_addStyle(style);

// --- 配置与默认值 ---
const CONFIG = {
  playWeight: GM_getValue('playWeight', 50),
  fansWeight: GM_getValue('fansWeight', 50),
  threshold: GM_getValue('threshold', 30),
  blurIntensity: GM_getValue('blurIntensity', 10),
  cacheTTL: 24 * 60 * 60 * 1000, // 24小时缓存
};

const FANS_CACHE: Record<string, { count: number; ts: number }> = JSON.parse(
  GM_getValue('fansCache', '{}')
);

// --- 核心逻辑 ---

/** 格式化数字（处理"万"、"亿"） */
function parseBiliNum(str: string | null | undefined): number {
  if (!str) return 0;
  str = str.trim();
  if (str.includes('万')) return parseFloat(str) * 10000;
  if (str.includes('亿')) return parseFloat(str) * 100000000;
  return parseInt(str.replace(/,/g, '')) || 0;
}

/** 获取粉丝数（带缓存） */
async function getFansCount(mid: string): Promise<number> {
  const now = Date.now();
  if (FANS_CACHE[mid] && now - FANS_CACHE[mid].ts < CONFIG.cacheTTL) {
    return FANS_CACHE[mid].count;
  }

  return new Promise((resolve) => {
    GM_xmlhttpRequest({
      method: 'GET',
      url: `https://api.bilibili.com/x/web-interface/card?mid=${mid}`,
      onload(res) {
        try {
          const data = JSON.parse(res.responseText);
          const fans = data.data.card.fans;
          FANS_CACHE[mid] = { count: fans, ts: now };
          GM_setValue('fansCache', JSON.stringify(FANS_CACHE));
          resolve(fans);
        } catch {
          resolve(0);
        }
      },
      onerror: () => resolve(0),
    });
  });
}

/** 评分算法：对数归一化 */
function calculateScore(plays: number, fans: number): number {
  // 使用 log10 减缓极值影响，以100万为满分基准
  const playScore = Math.min(100, (Math.log10(plays + 1) / 6) * 100);
  const fansScore = Math.min(100, (Math.log10(fans + 1) / 6) * 100);
  return playScore * (CONFIG.playWeight / 100) + fansScore * (CONFIG.fansWeight / 100);
}

/** 处理单个视频卡片 */
async function processCard(card: HTMLElement): Promise<void> {
  if (card.dataset.qfProcessed) return;
  card.dataset.qfProcessed = 'true';

  // 提取播放量
  const statsText = card.querySelector('.bili-video-card__stats--item span')?.textContent;
  const plays = parseBiliNum(statsText);

  // 提取 MID
  const midLink = card.querySelector('a[href*="space.bilibili.com/"]') as HTMLAnchorElement | null;
  const midMatch = midLink?.href.match(/space\.bilibili\.com\/(\d+)/);
  const mid = midMatch ? midMatch[1] : null;

  if (!mid) return;

  const fans = await getFansCount(mid);
  const score = calculateScore(plays, fans);

  if (score < CONFIG.threshold) {
    card.classList.add('qf-low-quality');
  }
}

// --- 监听 DOM 变化 ---
const cardObserver = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType !== 1) return;
      const el = node as HTMLElement;
      const cards = el.classList.contains('bili-video-card')
        ? [el]
        : Array.from(el.querySelectorAll<HTMLElement>('.bili-video-card'));
      cards.forEach(processCard);
    });
  }
});

// --- UI 设置面板 ---
function createSettings(): HTMLElement {
  const container = document.createElement('div');
  container.className = 'qf-search-condition-row';
  container.id = 'qf-settings-row';

  const label = document.createElement('span');
  label.className = 'qf-condition-label';
  label.textContent = '质量过滤';
  container.appendChild(label);

  const controls = document.createElement('div');
  controls.className = 'qf-condition-controls';
  container.appendChild(controls);

  // 使用 AnimatedSlider 组件
  const pwSlider = createAnimatedSlider({
    label: '播放权重',
    min: 0,
    max: 100,
    value: CONFIG.playWeight,
    suffix: '%',
  });
  controls.appendChild(pwSlider.getElement());

  const fwSlider = createAnimatedSlider({
    label: '粉丝权重',
    min: 0,
    max: 100,
    value: CONFIG.fansWeight,
    suffix: '%',
  });
  controls.appendChild(fwSlider.getElement());

  const thSlider = createAnimatedSlider({
    label: '阈值',
    min: 0,
    max: 100,
    value: CONFIG.threshold,
  });
  controls.appendChild(thSlider.getElement());

  const saveBtn = document.createElement('button');
  saveBtn.className = 'qf-save-btn';
  saveBtn.textContent = '保存';
  saveBtn.onclick = () => {
    GM_setValue('playWeight', pwSlider.getValue());
    GM_setValue('fansWeight', fwSlider.getValue());
    GM_setValue('threshold', thSlider.getValue());
    showToast('设置已保存，刷新后生效', { type: 'success' });
    setTimeout(() => location.reload(), 1000);
  };
  controls.appendChild(saveBtn);

  return container;
}

/** 寻找并插入设置行到 .more-conditions 容器 */
function insertSettingsIntoMoreConditions(): void {
  const moreConditionsContainer = document.querySelector('.more-conditions');
  if (!moreConditionsContainer) return;
  if (document.getElementById('qf-settings-row')) return;

  const settingsRow = createSettings();
  moreConditionsContainer.appendChild(settingsRow);
}

/** 监听 .more-conditions 容器的出现 */
function observeMoreConditions(): void {
  const settingsObserver = new MutationObserver(() => {
    insertSettingsIntoMoreConditions();
  });

  settingsObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });

  insertSettingsIntoMoreConditions();
}

// --- 初始化 ---
function init(): void {
  observeMoreConditions();
  document.querySelectorAll<HTMLElement>('.bili-video-card').forEach(processCard);
  cardObserver.observe(document.body, { childList: true, subtree: true });
}

if (document.readyState === 'complete') init();
else window.addEventListener('load', init);
