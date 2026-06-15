/**
 * 评价表单页逻辑
 *
 * 匹配 URL: /pj/newesReception/questionnaireInfo
 * 负责：自动选择评分项、自动提交
 */

import { markNeedRefresh } from './auto-mode';

// ─── 自动选择 ──────────────────────────────────

/** 返回值：成功选择的选项数量 */
export function autoSelect(): number {
  let selectedCount = 0;
  let strongRecommendName = '';
  let bestClassName = '';

  const allRadios = document.querySelectorAll(
    'input[type="radio"]',
  ) as NodeListOf<HTMLInputElement>;

  // 第一遍：选择“强烈推荐”和“最满意课堂”
  for (const radio of allRadios) {
    const label = radio.closest('label');
    if (!label) continue;

    const labelText = label.textContent?.trim();

    if (labelText === '强烈推荐') {
      radio.click();
      selectedCount++;
      strongRecommendName = radio.name;
      console.log('[eval-auto] 已选择: 强烈推荐 (name=' + radio.name + ')');
    } else if (labelText === '最满意课堂') {
      radio.click();
      selectedCount++;
      bestClassName = radio.name;
      console.log('[eval-auto] 已选择: 最满意课堂 (name=' + radio.name + ')');
    }
  }

  // 第二遍：其余题目选择“很好”（score=1.0）
  const goodOptions = document.querySelectorAll(
    'input[type="radio"][value="1_1.0"][score="1.0"]',
  ) as NodeListOf<HTMLInputElement>;

  for (const option of goodOptions) {
    if (option.name !== strongRecommendName && option.name !== bestClassName) {
      option.click();
      selectedCount++;
      console.log('[eval-auto] 已选择: 很好 (name=' + option.name + ')');
    }
  }

  return selectedCount;
}

// ─── 自动提交 ──────────────────────────────────

export function autoSubmit(): void {
  const submitBtn = document.querySelector('a.save') as HTMLElement | null;
  if (!submitBtn) {
    console.log('[eval-auto] 未找到提交按钮');
    return;
  }

  submitBtn.click();
  console.log('[eval-auto] 已点击提交');

  // 等待确认弹窗出现
  setTimeout(() => {
    const confirmSelectors = [
      'a.layui-layer-btn0',
      'a.popBnt_blue',
      '.layui-layer-btn a:first-child',
    ];

    for (const selector of confirmSelectors) {
      const confirmBtn = document.querySelector(selector) as HTMLElement | null;
      if (confirmBtn) {
        // 标记返回后需要刷新，确保列表页数据最新
        markNeedRefresh();
        confirmBtn.click();
        console.log('[eval-auto] 已点击确认: ' + selector);
        return;
      }
    }

    console.log('[eval-auto] 未找到确认按钮，可能已自动提交');
  }, 1000);
}

// ─── 完整流程 ──────────────────────────────────

/** 执行一次完整的填充+提交，返回成功选择的选项数量 */
export function runAutoFill(): number {
  const count = autoSelect();
  if (count === 0) {
    console.log('[eval-auto] 未找到可选择的选项');
    return 0;
  }

  // 给 DOM 一点时间反应
  setTimeout(() => {
    autoSubmit();
  }, 300);

  return count;
}
