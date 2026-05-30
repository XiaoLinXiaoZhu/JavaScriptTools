export {};

// ─── 展开规则类型 ─────────────────────────────────────────────

interface ExpandRule {
  /** 匹配的 hostname */
  host: string;
  /** 需要移除的遮挡元素选择器 */
  removeSelectors: string[];
  /** 需要还原高度的内容选择器 */
  contentSelectors: string[];
  /** 需要自动点击的按钮选择器 */
  clickSelectors: string[];
  /** 额外注入的样式 */
  extraStyle?: string;
  /** 额外操作 */
  extraScript?: () => void;
}

// ─── 展开规则 ─────────────────────────────────────────────────

const EXPAND_RULES: ExpandRule[] = [
  // CSDN 博客
  {
    host: 'blog.csdn.net',
    removeSelectors: ['.guide-box', '.wap-shadowbox', '.readall_box', '.btn_open_app_prompt_div'],
    contentSelectors: ['.article_content'],
    clickSelectors: ['.hide-preCode-bt'],
    extraScript() {
      // CSDN 容器内的 data-url 链接直接跳转
      document.querySelector('.container-fluid')?.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const url = target.getAttribute('data-url');
        if (url) {
          window.location.href = url;
          e.preventDefault();
        }
      });
    },
  },
  // CSDN 下载页
  {
    host: 'download.csdn.net',
    removeSelectors: [],
    contentSelectors: ['.detail.hidden.no-preview'],
    clickSelectors: ["#download-detail .fl[role]"],
  },
  // CSDN 文库
  {
    host: 'wenku.csdn.net',
    removeSelectors: ['.guide-box', '.wap-shadowbox', '.readall_box', '.btn_open_app_prompt_div'],
    contentSelectors: ['.article_content'],
    clickSelectors: ['.hide-preCode-bt'],
  },
  // 百度文库
  {
    host: 'wenku.baidu.com',
    removeSelectors: [],
    contentSelectors: [],
    clickSelectors: ['.goBtn', '.read-all'],
  },
  // 思创
  {
    host: 'ispacesoft.com',
    removeSelectors: [],
    contentSelectors: [],
    clickSelectors: ['.entry-readmore-btn'],
  },
];

// ─── 执行展开 ─────────────────────────────────────────────────

function applyRule(rule: ExpandRule): void {
  // 移除遮挡元素
  for (const sel of rule.removeSelectors) {
    document.querySelectorAll(sel).forEach((el) => el.remove());
  }

  // 点击展开按钮
  for (const sel of rule.clickSelectors) {
    const btn = document.querySelector(sel) as HTMLElement | null;
    if (btn) {
      btn.click();
    }
  }

  // 还原内容高度
  if (rule.contentSelectors.length > 0) {
    const style = document.createElement('style');
    const css = rule.contentSelectors.map((s) => `${s} { height: auto !important; max-height: none !important; }`).join('\n');
    style.textContent = css;
    document.head.appendChild(style);
  }

  // 注入额外样式
  if (rule.extraStyle) {
    const style = document.createElement('style');
    style.textContent = rule.extraStyle;
    document.head.appendChild(style);
  }

  // 执行额外脚本
  rule.extraScript?.();
}

// ─── 主流程 ───────────────────────────────────────────────────

function run(): void {
  const hostname = window.location.hostname;
  const rule = EXPAND_RULES.find((r) => r.host === hostname);

  if (!rule) return;

  // 立即执行一次
  applyRule(rule);

  // 延迟再执行（等待动态内容加载）
  const tryAgain = () => {
    // 检查是否有需要点击的按钮仍然存在
    for (const sel of rule.clickSelectors) {
      const btn = document.querySelector(sel) as HTMLElement | null;
      if (btn) {
        btn.click();
      }
    }
  };

  setTimeout(tryAgain, 2000);
  setTimeout(tryAgain, 5000);
}

// ─── 百度文库特殊处理 ─────────────────────────────────────────

function baiduWenkuSpecial(): void {
  if (!window.location.hostname.includes('wenku.baidu.com')) return;

  // 持续尝试点击展开按钮
  const tryClick = () => {
    const btn = document.querySelector('.goBtn') ?? document.querySelector('.read-all');
    if (btn) {
      (btn as HTMLElement).click();
    }
  };

  setInterval(tryClick, 2000);
}

// ─── 入口 ─────────────────────────────────────────────────────

run();
baiduWenkuSpecial();
