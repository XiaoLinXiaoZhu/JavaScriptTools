/**
 * UserScript header 中支持的所有字段
 * 参考: https://www.tampermonkey.net/documentation.php
 */
export interface UserScriptMeta {
  /** 脚本名称，支持多语言 */
  name: string | Record<string, string>;
  namespace: string;
  version: string;
  /** 脚本描述，支持多语言 */
  description: string | Record<string, string>;
  author: string;
  license?: string;
  match: string | string[];
  grant?: string | string[];
  'run-at'?:
    | 'document-start'
    | 'document-end'
    | 'document-idle'
    | 'document-body'
    | 'context-menu';
  icon?: string;
  require?: string | string[];
  resource?: string | string[];
  connect?: string | string[];
  noframes?: boolean;
  downloadURL?: string;
  updateURL?: string;
  /** 其他自定义字段 */
  [key: string]: unknown;
}

/**
 * 脚本项目配置
 */
export interface ScriptConfig {
  /** UserScript header 元数据 */
  meta: UserScriptMeta;

  /** 输出分类目录，决定 dist/{category}/xxx.user.js 的路径 */
  category: string;

  /** 输出文件名（不含 .user.js），默认使用文件夹名 */
  outputName?: string;

  /** 入口文件路径（相对于脚本文件夹），默认 index.ts */
  entry?: string;
}
