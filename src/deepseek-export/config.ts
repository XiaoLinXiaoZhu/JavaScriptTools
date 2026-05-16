import type { Message } from './types';

/** 注入按钮的样式 */
export const BUTTON_CSS = `
.dse-root * { box-sizing: border-box; }
.dse-btn {
  position: fixed;
  bottom: 100px;
  right: 24px;
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: none;
  border-radius: 12px;
  background: #4d6bfe;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0 2px 12px rgba(77,107,254,0.35);
  transition: opacity 0.2s, transform 0.2s;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
.dse-btn:hover { opacity: 0.9; transform: translateY(-1px); }
.dse-btn:active { transform: translateY(0); }
.dse-btn--loading { opacity: 0.7; pointer-events: none; }
.dse-toast {
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 99999;
  padding: 10px 24px;
  border-radius: 10px;
  background: #1d1d1f;
  color: #fff;
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  animation: dse-fadeIn 0.25s ease;
  pointer-events: none;
}
.dse-toast--warn { background: #e8890c; }
@keyframes dse-fadeIn { from { opacity: 0; transform: translateX(-50%) translateY(-8px); } }
`;

/** 滚动收集配置 */
export const SCROLL_CONFIG = {
  /** 每次向上滚动的等待时间 (ms) */
  scrollDelay: 600,
  /** 最大滚动次数（防止死循环） */
  maxScrolls: 200,
  /** 没有新消息时重试次数 */
  retryOnEmpty: 2,
};

/** Markdown 导出模板 */
export function buildMarkdown(messages: Message[], title: string): string {
  const time = new Date().toLocaleString('zh-CN');
  let md = `# ${title}\n\n> 导出: ${time} | 共 ${messages.length} 条\n\n---\n\n`;
  for (const m of messages) {
    if (m.type === 'user') {
      md += `### 👤 用户\n\n${m.text}\n\n`;
    } else {
      md += `### 🤖 DeepSeek\n\n`;
      if (m.think) {
        md += `<details>\n<summary>💭 深度思考</summary>\n\n${m.think}\n\n</details>\n\n`;
      }
      md += `${m.text}\n\n`;
    }
    md += `---\n\n`;
  }
  return md;
}
