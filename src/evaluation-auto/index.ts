export {};

// 添加悬浮按钮
function addButton(): void {
  const button = document.createElement('button');
  button.textContent = '一键选择';
  button.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 99999;
    padding: 12px 24px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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

  button.onclick = autoSelect;
  document.body.appendChild(button);
}

// 自动选择函数
function autoSelect(): void {
  let selectedCount = 0;
  let strongRecommendName = '';
  let bestClassName = '';

  const allRadios = document.querySelectorAll(
    'input[type="radio"]'
  ) as NodeListOf<HTMLInputElement>;

  allRadios.forEach((radio) => {
    const label = radio.closest('label');
    if (!label) return;

    const labelText = label.textContent?.trim();

    if (labelText === '强烈推荐') {
      radio.click();
      selectedCount++;
      strongRecommendName = radio.name;
      console.log('已选择: 强烈推荐 (name=' + radio.name + ')');
    } else if (labelText === '最满意课堂') {
      radio.click();
      selectedCount++;
      bestClassName = radio.name;
      console.log('已选择: 最满意课堂 (name=' + radio.name + ')');
    }
  });

  const goodOptions = document.querySelectorAll(
    'input[type="radio"][value="1_1.0"][score="1.0"]'
  ) as NodeListOf<HTMLInputElement>;
  goodOptions.forEach((option) => {
    if (
      option.name !== strongRecommendName &&
      option.name !== bestClassName
    ) {
      option.click();
      selectedCount++;
      console.log('已选择: 很好 (name=' + option.name + ')');
    }
  });

  if (selectedCount > 0) {
    showToast(`成功选择了 ${selectedCount} 个选项！`);

    if (selectedCount === 11) {
      setTimeout(() => {
        autoSubmit();
      }, 500);
    }
  } else {
    showToast('未找到可选择的选项', 'warning');
  }
}

// 自动提交函数
function autoSubmit(): void {
  const submitBtn = document.querySelector('a.save') as HTMLElement | null;
  if (submitBtn) {
    submitBtn.click();
    showToast('正在提交...', 'success');

    setTimeout(() => {
      const confirmSelectors = [
        'a.layui-layer-btn0',
        'a.popBnt_blue',
        '.layui-layer-btn a:first-child',
      ];

      for (const selector of confirmSelectors) {
        const confirmBtn = document.querySelector(
          selector
        ) as HTMLElement | null;
        if (confirmBtn) {
          confirmBtn.click();
          console.log('已点击确认按钮: ' + selector);
          showToast('已确认提交！', 'success');
          return;
        }
      }

      console.log('未找到确认按钮');
      showToast('提交成功，请手动确认', 'warning');
    }, 1000);
  } else {
    console.log('未找到提交按钮');
  }
}

// 显示提示信息
function showToast(
  message: string,
  type: 'success' | 'warning' = 'success'
): void {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    z-index: 99999;
    padding: 12px 20px;
    background: ${type === 'success' ? '#10b981' : '#f59e0b'};
    color: white;
    border-radius: 8px;
    font-size: 14px;
    font-weight: bold;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    animation: slideIn 0.3s ease;
  `;

  if (!document.getElementById('toast-animation')) {
    const style = document.createElement('style');
    style.id = 'toast-animation';
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes slideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// 页面加载完成后添加按钮
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', addButton);
} else {
  addButton();
}

console.log('评价表自动选择工具已加载');
