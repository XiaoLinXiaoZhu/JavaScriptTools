/**
 * UI 工具：Toast 提示与悬浮按钮
 */

// ─── Toast 提示 ───────────────────────────────

export function showToast(message: string, type: 'success' | 'warning' | 'info' = 'success'): void {
  const toast = document.createElement('div');
  toast.textContent = message;

  const colorMap = { success: '#10b981', warning: '#f59e0b', info: '#3b82f6' };

  toast.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    z-index: 99999;
    padding: 12px 20px;
    background: ${colorMap[type]};
    color: white;
    border-radius: 8px;
    font-size: 14px;
    font-weight: bold;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    animation: evalSlideIn 0.3s ease;
  `;

  if (!document.getElementById('eval-toast-style')) {
    const style = document.createElement('style');
    style.id = 'eval-toast-style';
    style.textContent = `
      @keyframes evalSlideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes evalSlideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'evalSlideOut 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ─── 悬浮按钮 ─────────────────────────────────

export function createButton(
  text: string,
  onClick: () => void,
  variant: 'primary' | 'secondary' = 'primary',
): HTMLButtonElement {
  const isPrimary = variant === 'primary';
  const button = document.createElement('button');
  button.textContent = text;
  button.style.cssText = `
    position: fixed;
    right: 20px;
    z-index: 99999;
    padding: 12px 24px;
    background: ${isPrimary
      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      : 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)'};
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    transition: all 0.3s ease;
  `;

  button.onmouseenter = () => {
    button.style.transform = 'translateY(-2px)';
    button.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
  };
  button.onmouseleave = () => {
    button.style.transform = 'translateY(0)';
    button.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
  };
  button.onclick = onClick;

  return button;
}
