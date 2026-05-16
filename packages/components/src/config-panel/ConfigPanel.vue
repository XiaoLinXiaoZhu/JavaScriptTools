<template>
  <Transition name="xlxz-panel-anim">
    <div v-if="state.visible" class="xlxz-panel" :style="positionStyle">
      <div class="xlxz-panel-header">
        <h3 class="xlxz-panel-title">{{ title }}</h3>
        <button class="xlxz-panel-close" @click="onClose">✕</button>
      </div>

      <div class="xlxz-panel-body">
        <div v-for="field in state.fields" :key="field.key" class="xlxz-field">
          <label class="xlxz-field-label">{{ field.label }}</label>
          <div class="xlxz-field-row">
            <template v-if="field.type === 'slider'">
              <input
                type="range"
                class="xlxz-slider"
                :min="field.min ?? 0"
                :max="field.max ?? 100"
                :step="field.step ?? 1"
                v-model.number="field.value"
              >
              <span class="xlxz-field-value">{{ field.value }}</span>
            </template>
            <template v-else-if="field.type === 'number'">
              <input
                type="number"
                class="xlxz-input-number"
                :min="field.min"
                :max="field.max"
                :step="field.step ?? 1"
                v-model.number="field.value"
              >
            </template>
          </div>
        </div>
      </div>

      <div class="xlxz-panel-footer">
        <button
          class="xlxz-btn xlxz-btn--primary xlxz-btn-tooltip"
          :data-tooltip="saveHint"
          @click="handleSave"
        >
          保存
        </button>
        <button class="xlxz-btn xlxz-btn--ghost" @click="onClose">
          取消
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  title: string;
  state: { visible: boolean; fields: Array<any> };
  position: { top?: string; right?: string; bottom?: string; left?: string };
  saveHint: string;
  onSave: (values: Record<string, number | boolean>) => void;
  onClose: () => void;
}>();

const positionStyle = computed(() => ({
  top: props.position.top,
  right: props.position.right,
  bottom: props.position.bottom,
  left: props.position.left,
}));

function handleSave() {
  const values: Record<string, number | boolean> = {};
  for (const field of props.state.fields) {
    values[field.key] = field.value;
  }
  props.onSave(values);
}
</script>
