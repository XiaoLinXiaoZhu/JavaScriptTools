import type { ScriptConfig } from './types';

/**
 * 定义脚本配置（提供类型提示的 identity 函数）
 *
 * @example
 * ```ts
 * import { defineConfig } from '../shared/define';
 *
 * export default defineConfig({
 *   meta: { name: '...', ... },
 *   category: 'tools',
 * });
 * ```
 */
export function defineConfig(config: ScriptConfig): ScriptConfig {
  return config;
}
