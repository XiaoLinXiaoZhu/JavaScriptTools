export interface FilterConfig {
  /** 是否启用过滤 */
  enabled: boolean;
  /** 评分阈值，低于此值的卡片将被隐藏（十分之一精度） */
  threshold: number;
}

const STORAGE_KEY = 'fufugal-rating-filter';

const DEFAULT_CONFIG: FilterConfig = {
  enabled: false,
  threshold: 7,
};

export function loadConfig(): FilterConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_CONFIG };
    const parsed = JSON.parse(raw) as Partial<FilterConfig>;
    return {
      enabled: typeof parsed.enabled === 'boolean' ? parsed.enabled : DEFAULT_CONFIG.enabled,
      threshold:
        typeof parsed.threshold === 'number' && Number.isFinite(parsed.threshold)
          ? clampThreshold(parsed.threshold)
          : DEFAULT_CONFIG.threshold,
    };
  } catch {
    return { ...DEFAULT_CONFIG };
  }
}

export function saveConfig(config: FilterConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch {
    // 存储失败时静默忽略（如隐私模式禁用了 localStorage）
  }
}

export function clampThreshold(value: number): number {
  const clamped = Math.min(10, Math.max(0, value));
  // 保持十分之一精度
  return Math.round(clamped * 10) / 10;
}
