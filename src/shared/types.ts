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

// ─── 公共基础字段 ──────────────────────────────

interface ScriptConfigBase {
  /** 输出分类目录，决定 dist/{category}/xxx 的路径 */
  category: string;
  /** 输出文件名（不含扩展名），默认使用文件夹名 */
  outputName?: string;
  /** 入口文件路径（相对于脚本文件夹），默认 index.ts */
  entry?: string;
  /** Greasyfork 脚本 ID，用于自动同步触发（仅 userscript 模式需要） */
  greasyforkId?: number;
}

// ─── 油猴脚本模式（默认） ──────────────────────

/** 油猴脚本：IIFE 格式 + UserScript header */
export interface UserScriptConfig extends ScriptConfigBase {
  mode?: 'userscript';
  /** UserScript header 元数据 */
  meta: UserScriptMeta;
}

// ─── 纯 JS 输出模式 ───────────────────────────

/** 纯 JS 输出：无 header，适用于 Obsidian 等场景 */
export interface PlainScriptConfig extends ScriptConfigBase {
  mode: 'plain';
  /** 输出格式，默认 'iife' */
  format?: 'iife' | 'esm';
  /** 目标平台，默认 'browser' */
  platform?: 'browser' | 'node';
}

// ─── Node.js 模块模式 ─────────────────────────

/** Node.js 模块：CJS/ESM 格式，外部依赖不打包 */
export interface NodeScriptConfig extends ScriptConfigBase {
  mode: 'node';
  /** 输出格式，默认 'cjs' */
  format?: 'cjs' | 'esm';
  /**
   * 外部依赖列表，不会被打包
   * - true: 自动从脚本目录的 package.json 的 dependencies 读取
   * - string[]: 手动指定
   * 默认: true
   */
  external?: true | string[];
}

// ─── Discriminated Union ──────────────────────

/** 脚本项目配置（所有模式的联合类型） */
export type ScriptConfig =
  | UserScriptConfig
  | PlainScriptConfig
  | NodeScriptConfig;
