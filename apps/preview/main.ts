/**
 * 预览页面 — 使用与 src/ 脚本相同的导入方式
 */
import { showToast, createConfigPanel, configureToast, createFloatingPanel } from '@xlxz/components';

// --- Toast 演示 ---
document.getElementById('toast-info')!.onclick = () => {
  showToast('正在处理中...', { type: 'info' });
};
document.getElementById('toast-success')!.onclick = () => {
  showToast('下载完成 ✓', { type: 'success' });
};
document.getElementById('toast-warning')!.onclick = () => {
  showToast('网络不稳定，请稍候重试', { type: 'warning' });
};
document.getElementById('toast-error')!.onclick = () => {
  showToast('操作失败，请检查权限', { type: 'error' });
};
document.getElementById('toast-multi')!.onclick = () => {
  showToast('第一条消息', { type: 'info' });
  setTimeout(() => showToast('第二条消息', { type: 'success' }), 300);
  setTimeout(() => showToast('第三条消息', { type: 'warning' }), 600);
};

// --- Position demo ---
const positions = ['top-center', 'top-left', 'top-right', 'bottom-center', 'bottom-left', 'bottom-right'] as const;
let posIdx = 0;
document.getElementById('toast-position')?.addEventListener('click', () => {
  posIdx = (posIdx + 1) % positions.length;
  const pos = positions[posIdx];
  configureToast({ position: pos });
  showToast(`位置切换为: ${pos}`, { type: 'info', duration: 2000 });
});

// --- ConfigPanel 演示 ---
const panel = createConfigPanel({
  title: '质量筛选设置',
  fields: [
    { key: 'playWeight', label: '播放量权重', type: 'slider', min: 0, max: 100, value: 50 },
    { key: 'fansWeight', label: '粉丝数权重', type: 'slider', min: 0, max: 100, value: 50 },
    { key: 'threshold', label: '过滤阈值', type: 'slider', min: 0, max: 100, value: 30 },
    { key: 'blurIntensity', label: '模糊强度', type: 'number', min: 0, max: 30, value: 10 },
  ],
  onSave(values) {
    showToast(`设置已保存: ${JSON.stringify(values)}`, { type: 'success', duration: 4000 });
    console.log('Saved values:', values);
  },
  position: { top: '80px', right: '24px' },
});

// 默认隐藏面板
panel.hide();

document.getElementById('panel-toggle')!.onclick = () => {
  panel.toggle();
};

// --- FloatingPanel 演示 ---
const floatPanel = createFloatingPanel({
  title: '浮动面板',
  content: `
    <p style="color: #666; margin-bottom: 12px;">这是一个可拖拽、可调整大小的浮动面板。</p>
    <ul style="color: #444; font-size: 13px; padding-left: 16px; line-height: 1.8;">
      <li>拖动标题栏移动位置</li>
      <li>拖动右下角调整大小</li>
      <li>点击红色按钮关闭</li>
    </ul>
    <p style="color: #999; font-size: 12px; margin-top: 16px;">灵感来自 macOS / visionOS 窗口交互</p>
  `,
  width: 340,
  height: 240,
  minWidth: 240,
  minHeight: 160,
  onClose() {
    showToast('面板已关闭', { type: 'info', duration: 2000 });
  },
});
floatPanel.hide();

document.getElementById('float-toggle')!.onclick = () => {
  floatPanel.toggle();
};
