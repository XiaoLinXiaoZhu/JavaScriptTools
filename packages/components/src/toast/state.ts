import { reactive } from 'vue';

export interface ToastItem {
  id: number;
  message: string;
  type: string;
  exiting: boolean;
}

export type ToastPosition = 'top-center' | 'top-left' | 'top-right' | 'bottom-center' | 'bottom-left' | 'bottom-right';

export const toastState = reactive<{ items: ToastItem[]; position: ToastPosition }>({
  items: [],
  position: 'top-center',
});
