export {};

// ─── GM API 类型声明 ──────────────────────────────────────────
declare function GM_getValue<T>(key: string, defaultValue: T): T;
declare function GM_setValue(key: string, value: unknown): void;
declare function GM_registerMenuCommand(
  name: string,
  callback: () => void
): void;

// ─── 配置管理 ─────────────────────────────────────────────────

// 默认值
const DEFAULT_FILTER_BLOCK_UIDS = [113560378];
const DEFAULT_MIN_FOLLOWER = 2000;

// 从 GM 存储读取配置（首次使用时自动写入默认值）
let FILTER_BLOCK_UIDS: number[] = GM_getValue(
  'FILTER_BLOCK_UIDS',
  DEFAULT_FILTER_BLOCK_UIDS
);
let MIN_FOLLOWER: number = GM_getValue(
  'MIN_FOLLOWER',
  DEFAULT_MIN_FOLLOWER
);

// ─── 配置菜单 ─────────────────────────────────────────────────

GM_registerMenuCommand('⚙️ 设置屏蔽UID列表', () => {
  const current = FILTER_BLOCK_UIDS.join(', ');
  const input = prompt(
    '请输入需要屏蔽的UID列表（多个UID用英文逗号分隔）：\n\n例如：113560378, 123456789',
    current
  );
  if (input === null) return; // 用户取消

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
  if (input === null) return; // 用户取消

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
      `屏蔽UID列表：${FILTER_BLOCK_UIDS.length > 0 ? FILTER_BLOCK_UIDS.join(', ') : '（空）'}\n` +
      `最低粉丝数：${MIN_FOLLOWER}`
  );
});

// ─── 脚本逻辑 ─────────────────────────────────────────────────

// 定义需要筛选屏蔽的视频卡片类名
const FILTER_CLASSES = ['.bili-feed-card'];
// 定义需要直接直接屏蔽的直播类名
const FILTER_BLOCK_CLASSES = ['.floor-single-card'];
// 定义接口前缀
const API_USERDATA = 'https://api.bilibili.com/x/relation/stat?vmid=';

// 定义已处理卡片数量
let processedCards = 0;

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

let isProcessing = false;

// 创建Intersection Observer实例
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

// 监控 class="container is-version8" 的元素
const container = document.querySelector('.container.is-version8');
if (container) {
  mutationObserver.observe(container, {
    childList: true,
  });
}

// 页面加载完成后，立即执行一次
observeNewCards();

// 自定义 log 函数，每10s 输出一次debug
let logMessages = '';
setInterval(() => {
  if (logMessages === '') return;
  console.log(logMessages);
  logMessages = '';
}, 10000);
