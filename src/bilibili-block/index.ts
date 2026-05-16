export {};

// ─── 配置管理 ─────────────────────────────────────────────────

const DEFAULT_FILTER_BLOCK_UIDS = [113560378];
const DEFAULT_MIN_FOLLOWER = 2000;

let FILTER_BLOCK_UIDS: number[] = GM_getValue(
  'FILTER_BLOCK_UIDS',
  DEFAULT_FILTER_BLOCK_UIDS
);
let MIN_FOLLOWER: number = GM_getValue(
  'MIN_FOLLOWER',
  DEFAULT_MIN_FOLLOWER
);

/** 添加 UID 到屏蔽列表（去重 + 持久化） */
function addBlockUid(uid: number): boolean {
  if (FILTER_BLOCK_UIDS.includes(uid)) return false;
  FILTER_BLOCK_UIDS.push(uid);
  GM_setValue('FILTER_BLOCK_UIDS', FILTER_BLOCK_UIDS);
  return true;
}

// ─── 配置菜单 ─────────────────────────────────────────────────

GM_registerMenuCommand('⚙️ 设置屏蔽UID列表', () => {
  const current = FILTER_BLOCK_UIDS.join(', ');
  const input = prompt(
    '请输入需要屏蔽的UID列表（多个UID用英文逗号分隔）：\n\n例如：113560378, 123456789',
    current
  );
  if (input === null) return;

  const parsed = input
    .split(',')
    .map((s) => s.trim())
    .filter((s) => /^\d+$/.test(s))
    .map(Number);

  FILTER_BLOCK_UIDS = parsed;
  GM_setValue('FILTER_BLOCK_UIDS', parsed);
  alert(`✅ 已保存屏蔽UID列表（${parsed.length} 个UID）\n刷新页面后生效`);
});

GM_registerMenuCommand('⚙️ 设置最低粉丝数', () => {
  const input = prompt(
    '请输入最低粉丝数（低于此数量的UP主视频将被屏蔽）：',
    String(MIN_FOLLOWER)
  );
  if (input === null) return;

  const parsed = parseInt(input, 10);
  if (isNaN(parsed) || parsed < 0) {
    alert('❌ 请输入有效的非负整数');
    return;
  }

  MIN_FOLLOWER = parsed;
  GM_setValue('MIN_FOLLOWER', parsed);
  alert(`✅ 已保存最低粉丝数：${parsed}\n刷新页面后生效`);
});

GM_registerMenuCommand('📋 查看当前配置', () => {
  alert(
    `当前配置：\n\n` +
      `屏蔽UID列表（${FILTER_BLOCK_UIDS.length} 个）：\n${FILTER_BLOCK_UIDS.length > 0 ? FILTER_BLOCK_UIDS.join(', ') : '（空）'}\n\n` +
      `最低粉丝数：${MIN_FOLLOWER}`
  );
});

// ─── 脚本常量 ─────────────────────────────────────────────────

const FILTER_CLASSES = ['.bili-feed-card'];
const FILTER_BLOCK_CLASSES = ['.floor-single-card'];
const API_USERDATA = 'https://api.bilibili.com/x/relation/stat?vmid=';

let processedCards = 0;

// ─── 工具函数 ─────────────────────────────────────────────────

function getUid(card: Element): number {
  const ownerLink = card.querySelector(
    '.bili-video-card__info--owner'
  ) as HTMLAnchorElement | null;
  if (ownerLink) {
    const uid = ownerLink.href.split('/').pop();
    if (uid && uid.match(/^\d+$/)) {
      return Number(uid);
    } else {
      logMessages += `🟢remove becouse can't get uid: ${processedCards}, uid: ${uid}\n`;
      return -1;
    }
  }
  logMessages += `🟢remove becouse can't get ownerLink, processedCards: ${processedCards}, ownerLink: ${ownerLink}\n`;
  return -1;
}

/** 从卡片获取 UP 主名称（用于提示） */
function getUpName(card: Element): string {
  const nameEl = card.querySelector(
    '.bili-video-card__info--author'
  ) as HTMLElement | null;
  return nameEl?.textContent?.trim() ?? '未知UP主';
}

async function getFollower(uid: number): Promise<number> {
  const response = await fetch(`${API_USERDATA}${uid}`);
  logMessages += `🟢getFollower, uid: ${uid}\n`;
  const data = await response.json();
  if (data.code === 0) {
    return data.data.follower;
  } else {
    logMessages += `🔴getFollower error, uid: ${uid}, message: ${data.message}\n`;
    return -1;
  }
}

function removeCard(card: Element): void {
  card.remove();
}

function removeIfBlockByADBlocker(card: Element): boolean {
  const cardContent = card.querySelector('.bili-video-card.is-rcmd');
  if (
    !cardContent ||
    cardContent.innerHTML.match(
      /<!----><div class=".+?"><\/div><!---->/
    )
  ) {
    removeCard(card);
    return true;
  }
  return false;
}

// ─── 卡片过滤逻辑 ─────────────────────────────────────────────

async function editCards(card: Element): Promise<void> {
  processedCards++;
  const uid = getUid(card);
  if (uid === -1) {
    logMessages += `🟢remove because getUid error, uid: ${uid}\n`;
    removeCard(card);
    return;
  }

  if (FILTER_BLOCK_UIDS.includes(uid)) {
    logMessages += `🟢remove because uid in FILTER_BLOCK_UIDS, uid: ${uid}\n`;
    removeCard(card);
    return;
  }

  const follower = await getFollower(uid);
  if (follower === -1) {
    console.log(`🔴keep because getFollower error, uid: ${uid}`);
    return;
  }
  if (follower < MIN_FOLLOWER) {
    logMessages += `🟢remove because follower < ${MIN_FOLLOWER}, uid: ${uid}, follower: ${follower}\n`;
    removeCard(card);
    return;
  }
}

// ─── "不感兴趣"面板注入 ──────────────────────────────────────

/** 最近一次触发 popover 的卡片 */
let lastTriggeredCard: Element | null = null;

// 捕获阶段监听点击，记录最后点击的 feed-card（用于关联 popover）
document.addEventListener(
  'click',
  (e) => {
    const card = (e.target as HTMLElement).closest('.bili-feed-card');
    if (card) lastTriggeredCard = card;
  },
  true
);

/** 在"不感兴趣"面板中注入屏蔽选项 */
function injectBlockOption(
  panel: Element,
  popoverEl: HTMLElement
): void {
  // 防止重复注入
  if (panel.querySelector('.custom-block-up-option')) return;

  const item = document.createElement('div');
  item.className =
    'bili-video-card__info--no-interest-panel--item custom-block-up-option';
  item.textContent = '🚫 永久屏蔽此UP主';

  item.addEventListener('click', (e) => {
    e.stopPropagation();

    if (!lastTriggeredCard) {
      console.warn('[bilibili-block] 无法定位触发卡片');
      return;
    }

    const uid = getUid(lastTriggeredCard);
    if (uid === -1) return;

    const upName = getUpName(lastTriggeredCard);
    const added = addBlockUid(uid);

    // 移除卡片 & 关闭 popover
    removeCard(lastTriggeredCard);
    popoverEl.remove();
    lastTriggeredCard = null;

    logMessages += `🚫 ${added ? '已屏蔽' : '已在屏蔽列表中'}: ${upName} (UID: ${uid})\n`;
  });

  panel.appendChild(item);
}

// 监听 body 直接子节点变化，检测 popover 出现
const popoverObserver = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      if (!(node instanceof HTMLElement)) continue;
      if (!node.classList?.contains('vui_popover')) continue;

      // Vue 异步渲染，等待面板内容填充
      requestAnimationFrame(() => {
        const panel = node.querySelector(
          '.bili-video-card__info--no-interest-panel'
        );
        if (panel) {
          injectBlockOption(panel, node);
        }
      });
    }
  }
});

popoverObserver.observe(document.body, { childList: true });

// ─── 卡片观察器 ───────────────────────────────────────────────

let isProcessing = false;

const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        editCards(entry.target);
        obs.unobserve(entry.target);
      }
    });
  },
  { rootMargin: '0px', threshold: 0.2 }
);

function observeNewCards(): void {
  const blockCards = document.querySelectorAll(
    FILTER_BLOCK_CLASSES.join(', ')
  );
  blockCards.forEach((card) => {
    removeCard(card);
  });
  const filterCards = document.querySelectorAll(FILTER_CLASSES.join(', '));
  filterCards.forEach((card) => {
    if (removeIfBlockByADBlocker(card)) return;
    if ((card as HTMLElement).dataset.processed) return;
    observer.observe(card);
    (card as HTMLElement).dataset.processed = 'true';
  });
}

// 使用MutationObserver来监听新内容的加载
const mutationObserver = new MutationObserver((mutations) => {
  if (isProcessing) return;
  isProcessing = true;

  logMessages += `🤓mutationObserver, mutations: ${mutations.length}\n`;

  mutations.forEach((mutation) => {
    if (mutation.type === 'childList') {
      observeNewCards();
    }
  });
  isProcessing = false;
});

const container = document.querySelector('.container.is-version8');
if (container) {
  mutationObserver.observe(container, {
    childList: true,
  });
}

// 页面加载完成后，立即执行一次
observeNewCards();

// ─── 日志输出 ─────────────────────────────────────────────────

let logMessages = '';
setInterval(() => {
  if (logMessages === '') return;
  console.log(logMessages);
  logMessages = '';
}, 10000);
