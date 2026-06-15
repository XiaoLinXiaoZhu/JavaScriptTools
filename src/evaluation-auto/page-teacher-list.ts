/**
 * 教师列表页逻辑
 *
 * 匹配 URL: /pj/frontv2/whatIEvaluatedDetails
 * 负责：找到未评价教师 → 点击“评价”按钮、自动翻页
 */

import { isAutoMode, enableAutoMode, disableAutoMode } from './auto-mode';

// ─── 查找元素 ──────────────────────────────────

/** 找到当前页所有“评价”按钮（文本为“评价”的 d_button_text） */
function findEvalButtons(): HTMLElement[] {
  const links = document.querySelectorAll('a.d_button_text');
  const result: HTMLElement[] = [];
  for (const link of links) {
    if (link.textContent?.trim() === '评价') {
      result.push(link as HTMLElement);
    }
  }
  return result;
}

/** 找到可点击的“下一页”按钮 */
function findNextPageBtn(): HTMLElement | null {
  const btn = document.querySelector('button.btn-next:not([disabled])');
  return btn as HTMLElement | null;
}

/** 当前页是否存在未评价的教师 */
function hasUnrated(): boolean {
  return findEvalButtons().length > 0;
}

// ─── 操作 ──────────────────────────────────────

/** 点击第一个未评价教师的“评价”按钮 */
export function clickFirstEval(): boolean {
  const buttons = findEvalButtons();
  if (buttons.length > 0) {
    console.log('[eval-auto] 点击“评价”按钮，进入表单页');
    buttons[0].click();
    return true;
  }
  return false;
}

/** 翻到下一页，返回是否成功 */
export function goNextPage(): boolean {
  const btn = findNextPageBtn();
  if (btn) {
    console.log('[eval-auto] 翻到下一页');
    btn.click();
    return true;
  }
  return false;
}

// ─── 全自动流程 ────────────────────────────────

/** 启动全自动：设置标志，点击第一个评价 */
export function startAutoAll(): void {
  enableAutoMode();
  autoStep();
}

/**
 * 执行一步自动操作：
 * - 如果有未评价的 → 点击“评价”进入表单页
 * - 如果没有但能翻页 → 翻页，延迟后重新检查
 * - 否则 → 全部完成
 */
function autoStep(): void {
  if (!isAutoMode()) return;

  if (hasUnrated()) {
    // 延迟点击，确保 Vue 事件已绑定
    setTimeout(() => {
      clickFirstEval();
    }, 500);
    return;
  }

  if (goNextPage()) {
    // 翻页后等待 Vue 重新渲染，然后重试
    setTimeout(() => {
      autoStep();
    }, 1500);
    return;
  }

  // 没有未评价的，也不能翻页 —— 全部完成
  disableAutoMode();
  alert('所有教师均已评价完毕！');
}

/**
 * 页面加载时继续全自动流程
 * 返回值：是否仍然在全自动模式中
 */
export function continueAutoAll(): boolean {
  if (!isAutoMode()) return false;

  // 延迟启动，等待 Vue 渲染完成
  setTimeout(() => {
    autoStep();
  }, 800);

  return true;
}
