<template>
  <div class="xlxz-toast-container" :data-position="toastState.position">
    <TransitionGroup name="xlxz-toast-anim">
      <div
        v-for="toast in toastState.items"
        :key="toast.id"
        class="xlxz-toast"
        :class="{ 'xlxz-toast-exit': toast.exiting }"
      >
        <span class="xlxz-toast-icon" :class="`xlxz-toast-icon--${toast.type}`"></span>
        <span>{{ toast.message }}</span>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { toastState } from './state';
</script>
