/** 导出的单条消息 */
export interface Message {
  type: 'user' | 'ai';
  text: string;
  think?: string; // AI 深度思考（折叠在 details 中）
}
