/**
 * 评价表自动选择工具
 *
 * - 表单页：一键填充当前 / 一键填充全部
 * - 教师列表页：一键填充当前 / 一键填充全部（全自动循环）
 */

import { isAutoMode, enableAutoMode, disableAutoMode, consumeRefreshMark } from './auto-mode';
import { runAutoFill } from './page-form';
import { startAutoAll, continueAutoAll, clickFirstEval } from './page-teacher-list';
import { showToast, createButton } from './ui';

// ─── 页面类型检测 ─────────────────────────────

type PageType = 'form' | 'teacher-list' | 'survey-list' | 'unknown';

function detectPageType(): PageType {
  const url = window.location.href;
  if (url.includes('questionnaireInfo')) return 'form';
  if (url.includes('whatIEvaluatedDetails')) return 'teacher-list';
  if (url.includes('whatIEvaluated') || url.includes('evaluateList')) return 'survey-list';
  return 'unknown';
}

// ─── 停止按钮 ─────────────────────────────────

function addStopButton(): void {
  if (!isAutoMode()) return;

  const btnStop = createButton('停止自动评价', () => {
    disableAutoMode();
    showToast('已停止自动评价', 'info');
    btnStop.remove();
  }, 'secondary');
  btnStop.style.top = '140px';
  btnStop.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
  document.body.appendChild(btnStop);
}

// ─── 按钮面板 ─────────────────────────────────

function addFormPageButtons(): void {
  const btnCurrent = createButton('一键填充当前', () => {
    const count = runAutoFill();
    if (count === 0) {
      showToast('未找到可选择的选项', 'warning');
    } else {
      showToast(`已选择 ${count} 个选项，正在提交...`, 'success');
    }
  }, 'primary');
  btnCurrent.style.top = '20px';
  document.body.appendChild(btnCurrent);

  const btnAll = createButton('一键填充全部', () => {
    enableAutoMode();
    const count = runAutoFill();
    if (count === 0) {
      showToast('未找到可选择的选项', 'warning');
    } else {
      showToast(`已选择 ${count} 个选项，自动模式已开启`, 'success');
    }
  }, 'secondary');
  btnAll.style.top = '80px';
  document.body.appendChild(btnAll);

  addStopButton();
}

function addTeacherListPageButtons(): void {
  const btnCurrent = createButton('一键填充当前', () => {
    if (!clickFirstEval()) {
      showToast('当前页没有未评价的教师', 'warning');
    }
  }, 'primary');
  btnCurrent.style.top = '20px';
  document.body.appendChild(btnCurrent);

  const btnAll = createButton('一键填充全部', () => {
    enableAutoMode();
    startAutoAll();
  }, 'secondary');
  btnAll.style.top = '80px';
  document.body.appendChild(btnAll);

  addStopButton();
}

// ─── 入口 ─────────────────────────────────────

function main(): void {
  const pageType = detectPageType();

  switch (pageType) {
    case 'form':
      addFormPageButtons();
      if (isAutoMode()) {
        setTimeout(() => runAutoFill(), 800);
      }
      break;

    case 'teacher-list': {
      // 从表单页返回后需要刷新以获取最新评价状态
      if (consumeRefreshMark()) {
        location.reload();
        return;
      }

      addTeacherListPageButtons();
      if (isAutoMode()) {
        setTimeout(() => continueAutoAll(), 1000);
      }
      break;
    }

    case 'survey-list':
      break;

    default:
      break;
  }

  console.log('[eval-auto] 已加载，页面类型:', pageType);
}

// ─── 启动 ─────────────────────────────────────

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main);
} else {
  main();
}

// 处理 bfcache 恢复 —— 从表单页 goBack() 返回时触发
window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    const pageType = detectPageType();
    if (pageType === 'teacher-list') {
      // 从表单页返回，需要刷新以获取最新数据
      if (consumeRefreshMark()) {
        location.reload();
        return;
      }
      if (isAutoMode()) {
        setTimeout(() => continueAutoAll(), 1000);
      }
    }
  }
});
