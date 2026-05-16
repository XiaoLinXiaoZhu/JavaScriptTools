<template>
  <Transition name="xlxz-float-panel-anim">
    <div
      v-if="state.visible"
      class="xlxz-float-panel-wrapper"
      :style="wrapperStyle"
      ref="wrapperEl"
    >
      <!-- 面板主体 -->
      <div
        class="xlxz-float-panel"
        :class="{ 'xlxz-float-panel--dragging': isDragging }"
      >
        <h3 v-if="title" class="xlxz-float-panel__title">{{ title }}</h3>
        <div class="xlxz-float-panel__body">
          <div v-html="content"></div>
        </div>
      </div>

      <!-- 关闭条 -->
      <button
        class="xlxz-float-panel__close"
        :class="{ 'xlxz-float-panel__close--near': closeNear }"
        @click="handleClose"
        ref="closeEl"
      ></button>

      <!-- 拖动条 -->
      <div
        class="xlxz-float-panel__drag-bar"
        :class="{
          'xlxz-float-panel__drag-bar--near': dragNear,
          'xlxz-float-panel__drag-bar--dragging': isDragging,
        }"
        @mousedown.prevent="startDrag"
        ref="dragBarEl"
      ></div>

      <!-- 调整大小手柄 — 圆弧组件 -->
      <div
        class="xlxz-float-panel__resize"
        :style="resizeContainerStyle"
        @mousedown.prevent="startResize"
        ref="resizeEl"
      >
        <ResizeArc
          :panel-width="state.width"
          :panel-height="state.height"
          :near="resizeNear"
        />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import ResizeArc from './ResizeArc.vue';

const props = defineProps<{
  title: string;
  content: string;
  state: {
    visible: boolean;
    x: number;
    y: number;
    width: number;
    height: number;
  };
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  onClose: () => void;
}>();

const wrapperEl = ref<HTMLElement>();
const closeEl = ref<HTMLElement>();
const dragBarEl = ref<HTMLElement>();
const resizeEl = ref<HTMLElement>();

const isDragging = ref(false);
const isResizing = ref(false);

const closeNear = ref(false);
const dragNear = ref(false);
const resizeNear = ref(false);

const PROXIMITY_THRESHOLD = 80;

let dragStartX = 0;
let dragStartY = 0;
let dragInitX = 0;
let dragInitY = 0;
let resizeStartX = 0;
let resizeStartY = 0;
let resizeInitW = 0;
let resizeInitH = 0;

const minW = computed(() => props.minWidth ?? 200);
const minH = computed(() => props.minHeight ?? 120);
const maxW = computed(() => props.maxWidth ?? window.innerWidth - 32);
const maxH = computed(() => props.maxHeight ?? window.innerHeight - 32);

const wrapperStyle = computed(() => ({
  left: `${props.state.x}px`,
  top: `${props.state.y}px`,
  width: `${props.state.width}px`,
  height: `${props.state.height}px`,
}));

// ResizeArc 容器：覆盖面板右下角区域 + 外部空间
const BORDER_RADIUS = 12;
const GAP = 8;
const EXTEND = 12;
const MAX_STROKE = 8;

const resizeContainerStyle = computed(() => {
  // 容器需要从面板内的圆角圆心区域延伸到面板外
  // 左上起点 = (cornerCX - extend - maxStroke/2, cornerCY - extend - maxStroke/2)
  // 容器大小 = 到右下外侧的总范围
  const overflowRight = GAP + MAX_STROKE; // 面板右边外的空间
  const overflowBottom = GAP + MAX_STROKE; // 面板底边外的空间
  const insetX = BORDER_RADIUS + EXTEND + MAX_STROKE / 2;
  const insetY = BORDER_RADIUS + EXTEND + MAX_STROKE / 2;
  const w = insetX + overflowRight;
  const h = insetY + overflowBottom;
  return {
    position: 'absolute' as const,
    right: `-${overflowRight}px`,
    bottom: `-${overflowBottom}px`,
    width: `${w}px`,
    height: `${h}px`,
    pointerEvents: 'none' as const,
    cursor: 'nwse-resize',
  };
});

// --- Proximity ---
function checkProximity(e: MouseEvent) {
  if (isDragging.value || isResizing.value) return;
  const mx = e.clientX;
  const my = e.clientY;

  if (closeEl.value) {
    const rect = closeEl.value.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    closeNear.value = Math.hypot(mx - cx, my - cy) < PROXIMITY_THRESHOLD;
  }

  if (dragBarEl.value) {
    const rect = dragBarEl.value.getBoundingClientRect();
    const cy = rect.top + rect.height / 2;
    const inX = mx >= rect.left - 30 && mx <= rect.right + 30;
    dragNear.value = inX && Math.abs(my - cy) < PROXIMITY_THRESHOLD;
  }

  // 检测鼠标距面板右下角的距离
  if (wrapperEl.value) {
    const rect = wrapperEl.value.getBoundingClientRect();
    const cornerX = rect.right;
    const cornerY = rect.bottom;
    resizeNear.value = Math.hypot(mx - cornerX, my - cornerY) < PROXIMITY_THRESHOLD;
  }
}

// --- Drag ---
function startDrag(e: MouseEvent) {
  isDragging.value = true;
  dragStartX = e.clientX;
  dragStartY = e.clientY;
  dragInitX = props.state.x;
  dragInitY = props.state.y;
  document.addEventListener('mousemove', onDrag);
  document.addEventListener('mouseup', stopDrag);
}

function onDrag(e: MouseEvent) {
  let newX = dragInitX + (e.clientX - dragStartX);
  let newY = dragInitY + (e.clientY - dragStartY);
  newX = Math.max(0, Math.min(newX, window.innerWidth - props.state.width));
  newY = Math.max(0, Math.min(newY, window.innerHeight - props.state.height - 40));
  props.state.x = newX;
  props.state.y = newY;
}

function stopDrag() {
  isDragging.value = false;
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', stopDrag);
}

// --- Resize ---
function startResize(e: MouseEvent) {
  isResizing.value = true;
  resizeStartX = e.clientX;
  resizeStartY = e.clientY;
  resizeInitW = props.state.width;
  resizeInitH = props.state.height;
  document.addEventListener('mousemove', onResize);
  document.addEventListener('mouseup', stopResize);
}

function onResize(e: MouseEvent) {
  let newW = resizeInitW + (e.clientX - resizeStartX);
  let newH = resizeInitH + (e.clientY - resizeStartY);
  newW = Math.max(minW.value, Math.min(newW, maxW.value));
  newH = Math.max(minH.value, Math.min(newH, maxH.value));
  props.state.width = newW;
  props.state.height = newH;
}

function stopResize() {
  isResizing.value = false;
  document.removeEventListener('mousemove', onResize);
  document.removeEventListener('mouseup', stopResize);
}

function handleClose() {
  props.onClose();
}

onMounted(() => {
  document.addEventListener('mousemove', checkProximity);
});

onUnmounted(() => {
  document.removeEventListener('mousemove', checkProximity);
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', stopDrag);
  document.removeEventListener('mousemove', onResize);
  document.removeEventListener('mouseup', stopResize);
});
</script>
