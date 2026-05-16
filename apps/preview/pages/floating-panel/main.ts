import { showToast, createFloatingPanel } from '@xlxz/components';

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
