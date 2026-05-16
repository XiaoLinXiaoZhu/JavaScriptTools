import type { Message } from './types';

/** 滚动收集配置 */
export const SCROLL_CONFIG = {
  /** 每次滚动的等待时间 (ms) */
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
