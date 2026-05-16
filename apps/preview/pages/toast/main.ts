import { showToast, configureToast } from '@xlxz/components';

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

const positions = ['top-center', 'top-left', 'top-right', 'bottom-center', 'bottom-left', 'bottom-right'] as const;
let posIdx = 0;
document.getElementById('toast-position')!.addEventListener('click', () => {
  posIdx = (posIdx + 1) % positions.length;
  const pos = positions[posIdx];
  configureToast({ position: pos });
  showToast(`位置切换为: ${pos}`, { type: 'info', duration: 2000 });
});
