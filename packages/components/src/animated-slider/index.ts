import NumberFlow, { styles as numberFlowStyles } from 'number-flow';
import baseCss from '../../../styles/base.css?raw';
import sliderCss from '../../../styles/components/slider.css?raw';

export interface AnimatedSliderOptions {
  /** 最小值，默认 0 */
  min?: number;
  /** 最大值，默认 100 */
  max?: number;
  /** 步长，默认 1 */
  step?: number;
  /** 初始值 */
  value?: number;
  /** 标签文本（可选） */
  label?: string;
  /** 值后缀（如 '%'、'px'） */
  suffix?: string;
  /** 值变化回调 */
  onChange?: (value: number) => void;
}

export interface AnimatedSliderInstance {
  /** 获取当前值 */
  getValue: () => number;
  /** 设置值（带动画） */
  setValue: (value: number) => void;
  /** 获取根元素 */
  getElement: () => HTMLElement;
  /** 销毁实例 */
  destroy: () => void;
}

let styleInjected = false;

function injectStyles() {
  if (styleInjected) return;

  const style = document.createElement('style');
  style.textContent = baseCss + '\n' + sliderCss + '\n' + numberFlowStyles.join('\n');
  document.head.appendChild(style);
  styleInjected = true;
}

/**
 * 创建带动画数字显示的滑动条
 */
export function createAnimatedSlider(options: AnimatedSliderOptions = {}): AnimatedSliderInstance {
  const {
    min = 0,
    max = 100,
    step = 1,
    value = min,
    label,
    suffix,
    onChange,
  } = options;

  injectStyles();

  let currentValue = value;

  // 构建 DOM
  const root = document.createElement('div');
  root.className = `xlxz-root xlxz-animated-slider${label ? ' xlxz-animated-slider--labeled' : ''}`;

  if (label) {
    const labelEl = document.createElement('span');
    labelEl.className = 'xlxz-animated-slider__label';
    labelEl.textContent = label;
    root.appendChild(labelEl);
  }

  const track = document.createElement('input');
  track.type = 'range';
  track.className = 'xlxz-animated-slider__track';
  track.min = String(min);
  track.max = String(max);
  track.step = String(step);
  track.value = String(value);
  root.appendChild(track);

  const valueContainer = document.createElement('span');
  valueContainer.className = 'xlxz-animated-slider__value';
  root.appendChild(valueContainer);

  // 创建 number-flow 元素
  const numberFlowEl = document.createElement('number-flow') as InstanceType<typeof NumberFlow>;
  valueContainer.appendChild(numberFlowEl);

  if (suffix) {
    const suffixEl = document.createElement('span');
    suffixEl.className = 'xlxz-animated-slider__suffix';
    suffixEl.textContent = suffix;
    valueContainer.appendChild(suffixEl);
  }

  // 初始化 number-flow 值（延迟到 DOM 连接后）
  requestAnimationFrame(() => {
    numberFlowEl.update(currentValue);
  });

  // 事件绑定
  track.addEventListener('input', () => {
    currentValue = Number(track.value);
    numberFlowEl.update(currentValue);
    onChange?.(currentValue);
  });

  return {
    getValue: () => currentValue,
    setValue: (v: number) => {
      currentValue = v;
      track.value = String(v);
      numberFlowEl.update(v);
    },
    getElement: () => root,
    destroy: () => {
      root.remove();
    },
  };
}
