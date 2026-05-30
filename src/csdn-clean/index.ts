import { showToast } from '@xlxz/components';

export {};

// ─── 配置 ─────────────────────────────────────────────────────

const DEFAULTS: Record<string, boolean> = {
  adClean: true,
  clipboardClean: true,
  commentClean: true,
  articleClean: true,
};

function getCfg(key: string): boolean {
  const v = GM_getValue('csdn_' + key, undefined);
  return v === undefined ? DEFAULTS[key] ?? true : v;
}

function setCfg(key: string, value: boolean): void {
  GM_setValue('csdn_' + key, value);
}

// ─── 广告清理 ─────────────────────────────────────────────────

const AD_SELECTORS = [
  '#footerRightAds',
  '.side-question-box',
  "div[id^='dmp_ad']",
  "div[class^='ad_']",
  "div[id^='floor-ad_']",
  '.adsbygoogle',
  '#recommendAdBox',
  '#asideNewNps',
  '.box-shadow',
  '.toolbar-advert',
];

function removeAds(): void {
  for (const selector of AD_SELECTORS) {
    document.querySelectorAll(selector).forEach((el) => el.remove());
  }
}

// ─── 剪切板净化 ───────────────────────────────────────────────

function cleanClipboard(): void {
  // 移除 CSDN 的复制劫持
  try {
    const w = window as any;
    if (w.csdn?.copyright) {
      w.csdn.copyright.textData = '';
    }
  } catch { /* ignore */ }

  // 修复代码块复制按钮
  waitFor('.hljs-button', (copyBtn) => {
    copyBtn.classList.remove('signin');
    copyBtn.setAttribute('data-title', '复制');
    copyBtn.setAttribute(
      'onclick',
      "hljs.copyCode(event);setTimeout(function(){$('.hljs-button').attr('data-title', '复制');},3500);"
    );
  });

  // 修复内联代码复制
  waitFor('code', (codeEl) => {
    codeEl.setAttribute('onclick', 'mdcp.copyCode(event)');
    codeEl.addEventListener('copy', (e) => {
      const selection = window.getSelection()?.toString() ?? '';
      if (selection) {
        e.preventDefault();
        navigator.clipboard.writeText(selection).then(
          () => showToast('复制成功', { type: 'success', duration: 2000 }),
          () => showToast('复制失败，请重试', { type: 'error', duration: 2000 })
        );
      }
    });
  });

  // 解除 jQuery 的 copy 事件绑定
  try {
    (window as any).jQuery?.('#content_views').unbind('copy');
  } catch { /* ignore */ }
}

// ─── 评论区优化 ───────────────────────────────────────────────

function cleanComment(): void {
  const commentList = document.querySelector('.comment-list-box') as HTMLElement | null;
  if (commentList) {
    commentList.style.overflow = '';
    commentList.style.maxHeight = '';
  }
  document.getElementById('commentPage')?.classList.remove('d-none');
  document.getElementById('btnMoreComment')?.remove();
}

// ─── 文章展开 ─────────────────────────────────────────────────

function expandArticle(): void {
  const articleContent = document.getElementById('article_content');
  if (articleContent) {
    articleContent.removeAttribute('style');
  }
  document.querySelector('.hide-article-box')?.remove();
}

// ─── 工具函数 ─────────────────────────────────────────────────

function waitFor(selector: string, callback: (el: HTMLElement) => void, maxRetries = 10): void {
  let retries = 0;
  const check = () => {
    const el = document.querySelector(selector) as HTMLElement | null;
    if (el) {
      callback(el);
    } else if (retries < maxRetries) {
      retries++;
      setTimeout(check, 500);
    }
  };
  setTimeout(check, 800);
}

// ─── 菜单 ─────────────────────────────────────────────────────

GM_registerMenuCommand('⚙️ CSDN 净化 — 设置', () => {
  const keys = Object.keys(DEFAULTS);
  for (const key of keys) {
    const current = getCfg(key);
    const labels: Record<string, string> = {
      adClean: '广告清理',
      clipboardClean: '剪切板净化',
      commentClean: '评论区优化',
      articleClean: '文章展开',
    };
    const label = labels[key] ?? key;
    const input = prompt(`「${label}」当前为【${current ? '开启' : '关闭'}】。\n输入 0 关闭，1 开启，留空保持不变：`, current ? '1' : '0');
    if (input === '0') setCfg(key, false);
    else if (input === '1') setCfg(key, true);
  }
  alert('设置已保存，刷新后生效。');
});

// ─── 主流程 ───────────────────────────────────────────────────

// 广告清理：定时执行（应对动态加载）
if (getCfg('adClean')) {
  setInterval(removeAds, 3000);
}

// 剪切板净化
if (getCfg('clipboardClean')) {
  cleanClipboard();
}

// 评论区优化
if (getCfg('commentClean')) {
  setTimeout(cleanComment, 3000);
}

// 文章展开
if (getCfg('articleClean')) {
  setTimeout(expandArticle, 1000);
}
