export {};

// ─── 时间格式化 ───────────────────────────────────────────────

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const M = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const h = String(date.getHours()).padStart(2, '0');
  const m = String(date.getMinutes()).padStart(2, '0');
  return `${y}-${M}-${d} ${h}:${m}`;
}

// ─── 注入时间信息 ─────────────────────────────────────────────

const PROCESSED_CLASS = 'zhihu-time-injected';

function injectTimestamps(): void {
  const answers = document.querySelectorAll<HTMLElement>(
    `.AnswerItem:not(.${PROCESSED_CLASS})`
  );

  for (const answer of answers) {
    const createdEl = answer.querySelector<HTMLElement>('[itemprop~=dateCreated][content]');
    const modifiedEl = answer.querySelector<HTMLElement>('[itemprop~=dateModified][content]');

    const created = createdEl?.getAttribute('content');
    const modified = modifiedEl?.getAttribute('content');

    if (!created && !modified) continue;

    const meta = answer.querySelector('.ContentItem-meta');
    if (!meta) continue;

    const div = document.createElement('div');
    div.style.cssText = 'color: #8590a6; font-size: 13px; margin-top: 2px;';
    let text = '';
    if (created) text += `创建: ${formatDate(new Date(created))}`;
    if (modified) text += `    编辑: ${formatDate(new Date(modified))}`;
    div.textContent = text;
    meta.appendChild(div);

    answer.classList.add(PROCESSED_CLASS);
  }
}

// ─── 主流程 ───────────────────────────────────────────────────

// 立即执行
injectTimestamps();

// 监听新回答加载（知乎是 SPA，滚动加载更多）
const observer = new MutationObserver(() => {
  injectTimestamps();
});

observer.observe(document.body, { childList: true, subtree: true });
