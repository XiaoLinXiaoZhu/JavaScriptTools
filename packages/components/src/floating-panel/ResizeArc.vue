<template>
  <svg
    class="xlxz-float-panel__resize-svg"
    :width="svgSize"
    :height="svgSize"
    :viewBox="`0 0 ${svgSize} ${svgSize}`"
    style="overflow: visible;"
  >
    <path
      class="resize-arc"
      :class="{ 'resize-arc--near': near }"
      :d="arcPath"
      :stroke-width="currentStroke"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  /** 面板宽度 */
  panelWidth: number;
  /** 面板高度 */
  panelHeight: number;
  /** 是否靠近 */
  near: boolean;
  /** 面板 border-radius，默认 12 */
  borderRadius?: number;
  /** 弧内边缘距面板的间距，默认 8 */
  gap?: number;
  /** 默认 stroke 宽度，默认 4 */
  strokeDefault?: number;
  /** 靠近时 stroke 宽度，默认 8 */
  strokeNear?: number;
  /** 延伸段长度，默认 12 */
  extend?: number;
}>();

const BR = computed(() => props.borderRadius ?? 12);
const GAP = computed(() => props.gap ?? 8);
const STROKE_DEFAULT = computed(() => props.strokeDefault ?? 4);
const STROKE_NEAR = computed(() => props.strokeNear ?? 8);
const EXTEND = computed(() => props.extend ?? 12);

const currentStroke = computed(() => props.near ? STROKE_NEAR.value : STROKE_DEFAULT.value);

// 内边缘固定策略：r = BR + GAP + stroke/2
const arcRadius = computed(() => BR.value + GAP.value + currentStroke.value / 2);

// SVG 坐标中，面板右下角圆心位置
const cornerCX = computed(() => props.panelWidth - BR.value);
const cornerCY = computed(() => props.panelHeight - BR.value);

// 水平段和垂直段的中心线位置
const lineY = computed(() => props.panelHeight + GAP.value + currentStroke.value / 2);
const lineX = computed(() => props.panelWidth + GAP.value + currentStroke.value / 2);

// SVG 需要覆盖的范围：从延伸段左端到垂直段右端，从垂直段上端到水平段下端
// 留出 stroke/2 余量
const svgLeft = computed(() => cornerCX.value - EXTEND.value - currentStroke.value / 2);
const svgTop = computed(() => cornerCY.value - EXTEND.value - currentStroke.value / 2);
const svgSize = computed(() => {
  const right = lineX.value + currentStroke.value / 2;
  const bottom = lineY.value + currentStroke.value / 2;
  return Math.max(right - svgLeft.value, bottom - svgTop.value);
});

// 将面板坐标转为 SVG 本地坐标
const toLocal = (x: number, y: number) => ({
  x: x - svgLeft.value,
  y: y - svgTop.value,
});

const arcPath = computed(() => {
  const ext = EXTEND.value;
  const r = arcRadius.value;
  const cx = cornerCX.value;
  const cy = cornerCY.value;
  const ly = lineY.value;
  const lx = lineX.value;

  // 水平延伸端（左）
  const extStart = toLocal(cx - ext, ly);
  // 弧起点（水平段末端 = 圆心正下方在中心线上）
  const arcStart = toLocal(cx, ly);
  // 弧终点（垂直段末端 = 圆心正右方在中心线上）
  const arcEnd = toLocal(lx, cy);
  // 垂直延伸端（上）
  const extEnd = toLocal(lx, cy - ext);

  return [
    `M ${extStart.x},${extStart.y}`,
    `L ${arcStart.x},${arcStart.y}`,
    `A ${r},${r} 0 0,0 ${arcEnd.x},${arcEnd.y}`,
    `L ${extEnd.x},${extEnd.y}`,
  ].join(' ');
});
</script>
