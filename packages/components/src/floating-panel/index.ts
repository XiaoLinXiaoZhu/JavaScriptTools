import { createApp, reactive } from 'vue';
import FloatingPanel from './FloatingPanel.vue';
import baseCss from '../../../styles/base.css?raw';
import floatingPanelCss from '../../../styles/components/floating-panel.css?raw';

export interface FloatingPanelOptions {
  title: string;
  /** HTML 内容 */
  content?: string;
  /** 初始宽度，默认 360 */
  width?: number;
  /** 初始高度，默认 280 */
  height?: number;
  /** 初始位置 */
  position?: { x: number; y: number };
  /** 最小尺寸 */
  minWidth?: number;
  minHeight?: number;
  /** 最大尺寸 */
  maxWidth?: number;
  maxHeight?: number;
  /** 是否显示最小化按钮 */
  minimizable?: boolean;
  /** 关闭回调 */
  onClose?: () => void;
  /** 最小化回调 */
  onMinimize?: () => void;
}

let styleInjected = false;

/**
 * 创建可拖拽浮动面板
 */
export function createFloatingPanel(options: FloatingPanelOptions) {
  const {
    title,
    content = '',
    width = 360,
    height = 280,
    position,
    minWidth = 200,
    minHeight = 120,
    maxWidth,
    maxHeight,
    minimizable = false,
    onClose,
    onMinimize,
  } = options;

  // 注入样式
  if (!styleInjected) {
    const style = document.createElement('style');
    style.textContent = baseCss + '\n' + floatingPanelCss;
    document.head.appendChild(style);
    styleInjected = true;
  }

  // 默认居中
  const defaultX = position?.x ?? Math.max(0, (window.innerWidth - width) / 2);
  const defaultY = position?.y ?? Math.max(0, (window.innerHeight - height) / 3);

  const state = reactive({
    visible: false,
    x: defaultX,
    y: defaultY,
    width,
    height,
  });

  let mountEl: HTMLElement | null = null;
  let app: ReturnType<typeof createApp> | null = null;

  function mount() {
    if (mountEl) return;

    mountEl = document.createElement('div');
    mountEl.className = 'xlxz-root';
    document.body.appendChild(mountEl);

    app = createApp(FloatingPanel, {
      title,
      content,
      state,
      minWidth,
      minHeight,
      maxWidth,
      maxHeight,
      minimizable,
      onClose: () => {
        state.visible = false;
        onClose?.();
      },
      onMinimize: () => {
        onMinimize?.();
      },
    });
    app.mount(mountEl);
  }

  function show() {
    state.visible = true;
    if (!mountEl) mount();
  }

  function hide() {
    state.visible = false;
  }

  function toggle() {
    state.visible ? hide() : show();
  }

  function setContent(html: string) {
    // Update content reactively by remounting
    if (app && mountEl) {
      app.unmount();
      app = createApp(FloatingPanel, {
        title,
        content: html,
        state,
        minWidth,
        minHeight,
        maxWidth,
        maxHeight,
        minimizable,
        onClose: () => {
          state.visible = false;
          onClose?.();
        },
        onMinimize: () => {
          onMinimize?.();
        },
      });
      app.mount(mountEl);
    }
  }

  function destroy() {
    app?.unmount();
    mountEl?.remove();
    mountEl = null;
    app = null;
  }

  // Auto mount
  mount();

  return { show, hide, toggle, destroy, setContent, state };
}
