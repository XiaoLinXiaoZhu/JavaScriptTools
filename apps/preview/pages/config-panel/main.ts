import { showToast, createConfigPanel } from '@xlxz/components';

const panel = createConfigPanel({
  title: '质量筛选设置',
  fields: [
    { key: 'playWeight', label: '播放量权重', type: 'slider', min: 0, max: 100, value: 50 },
    { key: 'fansWeight', label: '粉丝数权重', type: 'slider', min: 0, max: 100, value: 50 },
    { key: 'threshold', label: '过滤阈值', type: 'slider', min: 0, max: 100, value: 30 },
    { key: 'blurIntensity', label: '模糊强度', type: 'number', min: 0, max: 30, value: 10 },
  ],
  onSave(values) {
    showToast(`设置已保存: ${JSON.stringify(values)}`, { type: 'success', duration: 4000 });
    console.log('Saved values:', values);
  },
  position: { top: '80px', right: '24px' },
});

panel.hide();

document.getElementById('panel-toggle')!.onclick = () => {
  panel.toggle();
};
