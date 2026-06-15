const AUTO_KEY = 'eval_auto_mode';
const REFRESH_KEY = 'eval_need_refresh';

// ─── 全自动模式 ──────────────────────────────

/** 是否处于全自动模式 */
export const isAutoMode = (): boolean =>
  localStorage.getItem(AUTO_KEY) === '1';

/** 启用全自动模式 */
export const enableAutoMode = (): void => {
  localStorage.setItem(AUTO_KEY, '1');
};

/** 停用全自动模式 */
export const disableAutoMode = (): void => {
  localStorage.removeItem(AUTO_KEY);
  localStorage.removeItem(REFRESH_KEY);
};

// ─── 刷新标记（返回列表页后强制刷新以获取最新数据） ──

/** 标记返回列表页后需要刷新 */
export const markNeedRefresh = (): void => {
  localStorage.setItem(REFRESH_KEY, '1');
};

/** 检查并清除刷新标记，返回是否需要刷新 */
export const consumeRefreshMark = (): boolean => {
  if (localStorage.getItem(REFRESH_KEY) === '1') {
    localStorage.removeItem(REFRESH_KEY);
    return true;
  }
  return false;
};
