import style from './style.css';

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

  container.innerHTML = `
    <span class="qf-condition-label">质量过滤</span>
    <div class="qf-condition-controls">
      <div style="display: flex; align-items: center; gap: 4px; flex: 1;">
        <label style="font-size: 12px; color: #666;">播放权重:</label>
        <input type="range" id="qf-in-pw" class="qf-condition-input" min="0" max="100" value="${CONFIG.playWeight}" style="flex: 0.5;">
        <span id="qf-val-pw" class="qf-condition-value">${CONFIG.playWeight}%</span>
      </div>
      <div style="display: flex; align-items: center; gap: 4px; flex: 1;">
        <label style="font-size: 12px; color: #666;">粉丝权重:</label>
        <input type="range" id="qf-in-fw" class="qf-condition-input" min="0" max="100" value="${CONFIG.fansWeight}" style="flex: 0.5;">
        <span id="qf-val-fw" class="qf-condition-value">${CONFIG.fansWeight}%</span>
      </div>
      <div style="display: flex; align-items: center; gap: 4px; flex: 1;">
        <label style="font-size: 12px; color: #666;">阈值:</label>
        <input type="range" id="qf-in-th" class="qf-condition-input" min="0" max="100" value="${CONFIG.threshold}" style="flex: 0.5;">
        <span id="qf-val-th" class="qf-condition-value">${CONFIG.threshold}</span>
      </div>
      <button class="qf-save-btn">保存</button>
    </div>
  `;

  (container.querySelector('#qf-in-pw') as HTMLInputElement).oninput = (e: Event) => {
    document.getElementById('qf-val-pw')!.textContent = (e.target as HTMLInputElement).value + '%';
  };
  (container.querySelector('#qf-in-fw') as HTMLInputElement).oninput = (e: Event) => {
    document.getElementById('qf-val-fw')!.textContent = (e.target as HTMLInputElement).value + '%';
  };
  (container.querySelector('#qf-in-th') as HTMLInputElement).oninput = (e: Event) => {
    document.getElementById('qf-val-th')!.textContent = (e.target as HTMLInputElement).value;
  };

  (container.querySelector('.qf-save-btn') as HTMLButtonElement).onclick = () => {
    GM_setValue('playWeight', parseInt((container.querySelector('#qf-in-pw') as HTMLInputElement).value));
    GM_setValue('fansWeight', parseInt((container.querySelector('#qf-in-fw') as HTMLInputElement).value));
    GM_setValue('threshold', parseInt((container.querySelector('#qf-in-th') as HTMLInputElement).value));
    location.reload();
  };

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
