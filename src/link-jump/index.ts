import { showToast } from '@xlxz/components';

export {};

// ─── 站点跳转规则 ─────────────────────────────────────────────

interface JumpRule {
  /** URL 匹配正则 */
  pattern: RegExp;
  /** 目标 URL 所在的查询参数名（逗号分隔表示依次尝试） */
  paramKeys?: string;
  /** 目标 URL 所在的 DOM 选择器（仅当 paramKeys 无法提取时使用） */
  selector?: string;
  /** 站点名称（用于配置开关） */
  name: string;
}

const JUMP_RULES: JumpRule[] = [
  { pattern: /link\.csdn\.net/i, paramKeys: 'target', name: 'CSDN' },
  { pattern: /link\.zhihu\.com/i, paramKeys: 'target', name: '知乎' },
  { pattern: /www\.jianshu\.com\/go-wild/i, paramKeys: 'url', name: '简书' },
  { pattern: /gitee\.com\/link/i, paramKeys: 'target', name: 'Gitee' },
  { pattern: /juejin\.cn\/\?target/i, paramKeys: 'target', name: '掘金' },
  { pattern: /weibo\.cn\/sinaurl/i, paramKeys: 'u', name: '微博' },
  { pattern: /support\.qq\.com\/products\/.*\/link-jump/i, paramKeys: 'jump', name: '腾讯兔小巢' },
  { pattern: /oschina\.net\/action\/GoToLink/i, paramKeys: 'url', name: '开源中国' },
  { pattern: /afdian\.net\/link/i, paramKeys: 'target', name: '爱发电' },
  { pattern: /jump2?\.bdimg\.com\/safecheck/i, selector: '.link', name: '百度' },
  { pattern: /www\.douban\.com\/link2\//i, paramKeys: 'url', name: '豆瓣' },
  { pattern: /link\.17173\.com/i, paramKeys: 'target', name: '17173' },
  { pattern: /docs\.qq\.com\/scenario\/link/i, paramKeys: 'url', name: '腾讯文档' },
  { pattern: /mail\.qq\.com\/cgi-bin\/readtemplate/i, paramKeys: 'gourl', name: 'QQ邮箱' },
  { pattern: /wx\.mail\.qq\.com\/xmspamcheck\/xmsafejump/i, paramKeys: 'url', name: '微信QQ邮箱' },
  { pattern: /c\.pc\.qq\.com\/(middlem|ios)/i, paramKeys: 'pfurl,url', name: '腾讯QQ' },
  { pattern: /sspai\.com\/link/i, paramKeys: 'target', name: '少数派' },
  { pattern: /nodeseek\.com\/jump/i, paramKeys: 'to', name: 'NodeSeek' },
  { pattern: /[pw]?\.?kdocs\.cn\/office\/link/i, paramKeys: 'url', name: '金山文档' },
  { pattern: /cloud\.tencent\.com\/developer\/tools\/blog-entry/i, paramKeys: 'target', name: '腾讯云博客' },
  { pattern: /link\.uisdc\.com/i, paramKeys: 'redirect', name: '优设' },
  { pattern: /www\.yuque\.com\/r\/goto/i, paramKeys: 'url', name: '语雀' },
  { pattern: /blog\.51cto\.com\/transfer/i, selector: '.url span', name: '51CTO' },
  { pattern: /r\.wjx\.com\/redirect\.aspx/i, paramKeys: 'url', name: '问卷星' },
  { pattern: /www\.infoq\.cn\/link/i, paramKeys: 'target', name: 'InfoQ' },
  { pattern: /open\.work\.weixin\.qq\.com\/wwopen\/uriconfirm/i, paramKeys: 'uri', name: '企业微信' },
  { pattern: /weboffice\.qq\.com\/scenario\/link\.html/i, paramKeys: 'url', name: '腾讯文档盘' },
  { pattern: /link\.gitcode\.com/i, paramKeys: 'target', name: 'GitCode' },
  { pattern: /n\.dingtalk\.com\/dingding\/h5-url-verification/i, paramKeys: 'url', name: '钉钉' },
];

const STORAGE_PREFIX = 'linkJump_';

// ─── 配置管理 ─────────────────────────────────────────────────

function isEnabled(name: string): boolean {
  const key = STORAGE_PREFIX + name;
  const stored = GM_getValue(key, undefined);
  return stored === undefined ? true : stored;
}

function setEnabled(name: string, enabled: boolean): void {
  GM_setValue(STORAGE_PREFIX + name, enabled);
}

// ─── URL 提取 ─────────────────────────────────────────────────

function extractUrl(rule: JumpRule): string | null {
  const currentUrl = window.location.href;

  // 优先从查询参数提取
  if (rule.paramKeys) {
    for (const key of rule.paramKeys.split(',')) {
      const val = getQueryParam(currentUrl, key.trim());
      if (val) {
        return decodeURIComponent(val);
      }
    }
  }

  // 回退到 DOM 选择器
  if (rule.selector) {
    const el = document.querySelector(rule.selector);
    if (el?.textContent) {
      const text = el.textContent.trim();
      if (text) return text;
    }
  }

  return null;
}

function getQueryParam(url: string, key: string): string | null {
  const m = url.match(new RegExp(`[?&]${key}=([^&]+)`, 'i'));
  return m ? m[1] : null;
}

// ─── 跳转逻辑 ─────────────────────────────────────────────────

function normalizeUrl(url: string): string {
  let result = decodeURIComponent(url);
  // 去掉末尾斜杠
  if (result.endsWith('/')) {
    result = result.slice(0, -1);
  }
  // 补全协议
  if (!/^https?:\/\//i.test(result) && result.indexOf(':\\') < 1) {
    result = 'http://' + result;
  }
  return result;
}

function jump(url: string): void {
  const normalized = normalizeUrl(url);
  showToast('正在跳转...', { type: 'success', duration: 1500 });
  setTimeout(() => {
    window.location.href = normalized;
  }, 300);
}

// ─── 主流程 ───────────────────────────────────────────────────

function findMatchingRule(): JumpRule | null {
  const currentUrl = window.location.href;
  for (const rule of JUMP_RULES) {
    if (rule.pattern.test(currentUrl)) {
      return rule;
    }
  }
  return null;
}

function run(): void {
  const rule = findMatchingRule();
  if (!rule) return;

  if (!isEnabled(rule.name)) {
    showToast(`已关闭「${rule.name}」的自动跳转`, { type: 'warning', duration: 3000 });
    return;
  }

  const targetUrl = extractUrl(rule);
  if (targetUrl) {
    jump(targetUrl);
  } else {
    showToast('未能解析到目标链接，请手动跳转', { type: 'warning', duration: 3000 });
  }
}

// ─── 菜单注册 ─────────────────────────────────────────────────

GM_registerMenuCommand('⚙️ 中间页自动跳转 — 站点开关', () => {
  const lines: string[] = [];
  for (const rule of JUMP_RULES) {
    const status = isEnabled(rule.name) ? '✅' : '⛔';
    lines.push(`${status} ${rule.name}`);
  }
  alert('当前各站点跳转状态（点击确定后逐站设置）：\n\n' + lines.join('\n'));

  for (const rule of JUMP_RULES) {
    const current = isEnabled(rule.name);
    const label = `「${rule.name}」自动跳转当前为【${current ? '开启' : '关闭'}】。\n输入 0 关闭，1 开启，留空保持不变：`;
    const input = prompt(label, current ? '1' : '0');
    if (input === '0') setEnabled(rule.name, false);
    else if (input === '1') setEnabled(rule.name, true);
  }

  alert('设置已保存，刷新后生效。');
});

// ─── 入口 ─────────────────────────────────────────────────────

run();
