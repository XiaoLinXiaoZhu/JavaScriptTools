import { createApp } from 'vue';
import ToastContainer from './ToastContainer.vue';
import { toastState } from './state';
import type { ToastPosition } from './state';
import baseCss from '../../../styles/base.css?raw';
import toastCss from '../../../styles/components/toast.css?raw';

export type { ToastItem, ToastPosition } from './state';

export interface ToastOptions {
  /** 持续时间(ms)，默认 3000 */
  duration?: number;
  /** 类型 */
  type?: 'info' | 'success' | 'warning' | 'error';
}

let container: HTMLElement | null = null;
let nextId = 0;
let styleInjected = false;

function ensureContainer() {
  if (container) return;

  if (!styleInjected) {
    const style = document.createElement('style');
    style.textContent = baseCss + '\n' + toastCss;
    document.head.appendChild(style);
    styleInjected = true;
  }

  container = document.createElement('div');
  container.className = 'xlxz-root';
  document.body.appendChild(container);

  const app = createApp(ToastContainer);
  app.mount(container);
}

/**
 * 配置 toast 全局选项
 */
export function configureToast(options: { position?: ToastPosition }) {
  if (options.position) {
    toastState.position = options.position;
  }
}

/**
 * 显示 toast 消息
 */
export function showToast(message: string, options: ToastOptions = {}): void {
  ensureContainer();

  const { duration = 3000, type = 'info' } = options;
  const id = nextId++;

  toastState.items.push({ id, message, type, exiting: false });

  setTimeout(() => {
    const toast = toastState.items.find(t => t.id === id);
    if (toast) toast.exiting = true;

    setTimeout(() => {
      const idx = toastState.items.findIndex(t => t.id === id);
      if (idx !== -1) toastState.items.splice(idx, 1);
    }, 300);
  }, duration);
}
