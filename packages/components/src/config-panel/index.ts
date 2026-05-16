import { createApp, reactive } from 'vue';
import ConfigPanel from './ConfigPanel.vue';
import baseCss from '../../../styles/base.css?raw';
import panelCss from '../../../styles/components/panel.css?raw';

export interface ConfigField {
  key: string;
  label: string;
  type: 'slider' | 'toggle' | 'number';
  min?: number;
  max?: number;
  step?: number;
  value: number | boolean;
  /** tooltip 说明文字 */
  tooltip?: string;
}

export interface ConfigPanelOptions {
  title?: string;
  fields: ConfigField[];
  /** 保存回调 */
  onSave?: (values: Record<string, number | boolean>) => void;
  /** 面板位置 */
  position?: { top?: string; right?: string; bottom?: string; left?: string };
  /** 保存后提示（默认：'设置已保存，刷新页面后生效'） */
  saveHint?: string;
}

let styleInjected = false;

/**
 * 创建配置面板
 */
export function createConfigPanel(options: ConfigPanelOptions) {
  const {
    title = '设置',
    fields,
    onSave,
    position = { top: '80px', right: '16px' },
    saveHint = '设置已保存，刷新页面后生效',
  } = options;

  // 注入样式
  if (!styleInjected) {
    const style = document.createElement('style');
    style.textContent = baseCss + '\n' + panelCss;
    document.head.appendChild(style);
    styleInjected = true;
  }

  const state = reactive({
    visible: false,
    fields: fields.map(f => ({ ...f })),
  });

  let mountEl: HTMLElement | null = null;
  let app: ReturnType<typeof createApp> | null = null;

  function mount() {
    if (mountEl) return;

    mountEl = document.createElement('div');
    mountEl.className = 'xlxz-root';
    document.body.appendChild(mountEl);

    app = createApp(ConfigPanel, {
      title,
      state,
      position,
      saveHint,
      onSave: (values: Record<string, number | boolean>) => {
        onSave?.(values);
      },
      onClose: () => {
        state.visible = false;
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

  function destroy() {
    app?.unmount();
    mountEl?.remove();
    mountEl = null;
    app = null;
  }

  // 自动挂载
  mount();

  return { show, hide, toggle, destroy, state };
}
