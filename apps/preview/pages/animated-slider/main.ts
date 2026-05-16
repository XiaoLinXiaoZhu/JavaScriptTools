import { createAnimatedSlider } from '@xlxz/components';

const sliderDemo = document.getElementById('slider-demo')!;

const slider1 = createAnimatedSlider({
  label: '播放量权重',
  min: 0,
  max: 100,
  value: 50,
  suffix: '%',
  onChange(value) {
    console.log('播放量权重:', value);
  },
});
sliderDemo.appendChild(slider1.getElement());

const slider2 = createAnimatedSlider({
  label: '粉丝数权重',
  min: 0,
  max: 100,
  value: 50,
  suffix: '%',
  onChange(value) {
    console.log('粉丝数权重:', value);
  },
});
sliderDemo.appendChild(slider2.getElement());

const slider3 = createAnimatedSlider({
  label: '过滤阈值',
  min: 0,
  max: 100,
  step: 5,
  value: 30,
  onChange(value) {
    console.log('过滤阈值:', value);
  },
});
sliderDemo.appendChild(slider3.getElement());
